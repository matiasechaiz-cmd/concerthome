function formatoPesos(valor) {
  return "$" + Number(valor).toLocaleString("es-CL");
}

function obtenerValorIda(tipoServicio, comunaOrigen, destino) {
  if (!(tipoServicio === "ida" || tipoServicio === "ida_vuelta")) {
    return 0;
  }

  if (!comunaOrigen || !destino) {
    return 0;
  }

  if (!TARIFAS_IDA[comunaOrigen]) {
    return 0;
  }

  return TARIFAS_IDA[comunaOrigen][destino] || 0;
}

function obtenerValorRegreso(tipoServicio, salidaRegreso, comunaRegreso) {
  if (!(tipoServicio === "regreso" || tipoServicio === "ida_vuelta")) {
    return 0;
  }

  if (!salidaRegreso || !comunaRegreso) {
    return 0;
  }

  if (!TARIFAS_REGRESO[salidaRegreso]) {
    return 0;
  }

  return TARIFAS_REGRESO[salidaRegreso][comunaRegreso] || 0;
}

function calcularResumen(dataFormulario) {
  const valorIda = obtenerValorIda(
    dataFormulario.tipoServicio,
    dataFormulario.comunaOrigen,
    dataFormulario.destino
  );

  const valorRegreso = obtenerValorRegreso(
    dataFormulario.tipoServicio,
    dataFormulario.salidaRegreso,
    dataFormulario.comunaRegreso
  );

  return {
    valorIda,
    valorRegreso,
    total: valorIda + valorRegreso
  };
}
