const telefonoWhatsApp = "56965195972";

const preciosComunas = {
  "Santiago": 20390,
  "Providencia": 20390,
  "Ñuñoa": 20390,
  "Macul": 20390,
  "San Miguel": 20390,
  "Independencia": 20390,
  "Recoleta": 20390,
  "Estación Central": 20390,
  "Quinta Normal": 20390,
  "Aeropuerto de Santiago": 35690,
  "Terminal Alameda": 20390,
  "Terminal Sur": 20390,
  "Terminal San Borja": 22430,
  "Terminal Pajaritos": 25490,
  "La Florida": 25490,
  "Peñalolén": 25490,
  "San Joaquín": 25490,
  "La Cisterna": 25490,
  "Huechuraba": 25490,
  "Conchalí": 25490,
  "Lo Prado": 25490,
  "Cerrillos": 25490,
  "Pedro Aguirre Cerda": 25490,
  "El Bosque": 25490,
  "La Granja": 25490,
  "La Pintana": 25490,
  "San Ramón": 25490,
  "La Reina": 25490,
  "Las Condes": 25490,
  "Maipú": 30590,
  "Puente Alto": 30590,
  "Quilicura": 30590,
  "Pudahuel": 30590,
  "Pudahuel Norte": 30590,
  "San Bernardo": 30590,
  "Renca": 30590,
  "Cerro Navia": 30590,
  "Lo Espejo": 30590,
  "Vitacura": 30590,
  "Lo Barnechea": 30590,
  "Colina": 35690,
  "Lampa": 35690,
  "Padre Hurtado": 35690,
  "Peñaflor": 35690,
  "Talagante": 35690,
  "Buin": 35690,
  "Calera de Tango": 35690,
  "Paine": 35690,
  "Melipilla": 50990,
  "Curacaví": 50990,
  "Pirque": 50990,
  "San José de Maipo": 50990,
  "El Monte": 50990,
  "Isla de Maipo": 50990,
  "Til Til": 50990,
  "María Pinto": 50990,
  "San Pedro": 61190,
  "Alhué": 61190
};

// Las tarifas anteriores ya incluyen el aumento del 2%, redondeado a $10.
// No volver a aplicar el porcentaje al sumar ida y regreso.
function cotizacionCompleta() {
  const tipo = document.getElementById("tipoServicio").value;
  const ida = document.getElementById("comunaIda").value;
  const regreso = document.getElementById("comunaRegreso").value;
  const valida = comuna => Object.prototype.hasOwnProperty.call(preciosComunas, comuna);
  if (tipo === "ida") return valida(ida);
  if (tipo === "regreso") return valida(regreso);
  return tipo === "ida_vuelta" && valida(ida) && valida(regreso);
}

function protegerCotizacion() {
  ["btnReservar", "btnWhatsapp", "whatsappFloat"].forEach(id => {
    const boton = document.getElementById(id);
    if (!boton) return;
    boton.addEventListener("click", event => {
      if (cotizacionCompleta()) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      alert("Selecciona la comuna de cada trayecto para calcular el total. Para ida y vuelta debes indicar la comuna de salida y la de regreso.");
    }, true);
  });
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
