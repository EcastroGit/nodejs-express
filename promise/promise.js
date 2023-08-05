const promesaCumplida = true;

const miPromesa = new Promise((resolve, reject) => {
  setTimeout(() => {
if(promesaCumplida){
  resolve("promesa cumplida");
} else {
  reject("Promesa rechazada...");
}
  }, 2000);
});
//Se maneja el éxito de la promesa
const promesaTrue = (valor) => {
  console.log(valor);
};
//Se maneja el rechazo de la promesa
const promesaFalse = (razon) => {
  console.log(razon);
};
//Se utiliza el método .then()
miPromesa.then(promesaTrue, promesaFalse);