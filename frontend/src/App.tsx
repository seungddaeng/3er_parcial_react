import { useEffect, useState } from "react";
import "./App.css";
import { crearPartida, moverJugador } from "./api";
import PanelJugador from "./components/PanelJugador";
import PantallaInicio from "./components/PantallaInicio";
import PantallaResultado from "./components/PantallaResultado";
import Tablero from "./components/Tablero";
import type { Direccion, IdJugador, Partida } from "./tipos";

const teclas: Record<string, { jugador: IdJugador; direccion: Direccion }> = {
  w: { jugador: "j1", direccion: "arriba" },
  a: { jugador: "j1", direccion: "izquierda" },
  s: { jugador: "j1", direccion: "abajo" },
  d: { jugador: "j1", direccion: "derecha" },
  ArrowUp: { jugador: "j2", direccion: "arriba" },
  ArrowLeft: { jugador: "j2", direccion: "izquierda" },
  ArrowDown: { jugador: "j2", direccion: "abajo" },
  ArrowRight: { jugador: "j2", direccion: "derecha" },
};

function App() {
  const [personaje1, setPersonaje1] = useState("blug");
  const [personaje2, setPersonaje2] = useState("milly");
  const [partida, setPartida] = useState<Partida | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [mensajeTemporal, setMensajeTemporal] = useState("");

  async function comenzar() {
    setCargando(true);
    setError("");

    try {
      const nuevaPartida = await crearPartida(personaje1, personaje2);
      setPartida(nuevaPartida);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "No se pudo iniciar la partida."
      );
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    if (!partida || partida.estado !== "jugando") return;

    const partidaId = partida.id;

    async function manejarTecla(evento: KeyboardEvent) {
      if (evento.repeat) return;

      const accion = teclas[evento.key];

      if (!accion) return;

      evento.preventDefault();
      setMensajeTemporal("");

      try {
        const actualizada = await moverJugador(
          partidaId,
          accion.jugador,
          accion.direccion
        );

        setPartida(actualizada);
      } catch (e) {
        setMensajeTemporal(
          e instanceof Error ? e.message : "Movimiento inválido."
        );
      }
    }

    window.addEventListener("keydown", manejarTecla);

    return () => {
      window.removeEventListener("keydown", manejarTecla);
    };
  }, [partida]);

  if (!partida) {
    return (
      <PantallaInicio
        personaje1={personaje1}
        personaje2={personaje2}
        setPersonaje1={setPersonaje1}
        setPersonaje2={setPersonaje2}
        comenzar={comenzar}
        cargando={cargando}
        error={error}
      />
    );
  }

  return (
    <main className="juego">
      <header className="hud">
        <PanelJugador jugador={partida.jugadores[0]} />

        <div className="titulo-hud">
          <span>LITTLE ALIENS FOREVER</span>
          <strong>PLUSHIE PANIC</strong>
          <small>
            {partida.movimientos} / {partida.movimientosMaximos} MOVES
          </small>
        </div>

        <PanelJugador jugador={partida.jugadores[1]} />
      </header>

      <div className="mensaje-juego" data-testid="mensaje-juego">
        {mensajeTemporal || partida.mensaje}
      </div>

      <Tablero key={partida.evento} partida={partida} />

      <footer className="controles-pie">
        <div>
          <b>J1</b>
          <span>W A S D</span>
        </div>

        <p>Toca un peluche · Busca otro igual · Regresa a tu caja</p>

        <div>
          <b>J2</b>
          <span>← ↑ ↓ →</span>
        </div>
      </footer>

      {partida.estado === "terminada" && (
        <PantallaResultado
          partida={partida}
          volver={() => setPartida(null)}
        />
      )}
    </main>
  );
}

export default App;