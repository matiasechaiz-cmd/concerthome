document.addEventListener("DOMContentLoaded", () => {
  const elementos = {
    form: document.getElementById("reservaForm"),
    tipoServicio: document.getElementById("tipoServicio"),
    comunaOrigen: document.getElementById("comunaOrigen"),
    destino: document.getElementById("destino"),
    salidaRegreso: document.getElementById("salidaRegreso"),
    comunaRegreso: document.getElementById("comunaRegreso"),
    bloqueRegreso: document.getElementById("bloqueRegreso"),
    valorIda: document.getElementById("valorIda"),
    valorRegreso: document.getElementById("valorRegreso"),
    valorTotal: document.getElementById("valorTotal")
  };

  llenarSelect(elementos.comunaOrigen, COMUNAS, "Seleccione comuna");
  llenarSelect(elementos.comunaRegreso, COMUNAS, "Seleccione comuna");
  llenarSelect(elementos.destino, RECINTOS, "Seleccione recinto");
  llenarSelect(elementos.salidaRegreso, RECINTOS, "Seleccione recinto");

  function recalcular() {
    mostrarBloqueRegreso(elementos.tipoServicio.value, elementos.bloqueRegreso);

    if (elementos.destino.value && !elementos.salidaRegreso.value) {
      elementos.salidaRegreso.value = elementos.destino.value;
    }

    const datos = obtenerDatosFormulario(elementos);
    const resumen = calcularResumen(datos);
    actualizarResumenUI(resumen, elementos);
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
      `Tipo de servicio: ${datos.tipoServicio}\n` +
      `Valor ida: ${formatoPesos(resumen.valorIda)}\n` +
      `Valor regreso: ${formatoPesos(resumen.valorRegreso)}\n` +
      `Total: ${formatoPesos(resumen.total)}`
    );
  });

  recalcular();
});
