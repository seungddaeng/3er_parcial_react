import type {
  Direccion,
  IdJugador,
  Partida,
  Peluche,
  Posicion,
  ResultadoAccion,
  SolicitudAccion,
  SolicitudCrear,
  TipoPeluche,
} from "./tipos";

const COLUMNAS = 12;
const FILAS = 7;
const OBJETIVO_PARES = 3;
const MOVIMIENTOS_MAXIMOS = 90;
const CADA_CUANTOS_MOVIMIENTOS_SE_MUEVEN = 10;

const BASE_J1: Posicion = { x: 0, y: 6 };
const BASE_J2: Posicion = { x: 11, y: 6 };

const OBSTACULOS: Posicion[] = [
  { x: 3, y: 1 },
  { x: 4, y: 1 },
  { x: 7, y: 1 },
  { x: 8, y: 1 },
  { x: 5, y: 3 },
  { x: 6, y: 3 },
  { x: 2, y: 4 },
  { x: 9, y: 4 },
  { x: 4, y: 5 },
  { x: 7, y: 5 }
];

const TIPOS: TipoPeluche[] = ["conejo", "oso", "rana", "estrella", "gato", "nube"];

function igual(a: Posicion, b: Posicion) {
  return a.x === b.x && a.y === b.y;
}

function dentro(posicion: Posicion) {
  return posicion.x >= 0 && posicion.x < COLUMNAS && posicion.y >= 0 && posicion.y < FILAS;
}

function esObstaculo(posicion: Posicion) {
  return OBSTACULOS.some((obstaculo) => igual(obstaculo, posicion));
}

function elegir<T>(lista: T[]) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function moverPosicion(posicion: Posicion, direccion: Direccion): Posicion {
  const cambios: Record<Direccion, Posicion> = {
    arriba: { x: 0, y: -1 },
    abajo: { x: 0, y: 1 },
    izquierda: { x: -1, y: 0 },
    derecha: { x: 1, y: 0 },
  };

  return {
    x: posicion.x + cambios[direccion].x,
    y: posicion.y + cambios[direccion].y,
  };
}

function casillasLibres(partida?: Partida, excluirJugadores = true) {
  const libres: Posicion[] = [];

  for (let y = 0; y < FILAS; y += 1) {
    for (let x = 0; x < COLUMNAS; x += 1) {
      const posicion = { x, y };
      const ocupadaPorJugador = partida && excluirJugadores
        ? partida.jugadores.some((jugador) => igual(jugador.posicion, posicion))
        : false;

      if (
        !esObstaculo(posicion) &&
        !igual(posicion, BASE_J1) &&
        !igual(posicion, BASE_J2) &&
        !ocupadaPorJugador
      ) {
        libres.push(posicion);
      }
    }
  }

  return libres;
}

function crearPeluches() {
  const libres = casillasLibres(undefined, false);
  const peluches: Peluche[] = [];
  let numero = 1;

  TIPOS.forEach((tipo) => {
    for (let repeticion = 0; repeticion < 2; repeticion += 1) {
      const posicion = elegir(libres);
      libres.splice(libres.findIndex((actual) => igual(actual, posicion)), 1);
      peluches.push({ id: `peluche-${numero}`, tipo, posicion });
      numero += 1;
    }
  });

  return peluches;
}

function jugadorPorId(partida: Partida, id: IdJugador) {
  return partida.jugadores.find((jugador) => jugador.id === id)!;
}

function otroJugador(partida: Partida, id: IdJugador) {
  return partida.jugadores.find((jugador) => jugador.id !== id)!;
}

function terminarPorMovimientos(partida: Partida) {
  const [j1, j2] = partida.jugadores;
  partida.estado = "terminada";

  if (j1.puntos > j2.puntos) partida.ganador = "j1";
  else if (j2.puntos > j1.puntos) partida.ganador = "j2";
  else partida.ganador = "empate";

  partida.mensaje = "Se terminó el límite de movimientos. Gana quien completó más pares.";
}

function terminarPorPuntos(partida: Partida, ganador: IdJugador) {
  partida.estado = "terminada";
  partida.ganador = ganador;
  const jugador = jugadorPorId(partida, ganador);
  partida.mensaje = `${jugador.nombre} completó ${OBJETIVO_PARES} pares y ganó Plushie Panic.`;
}

function casillaOcupadaPorPeluche(partida: Partida, posicion: Posicion) {
  return partida.peluches.some((peluche) => igual(peluche.posicion, posicion));
}

function moverPeluchesDelPiso(partida: Partida) {
  const libres = casillasLibres(partida).filter((posicion) => !casillaOcupadaPorPeluche(partida, posicion));

  partida.peluches.forEach((peluche) => {
    if (libres.length === 0) return;
    const nueva = elegir(libres);
    libres.splice(libres.findIndex((actual) => igual(actual, nueva)), 1);
    peluche.posicion = nueva;
  });

  partida.evento += 1;
}

function buscarCasillaParaSoltar(partida: Partida, centro: Posicion) {
  const candidatas: Posicion[] = [
    { x: centro.x + 1, y: centro.y },
    { x: centro.x - 1, y: centro.y },
    { x: centro.x, y: centro.y + 1 },
    { x: centro.x, y: centro.y - 1 },
  ].filter((posicion) => {
    return (
      dentro(posicion) &&
      !esObstaculo(posicion) &&
      !partida.jugadores.some((jugador) => igual(jugador.posicion, posicion)) &&
      !casillaOcupadaPorPeluche(partida, posicion)
    );
  });

  if (candidatas.length > 0) return elegir(candidatas);
  const libres = casillasLibres(partida).filter((posicion) => !casillaOcupadaPorPeluche(partida, posicion));
  return libres.length > 0 ? elegir(libres) : centro;
}

