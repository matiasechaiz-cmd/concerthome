const telefonoWhatsApp = "56965195972";

const comunasTraslado = [
  "Santiago",
  "Providencia",
  "Ñuñoa",
  "Macul",
  "San Miguel",
  "Independencia",
  "Recoleta",
  "Estación Central",
  "Quinta Normal",
  "Aeropuerto de Santiago",
  "Terminal Alameda",
  "Terminal Sur",
  "Terminal San Borja",
  "Terminal Pajaritos",
  "La Florida",
  "Peñalolén",
  "San Joaquín",
  "La Cisterna",
  "Huechuraba",
  "Conchalí",
  "Lo Prado",
  "Cerrillos",
  "Pedro Aguirre Cerda",
  "El Bosque",
  "La Granja",
  "La Pintana",
  "San Ramón",
  "La Reina",
  "Las Condes",
  "Maipú",
  "Puente Alto",
  "Quilicura",
  "Pudahuel",
  "Pudahuel Norte",
  "San Bernardo",
  "Renca",
  "Cerro Navia",
  "Lo Espejo",
  "Vitacura",
  "Lo Barnechea",
  "Colina",
  "Lampa",
  "Padre Hurtado",
  "Peñaflor",
  "Talagante",
  "Buin",
  "Calera de Tango",
  "Paine",
  "Melipilla",
  "Curacaví",
  "Pirque",
  "San José de Maipo",
  "El Monte",
  "Isla de Maipo",
  "Til Til",
  "María Pinto",
  "San Pedro",
  "Alhué"
];

const RESERVAS_ENDPOINT = "https://script.google.com/macros/s/AKfycbzh6rduJaO2jMpz2JnSdQ645uOKxOs6b7jzlB3iljfWAOT4JXh4RJ93Pl9dj_uSZ-bW6A/exec";

async function solicitarConcertHome(datos, signal) {
  const respuesta = await fetch(RESERVAS_ENDPOINT, {
    method: "POST",
    body: new URLSearchParams(datos),
    signal
  });
  if (!respuesta.ok) throw new Error("No fue posible conectar con ConcertHome.");
  const resultado = await respuesta.json();
  if (!resultado.ok) throw new Error(resultado.error || "No fue posible procesar la solicitud.");
  return resultado;
}

