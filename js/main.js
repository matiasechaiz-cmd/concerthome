document.addEventListener("DOMContentLoaded", () => {
  const WHATSAPP_NUMBER = "56954190451";

  const elementos = {
    form: document.getElementById("reservaForm"),
    tipoServicio: document.getElementById("tipoServicio"),

    salidaBlock: document.getElementById("salidaBlock"),
    destinoBlock: document.getElementById("destinoBlock"),
    regresoBlock: document.getElementById("bloqueRegreso"),

    tituloSalida: document.getElementById("tituloSalida"),
    tituloDestino: document.getElementById("tituloDestino"),
    tituloRegreso: document.getElementById("tituloRegreso"),

    labelComunaOrigen: document.getElementById("labelComunaOrigen"),
    labelDireccionOrigen: document.getElementById("labelDireccionOrigen"),
    labelDestino: document.getElementById("labelDestino"),
    labelComunaRegreso: document.getElementById("labelComunaRegreso"),
    labelDireccionRegreso: document.getElementById("labelDireccionRegreso"),

    comunaOrigen: document.getElementById("comunaOrigen"),
    direccionOrigen: document.getElementById("direccionOrigen"),
    destino: document.getElementById("destino"),
    comunaRegreso: document.getElementById("comunaRegreso"),
    direccionRegreso: document.getElementById("direccionRegreso"),

    valorIda: document.getElementById("valorIda"),
    valorRegreso: document.getElementById("valorRegreso"),
    valorTotal: document.getElementById("valorTotal"),

    whatsappBtn: document.getElementById("whatsappBtn")
  };

  function llenarSelect(selectElement, items, placeholder) {
    if (!selectElement) return;

    selectElement.innerHTML = `<option value="">${placeholder}</option>`;

    items.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.value;
      option.textContent = item.label;
      selectElement.appendChild(option);
    });
  }

  function obtenerDatosFormulario() {
    return {
      tipoServicio: elementos.tipoServicio?.value || "",
      comunaOrigen: elementos.comunaOrigen?.value || "",
      destino: elementos.destino?.value || "",
      salidaRegreso: elementos.destino?.value || "",
      comunaRegreso: elementos.comunaRegreso?.value || "",
      direccionOrigen: elementos.direccionOrigen?.value || "",
      direccionRegreso: elementos.direccionRegreso?.value || ""
    };
  }

  function configurarRequeridos(tipoServicio) {
    if (!elementos.comunaOrigen || !elementos.direccionOrigen || !elementos.destino || !elementos.comunaRegreso || !elementos.direccionRegreso) {
      return;
    }

    if (tipoServicio === "ida") {
      elementos.comunaOrigen.required = true;
      elementos.direccionOrigen.required = true;
      elementos.destino.required = true;

      elementos.comunaRegreso.required = false;
      elementos.direccionRegreso.required = false;
    } else if (tipoServicio === "regreso") {
      elementos.comunaOrigen.required = false;
      elementos.direccionOrigen.required = false;
      elementos.destino.required = true;

      elementos.comunaRegreso.required = true;
      elementos.direccionRegreso.required = true;
    } else if (tipoServicio === "ida_vuelta") {
      elementos.comunaOrigen.required = true;
      elementos.direccionOrigen.required = true;
      elementos.destino.required = true;

      elementos.comunaRegreso.required = true;
      elementos.direccionRegreso.required = true;
    } else {
      elementos.comunaOrigen.required = false;
      elementos.direccionOrigen.required = false;
      elementos.destino.required = false;
      elementos.comunaRegreso.required = false;
      elementos.direccionRegreso.required = false;
    }
  }

  function actualizarFormularioSegunServicio() {
    const tipoServicio = elementos.tipoServicio?.value || "";

    configurarRequeridos(tipoServicio);

    if (!tipoServicio) {
      elementos.salidaBlock?.classList.remove("hidden");
      elementos.destinoBlock?.classList.remove("hidden");
      elementos.regresoBlock?.classList.add("hidden");

      elementos.tituloSalida.textContent = "Lugar de salida";
      elementos.tituloDestino.textContent = "Estadio o recinto";
      elementos.tituloRegreso.textContent = "Lugar de regreso";

      elementos.labelComunaOrigen.textContent = "Comuna de salida";
      elementos.labelDireccionOrigen.textContent = "Dirección exacta de salida";
      elementos.labelDestino.textContent = "Estadio o recinto";
      elementos.labelComunaRegreso.textContent = "Comuna de regreso";
      elementos.labelDireccionRegreso.textContent = "Dirección exacta de regreso";
      return;
    }

    if (tipoServicio === "ida") {
      elementos.salidaBlock?.classList.remove("hidden");
      elementos.destinoBlock?.classList.remove("hidden");
      elementos.regresoBlock?.classList.add("hidden");

      elementos.tituloSalida.textContent = "Lugar de salida";
      elementos.tituloDestino.textContent = "Estadio o recinto";

      elementos.labelComunaOrigen.textContent = "Comuna de salida";
      elementos.labelDireccionOrigen.textContent = "Dirección exacta de salida";
      elementos.labelDestino.textContent = "Estadio o recinto";
      return;
    }

    if (tipoServicio === "regreso") {
      elementos.salidaBlock?.classList.add("hidden");
      elementos.destinoBlock?.classList.remove("hidden");
      elementos.regresoBlock?.classList.remove("hidden");

      elementos.tituloDestino.textContent = "Salida del regreso";
      elementos.tituloRegreso.textContent = "Lugar de regreso";

      elementos.labelDestino.textContent = "Estadio o recinto de salida";
      elementos.labelComunaRegreso.textContent = "Comuna de regreso";
      elementos.labelDireccionRegreso.textContent = "Dirección exacta de regreso";
      return;
    }

    if (tipoServicio === "ida_vuelta") {
      elementos.salidaBlock?.classList.remove("hidden");
      elementos.destinoBlock?.classList.remove("hidden");
      elementos.regresoBlock?.classList.remove("hidden");

      elementos.tituloSalida.textContent = "Lugar de salida";
      elementos.tituloDestino.textContent = "Estadio o recinto";
      elementos.tituloRegreso.textContent = "Lugar de regreso";

      elementos.labelComunaOrigen.textContent = "Comuna de salida";
      elementos.labelDireccionOrigen.textContent = "Dirección exacta de salida";
      elementos.labelDestino.textContent = "Estadio o recinto";
      elementos.labelComunaRegreso.textContent = "Comuna de regreso";
      elementos.labelDireccionRegreso.textContent = "Dirección exacta de regreso";
    }
  }

  function recalcular() {
    actualizarFormularioSegunServicio();

    const datos = obtenerDatosFormulario();
    const resumen = calcularResumen(datos);

    if (elementos.valorIda) {
      elementos.valorIda.textContent = formatoPesos(resumen.valorIda);
    }

    if (elementos.valorRegreso) {
      elementos.valorRegreso.textContent = formatoPesos(resumen.valorRegreso);
    }

    if (elementos.valorTotal) {
      elementos.valorTotal.textContent = formatoPesos(resumen.total);
    }
  }

  function construirMensajeWhatsApp() {
    const mensaje = "Hola! 👋 ¿A qué experiencia quieres que te llevemos? 🚗✨";
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
  }

  llenarSelect(elementos.comunaOrigen, COMUNAS, "Seleccione comuna");
  llenarSelect(elementos.comunaRegreso, COMUNAS, "Seleccione comuna");
  llenarSelect(elementos.destino, RECINTOS, "Seleccione recinto");

  elementos.tipoServicio?.addEventListener("change", recalcular);
  elementos.comunaOrigen?.addEventListener("change", recalcular);
  elementos.destino?.addEventListener("change", recalcular);
  elementos.comunaRegreso?.addEventListener("change", recalcular);

  elementos.form?.addEventListener("submit", (event) => {
    event.preventDefault();
    recalcular();
  });

  if (elementos.whatsappBtn) {
    elementos.whatsappBtn.addEventListener("click", (event) => {
      event.preventDefault();
      window.open(construirMensajeWhatsApp(), "_blank");
    });
  }

  recalcular();
});
