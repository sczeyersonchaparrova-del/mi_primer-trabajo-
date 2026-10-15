# Mi agenda ágil · Kanban con Supabase

Una miniapp responsive con **HTML, CSS, JavaScript y supabase-js v2**. Se publica como web estática, sin instalar Node ni crear un servidor propio.

## Archivos

- `index.html`: pantalla de registro, inicio de sesión y tablero Kanban.
- `config.js`: URL y clave pública de tu proyecto de Supabase.
- `supabase_setup.sql`: tabla `tareas`, índices y políticas de seguridad RLS.

## 1. Crea tu proyecto en Supabase

1. Entra a https://supabase.com/dashboard y crea un proyecto.
2. Abre **SQL Editor → New query**.
3. Copia todo el contenido de `supabase_setup.sql` y ejecuta **Run**.
4. Verifica en **Table Editor** que existe `public.tareas`.
5. En **Authentication → Sign In / Providers → Email**, habilita el inicio de sesión con correo.

**Importante para cuentas nuevas:** si mantienes la confirmación de email, el usuario debe confirmar el correo antes de entrar. El SMTP predeterminado de Supabase tiene restricciones y no envía a direcciones fuera del equipo del proyecto. Para un despliegue real con alumnos o cualquier público, configura **Authentication → SMTP Settings** con un proveedor de email compatible. Para pruebas internas, usa direcciones autorizadas. No recomendamos desactivar la verificación de correo en producción.

## 2. Configura `config.js`

En el dashboard de Supabase, abre **Connect** o **Project Settings → API Keys** para conseguir estos datos:

```js
window.APP_CONFIG = Object.freeze({
  SUPABASE_URL: "https://tu-proyecto.supabase.co",
  SUPABASE_PUBLISHABLE_KEY: "sb_publishable_TU_CLAVE_PUBLICA"
});
```

Puedes usar la antigua clave `anon` si tu proyecto aún no tiene la publishable key. **Nunca uses `sb_secret_...` ni `service_role` en frontend**. La clave pública puede estar en el navegador porque el SQL activa RLS para aislar los datos de cada usuario.

## 3. Prueba en tu computadora

Coloca los tres archivos en la misma carpeta. Abre el directorio con VS Code y usa Live Server o ejecuta:

```bash
python -m http.server 5500
```

Abre http://localhost:5500. Puedes crear una cuenta, confirmar el email si corresponde, entrar y añadir tareas. La app empieza vacía porque **no inventa datos de prueba**. Para probar, crea la tarea «Terminar mi tarea de clase», con prioridad «Alta», muévela de «Por hacer» a «Haciendo» y luego a «Realizadas».

## 4. Publica gratis desde GitHub y Vercel

1. Crea un repositorio nuevo en GitHub y sube `index.html`, `config.js` y `supabase_setup.sql` (puedes incluir también este README).
2. En https://vercel.com, entra con GitHub, selecciona **Add New → Project** e importa el repositorio.
3. Usa **Framework Preset: Other**. No se necesita comando de compilación. El directorio raíz es `.`.
4. Pulsa **Deploy**. Tu página tendrá una URL similar a `https://mi-agenda-agil.vercel.app`.
5. En Supabase, abre **Authentication → URL Configuration**: configura **Site URL** con la URL final de Vercel y registra esa URL en **Redirect URLs**. Durante desarrollo puedes agregar `http://localhost:5500/**`.
6. Si cambias los archivos, vuelve a subirlos a GitHub y Vercel actualizará la página.

## 5. Comprueba la sincronización

1. En una computadora, inicia sesión y crea una tarea.
2. En otro dispositivo, abre la misma URL de Vercel e ingresa con **la misma cuenta**.
3. Verás la tarea descargada desde Supabase. Si dejas las dos sesiones abiertas, pulsa **Actualizar** (la app también se actualiza al volver a la pestaña).
4. Inicia sesión con otro correo distinto: ese usuario no verá las tareas de la primera cuenta, gracias a RLS.

## Funciones incluidas

- Registro por correo + contraseña, inicio y cierre de sesión.
- Sesión persistente en el navegador (gestionada por supabase-js).
- Crear tareas con título (2–120 caracteres) y prioridad **Alta/Media/Baja**.
- Columnas **Por hacer → Haciendo → Realizadas**.
- Mover tareas arrastrándolas o con los botones de flecha (útiles en móviles).
- Eliminar una tarea con confirmación.
- Contadores, porcentaje de progreso y recarga de tareas.
- Responsive y con reglas de seguridad que limitan cada usuario a sus tareas.

## Aclaraciones

- Los datos se guardan **en Supabase**, no en `localStorage`. Supabase Auth puede guardar localmente **la sesión de inicio de sesión**, no las tareas.
- Es necesaria una conexión a internet para iniciar sesión o modificar las tareas.
- Las tareas de otros dispositivos se actualizan al entrar, al pulsar «Actualizar» o al volver a la pestaña; esta versión no requiere habilitar Supabase Realtime.
- No se incluyen claves reales porque pertenecen a tu proyecto personal de Supabase.

### Referencias oficiales

- https://supabase.com/docs/reference/javascript/installing
- https://supabase.com/docs/reference/javascript/auth-signup
- https://supabase.com/docs/guides/database/postgres/row-level-security
- https://supabase.com/docs/guides/auth/auth-smtp
- https://supabase.com/docs/guides/auth/redirect-urls
