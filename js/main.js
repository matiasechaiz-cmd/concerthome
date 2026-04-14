document.addEventListener("DOMContentLoaded", () => {
  const WHATSAPP_NUMBER = "56954190451";

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

  function mostrarBloqueRegreso(tipoServicio) {
    if (!elementos.bloqueRegreso) return;

    const mostrar =
      tipoServicio === "regreso" || tipoServicio === "ida_vuelta";

    if (mostrar) {
      elementos.bloqueRegreso.classList.remove("hidden");
    } else {
      elementos.bloqueRegreso.classList.add("hidden");
    }
  }

  function obtenerDatosFormulario() {
    return {
      tipoServicio: elementos.tipoServicio?.value || "",
      comunaOrigen: elementos.comunaOrigen?.value || "",
      destino: elementos.destino?.value || "",
      salidaRegreso: elementos.salidaRegreso?.value || "",
      comunaRegreso: elementos.comunaRegreso?.value || "",
      direccionOrigen: elementos.direccionOrigen?.value || "",
      direccionRegreso: elementos.direccionRegreso?.value || ""
    };
  }

  function recalcular() {
    const datos = obtenerDatosFormulario();

    mostrarBloqueRegreso(datos.tipoServicio);

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
  llenarSelect(elementos.salidaRegreso, RECINTOS, "Seleccione recinto");

  elementos.tipoServicio?.addEventListener("change", recalcular);
  elementos.comunaOrigen?.addEventListener("change", recalcular);
  elementos.destino?.addEventListener("change", recalcular);
  elementos.salidaRegreso?.addEventListener("change", recalcular);
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
