import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const GOOGLE_CLIENT_ID = process.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const JWT_SECRET = 'your_super_secret_jwt_key'; // ¡Cambia esto por una clave segura!

const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, 'http://localhost:5173/auth/callback.html');

export default async function handler(req, res) {
  // --- INICIO DEL LOG ---
  console.log('\n\n--- [LOG DE AUTENTICACIÓN] ---');
  console.log(`[${new Date().toLocaleTimeString()}] Petición recibida en /api/auth`);

  if (req.method !== 'POST') {
    console.log('[ERROR] Método no permitido. Se esperaba POST.');
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    res.end('Method Not Allowed');
    return;
  }

  try {
    const { code } = req.body;

    if (!code) {
      console.log('[ERROR] Código de autorización no encontrado en el cuerpo de la petición.');
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Authorization code is missing' }));
      return;
    }
    console.log('[INFO] Código de autorización recibido.');

    // Intercambia el código de autorización por tokens
    console.log('[INFO] Intercambiando código por token con Google...');
    const { tokens } = await client.getToken(code);
    const idToken = tokens.id_token;

    if (!idToken) {
      console.log('[ERROR] Google no devolvió un id_token.');
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Failed to retrieve ID token from Google' }));
      return;
    }
    console.log('[INFO] id_token de Google recibido con éxito.');

    // Verifica el token de ID de Google
    console.log('[INFO] Verificando id_token con Google...');
    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
        console.log('[ERROR] El payload del token de Google es inválido.');
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Invalid Google token' }));
        return;
    }

    // --- LOG DE ÉXITO ---
    console.log('✅ ¡ÉXITO! Token de Google verificado correctamente.');
    console.log(`   -> Usuario: ${payload.name}`);
    console.log(`   -> Email: ${payload.email}`);

    // Crea un token JWT para tu propia aplicación
    const appTokenPayload = {
      userId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };

    const token = jwt.sign(appTokenPayload, JWT_SECRET, { expiresIn: '1h' });
    console.log('[INFO] Creando y enviando token JWT para la aplicación.');

    // Envía el token JWT al cliente
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ token }));
    console.log('--- [FIN DEL LOG] ---\n');

  } catch (error) {
    console.error('🚨 --- [ERROR EN AUTENTICACIÓN] --- 🚨');
    console.error(error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
    console.log('--- [FIN DEL LOG CON ERROR] ---\n');
  }
}