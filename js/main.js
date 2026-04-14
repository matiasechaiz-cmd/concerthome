document.addEventListener("DOMContentLoaded", () => {
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

  const WHATSAPP_NUMBER = "56954190451";

  llenarSelect(elementos.comunaOrigen, COMUNAS, "Seleccione comuna");
  llenarSelect(elementos.comunaRegreso, COMUNAS, "Seleccione comuna");
  llenarSelect(elementos.destino, RECINTOS, "Seleccione recinto");
  llenarSelect(elementos.salidaRegreso, RECINTOS, "Seleccione recinto");

  function recalcular() {
    mostrarBloqueRegreso(elementos.tipoServicio.value, elementos.bloqueRegreso);

    if (elementos.destino.value && !elementos.salidaRegreso.value) {
      elementos.salidaRegreso.value = elementos.destino.value;
    }

    if (
      (elementos.tipoServicio.value === "ida_vuelta" || elementos.tipoServicio.value === "regreso") &&
      elementos.comunaOrigen.value &&
      !elementos.comunaRegreso.value
    ) {
      elementos.comunaRegreso.value = elementos.comunaOrigen.value;
    }

    const datos = obtenerDatosFormulario(elementos);
    const resumen = calcularResumen(datos);
    actualizarResumenUI(resumen, elementos);
  }

  function obtenerTextoServicio(valor) {
    if (valor === "ida") return "Solo ida";
    if (valor === "regreso") return "Solo regreso";
    if (valor === "ida_vuelta") return "Ida y regreso";
    return "No definido";
  }

  function obtenerLabelDesdeSelect(select) {
    return select.options[select.selectedIndex]?.text || "";
  }

  function construirMensajeWhatsApp() {
    const datos = obtenerDatosFormulario(elementos);
    const resumen = calcularResumen(datos);

    const tipoServicio = obtenerTextoServicio(datos.tipoServicio);
    const comunaOrigen = obtenerLabelDesdeSelect(elementos.comunaOrigen) || "No indicada";
    const destino = obtenerLabelDesdeSelect(elementos.destino) || "No indicado";
    const salidaRegreso = obtenerLabelDesdeSelect(elementos.salidaRegreso) || destino || "No indicado";
    const comunaRegreso = obtenerLabelDesdeSelect(elementos.comunaRegreso) || comunaOrigen || "No indicada";
    const direccionOrigen = elementos.direccionOrigen.value.trim() || "No indicada";
    const direccionRegreso = elementos.direccionRegreso.value.trim() || "No indicada";

    let mensaje = `Hola, quiero cotizar/reservar un traslado.%0A%0A`;
    mensaje += `Tipo de servicio: ${tipoServicio}%0A`;
    mensaje += `Comuna de origen: ${comunaOrigen}%0A`;
    mensaje += `Dirección de origen: ${direccionOrigen}%0A`;
    mensaje += `Recinto de destino: ${destino}%0A`;

    if (datos.tipoServicio === "regreso" || datos.tipoServicio === "ida_vuelta") {
      mensaje += `Salida regreso: ${salidaRegreso}%0A`;
      mensaje += `Comuna regreso: ${comunaRegreso}%0A`;
      mensaje += `Dirección regreso: ${direccionRegreso}%0A`;
    }

    mensaje += `%0AValor ida: ${encodeURIComponent(formatoPesos(resumen.valorIda))}%0A`;
    mensaje += `Valor regreso: ${encodeURIComponent(formatoPesos(resumen.valorRegreso))}%0A`;
    mensaje += `Total: ${encodeURIComponent(formatoPesos(resumen.total))}`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`;
  }

  elementos.tipoServicio.addEventListener("change", recalcular);
  elementos.comunaOrigen.addEventListener("change", recalcular);
  elementos.destino.addEventListener("change", recalcular);
  elementos.salidaRegreso.addEventListener("change", recalcular);
  elementos.comunaRegreso.addEventListener("change", recalcular);

  elementos.form.addEventListener("submit", (event) => {
    event.preventDefault();

    const datos = obtenerDatosFormulario(elementos);
    const resumen = calcularResumen(datos);

    alert(
      `Reserva registrada:\n\n` +
      `Tipo de servicio: ${obtenerTextoServicio(datos.tipoServicio)}\n` +
      `Valor ida: ${formatoPesos(resumen.valorIda)}\n` +
      `Valor regreso: ${formatoPesos(resumen.valorRegreso)}\n` +
      `Total: ${formatoPesos(resumen.total)}`
    );
  });

  if (elementos.whatsappBtn) {
    elementos.whatsappBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const url = construirMensajeWhatsApp();
      window.open(url, "_blank");
    });
  }

  recalcular();
});
