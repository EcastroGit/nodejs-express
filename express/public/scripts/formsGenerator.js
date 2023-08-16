// Se definen los objetos del DOM
const formsDiv = document.querySelector("#forms");
const createBtn = document.querySelector("#create");
const updateBtn = document.querySelector("#update");
const deleteBtn = document.querySelector("#delete");

// Se envían los forms al hacer click en una opción
createBtn.addEventListener("click", () => {
  formsDiv.innerHTML = 
  `
  <p class="forms-tag">Crear</p>
  <form id="postForm" onsubmit="submitPostForm(event)">
    <label for="id">ID:</label>
    <input type="text" id="post-id" name="id" pattern="^[A-Za-z0-9]+$" required /><br />

    <label for="titulo">Título:</label>
    <input type="text" id="post-titulo" name="titulo" pattern="^[A-Za-záéíóúüñÁÉÍÓÚÜÑ#+.0-9\\s]+$" required /><br />

    <label for="lenguaje">Lenguaje:</label>
    <input
      type="text"
      id="post-lenguaje"
      name="lenguaje"
      pattern="^[A-Za-záéíóúüñÁÉÍÓÚÜÑ#+.0-9\\s]+$"
      required
    /><br />

    <label for="nivel">Nivel:</label>
    <input type="text" id="post-nivel" name="nivel" pattern="^[A-Za-záéíóúüñÁÉÍÓÚÜÑ#+.0-9\\s]+$" required /><br />

    <button type="submit">Crear curso</button>
  </form>
  `;
});

updateBtn.addEventListener("click", () => {
  formsDiv.innerHTML = 
  `
    <p class="forms-tag">Actualizar</p>
    <form id="putForm" onsubmit="submitPutForm(event)">
      <label for="id">ID:</label>
      <input type="text" id="put-id" name="id" pattern="^[A-Za-z0-9]+$" required /><br />

      <label for="titulo">Título:</label>
      <input type="text" id="put-titulo" name="titulo" pattern="^[A-Za-záéíóúüñÁÉÍÓÚÜÑ#+.0-9\\s]+$" required /><br />

      <label for="lenguaje">Lenguaje:</label>
      <input
        type="text"
        id="put-lenguaje"
        name="lenguaje"
        pattern="^[A-Za-záéíóúüñÁÉÍÓÚÜÑ#+.0-9\\s]+$"
        required
      /><br />

      <label for="nivel">Nivel:</label>
      <input type="text" id="put-nivel" name="nivel" pattern="^[A-Za-záéíóúüñÁÉÍÓÚÜÑ#+.0-9\\s]+$" required /><br />

      <button type="submit">Actualizar curso</button>
    </form>
  `;
});

deleteBtn.addEventListener("click", () => {
  formsDiv.innerHTML = 
  `
    <p class="forms-tag">Eliminar</p>
    <form id="putForm" onsubmit="submitDeleteForm(event)">
      <label for="id">ID:</label>
      <input type="text" id="delete-id" name="id" pattern="^[A-Za-z0-9]+$" required /><br />

      <button type="submit">Eliminar curso</button>
    </form>
  `;
});

