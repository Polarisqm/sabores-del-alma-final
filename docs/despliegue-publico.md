# Publicar Sabores del Alma

El proyecto tiene tres servicios: la web estática, la API de Node.js y Ángel (FastAPI). El archivo [`render.yaml`](../render.yaml) define los tres para Render. MongoDB Atlas sigue siendo la base de datos; no se crea ni se borra una base durante el despliegue.

## Dirección

La web está configurada para usar `https://sabores-del-alma.onrender.com`. Es un subdominio gratuito de Render, no un dominio `.com` comprado. Render solo asigna esa dirección al crear correctamente el servicio y si está disponible. Si Render asigna otro nombre, actualiza en `frontend/js/config.js` las URL del backend y de Ángel, y en `render.yaml` los orígenes `FRONTEND_URL`.

## Crear los servicios

1. Inicia sesión en [Render](https://dashboard.render.com/) y conecta tu cuenta de GitHub.
2. Selecciona **New > Blueprint** y elige `Polarisqm/sabores-del-alma-final`, rama `main`.
3. Revisa los tres servicios descritos por `render.yaml` y confirma su creación. No cambies sus nombres sin actualizar también las URL del frontend y la URL interna de API_URL para Ángel.
4. Cuando Render solicite los secretos, introduce la URI de MongoDB Atlas (`MONGODB_URI`) y la clave de Google AI Studio (`GEMINI_API_KEY`) directamente en Render. No las pongas en archivos versionados ni en mensajes. Render generará `JWT_SECRETO`.
5. Espera a que los tres despliegues indiquen que están listos. Comprueba:
   - `https://sabores-del-alma-api.onrender.com/api/salud`
   - `https://sabores-del-alma-ia.onrender.com/api/salud`
   - `https://sabores-del-alma.onrender.com`
6. La API debe poder conectarse a MongoDB Atlas y Ángel debe poder consultar la API. Si Atlas rechaza la conexión desde Render, revisa su lista de acceso de red y sus credenciales. No compartas la URI de conexión.

## Límites del plan gratuito

Render puede suspender los servicios web gratuitos tras un periodo sin tráfico. La primera visita posterior puede tardar aproximadamente un minuto mientras se reactivan. Es adecuado para una demostración o proyecto personal, pero no ofrece disponibilidad continua. La web estática usa CDN y permanece accesible; las peticiones a la API y a Ángel pueden despertar sus servicios.

## Dominio propio

Para usar una dirección como `saboresdelalma.com`, primero se debe registrar y pagar ese dominio con un proveedor. Después se agrega a la configuración del sitio en Render y se configuran los registros DNS indicados por Render. No se puede reservar ese nombre solo desde el código.
