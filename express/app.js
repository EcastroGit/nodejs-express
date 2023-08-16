// Se importa express y definen constantes generales
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const { infoCursos } = require("./datos/cursos.js");


// Middlewares
app.use(express.static(path.join(__dirname, "public")));

// Routers
const routerFrontend = require("./routers/frontend.js");
app.use("/api/cursos/frontend", routerFrontend);

const routerBackend = require("./routers/backend.js");
app.use("/api/cursos/backend", routerBackend);

// Routing
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/cursos", (req, res) => {
  res.send(JSON.stringify(infoCursos));
});

// Manejo de error 404
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// Se levanta el servidor
app.listen(PORT, () => {
  console.log(`El servidor esta escuchando en el puerto ${PORT}...`);
});
