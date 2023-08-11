// Botones de categorías
const app = document.querySelector("#app");
const programacionBtn = document.querySelector("#programacion-btn");
const matematicasBtn = document.querySelector("#matematicas-btn");

programacionBtn.addEventListener("click", () => {
  fetch("http://localhost:3000/api/cursos/programacion")
    .then((res) => res.json())
    .then((data) => mostrar(data))
    .catch((error) => console.error(error));

  function mostrar(data) {
    app.innerHTML = "";

    data.forEach((curso) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card1");

      const titulo = document.createElement("p");
      titulo.textContent = `Título: ${curso.titulo}`;
      card.appendChild(titulo);

      const lenguaje = document.createElement("p");
      lenguaje.textContent = `Lenguaje: ${curso.lenguaje}`;
      card.appendChild(lenguaje);

      const vistas = document.createElement("p");
      vistas.textContent = `Vistas: ${curso.vistas}`;
      card.appendChild(vistas);

      const nivel = document.createElement("p");
      nivel.textContent = `Nivel: ${curso.nivel}`;
      card.appendChild(nivel);

      app.appendChild(card);
    });
  }
});

matematicasBtn.addEventListener("click", () => {
  fetch("http://localhost:3000/api/cursos/matematicas")
    .then((res) => res.json())
    .then((data) => mostrar(data))
    .catch((error) => console.error(error));

    function mostrar(data) {
      app.innerHTML = "";
  
      data.forEach((curso) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card2");
  
        const titulo = document.createElement("p");
        titulo.textContent = `Título: ${curso.titulo}`;
        card.appendChild(titulo);
  
        const lenguaje = document.createElement("p");
        lenguaje.textContent = `Lenguaje: ${curso.lenguaje}`;
        card.appendChild(lenguaje);
  
        const vistas = document.createElement("p");
        vistas.textContent = `Vistas: ${curso.vistas}`;
        card.appendChild(vistas);
  
        const nivel = document.createElement("p");
        nivel.textContent = `Nivel: ${curso.nivel}`;
        card.appendChild(nivel);
  
        app.appendChild(card);
      });
    }
  });

