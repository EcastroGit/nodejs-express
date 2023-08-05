const cursos = require("./database.json");

  // Convertir objeto JS --> cadena de caracteres en formato JSON
  let cursosJSON = JSON.stringify(cursos);
  console.log(cursosJSON);
  console.log(typeof cursosJSON);

  // Convertir cadena de caracteres --> Objeto JS
  let cursosObjeto= JSON.parse(cursosJSON);
  console.log(cursosObjeto);
  console.log(cursosObjeto.titulo);
  console.log(typeof cursosObjeto);