function resolverChoque(partida: Partida, jugadorId: IdJugador) {
  const rival = otroJugador(partida, jugadorId);

  if (rival.inventario.length === 0) {
    partida.mensaje = `Boink. ${rival.nombre} bloqueó el paso, pero no llevaba ningún peluche.`;
    return;
  }

  const tipo = rival.inventario.pop()!;
  const posicion = buscarCasillaParaSoltar(partida, rival.posicion);
  partida.peluches.push({
    id: `caido-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
    tipo,
    posicion,
  });
  partida.mensaje = `Boink. ${rival.nombre} dejó caer su peluche ${tipo}.`;
}

function recogerSiCorresponde(partida: Partida, jugadorId: IdJugador) {
  const jugador = jugadorPorId(partida, jugadorId);
  const indice = partida.peluches.findIndex((peluche) => igual(peluche.posicion, jugador.posicion));

  if (indice === -1) return "";
  if (jugador.inventario.length >= 2) return " Ya llevas una pareja. Vuelve a tu caja.";

  const peluche = partida.peluches[indice];

  if (jugador.inventario.length === 1 && jugador.inventario[0] !== peluche.tipo) {
    return ` Ese peluche no combina con tu ${jugador.inventario[0]}.`;
  }

  jugador.inventario.push(peluche.tipo);
  partida.peluches.splice(indice, 1);

  if (jugador.inventario.length === 2) {
    return ` Encontraste la pareja de ${peluche.tipo}. Vuelve a tu caja.`;
  }

  return ` Recogiste un peluche ${peluche.tipo}. Busca otro igual.`;
}

function guardarParejaSiCorresponde(partida: Partida, jugadorId: IdJugador) {
  const jugador = jugadorPorId(partida, jugadorId);

  if (!igual(jugador.posicion, jugador.base) || jugador.inventario.length !== 2) return "";

  jugador.inventario = [];
  jugador.puntos += 1;

  if (jugador.puntos >= OBJETIVO_PARES) {
    terminarPorPuntos(partida, jugadorId);
    return "";
  }

  return ` Pareja guardada. ${jugador.nombre} ahora tiene ${jugador.puntos} punto${jugador.puntos === 1 ? "" : "s"}.`;
}

function registrarMovimiento(partida: Partida) {
  partida.movimientos += 1;

  if (partida.estado === "terminada") return;

  if (partida.movimientos % CADA_CUANTOS_MOVIMIENTOS_SE_MUEVEN === 0) {
    moverPeluchesDelPiso(partida);
    partida.mensaje += " La caja de juguetes se sacudió y los peluches cambiaron de lugar.";
  }

  if (partida.movimientos >= partida.movimientosMaximos && partida.estado === "jugando") {
    terminarPorMovimientos(partida);
  }
}

export function crearPartida(id: string, solicitud: SolicitudCrear): Partida {
  const personaje1 = solicitud.jugador1?.personaje?.trim() || "blug";
  const personaje2 = solicitud.jugador2?.personaje?.trim() || "milly";

  if (personaje1 === personaje2) {
    throw new Error("Los jugadores deben elegir aliens diferentes.");
  }

  return {
    id,
    estado: "jugando",
    jugadores: [
      {
        id: "j1",
        nombre: "Jugador 1",
        personaje: personaje1,
        posicion: { ...BASE_J1 },
        base: { ...BASE_J1 },
        inventario: [],
        puntos: 0,
      },
      {
        id: "j2",
        nombre: "Jugador 2",
        personaje: personaje2,
        posicion: { ...BASE_J2 },
        base: { ...BASE_J2 },
        inventario: [],
        puntos: 0,
      },
    ],
    peluches: crearPeluches(),
    movimientos: 0,
    movimientosMaximos: MOVIMIENTOS_MAXIMOS,
    objetivoPares: OBJETIVO_PARES,
    evento: 0,
    mensaje: "Busca un peluche, encuentra otro igual y vuelve a tu caja.",
    ganador: null,
  };
}

export function aplicarAccion(partida: Partida, solicitud: SolicitudAccion): ResultadoAccion {
  if (partida.estado === "terminada") {
    return { ok: false, mensaje: "La partida ya terminó." };
  }

  if (solicitud.tipo !== "mover" || !solicitud.jugador || !solicitud.direccion) {
    return { ok: false, mensaje: "Acción incompleta." };
  }

  const jugador = jugadorPorId(partida, solicitud.jugador);
  const rival = otroJugador(partida, solicitud.jugador);
  const destino = moverPosicion(jugador.posicion, solicitud.direccion);

  if (!dentro(destino)) {
    return { ok: false, mensaje: "No puedes salir de la juguetería." };
  }

  if (esObstaculo(destino)) {
    return { ok: false, mensaje: "Ese mueble bloquea el camino." };
  }

  if (igual(destino, rival.posicion)) {
    resolverChoque(partida, solicitud.jugador);
    registrarMovimiento(partida);
    return { ok: true, partida };
  }

  jugador.posicion = destino;
  const recogida = recogerSiCorresponde(partida, solicitud.jugador);
  const guardado = guardarParejaSiCorresponde(partida, solicitud.jugador);

  if (partida.estado === "jugando") {
    partida.mensaje = `${jugador.nombre} se movió.${recogida}${guardado}`.trim();
  }

  registrarMovimiento(partida);
  return { ok: true, partida };
}
