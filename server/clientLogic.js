// Se define la BD de frases
const quotes = [
	{
		id: 1,
		quote: "En lo que piensas, te conviertes; lo que sientes, lo atraes; lo que imaginas, lo creas.",
		author: "Budha"
	},
	{
		id: 2,
		quote: "Así como una vela no brilla sin fuego, el hombre no puede existir sin una vida espiritual.",
		author: "Budha"
	},
	{
		id: 3,
		quote: "Si tu compasión no te incluye a ti mismo, es incorrecta",
		author: "Budha"
	},
]

// Se define la función para renderizar las frases
function cards() {
	const app = document.querySelector("#app");
  const quoteCards = quotes.map((i) => `<div class="card" key="${i.id}"><p>"${i.quote}"</p><p>- ${i.author}</p></div>`);
  app.innerHTML = quoteCards.join('');
};

// Condicional para ejecutar la función sólo en path "/quotes"
if (window.location.pathname === "/quotes") {
	cards();
};