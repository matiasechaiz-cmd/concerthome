const CONFIG = Object.freeze({
  OWNER_EMAIL: 'matias.echaiz@gmail.com',
  SHEET_NAME: 'Reservas',
  TIMEZONE: 'America/Santiago'
});

const HEADERS = [
  'Solicitud', 'Fecha de solicitud', 'Estado', 'Token', 'Código',
  'Nombre', 'Correo', 'Teléfono', 'Artista', 'Recinto', 'Fecha del servicio',
  'Hora', 'Recogida', 'Tipo de servicio', 'Pasajeros', 'Valor total',
  'Comuna ida', 'Dirección ida', 'Comuna regreso', 'Dirección regreso',
  'Fecha de decisión'
];

function doPost(e) {
  try {
    const data = parseRequest_(e);
    validateRequest_(data);

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    let record;
    try {
      record = createPendingReservation_(data);
    } finally {
      lock.releaseLock();
    }

    sendOwnerNotification_(record);
    sendCustomerReceipt_(record);
    return json_({ ok: true, requestId: record.requestId, status: 'Pendiente' });
  } catch (error) {
    console.error(error);
    return json_({ ok: false, error: error.message || 'No fue posible registrar la solicitud.' });
  }
}

function doGet(e) {
  const action = String((e && e.parameter && e.parameter.action) || '').toLowerCase();
  const token = String((e && e.parameter && e.parameter.token) || '');
  if (!token || !['confirmar', 'rechazar'].includes(action)) {
    return HtmlService.createHtmlOutput(resultPage_('Enlace no válido', 'Falta información para procesar esta solicitud.', false));
  }

  try {
    const result = decideReservation_(token, action);
    if (result.alreadyProcessed) {
      return HtmlService.createHtmlOutput(resultPage_('Solicitud ya procesada', `Esta solicitud figura como ${result.status}.`, result.status === 'Confirmada'));
    }

    if (action === 'confirmar') {
      sendConfirmedTicket_(result.record);
      return HtmlService.createHtmlOutput(resultPage_('Reserva confirmada', `El ticket ${result.record.code} fue enviado a ${result.record.email}.`, true));
    }

    sendRejection_(result.record);
    return HtmlService.createHtmlOutput(resultPage_('Solicitud rechazada', `Se notificó a ${result.record.email}.`, false));
  } catch (error) {
    console.error(error);
    return HtmlService.createHtmlOutput(resultPage_('No fue posible procesar la solicitud', error.message || 'Inténtalo nuevamente.', false));
  }
}

function parseRequest_(e) {
  if (!e || !e.postData) throw new Error('Solicitud vacía.');
  const type = String(e.postData.type || '');
  if (type.includes('application/json')) return JSON.parse(e.postData.contents || '{}');
  return Object.assign({}, e.parameter || {});
}

function validateRequest_(data) {
  const required = ['name', 'email', 'artist', 'venue', 'serviceDate', 'pickupTime', 'pickup', 'serviceType', 'passengers', 'total'];
  required.forEach(key => {
    if (String(data[key] == null ? '' : data[key]).trim() === '') throw new Error(`Falta el dato obligatorio: ${key}.`);
  });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) throw new Error('El correo del cliente no es válido.');
  const passengers = Number(data.passengers);
  if (!Number.isInteger(passengers) || passengers < 1 || passengers > 4) throw new Error('La cantidad de pasajeros debe estar entre 1 y 4.');
  if (!Number.isFinite(Number(data.total)) || Number(data.total) < 0) throw new Error('El valor total no es válido.');
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) throw new Error('Este script debe estar asociado a una hoja de cálculo de Google Sheets.');
  let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#071226').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function createPendingReservation_(data) {
  const now = new Date();
  const requestId = `SOL-${Utilities.formatDate(now, CONFIG.TIMEZONE, 'yyyyMMdd-HHmmss')}`;
  const token = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '');
  const record = {
    requestId,
    createdAt: now,
    status: 'Pendiente',
    token,
    code: '',
    name: clean_(data.name),
    email: clean_(data.email).toLowerCase(),
    phone: clean_(data.phone),
    artist: clean_(data.artist),
    venue: clean_(data.venue),
    serviceDate: clean_(data.serviceDate),
    pickupTime: clean_(data.pickupTime),
    pickup: clean_(data.pickup),
    serviceType: clean_(data.serviceType),
    passengers: Number(data.passengers),
    total: Number(data.total),
    comunaIda: clean_(data.comunaIda),
    direccionIda: clean_(data.direccionIda),
    comunaRegreso: clean_(data.comunaRegreso),
    direccionRegreso: clean_(data.direccionRegreso),
    decidedAt: ''
  };
  getSheet_().appendRow(recordToRow_(record));
  return record;
}

