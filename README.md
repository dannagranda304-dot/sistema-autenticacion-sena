# Sistema de Registro y Autenticación de Usuarios

**Evidencia:** GA7-220501096-AA5-EV01 – Diseño y desarrollo de servicios web – caso  
**Programa:** Análisis y Desarrollo de Software (ADSO)  
**Modalidad:** Trabajo individual

## Descripción

En este proyecto desarrollé una aplicación web sencilla que permite registrar usuarios e iniciar sesión mediante un nombre de usuario y una contraseña. La idea es comprobar que los datos ingresados sean correctos y mostrar un mensaje claro según el resultado de la validación.

Si las credenciales coinciden con las de un usuario registrado, el sistema muestra un mensaje de éxito. En caso contrario, informa que el usuario o la contraseña son incorrectos. También se evita registrar dos veces el mismo nombre de usuario.

## Tecnologías utilizadas

- HTML: estructura de la página.
- CSS: diseño y presentación visual.
- JavaScript: interacción de los formularios y peticiones al servidor.
- Node.js y Express: desarrollo de los servicios web de registro y autenticación.
- Archivo JSON local: almacenamiento de usuarios para esta demostración académica.

## Credenciales de prueba para el instructor

**Usuario:** `aprendizsena`  
**Contraseña:** `Sena2026*`

Estas credenciales son exclusivamente de demostración y se crean automáticamente la primera vez que se inicia la aplicación. No se deben utilizar como credenciales reales.

## Cómo ejecutar el proyecto

1. Instalar Node.js (versión 18 o superior).
2. Descargar o clonar el repositorio.
3. Abrir una terminal en la carpeta del proyecto.
4. Ejecutar `npm install` para instalar las dependencias.
5. Ejecutar `npm start` para iniciar el servidor.
6. Abrir `http://localhost:3000` en el navegador.

**Importante:** el proyecto debe ejecutarse con Node.js; abrir `index.html` directamente o ver el repositorio en GitHub no ejecuta el servidor.

## Funcionalidades y pruebas

| Prueba | Resultado esperado |
| --- | --- |
| Iniciar sesión con `aprendizsena` y `Sena2026*` | Mensaje de inicio de sesión exitoso. |
| Iniciar sesión con una contraseña incorrecta | Mensaje de usuario o contraseña incorrectos. |
| Registrar un usuario nuevo con contraseña de al menos 8 caracteres | Mensaje de registro exitoso. |
| Iniciar sesión con el usuario recién registrado | Mensaje de inicio de sesión exitoso. |
| Registrar un usuario que ya existe | Mensaje de usuario ya registrado. |

Los nombres de usuario admiten entre 3 y 30 caracteres: letras, números y guion bajo. Las contraseñas deben tener entre 8 y 128 caracteres.

## Servicios web

- `POST /api/register`: recibe `username` y `password`, registra al usuario y responde con un mensaje de éxito o error.
- `POST /api/login`: recibe `username` y `password`, comprueba las credenciales y responde con un mensaje de éxito o error.

Ejemplo de datos enviados:

```json
{
  "username": "aprendizsena",
  "password": "Sena2026*"
}
```

## Organización del proyecto

- `server.js`: lógica del servidor, registro y validación de credenciales.
- `public/index.html`: estructura de la interfaz.
- `public/styles.css`: estilos visuales.
- `public/app.js`: conexión entre formularios y servicios web.
- `package.json`: configuración y dependencias.
- `data/`: almacenamiento local de usuarios; se genera automáticamente y no se publica en GitHub.

## Consideraciones

Las contraseñas de los usuarios registrados se almacenan como hashes con sal utilizando `scrypt`, no como texto plano. Este proyecto está pensado como una demostración académica: no incorpora sesiones persistentes, recuperación de contraseñas, base de datos de producción ni protección contra intentos repetidos de acceso. Para un entorno real se necesitarían controles adicionales.

## Conclusión

Con esta actividad puse en práctica la creación de formularios y la comunicación entre una página web y un servidor. Además, comprendí cómo validar los datos de acceso y mostrar mensajes que ayudan al usuario a identificar si el proceso se realizó correctamente o si debe corregir su información.
