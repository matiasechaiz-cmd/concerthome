function llenarSelect(selectElement, items, placeholder = "Seleccione una opción") {
  selectElement.innerHTML = `<option value="">${placeholder}</option>`;

  items.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.value;
    option.textContent = item.label;
    selectElement.appendChild(option);
  });
}

function mostrarBloqueRegreso(tipoServicio, bloqueRegreso) {
  const debeMostrar = tipoServicio === "regreso" || tipoServicio === "ida_vuelta";
  bloqueRegreso.classList.toggle("hidden", !debeMostrar);
}

function actualizarResumenUI(resumen, elementos) {
  elementos.valorIda.textContent = formatoPesos(resumen.valorIda);
  elementos.valorRegreso.textContent = formatoPesos(resumen.valorRegreso);
  elementos.valorTotal.textContent = formatoPesos(resumen.total);
}

function obtenerDatosFormulario(elementos) {
  return {
    tipoServicio: elementos.tipoServicio.value,
    comunaOrigen: elementos.comunaOrigen.value,
    destino: elementos.destino.value,
    salidaRegreso: elementos.salidaRegreso.value,
    comunaRegreso: elementos.comunaRegreso.value
  };
}
