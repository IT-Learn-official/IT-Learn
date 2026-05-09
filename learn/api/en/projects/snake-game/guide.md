# Retro Snake Game

Create the classic Snake game using JavaScript and the HTML5 Canvas API. This project is more advanced and will test your logic, arrays, and timing skills.

## Goal

- A game canvas where the snake moves
- Keyboard controls (Arrow keys) to change direction
- Food that appears randomly
- Score counter
- Game over logic if the snake hits a wall or itself

## Steps

- [ ] Create a `<canvas>` element in `index.html`.
- [ ] Set up the canvas context and game variables in `script.js`.
- [ ] Implement a game loop (using `setInterval` or `requestAnimationFrame`).
- [ ] Create an array to store the snake's body parts.
- [ ] Write a function to draw the snake and the food on the canvas.
- [ ] Add event listeners for keyboard input to move the snake.
- [ ] Implement the logic for the snake to "eat" food and grow longer.
- [ ] Check for collisions with walls or the snake's own body to trigger "Game Over".

## Hints

- Use `ctx.fillRect()` to draw squares for the snake and food.
- The snake's body is basically an array of `{x, y}` coordinates.
- To "move" the snake, add a new head to the front of the array and remove the tail (unless it just ate food).
