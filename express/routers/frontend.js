const express = require("express");
const { frontend } = require("../datos/cursos.js").infoCursos;
const { validationResult } = require("express-validator");
const { postValidations, putValidations, deleteValidations } = require("../validations/validations.js");

// Router
const routerFrontend = express.Router();

// Middlewares
routerFrontend.use(express.json());

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

routerFrontend.post("/",
validate(postValidations),
(req, res) => {
  let cursoNuevo = req.body;
  const cursoExistente = frontend.find(curso => curso.id == cursoNuevo.id);
  if (cursoExistente) {
    res.status(400).json({ message: "400: el ID ingresado ya existe." });
  } else {
  frontend.push(cursoNuevo);
  res.send(JSON.stringify(frontend));
}
});

routerFrontend.put("/:id", 
validate(putValidations),
(req, res) => {
  const cursoActualizado = req.body;
  const id = req.params.id;
  const indice = frontend.findIndex(curso => curso.id == id);
  if (indice >= 0) {
    frontend[indice] = cursoActualizado;
    res.send(JSON.stringify(frontend)); 
  } else {
    res.status(404).json({ message: "404: No existe el ID ingresado" });
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

routerFrontend.delete("/:id", 
validate(deleteValidations),
(req, res) => {
  const id = req.params.id;
  const indice = frontend.findIndex(curso => curso.id == id);
  if (indice >= 0) {
    frontend.splice(indice, 1);
    res.json({ message: "Curso eliminado exitosamente" });
  } else {
    res.status(404).json({ message: "404: No existe el ID ingresado" });
  }
});

module.exports = routerFrontend;
