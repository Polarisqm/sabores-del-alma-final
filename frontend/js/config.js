// En local se usan los servidores del computador; en el sitio publicado, los servicios de Render.
const esLocal = window.location.protocol === "file:" ||
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

// Direcciones públicas del backend y de Ángel para que el sitio funcione desde otros dispositivos.
const API_URL = esLocal
  ? "http://localhost:3000/api"
  : "https://sabores-del-alma-api.onrender.com/api";
const IA_URL = esLocal
  ? "http://localhost:8000/api"
  : "https://sabores-del-alma-ia.onrender.com/api";

// Los servicios gratuitos pueden tardar al despertar; cancela las solicitudes que excedan ese margen.
async function fetchConTiempoLimite(url, opciones) {
  const controlador = new AbortController();
  const temporizador = setTimeout(function () { controlador.abort(); }, 70000);
  try {
    return await fetch(url, { ...opciones, signal: controlador.signal });
  } finally {
    clearTimeout(temporizador);
  }
}
