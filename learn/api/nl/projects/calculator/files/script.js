// TODO: Implementeer hier de logica voor je rekenmachine
const display = document.getElementById('display');
if (!display) {
	// Fail-fast when the expected display element is missing to avoid runtime errors
	throw new Error('Missing element with id "display" required by calculator script');
}

// Hint: Gebruik document.querySelectorAll('.btn') om alle knoppen op te halen
// en voeg event listeners aan hen toe.
