const express = require('express');
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const USERS_FILE = path.join(__dirname, 'data', 'users.json');
const DEMO_USER = 'aprendizsena';
const DEMO_PASSWORD = 'Sena2026*';

app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));

function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}
function makeUser(username, password) {
  const salt = crypto.randomBytes(16).toString('hex');
  return { username, salt, passwordHash: hashPassword(password, salt) };
}
async function readUsers() {
  try {
    return JSON.parse(await fs.readFile(USERS_FILE, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}
async function writeUsers(users) {
  await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}
function validCredentials(username, password) {
  return typeof username === 'string' && /^[a-zA-Z0-9_]{3,30}$/.test(username) &&
    typeof password === 'string' && password.length >= 8 && password.length <= 128;
}

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body || {};
  if (!validCredentials(username, password)) {
    return res.status(400).json({ message: 'El usuario debe tener entre 3 y 30 caracteres (letras, números o _) y la contraseña entre 8 y 128 caracteres.' });
  }
  try {
    const users = await readUsers();
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
      return res.status(409).json({ message: 'Este nombre de usuario ya está registrado.' });
    }
    users.push(makeUser(username, password));
    await writeUsers(users);
    return res.status(201).json({ message: '¡Registro exitoso! Ya puedes iniciar sesión.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'No fue posible completar el registro.' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'Ingresa el usuario y la contraseña.' });
  }
  try {
    const users = await readUsers();
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!user) return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
    const expected = Buffer.from(user.passwordHash, 'hex');
    const actual = Buffer.from(hashPassword(password, user.salt), 'hex');
    if (expected.length !== actual.length || !crypto.timingSafeEqual(expected, actual)) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
    }
    return res.json({ message: `¡Inicio de sesión exitoso! Bienvenido, ${user.username}.` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'No fue posible iniciar sesión.' });
  }
});

async function start() {
  const users = await readUsers();
  if (!users.some(u => u.username.toLowerCase() === DEMO_USER)) {
    users.push(makeUser(DEMO_USER, DEMO_PASSWORD));
    await writeUsers(users);
  }
  app.listen(PORT, () => console.log(`Aplicación disponible en http://localhost:${PORT}`));
}
start().catch(error => { console.error(error); process.exit(1); });
