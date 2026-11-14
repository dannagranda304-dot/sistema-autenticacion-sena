const form = document.querySelector('#authForm');
const feedback = document.querySelector('#feedback');
const loginTab = document.querySelector('#loginTab');
const registerTab = document.querySelector('#registerTab');
const submitButton = document.querySelector('#submitButton');
const passwordInput = document.querySelector('#password');
let mode = 'login';

function switchMode(nextMode) {
  mode = nextMode;
  const isLogin = mode === 'login';
  loginTab.classList.toggle('active', isLogin);
  registerTab.classList.toggle('active', !isLogin);
  loginTab.setAttribute('aria-selected', String(isLogin));
  registerTab.setAttribute('aria-selected', String(!isLogin));
  submitButton.textContent = isLogin ? 'Ingresar' : 'Crear cuenta';
  passwordInput.autocomplete = isLogin ? 'current-password' : 'new-password';
  feedback.textContent = '';
  feedback.className = 'feedback';
  form.reset();
}
loginTab.addEventListener('click', () => switchMode('login'));
registerTab.addEventListener('click', () => switchMode('register'));

form.addEventListener('submit', async event => {
  event.preventDefault();
  const username = document.querySelector('#username').value.trim();
  const password = passwordInput.value;
  feedback.textContent = 'Validando información...';
  feedback.className = 'feedback';
  submitButton.disabled = true;
  try {
    const response = await fetch(mode === 'login' ? '/api/login' : '/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const result = await response.json();
    feedback.textContent = result.message;
    feedback.className = `feedback ${response.ok ? 'success' : 'error'}`;
    if (response.ok) form.reset();
  } catch (error) {
    feedback.textContent = 'No se pudo conectar con el servidor. Intenta de nuevo.';
    feedback.className = 'feedback error';
  } finally {
    submitButton.disabled = false;
  }
});
