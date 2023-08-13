const express = require("express");
const { backend } = require("../datos/cursos.js").infoCursos;

// Router
const routerBackend = express.Router();

// Middleware
routerBackend.use(express.json());

// Routing
routerBackend.get("/", (req, res) => {
  res.send(JSON.stringify(backend));
  // o res.json(backend);
  // res.send acepta varios tipos de datos y lo adapta automáticamente
});

routerBackend.get("/:lenguaje", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultados = backend.filter(
    (curso) => curso.lenguaje === lenguaje
  );
  if (resultados.length === 0) {
    return res.status(404).send(`No se encontraron cursos de ${lenguaje}.`);
  }
  res.send(JSON.stringify(resultados));
});

routerBackend.get("/:lenguaje/:nivel", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;
  const resultados = backend.filter(
    (curso) => curso.lenguaje === lenguaje && curso.nivel === nivel
  );
  if (resultados.length === 0) {
    return res
      .status(404)
      .send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}`);
  }
  res.send(JSON.stringify(resultados));
});

routerBackend.post("/", (req, res) => {
  let cursoNuevo = req.body;
  backend.push(cursoNuevo);
  res.send(JSON.stringify(backend));
});

routerBackend.put("/:id", (req, res) => {
  const cursoActualizado = req.body;
  const id = req.params.id;
  const indice = backend.findIndex(curso => curso.id == id);
  if (indice >= 0) {
    backend[indice] = cursoActualizado;
    res.send(JSON.stringify(backend)); 
  } else {
    console.log(`No existe el curso con id: ${id}`);
    res.status(404).send("Curso no encontrado");
  }
});

routerBackend.patch("/:id", (req, res) => {
  const infoActualizada = req.body;
  const id = req.params.id;
  const indice = backend.findIndex(curso => curso.id == id);
  if(indice >= 0){
    const cursoModificado = backend[indice];
    Object.assign(cursoModificado, infoActualizada);
  }
  res.send(JSON.stringify(backend));
});

routerBackend.delete("/:id", (req, res) => {
  const id = req.params.id;
  const indice = backend.findIndex(curso => curso.id == id);
  if(indice >= 0){
    backend.splice(indice, 1);
  }
  res.send(JSON.stringify(backend));
});

module.exports = routerBackend;
