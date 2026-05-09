const canvas = document.getElementById('gameCanvas');
if (!canvas) {
	// Fail-fast when DOM element is missing so initialization doesn't continue
	throw new Error('Missing canvas element with id "gameCanvas"');
}
const ctx = canvas.getContext && canvas.getContext('2d');
if (!ctx) {
	// Fail-fast when 2D context is unavailable
	throw new Error('2D rendering context not available on #gameCanvas');
}

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let score = 0;
let dx = 0;
let dy = 0;

// TODO: Define snake and food, and start game loop
