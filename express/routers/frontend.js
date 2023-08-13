const express = require("express");
const { frontend } = require("../datos/cursos.js").infoCursos;

// Router
const routerFrontend = express.Router();

// Middleware
routerFrontend.use(express.json());

// Routing
routerFrontend.get("/", (req, res) => {
  res.send(JSON.stringify(frontend));
});

routerFrontend.get("/:lenguaje", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultados = frontend.filter((curso) => curso.lenguaje === lenguaje);
  if (resultados.length === 0) {
    return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
  }
  res.send(JSON.stringify(resultados));
});

routerFrontend.get("/:lenguaje/:nivel", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;
  const resultados = frontend.filter(
    (curso) => curso.lenguaje === lenguaje && curso.nivel === nivel
  );
  if (resultados.length === 0) {
    return res
      .status(404)
      .send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}`);
  }
  res.send(JSON.stringify(resultados));
});

routerFrontend.post("/", (req, res) => {
  let cursoNuevo = req.body;
  frontend.push(cursoNuevo);
  res.send(JSON.stringify(frontend));
});

routerFrontend.put("/:id", (req, res) => {
  const cursoActualizado = req.body;
  const id = req.params.id;
  const indice = frontend.findIndex(curso => curso.id == id);
  if (indice >= 0) {
    frontend[indice] = cursoActualizado;
    res.send(JSON.stringify(frontend)); 
  } else {
    console.log(`No existe el curso con id: ${id}`);
    res.status(404).send("Curso no encontrado");
  }
});

routerFrontend.patch("/:id", (req, res) => {
  const infoActualizada = req.body;
  const id = req.params.id;
  const indice = frontend.findIndex(curso => curso.id == id);
  if(indice >= 0){
    const cursoModificado = frontend[indice];
    Object.assign(cursoModificado, infoActualizada);
  }
  res.send(JSON.stringify(frontend));
});

routerFrontend.delete("/:id", (req, res) => {
  const id = req.params.id;
  const indice = frontend.findIndex(curso => curso.id == id);
  if(indice >= 0){
    frontend.splice(indice, 1);
  }
  res.send(JSON.stringify(frontend));
});

module.exports = routerFrontend;
