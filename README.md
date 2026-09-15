# Little Aliens Forever: Plushie Panic

Juego web para dos jugadores en el mismo teclado. Cada alien debe recoger dos peluches iguales y regresar a su caja. El primer jugador que completa 3 pares gana.

## Tecnologías

- Frontend: React + TypeScript + Vite
- Backend: Express + TypeScript
- Comunicación: `fetch` con JSON
- Pruebas E2E: Playwright
- Publicación: Render

No se utilizan Axios, React Router, Redux, Tailwind, Bootstrap ni motores de juegos.

## Cómo jugar

- Jugador 1: `W A S D`
- Jugador 2: flechas del teclado
- Toca un peluche para recogerlo.
- Con un peluche cargado, solo puedes recoger otro del mismo tipo.
- Cuando lleves dos iguales, vuelve a tu caja de color.
- Si intentas caminar sobre el otro jugador, ocurre un choque y puede soltar el peluche que llevaba.
- Cada 10 movimientos válidos la caja de juguetes mueve los peluches que siguen en el piso.
- Gana el primero que completa 3 pares. Si se llega al límite de 90 movimientos, gana quien tenga más pares; si están iguales, hay empate.

## Instalación

Desde la carpeta raíz:

```bash
npm run install:all
```

## Compilar y ejecutar como producción local

```bash
npm run build
npm start
```

Abrir:

```text
http://localhost:3000
```

Express sirve el frontend compilado y la API desde el mismo dominio y puerto.

## Desarrollo

Backend:

```bash
npm run dev --prefix backend
```

Frontend:

```bash
npm run dev --prefix frontend
```

El proxy de Vite envía `/api` al backend local.

## Lint

```bash
npm run lint
```

## Pruebas E2E

Instalar Chromium la primera vez:

```bash
cd e2e
npx playwright install chromium
cd ..
```

Con la aplicación ejecutándose en `http://localhost:3000`:

```bash
npm run test:e2e
```

Para la defensa, en Chrome visible:

```bash
npm run test:headed --prefix e2e
```

Para probar la URL publicada en PowerShell:

```powershell
$env:BASE_URL="https://TU-SERVICIO.onrender.com"
npm run test:headed --prefix e2e
```

## API HTTP REST

### GET `/api/estado`

Verifica que el backend está disponible.

### POST `/api/partidas`

Crea una partida.

```json
{
  "jugador1": { "personaje": "blug" },
  "jugador2": { "personaje": "milly" }
}
```

### GET `/api/partidas/:id`

Devuelve el estado de una partida.

### POST `/api/partidas/:id/acciones`

Envía un movimiento.

```json
{
  "jugador": "j1",
  "tipo": "mover",
  "direccion": "derecha"
}
```

Todas las respuestas de la API utilizan JSON.

## GitHub Actions

El repositorio incluye tres workflows separados:

- `lint.yml`: valida frontend y backend.
- `e2e.yml`: compila la aplicación, la inicia y ejecuta Playwright en modo headless.
- `deploy.yml`: llama al Deploy Hook de Render después de que lint y E2E hayan terminado correctamente.

Para `deploy.yml` crear el secreto de GitHub:

```text
RENDER_DEPLOY_HOOK_URL
```

## Render

El archivo `render.yaml` define un Web Service Node.

Build command:

```text
npm run render-build
```

Start command:

```text
npm start
```

El backend escucha `process.env.PORT` y `0.0.0.0` para funcionar en Render.

## Documentación

La carpeta `docs/` contiene introducción, reglas, API, boceto, decisiones, investigación técnica y registro de uso de IA.
