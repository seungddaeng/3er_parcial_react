# Decisiones de diseño y cambios realizados

## Cómo fue cambiando la idea

La idea del juego no salió completa desde el inicio. Primero consideré una propuesta llamada **Guardianes del Núcleo**, pero tenía demasiadas reglas y no era tan clara al jugarla. Después probé una idea de recolección de comida dentro de una casa, donde también había ruido, inventario y otros eventos. Funcionaba, pero seguía siendo algo complicado y aburrido de jugar

A partir de eso decidí reducir la mecánica principal. La siguiente idea fue un juego de encontrar pares de objetos. En un momento se consideraron calcetines, pero visualmente no combinaban tanto con los personajes que quería utilizar. Finalmente cambié los objetos por peluches y la ambientación pasó a ser una juguetería nocturna. Así apareció **Plushie Panic** :D

La versión final mantiene competencia, movimiento e interacción entre jugadores, pero la regla principal se puede explicar rápido: encontrar dos peluches iguales y volver a la caja.

## Movimiento por cuadrícula

El tablero se maneja como una cuadrícula de 12 columnas por 7 filas. Cada personaje tiene una posición formada por `x` y `y`.

Elegí esta forma porque es parecida a los ejercicios de movimiento vistos anteriormente y permite revisar límites, obstáculos y colisiones con comparaciones sencillas. No fue necesario utilizar física, canvas ni un motor de juegos.

## Recogida automática

Al principio pensé en utilizar una tecla adicional para recoger objetos, pero finalmente la eliminé. El peluche se recoge automáticamente cuando el jugador llega a su posición y cumple la regla del inventario.

Esto dejó los controles más simples y permite que cada jugador se concentre solo en moverse y buscar la pareja.

## Backend encargado de las reglas

Una decisión importante fue no dejar las reglas principales solamente en React. El frontend detecta la tecla y envía la acción, pero Express decide si el movimiento se puede realizar.

El backend también controla la recogida de peluches, los choques, el puntaje, el Toy Box Shake y el final de la partida. Después devuelve el estado actualizado y React lo muestra.

## Variación entre partidas

Los peluches no aparecen siempre en las mismas posiciones. La distribución inicial se genera en el backend y, además, cada 10 movimientos se vuelve a modificar la ubicación de los peluches que quedan en el piso.

La intención es que no exista una única ruta que se pueda memorizar.

## Decisiones visuales

Quise que el proyecto se viera más cercano a un juego pequeño que a una interfaz de formularios. Por eso el tablero ocupa la mayor parte de la pantalla y se diseñó como una juguetería nocturna con estantes, cajas, muebles, peluches y un HUD sencillo.

Los personajes pertenecen a **Little Aliens Forever**, una colección que ya existía y que se tomó como referencia desde la cuenta `@lilalienz4ever`. Los personajes no fueron diseñados por IA para este examen. Para integrarlos al juego se separaron de la imagen de referencia, se limpiaron los bordes y se aumentó su resolución, manteniendo los colores y formas originales.

Los peluches, parte del escenario y algunos recursos visuales sí se desarrollaron con apoyo de IA y luego se ajustaron para mantener un estilo consistente. Las animaciones del juego se hacen solamente con CSS.

## Riesgos que aparecieron

### Dependencias de Vite

Durante una primera instalación apareció un conflicto entre la versión de Vite y `@vitejs/plugin-react`. Se corrigieron las versiones para utilizar una combinación compatible y cercana a la utilizada en los proyectos de clase.

### Estado posiblemente nulo en React

TypeScript marcó un error porque `partida` podía ser `null` dentro del evento de teclado. Se guardó el `id` de la partida antes de registrar el evento y con eso se mantuvo la validación de tipos sin desactivar reglas de TypeScript.

### Evitar demasiados movimientos por mantener una tecla

Se ignora `KeyboardEvent.repeat`, de modo que mantener una tecla presionada no envía muchas solicitudes seguidas al backend.

### Frontend y backend en producción

En desarrollo Vite y Express pueden ejecutarse por separado. Para producción, Express sirve el contenido compilado de `frontend/dist`, de forma que el juego y la API funcionan bajo la misma dirección y el mismo puerto.
