const WHATSAPP_NUMBER = "56954190451"; // tu número

const elementos = {
  form: document.getElementById("reservaForm"),
  tipoServicio: document.getElementById("tipoServicio"),
  comunaOrigen: document.getElementById("comunaOrigen"),
  direccionOrigen: document.getElementById("direccionOrigen"),
  destino: document.getElementById("destino"),
  salidaRegreso: document.getElementById("salidaRegreso"),
  comunaRegreso: document.getElementById("comunaRegreso"),
  direccionRegreso: document.getElementById("direccionRegreso"),
  bloqueRegreso: document.getElementById("bloqueRegreso"),
  valorIda: document.getElementById("valorIda"),
  valorRegreso: document.getElementById("valorRegreso"),
  valorTotal: document.getElementById("valorTotal"),
  whatsappBtn: document.getElementById("whatsappBtn")
};

function obtenerDatosFormulario(elementos) {
  return {
    tipoServicio: elementos.tipoServicio.value,
    comunaOrigen: elementos.comunaOrigen.value,
    destino: elementos.destino.value
  };
}

function calcularResumen(datos) {
  const valorIda = obtenerValorIda(datos.tipoServicio, datos.comunaOrigen, datos.destino);
  const valorRegreso = obtenerValorRegreso(datos.tipoServicio, datos.destino, datos.comunaOrigen);
  const total = valorIda + valorRegreso;

  return { valorIda, valorRegreso, total };
}

function formatoPesos(valor) {
  return "$" + Number(valor).toLocaleString("es-CL");
}

function obtenerTextoServicio(valor) {
  if (valor === "ida") return "Solo ida";
  if (valor === "regreso") return "Solo regreso";
  if (valor === "ida_vuelta") return "Ida y regreso";
  return "No definido";
}

function recalcular() {
  const datos = obtenerDatosFormulario(elementos);
  const resumen = calcularResumen(datos);

  elementos.valorIda.textContent = formatoPesos(resumen.valorIda);
  elementos.valorRegreso.textContent = formatoPesos(resumen.valorRegreso);
  elementos.valorTotal.textContent = formatoPesos(resumen.total);
}

function construirMensajeWhatsApp() {
  const mensaje = "Hola! 👋 ¿A qué experiencia quieres que te llevemos? 🚗✨";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

elementos.tipoServicio.addEventListener("change", recalcular);
elementos.comunaOrigen.addEventListener("change", recalcular);
elementos.destino.addEventListener("change", recalcular);

if (elementos.whatsappBtn) {
  elementos.whatsappBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const url = construirMensajeWhatsApp();
    window.open(url, "_blank");
  });
}

recalcular();
