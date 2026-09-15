import { imagenPersonaje } from "../personajes";
import { nombrePeluche } from "../constantes";
import type { Jugador } from "../tipos";

export default function PanelJugador({ jugador }: { jugador: Jugador }) {
  return (
    <section className={`panel-jugador ${jugador.id}`}>
      <img className="avatar-panel" src={imagenPersonaje(jugador.personaje)} alt={jugador.personaje} />
      <div className="panel-datos">
        <div className="panel-superior">
          <strong>{jugador.nombre}</strong>
          <span>{jugador.puntos} / 3 PARES</span>
        </div>
        <div className="inventario">
          <span className="inventario-label">LLEVAS</span>
          {[0, 1].map((indice) => {
            const tipo = jugador.inventario[indice];
            return (
              <div className="slot-inventario" key={indice}>
                {tipo ? <img src={`/peluches/${tipo}.svg`} alt={nombrePeluche[tipo]} /> : <span />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
