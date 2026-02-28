# Form Basics

To make an input form in HTML, we use the `<form>` element. This element is a container for various types of input elements. Such as:
- `<input>`: This is the most common form element. It can be used for text fields, checkboxes, radio buttons, and more, depending on the `type` attribute.
- `<textarea>`: This is used for multi-line text input.
- `<select>`: This creates a dropdown list of options.
- `<button>`: This is used to create a clickable button, which can submit the form or perform other actions.
There are many more form elements, but these are the basics to get you started.

Examples of different input types:
```html
<form>
  <label for="name">Name:</label>
  <input type="text" id="name" name="name"><br><br>

  <label for="email">Email:</label>
  <input type="email" id="email" name="email"><br><br>

  <label for="message">Message:</label><br>
  <textarea id="message" name="message"></textarea><br><br>

  <label for="options">Choose an option:</label>
  <select id="options" name="options">
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
  </select><br><br>

  <button type="submit">Submit</button>
</form>
```

This form will ask the user to:
1. Enter their name in a text field.
2. Enter their email in an email field.
3. Write a message in a textarea.
4. Choose an option from a dropdown list.
5. Click the submit button to send the form data.

Forms are used with JavaScript to handle user input. When the user submits the form, the data can be sent to a server for processing or used within the webpage to provide feedback or update content dynamically.
