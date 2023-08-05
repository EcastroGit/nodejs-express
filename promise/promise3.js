function ordenarProducto(producto) {
  return new Promise((resolve, reject) => {
    console.log(`Consultando ${producto}...`); // Síncrono: consulta del producto
    setTimeout(() => {
      if(producto === "taza") {
        resolve(`${producto} ordenado`); // Asíncrono: promesa 1
      } else {
        reject("este producto no esta disponible");
      }
    }, 4000);
  });
};

function procesarPedido() {
  return new Promise(resolve => {
    console.log("procesando pedido..."); // Síncrono: procesamiento
    setTimeout(() => {
      resolve("¡Compra exitosa!"); // Asíncrono: promesa 2
    }, 7000);
  });
};

ordenarProducto("taza")
  .then(respuesta => {
    console.log(respuesta); // Resuelve la promesa 1
    return procesarPedido(); 
  })
  .then(respuestaProcesada => { 
    console.log(respuestaProcesada); // Resuelve la promesa 2 en procesarPedido()
  })
  .catch(error => {
    console.log(error);
  });
  


