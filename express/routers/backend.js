const express = require("express");
const { backend } = require("../datos/cursos.js").infoCursos;
const { validationResult } = require("express-validator");
const { postValidations, putValidations, deleteValidations } = require("../validations/validations.js");

// Router
const routerBackend = express.Router();

// Middleware
routerBackend.use(express.json());

// Función para validar datos de entrada en post, put y delete
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(422).json({ errors: errors.array() });
  };
};

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

routerBackend.post("/", 
validate(postValidations),
(req, res) => {
  let cursoNuevo = req.body;
  const cursoExistente = backend.find(curso => curso.id == cursoNuevo.id);
  if (cursoExistente) {
    res.status(400).json({ message: "400: el ID ingresado ya existe." });
  } else {
  backend.push(cursoNuevo);
  res.send(JSON.stringify(backend));
}
});

routerBackend.put("/:id", 
validate(putValidations),
(req, res) => {
  const cursoActualizado = req.body;
  const id = req.params.id;
  const indice = backend.findIndex(curso => curso.id == id);
  if (indice >= 0) {
    backend[indice] = cursoActualizado;
    res.send(JSON.stringify(backend)); 
  } else {
    res.status(404).json({ message: "404: No existe el ID ingresado" });
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

routerBackend.delete("/:id", 
validate(deleteValidations),
(req, res) => {
  const id = req.params.id;
  const indice = backend.findIndex(curso => curso.id == id);
  if (indice >= 0) {
    backend.splice(indice, 1);
    res.json({ message: "Curso eliminado exitosamente" });
  } else {
    res.status(404).json({ message: "404: No existe el ID ingresado" });
  }
});

module.exports = routerBackend;
