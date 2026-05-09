# JS Calculator

Build a fully functional calculator. This project focuses on DOM manipulation, event listeners, and basic arithmetic in JavaScript.

## Goal

- A display to show the current input/result
- Number buttons (0-9)
- Operator buttons (+, -, *, /)
- A clear button (C)
- An equals button (=)

## Steps

- [ ] Create the HTML layout for the calculator grid in `index.html`.
- [ ] Add a display element to show numbers.
- [ ] Style the calculator using CSS (try to make it look like an iPhone or Android calculator).
- [ ] In `script.js`, select all buttons and the display.
- [ ] Add click event listeners to the buttons.
- [ ] Implement the logic to update the display when a number is clicked.
- [ ] Handle operators and calculate the result when `=` is pressed.
- [ ] Implement the Clear functionality.

## Hints

- Implement a state-based calculator: keep `previousValue`, `currentValue`, and `operator` variables.
	- When a number is pressed append to `currentValue`.
	- When an operator is pressed, if `previousValue` is empty set it to `currentValue` and clear `currentValue`; otherwise compute the result from `previousValue`, `currentValue`, and `operator` using a small `performOperation()` function and store the result in `previousValue`.
	- When `=` is pressed, compute and display the final result using the same controlled logic.
	- Avoid `eval()`; explicitly parse and perform operations so behavior is predictable and secure.
- Use `grid-template-columns: repeat(4, 1fr)` for the button layout.
