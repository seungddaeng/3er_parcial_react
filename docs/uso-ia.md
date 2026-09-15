# Registro de uso de inteligencia artificial

Durante el desarrollo de Plushie Panic se utilizó un asistente de inteligencia artificial como herramienta de apoyo.

Se utilizó principalmente para generar una primera base del proyecto, encontrar errores, preparar pruebas y apoyar algunos recursos visuales.

Las respuestas generadas no se utilizaron directamente sin revisión. El proyecto fue ejecutado y probado durante el desarrollo, y varias propuestas iniciales fueron modificadas o descartadas.

## Código y estructura

Se utilizó IA como apoyo para proponer o revisar partes como:

- separación del frontend en React y el backend en Express;
- tipos principales de TypeScript;
- validaciones del backend;
- configuración de Playwright;
- configuración de GitHub Actions;

Después de generar una primera base, el proyecto fue ejecutado localmente y se fueron corrigiendo los problemas encontrados.

## Errores revisados con apoyo de IA

Durante el desarrollo aparecieron algunos errores

### Conflicto de dependencias

En una de las primeras versiones existía un conflicto entre las versiones de:

```text
Vite
@vitejs/plugin-react
```

Esto impedía completar correctamente la instalación de dependencias.

Se revisaron las versiones y se ajustaron para utilizar una combinación compatible.

### Error de TypeScript

También apareció el error:

```text
'partida' is possibly 'null'
```

El problema estaba relacionado con el uso de la partida dentro del evento del teclado.

Se solucionó guardando primero el identificador de la partida:

```ts
const partidaId = partida.id;
```

y utilizando ese valor al enviar los movimientos.

## Recursos visuales

Los personajes de **Little Aliens Forever** no fueron creados mediante inteligencia artificial para este proyecto.

Son personajes que ya existían previamente y se tomó como referencia el contenido de: @lilalienz4ever

La inteligencia artificial sí fue utilizada como apoyo para proponer y generar algunos elementos propios del proyecto, principalmente:

- peluches;
- elementos de la juguetería;
- recursos decorativos;
- algunos ajustes visuales.

Después estos elementos fueron revisados y modificados para mantener una apariencia similar dentro del juego.

## Documentación

La IA también se utilizó como apoyo para organizar los archivos Markdown y revisar qué información debía incluirse según los requisitos del examen.

Después se modificó el contenido para que describiera el funcionamiento real del proyecto y los cambios que se realizaron durante el desarrollo.

La inteligencia artificial se utilizó como herramienta de apoyo durante el proceso, pero el proyecto fue revisado, probado y ajustado después de cada cambio para mantener una lógica entendible