function decideReservation_(token, action) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet_();
    const values = sheet.getDataRange().getValues();
    const index = values.findIndex((row, i) => i > 0 && String(row[3]) === token);
    if (index < 1) throw new Error('El enlace no corresponde a una solicitud existente.');

    const rowNumber = index + 1;
    const currentStatus = String(values[index][2]);
    const record = rowToRecord_(values[index]);
    if (currentStatus !== 'Pendiente') return { alreadyProcessed: true, status: currentStatus, record };

    record.status = action === 'confirmar' ? 'Confirmada' : 'Rechazada';
    record.code = action === 'confirmar' ? nextTicketCode_(sheet, record.serviceDate) : '';
    record.decidedAt = new Date();
    sheet.getRange(rowNumber, 1, 1, HEADERS.length).setValues([recordToRow_(record)]);
    return { alreadyProcessed: false, status: record.status, record };
  } finally {
    lock.releaseLock();
  }
}

function nextTicketCode_(sheet, serviceDate) {
  const parsed = serviceDate instanceof Date ? new Date(serviceDate) : new Date(`${serviceDate}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) throw new Error('La fecha del servicio no es válida.');
  const prefix = `CH-${Utilities.formatDate(parsed, CONFIG.TIMEZONE, 'ddMMyy')}-`;
  const codes = sheet.getLastRow() > 1 ? sheet.getRange(2, 5, sheet.getLastRow() - 1, 1).getDisplayValues().flat() : [];
  const last = codes.filter(code => String(code).startsWith(prefix)).reduce((max, code) => Math.max(max, Number(String(code).slice(-3)) || 0), 0);
  return prefix + String(last + 1).padStart(3, '0');
}

function sendOwnerNotification_(record) {
  const appUrl = ScriptApp.getService().getUrl();
  if (!appUrl) throw new Error('Primero debes implementar el proyecto como aplicación web.');
  const confirmUrl = `${appUrl}?action=confirmar&token=${encodeURIComponent(record.token)}`;
  const rejectUrl = `${appUrl}?action=rechazar&token=${encodeURIComponent(record.token)}`;
  const subject = `Nueva solicitud ConcertHome · ${record.artist} · ${record.serviceDate}`;
  const html = `
    <div style="font-family:Arial,sans-serif;background:#eef3f7;padding:26px;color:#111827">
      <div style="max-width:650px;margin:auto;background:#fff;border-radius:20px;padding:30px;border-top:8px solid #22c55e">
        <div style="font-size:32px;font-weight:900;color:#071226">Concert<span style="color:#22c55e">Home</span></div>
        <h2 style="margin:24px 0 8px">Nueva solicitud pendiente</h2>
        <p style="color:#526273">Revisa los datos antes de generar el ticket definitivo.</p>
        ${detailTable_(record, false)}
        <div style="margin-top:28px;text-align:center">
          <a href="${confirmUrl}" style="display:inline-block;margin:5px;padding:15px 22px;border-radius:12px;background:#22c55e;color:#04150b;text-decoration:none;font-weight:800">Confirmar y enviar ticket</a>
          <a href="${rejectUrl}" style="display:inline-block;margin:5px;padding:15px 22px;border-radius:12px;background:#dc2626;color:#fff;text-decoration:none;font-weight:800">Rechazar</a>
        </div>
        <p style="margin-top:22px;color:#64748b;font-size:13px">Cada botón funciona una sola vez. No reenvíes este correo.</p>
      </div>
    </div>`;
  MailApp.sendEmail({ to: CONFIG.OWNER_EMAIL, subject, htmlBody: html, name: 'ConcertHome Reservas' });
}

function sendCustomerReceipt_(record) {
  const html = `<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#111827"><h2>Recibimos tu solicitud en ConcertHome</h2><p>Hola ${html_(record.name)}, recibimos tu solicitud para <strong>${html_(record.artist)}</strong>.</p><p>Tu número de solicitud es <strong>${html_(record.requestId)}</strong>. La reserva todavía está pendiente; recibirás el ticket solamente cuando confirmemos disponibilidad.</p></div>`;
  MailApp.sendEmail({ to: record.email, subject: `Solicitud recibida · ${record.requestId}`, htmlBody: html, name: 'ConcertHome' });
}

function sendConfirmedTicket_(record) {
  const subject = `Tu ticket ConcertHome · ${record.artist} · ${record.code}`;
  MailApp.sendEmail({
    to: record.email,
    subject,
    htmlBody: confirmedTicketHtml_(record),
    name: 'ConcertHome'
  });
}

function sendRejection_(record) {
  const html = `<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#111827"><h2>Actualización de tu solicitud ConcertHome</h2><p>Hola ${html_(record.name)}, en esta ocasión no podremos confirmar tu solicitud para <strong>${html_(record.artist)}</strong>.</p><p>No se generó ningún ticket ni código de reserva.</p></div>`;
  MailApp.sendEmail({ to: record.email, subject: `Solicitud no confirmada · ${record.requestId}`, htmlBody: html, name: 'ConcertHome' });
}

function confirmedTicketHtml_(r) {
  const date = displayDate_(r.serviceDate);
  const total = formatClp_(r.total);
  return `<div style="margin:0;padding:24px;background:#eaf1f6;font-family:Arial,sans-serif">
    <div style="max-width:900px;margin:auto;overflow:hidden;border-radius:26px;background:#071226;color:#fff;border-top:12px solid #22c55e">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
        <tr>
          <td valign="top" style="padding:34px 38px;width:74%">
            <div style="font-size:38px;font-weight:900">Concert<span style="color:#22c55e">Home</span></div>
            <div style="margin-top:28px;color:#22c55e;font-size:15px;font-weight:900;letter-spacing:3px">PASE DE TRASLADO CONFIRMADO</div>
            <div style="margin-top:20px;font-size:30px;font-weight:900;text-transform:uppercase">${html_(r.artist)}</div>
            <div style="margin-top:8px;color:#b5c7d7;font-size:18px">${html_(r.venue)}</div>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:34px;color:#fff">
              <tr><td style="padding-right:20px"><div style="color:#8fa9c1;font-size:12px;font-weight:900;letter-spacing:1px">RECOGIDA</div><div style="margin-top:7px;font-size:18px;font-weight:800">${html_(r.pickup)} · ${html_(r.pickupTime)}</div></td><td><div style="color:#8fa9c1;font-size:12px;font-weight:900;letter-spacing:1px">FECHA</div><div style="margin-top:7px;font-size:18px;font-weight:800">${html_(date)}</div></td></tr>
              <tr><td colspan="2" style="padding-top:28px"><div style="color:#8fa9c1;font-size:12px;font-weight:900;letter-spacing:1px">PASAJERO</div><div style="margin-top:7px;font-size:18px;font-weight:800">${html_(r.name)} · ${r.passengers} ${r.passengers === 1 ? 'pasajero' : 'pasajeros'}</div></td></tr>
            </table>
          </td>
          <td valign="top" align="center" style="width:26%;padding:38px 18px;border-left:3px dashed #8299ae;background:#10304a">
            <div style="color:#93c5fd;font-size:12px;font-weight:900;letter-spacing:1px">CÓDIGO</div>
            <div style="margin-top:18px;color:#22c55e;font-size:21px;font-weight:900;word-break:break-word">${html_(r.code)}</div>
            <div style="margin:42px auto 28px;width:120px;height:115px;background:repeating-linear-gradient(90deg,#fff 0,#fff 9px,transparent 9px,transparent 16px)"></div>
            <div style="color:#8fa9c1;font-size:12px;font-weight:900;letter-spacing:1px">TOTAL</div>
            <div style="margin-top:8px;font-size:23px;font-weight:900">${html_(total)}</div>
          </td>
        </tr>
      </table>
    </div>
    <p style="max-width:900px;margin:18px auto 0;text-align:center;color:#526273;font-size:13px">Conserva este correo y presenta tu código al iniciar el traslado.</p>
  </div>`;
}

function detailTable_(r, includeCode) {
  const rows = [
    ['Solicitud', r.requestId], ['Pasajero', r.name], ['Correo', r.email], ['Teléfono', r.phone || 'No indicado'],
    ['Artista', r.artist], ['Recinto', r.venue], ['Fecha', displayDate_(r.serviceDate)], ['Hora', r.pickupTime],
    ['Recogida', r.pickup], ['Servicio', r.serviceType], ['Pasajeros', r.passengers], ['Total', formatClp_(r.total)]
  ];
  if (includeCode) rows.unshift(['Código', r.code]);
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="8" style="margin-top:22px;border-collapse:collapse">${rows.map(([key, value]) => `<tr><td style="border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;font-weight:700">${html_(key)}</td><td style="border-bottom:1px solid #e2e8f0;font-weight:700">${html_(value)}</td></tr>`).join('')}</table>`;
}

function resultPage_(title, message, success) {
  const color = success ? '#22c55e' : '#ef4444';
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${html_(title)}</title></head><body style="margin:0;background:#eaf1f6;font-family:Arial,sans-serif"><main style="max-width:620px;margin:70px auto;padding:36px;background:#fff;border-radius:22px;border-top:9px solid ${color};text-align:center"><div style="font-size:34px;font-weight:900;color:#071226">Concert<span style="color:#22c55e">Home</span></div><h1 style="font-size:28px">${html_(title)}</h1><p style="color:#526273;font-size:17px;line-height:1.6">${html_(message)}</p></main></body></html>`;
}

function rowToRecord_(row) {
  return { requestId: row[0], createdAt: row[1], status: row[2], token: row[3], code: row[4], name: row[5], email: row[6], phone: row[7], artist: row[8], venue: row[9], serviceDate: row[10], pickupTime: row[11], pickup: row[12], serviceType: row[13], passengers: Number(row[14]), total: Number(row[15]), comunaIda: row[16], direccionIda: row[17], comunaRegreso: row[18], direccionRegreso: row[19], decidedAt: row[20] };
}

function recordToRow_(r) {
  return [r.requestId, r.createdAt, r.status, r.token, r.code, r.name, r.email, r.phone, r.artist, r.venue, r.serviceDate, r.pickupTime, r.pickup, r.serviceType, r.passengers, r.total, r.comunaIda, r.direccionIda, r.comunaRegreso, r.direccionRegreso, r.decidedAt];
}

function displayDate_(iso) {
  const date = iso instanceof Date ? new Date(iso) : new Date(`${iso}T12:00:00`);
  return Number.isNaN(date.getTime()) ? String(iso) : Utilities.formatDate(date, CONFIG.TIMEZONE, 'dd MMM yyyy').toUpperCase();
}

function formatClp_(value) {
  return '$' + Math.round(Number(value) || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function clean_(value) { return String(value == null ? '' : value).trim().slice(0, 300); }
function html_(value) { return String(value == null ? '' : value).replace(/[<>&'\"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&#39;', '\"': '&quot;' }[c])); }
function json_(data) { return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON); }
