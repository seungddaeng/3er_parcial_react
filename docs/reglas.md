# Reglas del juego

## Objetivo

Completar **3 pares de peluches** antes que el otro jugador.

## Inicio de la partida

Cada jugador elige un alien diferente. Después de presionar `START GAME`, el backend crea una nueva partida y distribuye seis tipos de peluches por el escenario. Hay dos peluches de cada tipo.

## Movimiento

- Jugador 1: `W A S D`.
- Jugador 2: flechas del teclado.
- Los jugadores no pueden salir de la juguetería.
- Algunas casillas están ocupadas por muebles y no se pueden atravesar.

## Cómo recoger un peluche

No existe un botón especial para recoger. Cuando el jugador llega a la misma casilla de un peluche, el juego intenta recogerlo automáticamente.

- Si no lleva ninguno, puede recoger cualquier peluche.
- Si lleva uno, solo puede recoger otro del mismo tipo.
- Si encuentra la pareja correcta, debe regresar a su propia caja.
- Al llegar a la caja con dos iguales, la pareja se guarda y suma un punto.

## Interacción entre jugadores

Los dos jugadores compiten por los mismos peluches. También pueden bloquear el paso del otro.

Si un jugador intenta moverse a la casilla ocupada por el rival, el movimiento no se completa y ocurre un choque. Si el rival llevaba un peluche, puede dejarlo caer en una casilla cercana. De esta forma, la posición de un jugador puede afectar directamente al otro.

## Toy Box Shake

Cada 10 movimientos válidos, los peluches que siguen en el piso cambian de lugar. Los peluches que ya están en el inventario de un jugador no se mueven.

Este evento introduce variación durante la partida y obliga a volver a buscar la pareja si el tablero cambia.

## Acciones inválidas

El backend rechaza acciones que no cumplen las reglas. Algunos ejemplos son:

- intentar salir del escenario;
- intentar atravesar un mueble;
- enviar una acción incompleta;
- intentar mover una partida que ya terminó.

El mensaje del error se muestra en la interfaz y no es necesario abrir la consola para entender qué ocurrió.

## Estados principales

Durante una partida se mantienen varios datos al mismo tiempo:

- posición de los dos jugadores;
- peluches disponibles en el escenario;
- peluches que lleva cada jugador;
- puntaje de ambos jugadores;
- cantidad de movimientos realizados;
- número de evento Toy Box Shake;
- estado de la partida;
- ganador o empate.

## Victoria, límite y empate

- **Victoria directa:** un jugador completa 3 pares.
- **Límite:** la partida llega a 90 movimientos.
- **Empate:** se llega al límite y ambos jugadores tienen la misma cantidad de pares.
