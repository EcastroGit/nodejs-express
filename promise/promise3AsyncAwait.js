function ordenarProducto(producto) {
    return new Promise((resolve, reject) => {
      console.log(`Consultando ${producto}...`); // Síncrono: Consulta del producto.
      setTimeout(() => {
        if(producto === "taza") {
          resolve(`${producto} ordenad@`); // Asíncrono: promesa 1
        } else {
          reject("este producto no esta disponible");
        }
      }, 4000);
    });
  };
  
  function procesarPedido() {
    return new Promise(resolve => {
      console.log("procesando pedido..."); // Síncrono: procesamiento.
      setTimeout(() => {
        resolve("¡Compra exitosa!"); // Asíncrono: promesa 2
      }, 7000);
    });
  };
  
  async function realizarPedido(producto) {
    // Al omitir await, sólo se ejecutará el código síncrono
    try {
        const respuesta = await ordenarProducto(producto);
        console.log(respuesta); // Resuelve promesa 1
        const respuestaProcesada = await procesarPedido();
        console.log(respuestaProcesada); // Resuelve promesa 2
    } catch(error){
        console.log(error);
    }
  };

  realizarPedido("taza");
  