import type { Partida } from "./tipos";

const partidas = new Map<string, Partida>();

export function generarId() {
  return Math.random().toString(36).slice(2, 9);
}

export function guardarPartida(partida: Partida) {
  partidas.set(partida.id, partida);
}

export function obtenerPartida(id: string) {
  return partidas.get(id);
}
