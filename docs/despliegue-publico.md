# Publicar Sabores del Alma

El proyecto tiene tres servicios: la web estática, la API de Node.js y Ángel (FastAPI). El archivo [`render.yaml`](../render.yaml) define los tres para Render. MongoDB Atlas sigue siendo la base de datos; no se crea ni se borra una base durante el despliegue.

## Dirección

La web está configurada para usar `https://sabores-del-alma.onrender.com`. Es un subdominio gratuito de Render, no un dominio `.com` comprado. Render solo asigna esa dirección al crear correctamente el servicio y si está disponible. Si Render asigna otro nombre, actualiza en `frontend/js/config.js` las URL del backend y de Ángel, y en `render.yaml` los orígenes `FRONTEND_URL`.

## Crear los servicios

1. Inicia sesión en [Render](https://dashboard.render.com/) y conecta tu cuenta de GitHub.
2. Selecciona **New > Blueprint** y elige `Polarisqm/sabores-del-alma-final`, rama `main`.
3. Revisa los tres servicios descritos por `render.yaml` y confirma su creación. No cambies sus nombres sin actualizar también las URL del frontend y la URL interna de API_URL para Ángel.
4. Cuando Render solicite los secretos, introduce la URI de MongoDB Atlas (`MONGODB_URI`) y la clave de Google AI Studio (`GEMINI_API_KEY`) directamente en Render. No las pongas en archivos versionados ni en mensajes. Si la contraseña de Atlas se compartió accidentalmente, cámbiala antes de guardarla en Render. Render generará `JWT_SECRETO`.
5. Espera a que los tres despliegues indiquen que están listos. Comprueba:
   - `https://sabores-del-alma-api.onrender.com/api/salud`
   - `https://sabores-del-alma-ia.onrender.com/api/salud`
   - `https://sabores-del-alma.onrender.com`
6. La API debe poder conectarse a MongoDB Atlas y Ángel debe poder consultar la API. Si Atlas rechaza la conexión:
   - En Render, abre el servicio `sabores-del-alma-api`, selecciona **Connect > Outbound** y copia los rangos de IP de salida que aparecen allí.
   - En Atlas, añade esos rangos en **Network Access > IP Access List**. La IP de tu computador no autoriza a Render, porque el backend se conecta desde el servidor alojado.
   - Revisa que `MONGODB_URI` en Render use el usuario, contraseña y nombre de base correctos. Si la contraseña contiene símbolos especiales, codifícalos para la URI.

   No compartas la URI ni abras el acceso de Atlas a todas las IP (`0.0.0.0/0`) como solución rápida.

## Límites del plan gratuito

Render puede suspender los servicios web gratuitos tras un periodo sin tráfico. La primera visita posterior puede tardar aproximadamente un minuto mientras se reactivan. Es adecuado para una demostración o proyecto personal, pero no ofrece disponibilidad continua. La web estática usa CDN y permanece accesible; las peticiones a la API y a Ángel pueden despertar sus servicios.

## Dominio propio

Para usar una dirección como `saboresdelalma.com`, primero se debe registrar y pagar ese dominio con un proveedor. Después se agrega a la configuración del sitio en Render y se configuran los registros DNS indicados por Render. No se puede reservar ese nombre solo desde el código.
