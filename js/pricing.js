function formatoPesos(valor) {
  return "$" + Number(valor).toLocaleString("es-CL");
}

// -------- IDA --------
function obtenerValorIda(tipoServicio, comunaOrigen, destino) {
  if (tipoServicio !== "ida" && tipoServicio !== "ida_vuelta") {
    return 0;
  }

  if (!comunaOrigen || !destino) return 0;

  const valor = TARIFAS_IDA[comunaOrigen]?.[destino];

  return valor || 0;
}

// -------- REGRESO --------
function obtenerValorRegreso(
  tipoServicio,
  salidaRegreso,
  comunaRegreso,
  comunaOrigen,
  destino
) {
  if (tipoServicio !== "regreso" && tipoServicio !== "ida_vuelta") {
    return 0;
  }

  // 🔥 CLAVE: valores por defecto
  const recinto = salidaRegreso || destino;
  const comuna = comunaRegreso || comunaOrigen;

  if (!recinto || !comuna) return 0;

  const valor = TARIFAS_REGRESO[recinto]?.[comuna];

  return valor || 0;
}

// -------- RESUMEN --------
function calcularResumen(data) {
  const valorIda = obtenerValorIda(
    data.tipoServicio,
    data.comunaOrigen,
    data.destino
  );

  const valorRegreso = obtenerValorRegreso(
    data.tipoServicio,
    data.salidaRegreso,
    data.comunaRegreso,
    data.comunaOrigen,
    data.destino
  );

  return {
    valorIda,
    valorRegreso,
    total: valorIda + valorRegreso
  };
}
