export const personajes = [
  { id: "blug", nombre: "Blug", imagen: "/personajes/blug.png" },
  { id: "milly", nombre: "Milly", imagen: "/personajes/milly.png" },
  { id: "flug", nombre: "Flug", imagen: "/personajes/flug.png" },
  { id: "glug", nombre: "Glug", imagen: "/personajes/glug.png" },
  { id: "week", nombre: "Week", imagen: "/personajes/week.png" },
  { id: "piddle", nombre: "Piddle", imagen: "/personajes/piddle.png" },
  { id: "pink", nombre: "The Pink One", imagen: "/personajes/pink.png" },
];

export function imagenPersonaje(id: string) {
  return personajes.find((personaje) => personaje.id === id)?.imagen ?? personajes[0].imagen;
}
