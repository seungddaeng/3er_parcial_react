export type IdJugador = "j1" | "j2";
export type Direccion = "arriba" | "abajo" | "izquierda" | "derecha";
export type TipoPeluche = "conejo" | "oso" | "rana" | "estrella" | "gato" | "nube";

export type Posicion = {
  x: number;
  y: number;
};

export type Peluche = {
  id: string;
  tipo: TipoPeluche;
  posicion: Posicion;
};

export type Jugador = {
  id: IdJugador;
  nombre: string;
  personaje: string;
  posicion: Posicion;
  base: Posicion;
  inventario: TipoPeluche[];
  puntos: number;
};

export type Partida = {
  id: string;
  estado: "jugando" | "terminada";
  jugadores: Jugador[];
  peluches: Peluche[];
  movimientos: number;
  movimientosMaximos: number;
  objetivoPares: number;
  evento: number;
  mensaje: string;
  ganador: IdJugador | "empate" | null;
};

export type SolicitudCrear = {
  jugador1?: {
    personaje?: string;
  };
  jugador2?: {
    personaje?: string;
  };
};

export type SolicitudAccion = {
  jugador?: IdJugador;
  tipo?: "mover";
  direccion?: Direccion;
};

export type ResultadoAccion = {
  ok: boolean;
  partida?: Partida;
  mensaje?: string;
};
