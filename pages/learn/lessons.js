const modulesData =

  // ================= HTML =================
  [
    {
      id: "html",
      title: "HTML",
      lessons: [
        {
          id: "What is HTML",
          title: "What is HTML?",
          content: `
          <div class="lesson-layout">
            <div class="lesson-explanation">
              <h2>What is HTML?</h2>
              <p>
                Welcome to The Origins Trilogy! The beginning of your web development journey.
                The language we are learning is HTML or HyperText Markup Language. It was created by a developer named Tim Berners-Lee in 1991.
                Today, every website you visit is built using HTML.
                As the name suggests, HTML is a markup language, not a programming language. This means it is used to structure content on the web, not to create dynamic functionality.
                However, HTML is just one piece used to build a web page. Most web pages use:
                HTML for structure,
                CSS for styling, and
                JavaScript for interactivity.
                This course will focus on HTML, the backbone of web pages. The programs we write will be files with the extension .html.
                Ah one more thing, you need a code editor! A code editor is a text editor that can write and run code.
                And we have one here. Let's test it out!
              </p>
              <pre><code><h2>Write the date</h2>
<p>Write your wish</p></code></pre>
            </div>

            <!-- Editor in the middle -->
            <div class="lesson-editor">
              <textarea id="code-editor-html-headings">
<--Write code below -->
              </textarea>
              <button onclick="runCode('html-headings')">▶ Run</button>
            </div>

            <!-- Output (right) -->
            <div class="lesson-output">
              <iframe id="output-frame-html-headings"></iframe>
            </div>
          </div>
        `
        },
        {
          id: "html-tags",
          title: "Important HTML tags",
          content: `
          <h2>Common HTML tags</h2>
          <ul>
            <li>&lt;h1&gt; to &lt;h6&gt;: Headings</li>
            <li>&lt;p&gt;: Paragraph</li>
            <li>&lt;a href=\"url\"&gt;: Link</li>
            <li>&lt;img src=\"image.jpg\" alt=\"description\"&gt;: Image</li>
            <li>&lt;ul&gt; and &lt;ol&gt;: Lists</li>
            <li>&lt;form&gt;: Form</li>
          </ul>
        `,
          quiz: [
            {
              question: "Which tag is for a hyperlink?",
              options: ["&lt;a&gt;", "&lt;img&gt;", "&lt;div&gt;"],
              correct: 0
            }
          ]
        },
        {
          id: "html-attributes",
          title: "HTML attributes",
          content: `
          <h2>What are attributes?</h2>
          <p>Attributes provide extra information to tags, such as <code>href</code> on links or <code>alt</code> on images.</p>
          <pre><code>&lt;a href="https://example.com"&gt;Visit site&lt;/a&gt;
&lt;img src="photo.jpg" alt="My photo"&gt;</code></pre>
        `,
          quiz: [
            {
              question: "What does the 'alt' attribute do for an image?",
              options: [
                "Provides alternative text for screen readers",
                "Changes the image",
                "Adds a link"
              ],
              correct: 0
            }
          ]
        },
        {
          id: "html-links",
          title: "Creating links",
          content: `
          <h2>Hyperlinks</h2>
          <p>Use the <code>&lt;a&gt;</code> tag to create links to other pages or websites.</p>
          <pre><code>&lt;a href="https://google.com"&gt;Google&lt;/a&gt;</code></pre>
        `,
          quiz: [
            {
              question: "How do you make a link to https://google.com?",
              options: [
                "&lt;a href='https://google.com'&gt;Link&lt;/a&gt;",
                "&lt;link src='https://google.com'&gt;",
                "&lt;a src='https://google.com'&gt;Link&lt;/a&gt;"
              ],
              correct: 0
            }
          ]
        },
        {
          id: "html-images",
          title: "Adding images",
          content: `
          <h2>Images</h2>
          <p>Use the <code>&lt;img&gt;</code> tag to add an image.</p>
          <pre><code>&lt;img src="photo.jpg" alt="Description"&gt;</code></pre>
        `,
          quiz: [
            {
              question: "What is required for accessibility on an image?",
              options: ["alt attribute", "title attribute", "href attribute"],
              correct: 0
            }
          ]
        },
        {
          id: "html-lijsten",
          title: "Creating lists",
          content: `
          <h2>Lists</h2>
          <p>There are unordered lists (<code>&lt;ul&gt;</code>) and ordered lists (<code>&lt;ol&gt;</code>).</p>
          <pre><code>&lt;ul&gt;
  &lt;li&gt;Item 1&lt;/li&gt;
  &lt;li&gt;Item 2&lt;/li&gt;
&lt;/ul&gt;</code></pre>
        `,
          quiz: [
            {
              question: "Which tag do you use for a list item?",
              options: ["&lt;li&gt;", "&lt;ul&gt;", "&lt;ol&gt;"],
              correct: 0
            }
          ]
        },
        {
          id: "html-tables",
          title: "Creating tables",
          content: `
          <h2>Tables</h2>
          <p>Use <code>&lt;table&gt;</code> with rows (<code>&lt;tr&gt;</code>) and cells (<code>&lt;td&gt;</code> and <code>&lt;th&gt;</code>).</p>
          <pre><code>&lt;table&gt;
  &lt;tr&gt;
    &lt;th&gt;Name&lt;/th&gt;
    &lt;th&gt;Age&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;John&lt;/td&gt;
    &lt;td&gt;25&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</code></pre>
        `,
          quiz: [
            {
              question: "Which tag do you use for a header cell in a table?",
              options: ["&lt;th&gt;", "&lt;td&gt;", "&lt;tr&gt;"],
              correct: 0
            }
          ]
        },
        {
          id: "html-forms",
          title: "Forms",
          content: `
          <h2>Forms</h2>
          <p>Forms let the user input data.</p>
          <pre><code>&lt;form action='/submit' method='post'&gt;
  &lt;label&gt;Name:&lt;/label&gt;
  &lt;input type='text' name='name'&gt;
  &lt;input type='submit' value='Send'&gt;
&lt;/form&gt;</code></pre>
        `,
          quiz: [
            {
              question: "Which tag do you use for input fields?",
              options: ["&lt;input&gt;", "&lt;form&gt;", "&lt;button&gt;"],
              correct: 0
            }
          ]
        },
        {
          id: "html-semantic",
          title: "Semantic tags",
          content: `
          <h2>Semantic HTML</h2>
          <p>Use tags that describe the meaning of content, like <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, and <code>&lt;footer&gt;</code>.</p>
        `,
          quiz: [
            {
              question: "Which tag do you use for navigation?",
              options: ["&lt;nav&gt;", "&lt;div&gt;", "&lt;header&gt;"],
              correct: 0
            }
          ]
        },
        {
          id: "html-media",
          title: "Adding media",
          content: `
          <h2>Audio and Video</h2>
          <p>HTML supports audio and video with the <code>&lt;audio&gt;</code> and <code>&lt;video&gt;</code> tags respectively.</p>
          <pre><code>&lt;video controls&gt;
  &lt;source src="video.mp4" type="video/mp4"&gt;
&lt;/video&gt;</code></pre>
        `,
          quiz: [
            {
              question: "Which tag do you use to add video?",
              options: ["&lt;video&gt;", "&lt;img&gt;", "&lt;media&gt;"],
              correct: 0
            }
          ]
        },
        {
          id: "html-accessibility",
          title: "Accessibility",
          content: `
          <h2>Accessibility</h2>
          <p>Use alt texts, labels, and ARIA attributes to make websites accessible to everyone.</p>
          <pre><code>&lt;img src='photo.jpg' alt='Description of the image'&gt;</code></pre>
        `,
          quiz: [
            {
              question: "Why do you use alt texts?",
              options: [
                "For screen readers and search engines",
                "For styling",
                "For animations"
              ],
              correct: 0
            }
          ]
        },
        {
          id: "html-buttons",
          title: "Buttons",
          content: `
            <h2>Buttons</h2>
            <p>With the <code>&lt;button&gt;</code> tag you can create clickable buttons.</p>
            <pre><code>&lt;button&gt;Click me!&lt;/button&gt;</code></pre>
          `,
          quiz: [
            {
              question: "Which HTML tag do you use for a button?",
              options: [
                "&lt;button&gt;",
                "&lt;input&gt;",
                "&lt;a&gt;"
              ],
              correct: 0
            }
          ]
        },
        {
          id: "html-debugging",
          title: "Debugging HTML",
          content: `
            <h2>Debugging HTML</h2>
            <p>Try fixing each of the buggy HTML snippets below. Type your correction and click "Check Fix".</p>
        
            <div class="debug-exercise">
              <h3>Exercise 1</h3>
              <textarea id="code-editor-html-debug-1">&lt;img src="photo.jpg" alt="Photo"&gt;&lt;/img&gt;</textarea>
              <button onclick="checkFix('html-debugging', 1)">Check Fix</button>
              <div id="feedback-html-debug-1"></div>
            </div>
        
            <div class="debug-exercise">
              <h3>Exercise 2</h3>
              <textarea id="code-editor-html-debug-2">&lt;p&gt;This is a paragraph&lt;p&gt;</textarea>
              <button onclick="checkFix('html-debugging', 2)">Check Fix</button>
              <div id="feedback-html-debug-2"></div>
            </div>
        
            <div class="debug-exercise">
              <h3>Exercise 3</h3>
              <textarea id="code-editor-html-debug-3">&lt;img scr="photo.jpg" alt="My photo"&gt;</textarea>
              <button onclick="checkFix('html-debugging', 3)">Check Fix</button>
              <div id="feedback-html-debug-3"></div>
            </div>
        
            <div class="debug-exercise">
              <h3>Exercise 4</h3>
              <textarea id="code-editor-html-debug-4">&lt;a href="https://example.com&gt;Click here&lt;/a&gt;</textarea>
              <button onclick="checkFix('html-debugging', 4)">Check Fix</button>
              <div id="feedback-html-debug-4"></div>
            </div>
          `,
          exercises: [
            {
              expectedFix: `<img src="photo.jpg" alt="Photo">`,
              hint: "Remember: the &ltimg&gt tag doesn’t need a closing tag."
            },
            {
              expectedFix: `<p>This is a paragraph</p>`,
              hint: "Every opening &ltp&gt tag needs a closing &lt/p&gt."
            },
            {
              expectedFix: `<img src="photo.jpg" alt="My photo">`,
              hint: "The attribute name for an image source is <code>src</code>, not <code>scr</code>."
            },
            {
              expectedFix: `<a href="https://example.com">Click here</a>`,
              hint: "Every attribute value in HTML must start and end with quotes."
            }
          ]
        },
      ]
    },

    // ================= CSS =================
    {
      id: "css",
      title: "CSS",
      lessons: [
        {
          id: "css-intro",
          title: "Introduction to CSS",
          content: `
          <h2>What is CSS?</h2>
          <p>CSS defines the visual style of your website: colors, fonts, spacing, and layout.</p>
          <pre><code>body {
  background-color: #f0f0f0;
  color: navy;
  font-family: Arial, sans-serif;
}</code></pre>
        `,
          quiz: [
            {
              question: "What do you use CSS for?",
              options: [
                "Determine the structure of the page",
                "Define the look and style of the page",
                "Make the page interactive"
              ],
              correct: 1
            }
          ]
        },
        {
          id: "css-selectors",
          title: "CSS Selectors",
          content: `
          <h2>CSS Selectors</h2>
          <p>With selectors you choose which HTML elements to style: tags, classes and ids.</p>
          <ul>
            <li>Element selector: <code>p {}</code></li>
            <li>Class selector: <code>.menu {}</code></li>
            <li>ID selector: <code>#header {}</code></li>
          </ul>
        `,
          quiz: [
            {
              question: "How do you select elements with class 'menu'?",
              options: [".menu", "#menu", "menu"],
              correct: 0
            }
          ]
        },
        {
          id: "css-boxmodel",
          title: "The CSS Box Model",
          content: `
          <h2>The CSS Box Model</h2>
          <p>Every HTML box has:</p>
          <ul>
            <li><strong>Content</strong>: the content</li>
            <li><strong>Padding</strong>: space inside the border</li>
            <li><strong>Border</strong>: the border itself</li>
            <li><strong>Margin</strong>: space outside the border</li>
          </ul>
          <pre><code>div {
  margin: 10px;
  border: 2px solid black;
  padding: 5px;
}</code></pre>
        `,
          quiz: [
            {
              question: "Which layer is between content and border?",
              options: ["Padding", "Margin", "Outline"],
              correct: 0
            }
          ]
        },
        {
          id: "css-colors",
          title: "Colors in CSS",
          content: `
          <h2>Colors</h2>
          <p>You can set colors using names, hex codes, rgb and rgba.</p>
          <pre><code>color: red;
background-color: #00ff00;
border-color: rgb(0,0,255);
opacity: 0.5;</code></pre>
        `,
          quiz: [
            {
              question: "How do you represent blue in hex?",
              options: ["#0000ff", "#ff0000", "#00ff00"],
              correct: 0
            }
          ]
        },
        {
          id: "css-fonts",
          title: "Fonts and text",
          content: `
          <h2>Fonts and text</h2>
          <p>Adjust fonts, size, color and alignment.</p>
          <pre><code>font-family: Arial, sans-serif;
font-size: 16px;
color: navy;
text-align: center;</code></pre>
        `,
          quiz: [
            {
              question: "Which CSS property changes the font family?",
              options: ["font-family", "font-style", "font-weight"],
              correct: 0
            }
          ]
        },
        {
          id: "css-layout",
          title: "Layouts: display and position",
          content: `
          <h2>Layouts</h2>
          <p>With <code>display</code> you decide if an element is inline or block.</p>
          <p><code>position</code> determines how an element is positioned.</p>
          <pre><code>div {
  display: block;
  position: relative;
  top: 10px;
  left: 5px;
}</code></pre>
        `,
          quiz: [
            {
              question: "What does 'display: block;' do?",
              options: [
                "Element takes the whole line",
                "Element only takes space for its content",
                "Element is hidden"
              ],
              correct: 0
            }
          ]
        },
        {
          id: "css-flexbox",
          title: "Flexbox",
          content: `
          <h2>Flexbox</h2>
          <p>Flexbox is a powerful way to make layouts that are flexible and responsive.</p>
          <pre><code>container {
  display: flex;
  justify-content: center;
  align-items: center;
}</code></pre>
        `,
          quiz: [
            {
              question: "What does 'justify-content: center;' do?",
              options: [
                "Center flex-items horizontally",
                "Center text",
                "Hide the element"
              ],
              correct: 0
            }
          ]
        },
        {
          id: "css-grid",
          title: "CSS Grid",
          content: `
          <h2>CSS Grid</h2>
          <p>Grid is a layout system with rows and columns for complex designs.</p>
          <pre><code>container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-gap: 10px;
}</code></pre>
        `,
          quiz: [
            {
              question: "What does 'grid-template-columns: 1fr 2fr 1fr;' do?",
              options: [
                "Creates 3 columns with widths in ratio 1:2:1",
                "Changes the row height",
                "Hides a column"
              ],
              correct: 0
            }
          ]
        },
        {
          id: "css-mediaqueries",
          title: "Media Queries",
          content: `
          <h2>Media Queries</h2>
          <p>With media queries you adapt your design for different screen sizes (responsive design).</p>
          <pre><code>@media (max-width: 600px) {
  body {
    background-color: lightgray;
  }
}</code></pre>
        `,
          quiz: [
            {
              question: "What does a media query do?",
              options: [
                "Adjusts styles based on screen size",
                "Adds animations",
                "Changes HTML structure"
              ],
              correct: 0
            }
          ]
        },
        {
          id: "css-animations",
          title: "Animations and Transitions",
          content: `
          <h2>Animations</h2>
          <p>With <code>transition</code> and <code>@keyframes</code> you create animations.</p>
          <pre><code>div {
  transition: background-color 0.5s ease;
}
div:hover {
  background-color: blue;
}</code></pre>
        `,
          quiz: [
            {
              question: "What does 'transition: background-color 0.5s;' do?",
              options: [
                "Makes the color change slowly",
                "Changes the color immediately",
                "Hides the element"
              ],
              correct: 0
            }
          ]
        }
      ]
    },

    // ================= JavaScript =================
    {
      id: "javascript",
      title: "JavaScript",
      lessons: [
        {
          id: "js-intro",
          title: "What is JavaScript?",
          content: `
          <h2>What is JavaScript?</h2>
          <p>JavaScript makes websites interactive. You can make buttons work, change text, create animations, and more.</p>
          <pre><code>alert("Hello world!");</code></pre>
        `,
          quiz: [
            {
              question: "What does JavaScript do?",
              options: [
                "Defines the structure of the page",
                "Adds styling",
                "Makes the page interactive"
              ],
              correct: 2
            }
          ]
        },
        {
          id: "js-variables",
          title: "Variables",
          content: `
          <h2>Variables</h2>
          <p>Variables are places to store data.</p>
          <pre><code>let name = "John";
const age = 25;</code></pre>
        `,
          quiz: [
            {
              question: "How do you declare a variable you can change later?",
              options: ["let", "const", "var"],
              correct: 0
            }
          ]
        },
        {
          id: "js-operators",
          title: "Operators",
          content: `
          <h2>Operators</h2>
          <p>With operators you can calculate and compare.</p>
          <pre><code>let x = 10 + 5;
let bigger = x > 10;</code></pre>
        `,
          quiz: [
            {
              question: "What is the result of 5 + 3?",
              options: ["8", "53", "error"],
              correct: 0
            }
          ]
        },
        {
          id: "js-conditionals",
          title: "Conditional logic",
          content: `
          <h2>If and else</h2>
          <p>You can run code if a condition is met.</p>
          <pre><code>if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Underage");
}</code></pre>
        `,
          quiz: [
            {
              question: "What is shown if age is 16?",
              options: ["Underage", "Adult", "Nothing"],
              correct: 0
            }
          ]
        },
        {
          id: "js-loops",
          title: "Loops",
          content: `
          <h2>Loops</h2>
          <p>With loops you repeat code.</p>
          <pre><code>for(let i = 0; i < 5; i++) {
  console.log(i);
}</code></pre>
        `,
          quiz: [
            {
              question: "How many times is console.log called?",
              options: ["5 times", "1 time", "10 times"],
              correct: 0
            }
          ]
        },
        {
          id: "js-functions",
          title: "Functions",
          content: `
          <h2>Functions</h2>
          <p>Functions are reusable blocks of code.</p>
          <pre><code>function greet(name) {
  console.log("Hello " + name);
}
greet("John");</code></pre>
        `,
          quiz: [
            {
              question: "What does greet('John') do?",
              options: ["Shows 'Hello John'", "Creates a new variable", "Gives an error"],
              correct: 0
            }
          ]
        },
        {
          id: "js-arrays",
          title: "Arrays",
          content: `
          <h2>Arrays</h2>
          <p>Arrays are lists of data.</p>
          <pre><code>let colors = ["red", "green", "blue"];
console.log(colors[1]); // 'green'</code></pre>
        `,
          quiz: [
            {
              question: "What does colors[2] return?",
              options: ["blue", "green", "red"],
              correct: 0
            }
          ]
        },
        {
          id: "js-objects",
          title: "Objects",
          content: `
          <h2>Objects</h2>
          <p>Objects contain properties.</p>
          <pre><code>let person = {
  name: "John",
  age: 25
};
console.log(person.name); // John</code></pre>
        `,
          quiz: [
            {
              question: "How do you get the name from 'person'?",
              options: ["person.name", "person['name']", "Both"],
              correct: 2
            }
          ]
        },
        {
          id: "js-dom",
          title: "DOM manipulation",
          content: `
          <h2>DOM manipulation</h2>
          <p>With JavaScript you can change elements on the page.</p>
          <pre><code>document.getElementById("title").textContent = "New text";</code></pre>
        `,
          quiz: [
            {
              question: "What does getElementById do?",
              options: ["Finds the element with the given id", "Changes all text", "Creates a new element"],
              correct: 0
            }
          ]
        },
        {
          id: "js-events",
          title: "Events",
          content: `
          <h2>Events</h2>
          <p>Events react to actions like clicks.</p>
          <pre><code>document.getElementById("button").addEventListener("click", function() {
  alert("Clicked!");
});</code></pre>
        `,
          quiz: [
            {
              question: "What happens when clicking the button?",
              options: ["Shows an alert", "Nothing", "Error"],
              correct: 0
            }
          ]
        },
        {
          id: "js-classes",
          title: "Classes and OOP",
          content: `
          <h2>Classes</h2>
          <p>Classes are blueprints for objects.</p>
          <pre><code>class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log("Hello " + this.name);
  }
}
let p = new Person("John");
p.greet();</code></pre>
        `,
          quiz: [
            {
              question: "What does p.greet() do?",
              options: ["Shows 'Hello John'", "Creates a new object", "Gives an error"],
              correct: 0
            }
          ]
        }
      ]
    },

    // ================= Python =================
    {
      id: "python",
      title: "Python",
      lessons: [
        {
          id: "python-intro",
          title: "What is Python?",
          content: `
          <h2>What is Python?</h2>
          <p>Python is an easy-to-learn programming language used for web, data and automation.</p>
          <pre><code>print("Hello world!")</code></pre>
        `,
          quiz: [
            {
              question: "What does print() do?",
              options: ["Shows text on screen", "Starts a program", "Saves data"],
              correct: 0
            }
          ]
        },
        {
          id: "python-variables",
          title: "Variables",
          content: `
          <h2>Variables</h2>
          <p>Store data without declaring the type.</p>
          <pre><code>name = "John"
age = 25</code></pre>
        `,
          quiz: [
            {
              question: "How do you declare a variable in Python?",
              options: ["name = 'John'", "let name = 'John'", "var name = 'John'"],
              correct: 0
            }
          ]
        },
        {
          id: "python-types",
          title: "Data types",
          content: `
          <h2>Data types</h2>
          <p>Examples: string, int, float, bool.</p>
          <pre><code>name = "John"
age = 25
is_student = True
price = 19.99</code></pre>
        `,
          quiz: [
            {
              question: "What is a boolean value?",
              options: ["True or False", "1 or 0", "Text"],
              correct: 0
            }
          ]
        },
        {
          id: "python-input",
          title: "Input and output",
          content: `
          <h2>Input and output</h2>
          <p>Use input() to ask for data, use print() to show data.</p>
          <pre><code>name = input("What is your name? ")
print("Hello " + name)</code></pre>
        `,
          quiz: [
            {
              question: "What does input() do?",
              options: ["Asks the user for text", "Shows text", "Starts a program"],
              correct: 0
            }
          ]
        },
        {
          id: "python-conditionals",
          title: "Conditional statements",
          content: `
          <h2>If and else</h2>
          <pre><code>if age >= 18:
    print("Adult")
else:
    print("Underage")</code></pre>
        `,
          quiz: [
            {
              question: "What is shown if age is 16?",
              options: ["Underage", "Adult", "Nothing"],
              correct: 0
            }
          ]
        },
        {
          id: "python-loops",
          title: "Loops",
          content: `
          <h2>Loops</h2>
          <pre><code>for i in range(5):
    print(i)</code></pre>
        `,
          quiz: [
            {
              question: "How many times is print(i) executed?",
              options: ["5 times", "1 time", "10 times"],
              correct: 0
            }
          ]
        },
        {
          id: "python-functions",
          title: "Functions",
          content: `
          <h2>Functions</h2>
          <pre><code>def greet(name):
    print("Hello " + name)

greet("John")</code></pre>
        `,
          quiz: [
            {
              question: "What does greet('John') do?",
              options: ["Shows 'Hello John'", "Creates a variable", "Gives an error"],
              correct: 0
            }
          ]
        },
        {
          id: "python-lists",
          title: "Lists",
          content: `
          <h2>Lists</h2>
          <pre><code>colors = ["red", "green", "blue"]
print(colors[1]) # green</code></pre>
        `,
          quiz: [
            {
              question: "What does colors[2] return?",
              options: ["blue", "green", "red"],
              correct: 0
            }
          ]
        },
        {
          id: "python-dictionaries",
          title: "Dictionaries",
          content: `
          <h2>Dictionaries</h2>
          <pre><code>person = {"name": "John", "age": 25}
print(person["name"]) # John</code></pre>
        `,
          quiz: [
            {
              question: "How do you get 'name' from a dictionary?",
              options: ["person['name']", "person.name", "person(nam)"],
              correct: 0
            }
          ]
        },
        {
          id: "python-classes",
          title: "Classes",
          content: `
          <h2>Classes and Objects</h2>
          <pre><code>class Person:
    def __init__(self, name):
        self.name = name

    def greet(self):
        print("Hello " + self.name)

p = Person("John")
p.greet()</code></pre>
        `,
          quiz: [
            {
              question: "What does p.greet() do?",
              options: ["Shows 'Hello John'", "Creates a new object", "Gives an error"],
              correct: 0
            }
          ]
        },
        {
          id: "python-files",
          title: "Reading and writing files",
          content: `
          <h2>File operations</h2>
          <pre><code>with open("file.txt", "w") as f:
    f.write("Hello world!")</code></pre>
        `,
          quiz: [
            {
              question: "What does open('file.txt', 'w') do?",
              options: ["Opens the file for writing", "Reads the file", "Deletes the file"],
              correct: 0
            }
          ]
        }
      ]
    },

    // ================= Cybersecurity =================
    {
      id: "cybersecurity",
      title: "Cybersecurity",
      lessons: [
        {
          id: "phishing-mail-1",
          title: "Exercise: recognize the phishing email",
          content: `
            <p>Please review the email below carefully. Click on any suspicious elements.</p>
            <div id="mail-exercise-root" class="mail-view"></div>
          `,
          quiz: [
            {
              type: "mail",
              mailHtml: `
                <div class="mail-view">
                  <div class="mail-toolbar"></div>

                  <div class="mail-headers">
                    <div>
                      <strong>From:</strong>
                      <span data-id="from" class="mail-element">support@apple-free-gift.ru</span>
                    </div>
                    <div>
                      <strong>To:</strong>
                      <span data-id="to" class="mail-element">My@example.com</span>
                    </div>
                    <div class="mail-subject">
                      <span data-id="subject" class="mail-element">Your Apple account will be closed!</span>
                    </div>
                  </div>

                  <div class="mail-body">
                    <p>
                      <span data-id="dear_user" class="mail-element">Dear user,</span>
                    </p>

                    <p>
                      <span data-id="suspicious_activity" class="mail-element">
                        We have detected suspicious activity on your account.
                      </span>
                    </p>

                    <p>
                      <span data-id="deadline_warning" class="mail-element">
                        If you do not respond within 24 hours by clicking on the link below, your account will be closed immediately.
                      </span>
                    </p>

                    <p>
                      <span data-id="protect_phrase" class="mail-element">To protect your account,</span>
                      <span data-id="click_link" class="mail-element">
                        click http://apple-secure-login-verify.com and enter your details.
                      </span>
                    </p>

                    <p>
                      <span data-id="signature" class="mail-element">Yours sincerely, Apple Support Team</span>
                    </p>
                  </div>
                </div>
              `,
              elements: [
                { id: "from", selector: '[data-id="from"]', correct: true, explain: "Suspicious email domain (not apple.com)." },
                { id: "to", selector: '[data-id="to"]', correct: false, explain: "Your own email address is safe." },
                { id: "subject", selector: '[data-id="subject"]', correct: true, explain: "Alarmist subject line to create urgency." },
                { id: "dear_user", selector: '[data-id="dear_user"]', correct: false, explain: "Generic greeting — common in phishing but not always decisive." },
                { id: "suspicious_activity", selector: '[data-id="suspicious_activity"]', correct: true, explain: "Claims of suspicious activity to create fear and rush the user." },
                { id: "deadline_warning", selector: '[data-id="deadline_warning"]', correct: true, explain: "Creates urgency and pressure to click — common phishing tactic." },
                { id: "protect_phrase", selector: '[data-id="protect_phrase"]', correct: true, explain: "Asks you to take action 'to protect' — often used to push users to click." },
                { id: "click_link", selector: '[data-id="click_link"]', correct: true, explain: "Contains an external URL and instruction to enter details — never do this for suspicious mails." },
                { id: "signature", selector: '[data-id="signature"]', correct: false, explain: "Signature looks official but isn't proof of legitimacy." }
              ]
            }
          ]
        }
      ]
    }
  ];

