# Investigación técnica

## Pruebas E2E con Playwright

Para las pruebas end-to-end se eligió **Playwright**. La razón principal es que permite automatizar Chrome/Chromium y ejecutar la misma prueba de dos formas: sin ventana en GitHub Actions y con el navegador visible durante la defensa.

La prueba actual comprueba cuatro puntos básicos:

1. que el backend responda en `/api/estado`;
2. que cargue la pantalla de inicio;
3. que pueda comenzar una partida;
4. que una acción inválida muestre el mensaje correspondiente y un movimiento válido actualice la partida.

Comandos utilizados:

```bash
npm run test:e2e
```

Para ejecutar la prueba con navegador visible:

```bash
npm run test:headed --prefix e2e
```


Referencia técnica utilizada para la configuración:

- Playwright Test CLI: `https://playwright.dev/docs/test-cli`

## GitHub Actions

El repositorio incluye automatización para tres tareas distintas:

- validar el código con lint;
- ejecutar las pruebas E2E;
- publicar la aplicación en Render.

La intención es que un cambio del repositorio pueda pasar por las validaciones y luego llegar a la aplicación publicada sin tener que copiar archivos manualmente al servidor.

## Estado de verificación

La aplicación ya fue ejecutada de forma local con frontend y backend bajo `http://localhost:3000`.

Antes de cerrar la entrega todavía se debe verificar en el repositorio definitivo:

- lint de frontend y backend;
- E2E en modo headless dentro de GitHub Actions;
- E2E visible contra la URL pública;
- deployment de Render;
- URL final funcionando.

