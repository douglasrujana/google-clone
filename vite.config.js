import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import url from 'url';

// Plugin final para manejar las rutas de la API
function apiPlugin() {
  return {
    name: 'api-plugin',
    config(config, { mode }) {
      // Carga las variables de entorno para que estén disponibles en el servidor
      const env = loadEnv(mode, process.cwd(), '');
      process.env = { ...process.env, ...env };
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url.startsWith('/api/')) {
          const __filename = url.fileURLToPath(import.meta.url);
          const __dirname = path.dirname(__filename);
          const filePath = path.join(__dirname, req.url) + '.js';

          try {
            // --- ¡LA CORRECCIÓN! ---
            // Convertimos la ruta de Windows (C:\...) a una URL de archivo (file:///C:/...)
            // que el import() de ESM sí entiende.
            const fileUrl = url.pathToFileURL(filePath).href;

            // Importamos dinámicamente el manejador de la API usando la URL corregida
            const { default: handler } = await import(fileUrl + `?t=${Date.now()}`);

            // Parseamos el cuerpo de la petición POST
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', async () => {
              if (body) { req.body = JSON.parse(body); }
              await handler(req, res);
            });
          } catch (error) {
            console.error(`Error en la API para ${req.url}:`, error);
            res.statusCode = 500;
            res.end('Internal Server Error');
          }
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [apiPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/unittest/**/*.spec.js'],
  },
});