function iniciarCotizador(obtenerRecinto) {
  const campo = id => document.getElementById(id);
  const tipo = campo("tipoServicio");
  const boton = campo("btnCotizar");
  const estado = campo("estadoCotizacion");
  const comunas = [...comunasTraslado].sort((a, b) => a.localeCompare(b, "es"));
  let cotizacion = null;
  let pendiente;

  for (const comuna of comunas) {
    for (const id of ["comunaIda", "comunaRegreso"]) {
      campo(id).add(new Option(comuna, comuna));
    }
    const lista = campo("listaComunas");
    if (lista) {
      const item = document.createElement("span");
      item.className = "commune";
      item.textContent = comuna;
      lista.append(item);
    }
  }

  function datosRuta() {
    const datos = { tipo: tipo.value, venue: obtenerRecinto() };
    for (const tramo of ["Ida", "Regreso"]) {
      if (tipo.value === (tramo === "Ida" ? "regreso" : "ida")) continue;
      for (const prefijo of ["comuna", "direccion"]) {
        const id = prefijo + tramo;
        datos[id] = campo(id).value.trim();
      }
    }
    return datos;
  }

  function mostrar() {
    const datos = datosRuta();
    const peso = valor => "$" + valor.toLocaleString("es-CL");
    const tramo = dato => dato
      ? `${peso(dato.valor)} · ${(dato.metros / 1000).toLocaleString("es-CL", { maximumFractionDigits: 2 })} km`
      : "—";
    campo("bloqueIda").classList.toggle("hidden", datos.tipo === "regreso");
    campo("bloqueRegreso").classList.toggle("hidden", datos.tipo === "ida");
    campo("valorIda").textContent = tramo(cotizacion?.ida);
    campo("valorRegreso").textContent = tramo(cotizacion?.regreso);
    campo("valorTotal").textContent = cotizacion ? peso(cotizacion.total) : "—";
    const direccionSala = campo("direccionSalaOmnium");
    if (direccionSala) direccionSala.hidden = datos.venue !== "Sala Omnium";

    const mensaje = [
      "Hola, quiero cotizar o reservar un traslado en ConcertHome.",
      "Tipo de servicio: " + tipo.selectedOptions[0].text,
      "Recinto: " + datos.venue,
      datos.comunaIda && "Salida: " + [datos.direccionIda, datos.comunaIda].filter(Boolean).join(", "),
      datos.comunaRegreso && "Regreso: " + [datos.direccionRegreso, datos.comunaRegreso].filter(Boolean).join(", "),
      cotizacion && "Valor ida: " + tramo(cotizacion.ida),
      cotizacion && "Valor regreso: " + tramo(cotizacion.regreso),
      cotizacion && "Total estimado: " + peso(cotizacion.total)
    ].filter(Boolean).join("\n");
    const link = "https://wa.me/" + telefonoWhatsApp + "?text=" + encodeURIComponent(mensaje);
    campo("btnWhatsapp").href = link;
    campo("whatsappFloat").href = link;
  }

  function limpiar() {
    pendiente?.abort();
    pendiente = null;
    boton.disabled = false;
    cotizacion = null;
    estado.textContent = "";
    mostrar();
  }

  for (const id of ["tipoServicio", "recinto", "comunaIda", "comunaRegreso"]) {
    campo(id)?.addEventListener("change", limpiar);
  }
  for (const id of ["direccionIda", "direccionRegreso"]) {
    campo(id).addEventListener("input", limpiar);
  }
  boton.addEventListener("click", async () => {
    const datos = datosRuta();
    if (Object.values(datos).some(valor => !valor)) {
      estado.textContent = "Completa la comuna y la dirección exacta de cada tramo.";
      return;
    }
    const solicitud = new AbortController();
    pendiente = solicitud;
    boton.disabled = true;
    cotizacion = null;
    mostrar();
    estado.textContent = "Calculando distancia y tarifa…";
    const timeout = setTimeout(() => solicitud.abort(), 20000);
    try {
      const resultado = await solicitarConcertHome({ action: "cotizar", ...datos }, solicitud.signal);
      if (pendiente !== solicitud) return;
      if (!Number.isInteger(resultado.total) || resultado.total <= 0) throw new Error();
      cotizacion = resultado;
      estado.textContent = "";
      mostrar();
    } catch (error) {
      if (pendiente === solicitud) {
        estado.textContent = error instanceof SyntaxError || error.name === "AbortError"
          ? "No pudimos calcular la ruta en este momento. Puedes cotizar por WhatsApp."
          : error.message || "No pudimos calcular la ruta en este momento.";
      }
    } finally {
      clearTimeout(timeout);
      if (pendiente === solicitud) {
        pendiente = null;
        boton.disabled = false;
      }
    }
  });
  mostrar();
  return () => cotizacion && { ...datosRuta(), total: cotizacion.total };
}

function insertarRedesConcertHome() {
  const footer = document.querySelector("footer");
  if (!footer || document.getElementById("concertHomeSocials")) return;

  const socials = document.createElement("div");
  socials.id = "concertHomeSocials";
  socials.setAttribute("aria-label", "Redes sociales de ConcertHome");
  socials.style.cssText = "display:flex;justify-content:center;align-items:center;gap:14px;flex-wrap:wrap;margin:0 0 18px;";

  const redes = [
    { nombre: "Instagram", icono: "◎", url: "https://www.instagram.com/concerthome_chile/" },
    { nombre: "Facebook", icono: "f", url: "https://www.facebook.com/share/1Dbw91QKbe/" }
  ];

  redes.forEach(red => {
    const enlace = document.createElement("a");
    enlace.href = red.url;
    enlace.target = "_blank";
    enlace.rel = "noopener noreferrer";
    enlace.setAttribute("aria-label", red.nombre + " de ConcertHome");
    enlace.title = red.nombre;
    enlace.style.cssText = "display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:10px 16px;border:1px solid rgba(255,255,255,.28);border-radius:999px;color:#fff;text-decoration:none;font-weight:700;font-size:15px;background:rgba(255,255,255,.08);";
    enlace.innerHTML = '<span aria-hidden="true" style="font-size:20px;font-weight:800">' + red.icono + '</span><span>' + red.nombre + '</span>';
    socials.appendChild(enlace);
  });

  footer.insertBefore(socials, footer.firstChild);
}

// El script se carga al final del HTML, por lo que el footer ya existe en la mayoría de los casos.
insertarRedesConcertHome();

// Fallback por si el navegador todavía está terminando de construir el documento.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", insertarRedesConcertHome, { once: true });
}
