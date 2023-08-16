const { body } = require("express-validator");
const { param } = require("express-validator");

const postValidations = [
  body("id").isAlphanumeric().notEmpty(),
  body("titulo").matches(/^[A-Za-záéíóúüñÁÉÍÓÚÜÑ#+.0-9\s]+$/).notEmpty(),
  body("lenguaje").matches(/^[A-Za-záéíóúüñÁÉÍÓÚÜÑ#+.0-9\s]+$/).notEmpty(),
  body("nivel").matches(/^[A-Za-záéíóúüñÁÉÍÓÚÜÑ#+.0-9\s]+$/).notEmpty(),
];

const putValidations = [
  body("titulo").matches(/^[A-Za-záéíóúüñÁÉÍÓÚÜÑ#+.0-9\s]+$/).notEmpty(),
  body("lenguaje").matches(/^[A-Za-záéíóúüñÁÉÍÓÚÜÑ#+.0-9\s]+$/).notEmpty(),
  body("nivel").matches(/^[A-Za-záéíóúüñÁÉÍÓÚÜÑ#+.0-9\s]+$/).notEmpty(),
];

const deleteValidations = [
  param("id").isAlphanumeric().notEmpty(),
];

module.exports = {
  postValidations,
  putValidations,
  deleteValidations
};