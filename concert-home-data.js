const telefonoWhatsApp = "56965195972";

const preciosComunas = {
  "Santiago": 23380,
  "Providencia": 23380,
  "Ñuñoa": 23380,
  "Macul": 23380,
  "San Miguel": 23380,
  "Independencia": 23380,
  "Recoleta": 23380,
  "Estación Central": 23380,
  "Quinta Normal": 23380,
  "Aeropuerto de Santiago": 38680,
  "Terminal Alameda": 23380,
  "Terminal Sur": 23380,
  "Terminal San Borja": 25420,
  "Terminal Pajaritos": 28480,
  "La Florida": 28480,
  "Peñalolén": 28480,
  "San Joaquín": 28480,
  "La Cisterna": 28480,
  "Huechuraba": 28480,
  "Conchalí": 28480,
  "Lo Prado": 28480,
  "Cerrillos": 28480,
  "Pedro Aguirre Cerda": 28480,
  "El Bosque": 28480,
  "La Granja": 28480,
  "La Pintana": 28480,
  "San Ramón": 28480,
  "La Reina": 28480,
  "Las Condes": 28480,
  "Maipú": 33580,
  "Puente Alto": 33580,
  "Quilicura": 33580,
  "Pudahuel": 33580,
  "Pudahuel Norte": 33580,
  "San Bernardo": 33580,
  "Renca": 33580,
  "Cerro Navia": 33580,
  "Lo Espejo": 33580,
  "Vitacura": 33580,
  "Lo Barnechea": 33580,
  "Colina": 38680,
  "Lampa": 38680,
  "Padre Hurtado": 38680,
  "Peñaflor": 38680,
  "Talagante": 38680,
  "Buin": 38680,
  "Calera de Tango": 38680,
  "Paine": 38680,
  "Melipilla": 53980,
  "Curacaví": 53980,
  "Pirque": 53980,
  "San José de Maipo": 53980,
  "El Monte": 53980,
  "Isla de Maipo": 53980,
  "Til Til": 53980,
  "María Pinto": 53980,
  "San Pedro": 64180,
  "Alhué": 64180
};

// Las tarifas incluyen un aumento adicional de $2.990 por cada trayecto.
// Ida y vuelta suma ambos trayectos ya actualizados; no aplica un tercer recargo.
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
