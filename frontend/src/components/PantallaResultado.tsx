import { imagenPersonaje } from "../personajes";
import type { Partida } from "../tipos";

export default function PantallaResultado({ partida, volver }: { partida: Partida; volver: () => void }) {
  const ganador = partida.ganador === "empate"
    ? null
    : partida.jugadores.find((jugador) => jugador.id === partida.ganador);

  return (
    <div className="resultado-fondo">
      <div className="resultado-card">
        <p className="resultado-mini">PLUSHIE PANIC</p>
        {ganador ? (
          <>
            <img className="resultado-alien" src={imagenPersonaje(ganador.personaje)} alt={ganador.nombre} />
            <h2>{ganador.nombre} GANA</h2>
            <p>{ganador.puntos} pares completados</p>
          </>
        ) : (
          <>
            <div className="resultado-empate">TIE!</div>
            <h2>EMPATE</h2>
            <p>Los dos aliens completaron la misma cantidad de pares.</p>
          </>
        )}
        <div className="marcador-final">
          <span>J1 {partida.jugadores[0].puntos}</span>
          <i />
          <span>J2 {partida.jugadores[1].puntos}</span>
        </div>
        <button type="button" onClick={volver}>PLAY AGAIN</button>
      </div>
    </div>
  );
}
