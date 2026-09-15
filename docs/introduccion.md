# Introducción

## Little Aliens Forever: Plushie Panic

**Plushie Panic** es un juego web competitivo para dos jugadores que comparten el mismo teclado. La partida ocurre dentro de una juguetería de noche. Cada jugador controla un alien y debe encontrar dos peluches del mismo tipo, llevar la pareja hasta su caja y completar tres pares antes que el otro jugador.

La idea principal fue mantener una regla fácil de entender desde el inicio. No quería que el jugador tuviera que leer muchas instrucciones antes de empezar, por eso la mecánica se resume en tres pasos: **recoger un peluche, encontrar su pareja y regresar a la caja**.

## Jugadores y controles

- **Jugador 1:** se mueve con `W`, `A`, `S`, `D`.
- **Jugador 2:** se mueve con las flechas del teclado.
- Ambos jugadores participan al mismo tiempo sobre la misma partida.

Antes de comenzar, cada jugador elige un personaje diferente de Little Aliens Forever.

## Qué ocurre durante la partida

Al iniciar, Express crea la partida y coloca los peluches en posiciones variables del escenario. Los jugadores recorren la juguetería buscando pares. Si un jugador ya lleva un peluche, solo puede recoger otro del mismo tipo.

Los dos jugadores compiten por los mismos objetos y también pueden bloquearse. Si uno intenta entrar en la posición del otro, ocurre un choque. El jugador que estaba bloqueando puede dejar caer un peluche que llevaba, haciendo que vuelva al escenario.

Además, cada diez movimientos válidos ocurre el evento **Toy Box Shake**, que cambia la posición de los peluches que siguen en el piso. Esto evita que todas las partidas tengan exactamente el mismo recorrido.

## Cómo termina

La partida termina de dos formas:

1. un jugador completa tres pares y gana inmediatamente;
2. se llega al límite de 90 movimientos. En ese caso gana quien tenga más pares y, si tienen la misma cantidad, se registra un empate.

## Responsabilidad de React

React se encarga de mostrar la interfaz: pantalla inicial, selección de personajes, tablero, posiciones, peluches, inventario, puntaje, mensajes y pantalla de resultado. También escucha las teclas del jugador y envía cada acción al backend usando `fetch`.

## Responsabilidad de Express

Express crea y guarda la partida, genera las posiciones iniciales, valida los movimientos, controla límites y obstáculos, resuelve los choques, administra los inventarios, registra los pares, ejecuta el Toy Box Shake y determina cuándo termina la partida.
