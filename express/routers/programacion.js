const express = require("express");
const { programacion } = require("../datos/cursos.js").infoCursos;

// Router
const routerProgramacion = express.Router();

// Middleware
routerProgramacion.use(express.json());

// Routing
routerProgramacion.get("/", (req, res) => {
  res.send(JSON.stringify(programacion));
  // o res.json(programacion);
  // res.send acepta varios tipos de datos y lo adapta automáticamente
});

routerProgramacion.get("/:lenguaje", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultados = programacion.filter(
    (curso) => curso.lenguaje === lenguaje
  );
  if (resultados.length === 0) {
    return res.status(404).send(`No se encontraron cursos de ${lenguaje}.`);
  }
  if (req.query.ordenar === "vistas") {
    return res.send(
      JSON.stringify(resultados.sort((a, b) => a.vistas - b.vistas))
    );
  }
  res.send(JSON.stringify(resultados));
});

routerProgramacion.get("/:lenguaje/:nivel", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;
  const resultados = programacion.filter(
    (curso) => curso.lenguaje === lenguaje && curso.nivel === nivel
  );
  if (resultados.length === 0) {
    return res
      .status(404)
      .send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}`);
  }
  res.send(JSON.stringify(resultados));
});

routerProgramacion.post("/", (req, res) => {
  let cursoNuevo = req.body;
  programacion.push(cursoNuevo);
  res.send(JSON.stringify(programacion));
});

routerProgramacion.put("/:id", (req, res) => {
  const cursoActualizado = req.body;
  const id = req.params.id;
  const indice = programacion.findIndex(curso => curso.id == id);
  if(indice >= 0){
    programacion[indice] = cursoActualizado;
  }
  res.send(JSON.stringify(programacion));
});

routerProgramacion.patch("/:id", (req, res) => {
  const infoActualizada = req.body;
  const id = req.params.id;
  const indice = programacion.findIndex(curso => curso.id == id);
  if(indice >= 0){
    const cursoModificado = programacion[indice];
    Object.assign(cursoModificado, infoActualizada);
  }
  res.send(JSON.stringify(programacion));
});

routerProgramacion.delete("/:id", (req, res) => {
  const id = req.params.id;
  const indice = programacion.findIndex(curso => curso.id == id);
  if(indice >= 0){
    programacion.splice(indice, 1);
  }
  res.send(JSON.stringify(programacion));
});

module.exports = routerProgramacion;
