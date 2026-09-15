import type { Direccion, IdJugador, Partida } from "./tipos";

async function leerRespuesta(respuesta: Response) {
  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.mensaje ?? "Ocurrió un error.");
  }

  return datos;
}

export async function crearPartida(personaje1: string, personaje2: string): Promise<Partida> {
  const respuesta = await fetch("/api/partidas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jugador1: { personaje: personaje1 },
      jugador2: { personaje: personaje2 },
    }),
  });

  return leerRespuesta(respuesta);
}

export async function moverJugador(
  partidaId: string,
  jugador: IdJugador,
  direccion: Direccion,
): Promise<Partida> {
  const respuesta = await fetch(`/api/partidas/${partidaId}/acciones`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jugador,
      tipo: "mover",
      direccion,
    }),
  });

  return leerRespuesta(respuesta);
}
