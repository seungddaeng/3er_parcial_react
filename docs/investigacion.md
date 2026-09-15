# Investigación técnica

## Pruebas E2E con Playwright

Para las pruebas end-to-end se eligió **Playwright**. La principal razón fue que permite automatizar Chrome o Chromium y utilizar las mismas pruebas tanto de forma automática como visual.

Esto sirve para dos partes del proyecto:

- ejecutar las pruebas sin abrir el navegador dentro de GitHub Actions;
- ejecutar las pruebas con Chrome visible durante la defensa.

La prueba preparada para Plushie Panic comprueba algunos puntos importantes del funcionamiento general.

Primero verifica que el backend responda correctamente en:

```text
/api/estado
```

Después abre la página principal del juego y comprueba que la pantalla inicial cargue correctamente.

Luego inicia una partida y revisa que el estado inicial se muestre en pantalla.

También se prueba una acción inválida para comprobar que el backend rechace el movimiento y que React muestre el mensaje correspondiente.

Finalmente se realiza un movimiento válido y se verifica que el estado de la partida cambie.

De esta forma la prueba no solamente revisa la interfaz, sino también la comunicación entre React y Express.

## Comandos utilizados

Para ejecutar las pruebas E2E:

```bash
npm run test:e2e
```

Para ejecutar la prueba con el navegador visible:

```bash
npm run test:headed --prefix e2e
```

Para probar directamente la aplicación publicada en Render desde PowerShell:

```powershell
$env:BASE_URL="https://lil-alienzzz-plushie-panic.onrender.com"
npm run test:headed --prefix e2e
```

La referencia principal utilizada para revisar los comandos y la configuración de Playwright fue:

- Playwright Test CLI: https://playwright.dev/docs/test-cli

## GitHub Actions

El repositorio incluye automatización para tres tareas diferentes:

- validar frontend y backend mediante lint;
- ejecutar las pruebas E2E;
- realizar el deployment de la aplicación.

La intención es que el proyecto pueda pasar por las validaciones necesarias antes de publicar una nueva versión.

Esto también permite evitar tener que copiar archivos manualmente al servidor cada vez que se realiza un cambio.

Los workflows se encuentran dentro de:

```text
.github/workflows/
```

## Publicación en Render

Para publicar la aplicación se utilizó **Render** mediante un Web Service.

La aplicación publicada se encuentra disponible en:

```text
https://lil-alienzzz-plushie-panic.onrender.com
```

El backend también puede comprobarse directamente desde:

```text
https://lil-alienzzz-plushie-panic.onrender.com/api/estado
```

La configuración utilizada fue:

```text
Build Command:
npm run render-build

Start Command:
npm start
```

En local la aplicación utiliza el puerto:

```text
3000
```

En Render el puerto es asignado automáticamente mediante:

```text
process.env.PORT
```

Durante el primer deployment Render utilizó internamente el puerto `10000`.

Ese puerto solamente se utiliza dentro del servidor de Render. Para ingresar al juego se utiliza la URL pública.

## Frontend y backend en una misma dirección

Durante el desarrollo frontend y backend pueden ejecutarse de forma separada.

En la versión de producción, React se compila y Express sirve los archivos generados dentro de:

```text
frontend/dist
```

De esta manera toda la aplicación funciona desde una sola dirección.

Por ejemplo:

```text
https://lil-alienzzz-plushie-panic.onrender.com
```

muestra el frontend, mientras que:

```text
https://lil-alienzzz-plushie-panic.onrender.com/api/estado
```

responde desde Express.

## Docker

No se utilizó Docker para este proyecto.

Render permite ejecutar directamente una aplicación Node y Express, por lo que no fue necesario agregar otra capa de configuración.
