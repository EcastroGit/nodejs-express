const app = document.querySelector("#app");

// Función para pintar los cursos en la UI
function showData(data, category) {
  app.innerHTML = "";

  data.forEach((curso) => {
    const card = document.createElement("div");
    card.setAttribute("class", category === "frontend" ? "card1" : "card2");
    
    const id = document.createElement("p");
    id.textContent = `ID: ${curso.id}`;
    card.appendChild(id);

    const titulo = document.createElement("p");
    titulo.textContent = `Título: ${curso.titulo}`;
    card.appendChild(titulo);

    const lenguaje = document.createElement("p");
    lenguaje.textContent = `Lenguaje: ${curso.lenguaje}`;
    card.appendChild(lenguaje);

    const nivel = document.createElement("p");
    nivel.textContent = `Nivel: ${curso.nivel}`;
    card.appendChild(nivel);

    app.appendChild(card);
  });
};

// GET
function getFrontData() {
  fetch("http://localhost:3000/api/cursos/frontend")
    .then((res) => res.json())
    .then((data) => showData(data, "frontend"))
    .catch((error) => console.error(error));
};

function getBackData() {
  fetch("http://localhost:3000/api/cursos/backend")
    .then((res) => res.json())
    .then((data) => showData(data, "backend"))
    .catch((error) => console.error(error));
};

// POST
function submitPostForm(event) {
  
  event.preventDefault(); // Importante para el correcto envío del formulario
  
  // Selector de categoría de cursos frontend o backend
  const selector = document.querySelector("#selector").value;
  let category = "";

  // Valor de los campos del formulario
  const postId = document.querySelector("#post-id").value;
  const postTitulo = document.querySelector("#post-titulo").value;
  const postLenguaje = document.querySelector("#post-lenguaje").value;
  const postNivel = document.querySelector("#post-nivel").value;

  if (selector === "Frontend"){
    category = "frontend";
  } else {
    category = "backend";
  };

  fetch(`http://localhost:3000/api/cursos/${category}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: postId,
      titulo: postTitulo,
      lenguaje: postLenguaje,
      nivel: postNivel,
    }),
  })
    .then((response) => {
      if (response.ok) {
        // Resetea los valores de los campos del formulario
        document.querySelector("#post-id").value = "";
        document.querySelector("#post-titulo").value = "";
        document.querySelector("#post-lenguaje").value = "";
        document.querySelector("#post-nivel").value = "";
        if (selector === "Frontend"){
          getFrontData();
        } else {
          getBackData();
        };
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

// PUT or PATCH

function submitPutForm(event) {
  event.preventDefault(); // Importante para el correcto envío del formulario
  
  const selector = document.querySelector("#selector").value;
  let category = "";
  
  const putId = document.querySelector("#put-id").value;
  const postTitulo = document.querySelector("#put-titulo").value;
  const postLenguaje = document.querySelector("#put-lenguaje").value;
  const postNivel = document.querySelector("#put-nivel").value;

  if (selector === "Frontend") {
    category = "frontend";
  } else {
    category = "backend";
  }

  const url = `http://localhost:3000/api/cursos/${category}/${putId}`; // Cambia la URL para incluir el ID del recurso
  
  fetch(url, {
    method: "PUT", // Modificar en caso de PATCH
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: putId, // Retirar en caso de PATCH
      titulo: postTitulo,
      lenguaje: postLenguaje,
      nivel: postNivel,
    }),
  })
    .then((response) => {
      if (response.ok) {
        document.querySelector("#put-id").value = "";
        document.querySelector("#put-titulo").value = "";
        document.querySelector("#put-lenguaje").value = "";
        document.querySelector("#put-nivel").value = "";
        if (selector === "Frontend") {
          getFrontData();
        } else {
          getBackData();
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// DELETE

function submitDeleteForm(event) {
  event.preventDefault(); // Importante para el correcto envío del formulario
  
  const selector = document.querySelector("#selector").value;
  let category = "";

  const deleteId = document.querySelector("#delete-id").value;

  if (selector === "Frontend") {
    category = "frontend";
  } else {
    category = "backend";
  }

  const url = `http://localhost:3000/api/cursos/${category}/${deleteId}`;

  fetch(url, {
    method: "DELETE", 
  })
    .then((response) => {
      if (response.ok) {
        document.querySelector("#delete-id").value = "";
        if (selector === "Frontend") {
          getFrontData();
        } else {
          getBackData();
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });

}

