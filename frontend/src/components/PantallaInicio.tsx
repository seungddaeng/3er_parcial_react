import { personajes } from "../personajes";

type Props = {
  personaje1: string;
  personaje2: string;
  setPersonaje1: (id: string) => void;
  setPersonaje2: (id: string) => void;
  comenzar: () => void;
  cargando: boolean;
  error: string;
};

function Selector({
  titulo,
  elegido,
  otro,
  elegir,
  clase,
}: {
  titulo: string;
  elegido: string;
  otro: string;
  elegir: (id: string) => void;
  clase: string;
}) {
  return (
    <section className={`selector-jugador ${clase}`}>
      <div className="selector-titulo">
        <span>{titulo}</span>
        <small>{clase === "jugador-uno" ? "W A S D" : "FLECHAS"}</small>
      </div>
      <div className="personajes-grid">
        {personajes.map((personaje) => (
          <button
            key={personaje.id}
            className={`personaje-card ${elegido === personaje.id ? "seleccionado" : ""}`}
            onClick={() => elegir(personaje.id)}
            disabled={personaje.id === otro}
            type="button"
          >
            <img src={personaje.imagen} alt={personaje.nombre} />
            <span>{personaje.nombre}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default function PantallaInicio({
  personaje1,
  personaje2,
  setPersonaje1,
  setPersonaje2,
  comenzar,
  cargando,
  error,
}: Props) {
  return (
    <main className="inicio">
      <div className="inicio-estrellas estrellas-uno" />
      <div className="inicio-estrellas estrellas-dos" />
      <header className="portada">
        <p className="mini-titulo">LITTLE ALIENS FOREVER</p>
        <h1>PLUSHIE PÁNICO</h1>
        <p className="subtitulo">Encuentra pares, corre a tu caja y no dejes que el otro alien te los quite.</p>
      </header>

      <div className="reglas-rapidas">
        <div><strong>1</strong><span>Toca un peluche para recogerlo.</span></div>
        <div><strong>2</strong><span>Encuentra otro exactamente igual.</span></div>
        <div><strong>3</strong><span>Vuelve a tu caja. Primero en lograr 3 pares gana.</span></div>
      </div>

      <div className="selectores">
        <Selector
          titulo="JUGADOR 1"
          elegido={personaje1}
          otro={personaje2}
          elegir={setPersonaje1}
          clase="jugador-uno"
        />
        <Selector
          titulo="JUGADOR 2"
          elegido={personaje2}
          otro={personaje1}
          elegir={setPersonaje2}
          clase="jugador-dos"
        />
      </div>

      {error && <p className="error-inicio">{error}</p>}

      <button className="boton-comenzar" onClick={comenzar} disabled={cargando} type="button">
        {cargando ? "PREPARANDO JUGUETERÍA..." : "START GAME"}
      </button>

      <p className="pie-inicio">Si chocan, el alien que estaba bloqueando puede soltar un peluche. Cada 10 movimientos la caja de juguetes sacude el piso.</p>
    </main>
  );
}