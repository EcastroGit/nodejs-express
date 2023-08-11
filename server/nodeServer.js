// Se importan los módulos necesarios
const http = require("http");
const fs = require("fs");

// Se define la lógica del servidor
const server = http.createServer((req, res) => {
  // Info en consola de la URL y método
  console.log("_____solicitud______");
  console.log("Path: " + req.url);
  console.log("Method: " + req.method);

  // Se definen las funciones y rutas para manejar los diferentes métodos
  const { method } = req;

  switch (method) {
    case "GET":
      return handleGET(req, res);
    case "POST":
      return handlePOST(req, res);
    default:
      res.statusCode = 501;
      console.log(
        `Status: ${res.statusCode} >> el método no puede ser manejado`
      );
  };

  // Solicitudes GET
  function handleGET(req, res) {
    const path = req.url;
    if (path === "/") {
      // se sirve el index.html
      fs.readFile("server/public/index.html", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
        } else {
          console.log("Status: " + res.statusCode);
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      });
    } else if (path === "/scripts/clientLogic.js") {
      // Se sirve clientLogic.js
      fs.readFile("server/public/scripts/clientLogic.js", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
        } else {
          res.writeHead(200, { "Content-Type": "text/javascript" });
          res.end(data);
        }
      });
    } else if (path === "/main.css") {
      // se sirve styles.css
      fs.readFile("server/public/styles/main.css", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
        } else {
          res.writeHead(200, { "Content-Type": "text/css" });
          res.end(data);
        }
      });
    } else if (path === "/notebook.jpg") {
      // Se sirve la imagen de portada
      fs.readFile("server/public/assets/notebook.jpg", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Server Error");
        } else {
          res.writeHead(200, { "Content-Type": "image/jpg" });
          res.end(data);
        }
      });
    } else if (path === "/quotes") {
      // se sirve frases.html
      fs.readFile("server/public/quotes.html", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
        } else {
          console.log("Status: " + res.statusCode);
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      });
    } else {
      // se define la página 404
      res.statusCode = 404;
      fs.readFile("server/public/404.html", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
        } else {
          console.log("Status: " + res.statusCode);
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      });
      
    }
  };

  // Solicitudes POST
  function handlePOST(req, res) {
    const path = req.url;
    if (path === "/quotes") {
      console.log(`Status: ${res.statusCode}`);
    } else {
      console.log(`Status: ${res.statusCode}`);
    }
  };
});

// Se levanta el servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
