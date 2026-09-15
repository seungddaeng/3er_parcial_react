import express from "express";
import path from "node:path";
import { generarId, guardarPartida, obtenerPartida } from "./almacen";
import { aplicarAccion, crearPartida } from "./motor";
import type { SolicitudAccion, SolicitudCrear } from "./tipos";

const app = express();
const puerto = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());

app.get("/api/estado", (_req, res) => {
  res.json({ ok: true, juego: "Little Aliens Forever: Plushie Panic" });
});

app.post("/api/partidas", (req, res) => {
  try {
    const id = generarId();
    const partida = crearPartida(id, req.body as SolicitudCrear);
    guardarPartida(partida);
    res.status(201).json(partida);
  } catch (error) {
    res.status(400).json({
      mensaje: error instanceof Error ? error.message : "No se pudo crear la partida.",
    });
  }
});

app.get("/api/partidas/:id", (req, res) => {
  const partida = obtenerPartida(String(req.params.id));

  if (!partida) {
    res.status(404).json({ mensaje: "Partida no encontrada." });
    return;
  }

  res.json(partida);
});

app.post("/api/partidas/:id/acciones", (req, res) => {
  const partida = obtenerPartida(String(req.params.id));

  if (!partida) {
    res.status(404).json({ mensaje: "Partida no encontrada." });
    return;
  }

  const resultado = aplicarAccion(partida, req.body as SolicitudAccion);

  if (!resultado.ok || !resultado.partida) {
    res.status(400).json({ mensaje: resultado.mensaje ?? "Acción inválida." });
    return;
  }

  guardarPartida(resultado.partida);
  res.json(resultado.partida);
});

const carpetaFrontend = path.join(__dirname, "..", "..", "frontend", "dist");
app.use(express.static(carpetaFrontend));

app.use((req, res, next) => {
  if (req.method === "GET" && req.accepts("html")) {
    res.sendFile(path.join(carpetaFrontend, "index.html"));
    return;
  }

  next();
});

app.listen(puerto, "0.0.0.0", () => {
  console.log(`Plushie Panic disponible en http://localhost:${puerto}`);
});
