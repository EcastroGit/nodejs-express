// Se importa express y definen constantes
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { infoCursos } = require("./datos/cursos.js");

// Routers
const routerProgramacion = require("./routers/programacion.js");
app.use("/api/cursos/programacion", routerProgramacion);

const routerMatematicas = require("./routers/matematicas.js");
app.use("/api/cursos/matematicas", routerMatematicas);

// Routing
app.get("/", (req, res) => {
  res.send("Mi primer servidor con Express. Cursos 💻.");
});

app.get("/api/cursos", (req, res) => {
  res.send(JSON.stringify(infoCursos));
});

// Se levanta el servidor
app.listen(PORT, () => {
  console.log(`El servidor esta escuchando en el puerto ${PORT}...`);
});
