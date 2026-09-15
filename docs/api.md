# API HTTP REST

El frontend se comunica con Express mediante `fetch`. Las solicitudes y respuestas relacionadas con la partida usan JSON.

## GET `/api/estado`

Se utiliza para comprobar que el servidor está funcionando.

### Respuesta

```json
{
  "ok": true,
  "juego": "Little Aliens Forever: Plushie Panic"
}
```

## POST `/api/partidas`

Crea una nueva partida y la guarda en el backend.

### Entrada

```json
{
  "jugador1": {
    "personaje": "blug"
  },
  "jugador2": {
    "personaje": "milly"
  }
}
```

Los dos personajes deben ser diferentes.

### Ejemplo de salida

```json
{
  "id": "abc1234",
  "estado": "jugando",
  "jugadores": [
    {
      "id": "j1",
      "nombre": "Jugador 1",
      "personaje": "blug",
      "posicion": { "x": 0, "y": 6 },
      "base": { "x": 0, "y": 6 },
      "inventario": [],
      "puntos": 0
    },
    {
      "id": "j2",
      "nombre": "Jugador 2",
      "personaje": "milly",
      "posicion": { "x": 11, "y": 6 },
      "base": { "x": 11, "y": 6 },
      "inventario": [],
      "puntos": 0
    }
  ],
  "movimientos": 0,
  "movimientosMaximos": 90,
  "objetivoPares": 3,
  "evento": 0,
  "mensaje": "Busca un peluche, encuentra otro igual y vuelve a tu caja.",
  "ganador": null
}
```

La respuesta completa también incluye el arreglo de peluches generado para esa partida.

## GET `/api/partidas/:id`

Devuelve el estado actual de una partida ya creada.

### Posible error

Si el identificador no existe:

```json
{
  "mensaje": "Partida no encontrada."
}
```

El servidor responde con estado HTTP `404`.

## POST `/api/partidas/:id/acciones`

Envía una acción de movimiento de uno de los jugadores.

### Entrada

```json
{
  "jugador": "j1",
  "tipo": "mover",
  "direccion": "derecha"
}
```

Los valores posibles de `direccion` son:

- `arriba`
- `abajo`
- `izquierda`
- `derecha`

### Acción válida

Si el movimiento es válido, Express actualiza la partida y devuelve el estado completo con la nueva posición, inventario, puntaje, mensaje y demás datos.

### Acción inválida

Ejemplo al intentar salir del tablero:

```json
{
  "mensaje": "No puedes salir de la juguetería."
}
```

En este caso el servidor responde con HTTP `400`.

## Flujo de una acción

```text
tecla del jugador
      ↓
React identifica jugador y dirección
      ↓
fetch POST /api/partidas/:id/acciones
      ↓
Express valida y actualiza la partida
      ↓
respuesta JSON
      ↓
React actualiza lo que se ve en pantalla
```
