import { COLUMNAS, FILAS, muebles, nombrePeluche } from "../constantes";
import { imagenPersonaje } from "../personajes";
import type { Partida } from "../tipos";

function posicion(x: number, y: number) {
  return {
    left: `${((x + 0.5) / COLUMNAS) * 100}%`,
    top: `${((y + 0.5) / FILAS) * 100}%`,
  };
}

function tamano(ancho: number, alto: number) {
  return {
    width: `${(ancho / COLUMNAS) * 100}%`,
    height: `${(alto / FILAS) * 100}%`,
  };
}

export default function Tablero({ partida }: { partida: Partida }) {
  return (
    <section className={`tablero ${partida.evento > 0 ? "con-evento" : ""}`} key={`evento-${partida.evento}`}>
      <img className="fondo-tienda" src="/escenario/jugueteria.svg" alt="Juguetería nocturna" />

      <div className="base base-j1" style={posicion(0, 6)}>
        <img src="/escenario/canasta-azul.svg" alt="Caja del jugador 1" />
      </div>
      <div className="base base-j2" style={posicion(11, 6)}>
        <img src="/escenario/canasta-rosa.svg" alt="Caja del jugador 2" />
      </div>

      {muebles.map((mueble) => (
        <div
          key={mueble.id}
          className={`mueble ${mueble.tipo}`}
          style={{
            left: `${(mueble.x / COLUMNAS) * 100}%`,
            top: `${(mueble.y / FILAS) * 100}%`,
            ...tamano(mueble.ancho, mueble.alto),
          }}
        >
          <img src={`/escenario/${mueble.tipo}.svg`} alt="Mueble" />
        </div>
      ))}

      {partida.peluches.map((peluche) => (
        <div className={`peluche peluche-${peluche.tipo}`} style={posicion(peluche.posicion.x, peluche.posicion.y)} key={peluche.id}>
          <img src={`/peluches/${peluche.tipo}.svg`} alt={nombrePeluche[peluche.tipo]} />
        </div>
      ))}

      {partida.jugadores.map((jugador) => (
        <div className={`alien alien-${jugador.id}`} style={posicion(jugador.posicion.x, jugador.posicion.y)} key={jugador.id}>
          <div className="alien-sombra" />
          <img src={imagenPersonaje(jugador.personaje)} alt={jugador.nombre} />
          {jugador.inventario.length > 0 && (
            <div className="peluche-cargado">
              <img src={`/peluches/${jugador.inventario[0]}.svg`} alt="Peluche cargado" />
              {jugador.inventario.length === 2 && <b>2</b>}
            </div>
          )}
        </div>
      ))}

      {partida.evento > 0 && (
        <div className="cartel-evento">
          <strong>TOY BOX SHAKE!</strong>
          <span>Los peluches cambiaron de lugar</span>
        </div>
      )}
    </section>
  );
}
