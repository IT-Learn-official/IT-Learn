const modulesData =

  // ================= HTML =================
  [
    {
      id: "html",
      title: "HTML",
      lessons: [
        {
          id: "html_headings",
          title: "Headings",
          content: `
          <div class="lesson-layout">
            <!-- Uitleg links -->
            <div class="lesson-explanation">
              <h2>HTML Headings</h2>
              <p>
                HTML headings allow you to create titles and subtitles on a webpage.
                There are six levels: <code>&lt;h1&gt;</code> tot <code>&lt;h6&gt;</code>.
              </p>
              <pre><code>&lt;h1&gt;This is a heading&lt;/h1&gt;</code></pre>
            </div>

            <!-- Editor in het midden -->
            <div class="lesson-editor">
              <textarea id="code-editor-html-headings">
<h1>My first heading</h1>
<p>This is a paragraph.</p>
              </textarea>
              <button onclick="runCode('html-headings')">▶ Run</button>
            </div>

            <!-- Output rechts -->
            <div class="lesson-output">
              <iframe id="output-frame-html-headings"></iframe>
            </div>
          </div>
        `
        }
        ,

        {
          id: "html-tags",
          title: "Important HTML tags",
          content: `
          <h2>Commonly used HTML tags</h2>
          <ul>
            <li>&lt;h1&gt; t/m &lt;h6&gt;: Headers</li>
            <li>&lt;p&gt;: Paragraph</li>
            <li>&lt;a href=\"url\"&gt;: Link</li>
            <li>&lt;img src=\"afbeelding.jpg\" alt=\"description\"&gt;: picture</li>
            <li>&lt;ul&gt; en &lt;ol&gt;: Lists</li>
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
          <p>Attributes provide additional information to tags, such as<code>href</code> at URL's or <code>alt</code> at pictures.</p>
          <pre><code>&lt;a href="https://example.com"&gt;Visit site&lt;/a&gt;
          &lt;img src="foto.jpg" alt="My picture"&gt;</code></pre>
        `,
          quiz: [
            {
              question: "What does the 'alt' attribute do on an image?",
              options: [
                "Provides alternative text for screen readers",
                "Changes the image",
                "Adds a link",
              ],
              correct: 0
            }
          ]
        },
        {
          id: "html-links",
          title: "Hyperlinks",
          content: `
          <h2>Hyperlinks</h2>
          <p>With the<code>&lt;a&gt;</code> tag you create links to other pages or websites.</p>
          <pre><code>&lt;a href="https://google.com"&gt;Google&lt;/a&gt;</code></pre>
        `,
          quiz: [
            {
              question: "How to create a URL to https://google.com?",
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
          title: "Add images",
          content: `
          <h2>Images</h2>
          <p>With the <code>&lt;img&gt;</code> tag you add an image.</p>
          <pre><code>&lt;img src="foto.jpg" alt="Description"&gt;</code></pre>
        `,
          quiz: [
            {
              question: "What is required for an image for accessibility?",
              options: ["alt attribute", "title attribute", "href attribute"],
              correct: 0
            }
          ]
        },
        {
          id: "html-lijsten",
          title: "Create lists",
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
              question: "What tag do you use for a list item?",
              options: ["&lt;li&gt;", "&lt;ul&gt;", "&lt;ol&gt;"],
              correct: 0
            }
          ]
        },
        {
          id: "html-tables",
          title: "Create tables",
          content: `
          <h2>Tables</h2>
          <p>Use <code>&lt;table&gt;</code> with rows (<code>&lt;tr&gt;</code>) and cells (<code>&lt;td&gt;</code> and <code>&lt;th&gt;</code>).</p>
          <pre><code>&lt;table&gt;
  &lt;tr&gt;
    &lt;th&gt;Name&lt;/th&gt;
    &lt;th&gt;Age&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Jan&lt;/td&gt;
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
          <p>Forms allow the user to enter data.</p>
          <pre><code>&lt;form action='/submit' method='post'&gt;
  &lt;label&gt;Name:&lt;/label&gt;
  &lt;input type='text' name='name'&gt;
  &lt;input type='submit' value='Submit'&gt;
&lt;/form&gt;</code></pre>
        `,
          quiz: [
            {
              question: "Welke tag gebruik je voor invoervelden?",
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
          <p>Use tags that indicate the meaning of content, such as <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code> and <code>&lt;footer&gt;</code>.</p>
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
          title: "Add media",
          content: `
          <h2>Audio and Video</h2>
          <p>HTML supports audio and video with the respective <code>&lt;audio&gt;</code> and <code>&lt;video&gt;</code> tags.</p>
          <pre><code>&lt;video controls&gt;
  &lt;source src="video.mp4" type="video/mp4"&gt;
&lt;/video&gt;</code></pre>
        `,
          quiz: [
            {
              question: "What tag do you use to add video?",
              options: ["&lt;video&gt;", "&lt;img&gt;", "&lt;media&gt;"],
              correct: 0
            }
          ]
        },
        {
          id: "html-accessibility",
          title: "Accessibility",
          content: `
          <h2>Accessiblity</h2>
          <p>Use alt text, tags, and ARIA attributes to make websites accessible to everyone.</p>
          <pre><code>&lt;img src='foto.jpg' alt='Description of the image'&gt;</code></pre>
        `,
          quiz: [
            {
              question: "Why use alt text?",
              options: [
                "For screen readers and search engines",
                "For styling",
                "For animations"
              ],
              correct: 0
            }
          ]
        }
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
          <p>CSS determines the visual style of your website: colors, fonts, spacing, and layout.</p>
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
                "Determine page structure",
                "Determine page layout and style",
                "Make page interactive"
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
          <p>Selectors let you choose which HTML elements you want to style: tags, classes, and IDs.</p>
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
          <p>Each HTML box has:</p>
          <ul>
            <li><strong>Content</strong>: the content</li>
            <li><strong>Padding</strong>: space within the border</li>
            <li><strong>Border</strong>: the edge itself</li>
            <li><strong>Margin</strong>: space outside the edge</li>
          </ul>
          <pre><code>div {
  margin: 10px;
  border: 2px solid black;
  padding: 5px;
}</code></pre>
        `,
          quiz: [
            {
              question: "What layer is between content and border?",
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
          <p>You can set colors with names, hex codes, rgb and rgba.</p>
          <pre><code>color: red;
background-color: #00ff00;
border-color: rgb(0,0,255);
opacity: 0.5;</code></pre>
        `,
          quiz: [
            {
              question: "How do you specify the color blue in hex code?",
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
          <p>Customize fonts, size, color, and alignment.</p>
          <pre><code>font-family: Arial, sans-serif;
font-size: 16px;
color: navy;
text-align: center;</code></pre>
        `,
          quiz: [
            {
              question: "Which CSS property changes the font?",
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
          <p>With <code>display</code> determine whether an element is inline or block.</p>
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
              question: "What does a 'display: block;'?",
              options: [
                "Element takes up entire line",
                "Element only takes space from content",
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
          <p>Flexbox is a powerful way to create layouts that are flexible and responsive.</p>
          <pre><code>container {
  display: flex;
  justify-content: center;
  align-items: center;
}</code></pre>
        `,
          quiz: [
            {
              question: "What does a 'justify-content: center;'?",
              options: [
                "Center align flex items horizontally",
                "Center align text",
                "Hide element"
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
          <p>Grid is a row-and-column layout system for complex designs.</p>
          <pre><code>container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-gap: 10px;
}</code></pre>
        `,
          quiz: [
            {
              question: "What does a 'grid-template-columns: 1fr 2fr 1fr;'?",
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
          <p>With media queries you can adapt your design for different screen sizes (responsive design).</p>
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
                "Adjusts style depending on screen size",
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
          <h2>Animaties</h2>
          <p>With <code>transition</code> and <code>@keyframes</code> you make animations.</p>
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
                "Allow color to change slowly",
                "Changes color instantly",
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
          title: "Wat is JavaScript?",
          content: `
          <h2>Wat is JavaScript?</h2>
          <p>JavaScript maakt websites interactief. Je kunt knoppen laten werken, teksten aanpassen, animaties maken, en meer.</p>
          <pre><code>alert("Hallo wereld!");</code></pre>
        `,
          quiz: [
            {
              question: "Wat doet JavaScript?",
              options: [
                "Bepaalt structuur van pagina",
                "Voegt stijl toe",
                "Maakt pagina interactief"
              ],
              correct: 2
            }
          ]
        },
        {
          id: "js-variables",
          title: "Variabelen",
          content: `
          <h2>Variabelen</h2>
          <p>Variabelen zijn plekken om data op te slaan.</p>
          <pre><code>let naam = "Jan";
const leeftijd = 25;</code></pre>
        `,
          quiz: [
            {
              question: "Hoe declareer je een variabele die je later kunt veranderen?",
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
          <p>Met operators kun je rekenen en vergelijken.</p>
          <pre><code>let x = 10 + 5;
let groter = x > 10;</code></pre>
        `,
          quiz: [
            {
              question: "Wat is het resultaat van 5 + 3?",
              options: ["8", "53", "fout"],
              correct: 0
            }
          ]
        },
        {
          id: "js-conditionals",
          title: "Voorwaardelijke logica",
          content: `
          <h2>If en else</h2>
          <p>Je kunt code laten uitvoeren als aan een voorwaarde voldaan wordt.</p>
          <pre><code>if (leeftijd >= 18) {
  console.log("Volwassen");
} else {
  console.log("Minderjarig");
}</code></pre>
        `,
          quiz: [
            {
              question: "Wat wordt getoond als leeftijd 16 is?",
              options: ["Minderjarig", "Volwassen", "Niets"],
              correct: 0
            }
          ]
        },
        {
          id: "js-loops",
          title: "Lussen",
          content: `
          <h2>Lussen</h2>
          <p>Met lussen herhaal je code.</p>
          <pre><code>for(let i = 0; i < 5; i++) {
  console.log(i);
}</code></pre>
        `,
          quiz: [
            {
              question: "Hoe vaak wordt console.log aangeroepen?",
              options: ["5 keer", "1 keer", "10 keer"],
              correct: 0
            }
          ]
        },
        {
          id: "js-functions",
          title: "Functies",
          content: `
          <h2>Functies</h2>
          <p>Functies zijn herbruikbare blokken code.</p>
          <pre><code>function groet(naam) {
  console.log("Hallo " + naam);
}
groet("Jan");</code></pre>
        `,
          quiz: [
            {
              question: "Wat doet groet('Jan')?",
              options: [
                "Toont 'Hallo Jan'",
                "Maakt een nieuwe variabele",
                "Geeft een foutmelding"
              ],
              correct: 0
            }
          ]
        },
        {
          id: "js-arrays",
          title: "Arrays",
          content: `
          <h2>Arrays</h2>
          <p>Arrays zijn lijsten met data.</p>
          <pre><code>let kleuren = ["rood", "groen", "blauw"];
console.log(kleuren[1]); // 'groen'</code></pre>
        `,
          quiz: [
            {
              question: "Wat geeft kleuren[2] terug?",
              options: ["blauw", "groen", "rood"],
              correct: 0
            }
          ]
        },
        {
          id: "js-objects",
          title: "Objecten",
          content: `
          <h2>Objecten</h2>
          <p>Objecten bevatten eigenschappen.</p>
          <pre><code>let persoon = {
  naam: "Jan",
  leeftijd: 25
};
console.log(persoon.naam); // Jan</code></pre>
        `,
          quiz: [
            {
              question: "Hoe haal je de naam op uit 'persoon'?",
              options: ["persoon.naam", "persoon['naam']", "Beide"],
              correct: 2
            }
          ]
        },
        {
          id: "js-dom",
          title: "DOM-manipulatie",
          content: `
          <h2>DOM-manipulatie</h2>
          <p>Met JavaScript kun je elementen in de pagina aanpassen.</p>
          <pre><code>document.getElementById("titel").textContent = "Nieuwe tekst";</code></pre>
        `,
          quiz: [
            {
              question: "Wat doet getElementById?",
              options: [
                "Zoekt element met gegeven id",
                "Verandert alle tekst",
                "Maakt een nieuw element"
              ],
              correct: 0
            }
          ]
        },
        {
          id: "js-events",
          title: "Events",
          content: `
          <h2>Events</h2>
          <p>Events reageren op acties zoals klikken.</p>
          <pre><code>document.getElementById("knop").addEventListener("click", function() {
  alert("Geklikt!");
});</code></pre>
        `,
          quiz: [
            {
              question: "Wat gebeurt er bij klikken op de knop?",
              options: ["Toont alert", "Niets", "Foutmelding"],
              correct: 0
            }
          ]
        },
        {
          id: "js-classes",
          title: "Classes en OOP",
          content: `
          <h2>Classes</h2>
          <p>Classes zijn blauwdrukken voor objecten.</p>
          <pre><code>class Persoon {
  constructor(naam) {
    this.naam = naam;
  }
  groet() {
    console.log("Hallo " + this.naam);
  }
}
let p = new Persoon("Jan");
p.groet();</code></pre>
        `,
          quiz: [
            {
              question: "Wat doet p.groet()?",
              options: ["Toont 'Hallo Jan'", "Maakt nieuw object", "Geeft fout"],
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
          title: "Wat is Python?",
          content: `
          <h2>Wat is Python?</h2>
          <p>Python is een makkelijk te leren programmeertaal, gebruikt voor web, data en automatisering.</p>
          <pre><code>print("Hallo wereld!")</code></pre>
        `,
          quiz: [
            {
              question: "Wat doet print()?",
              options: [
                "Toont tekst op scherm",
                "Start programma",
                "Slaat data op"
              ],
              correct: 0
            }
          ]
        },
        {
          id: "python-variables",
          title: "Variabelen",
          content: `
          <h2>Variabelen</h2>
          <p>Sla data op zonder type aan te geven.</p>
          <pre><code>naam = "Jan"
leeftijd = 25</code></pre>
        `,
          quiz: [
            {
              question: "Hoe declareer je een variabele in Python?",
              options: ["naam = 'Jan'", "let naam = 'Jan'", "var naam = 'Jan'"],
              correct: 0
            }
          ]
        },
        {
          id: "python-types",
          title: "Datatypes",
          content: `
          <h2>Datatypes</h2>
          <p>Voorbeelden: string, int, float, bool.</p>
          <pre><code>naam = "Jan"
leeftijd = 25
is_student = True
prijs = 19.99</code></pre>
        `,
          quiz: [
            {
              question: "Wat is een boolean waarde?",
              options: ["True of False", "1 of 0", "Tekst"],
              correct: 0
            }
          ]
        },
        {
          id: "python-input",
          title: "Input en output",
          content: `
          <h2>Input en output</h2>
          <p>Met input() vraag je data, met print() toon je data.</p>
          <pre><code>naam = input("Wat is je naam? ")
print("Hallo " + naam)</code></pre>
        `,
          quiz: [
            {
              question: "Wat doet input()?",
              options: [
                "Vraagt gebruiker om tekst",
                "Toont tekst",
                "Start programma"
              ],
              correct: 0
            }
          ]
        },
        {
          id: "python-conditionals",
          title: "Voorwaardelijke statements",
          content: `
          <h2>Als en anders</h2>
          <pre><code>if leeftijd >= 18:
    print("Volwassen")
else:
    print("Minderjarig")</code></pre>
        `,
          quiz: [
            {
              question: "Wat wordt getoond als leeftijd 16 is?",
              options: ["Minderjarig", "Volwassen", "Niets"],
              correct: 0
            }
          ]
        },
        {
          id: "python-loops",
          title: "Lussen",
          content: `
          <h2>Lussen</h2>
          <pre><code>for i in range(5):
    print(i)</code></pre>
        `,
          quiz: [
            {
              question: "Hoe vaak wordt print(i) uitgevoerd?",
              options: ["5 keer", "1 keer", "10 keer"],
              correct: 0
            }
          ]
        },
        {
          id: "python-functions",
          title: "Functies",
          content: `
          <h2>Functies</h2>
          <pre><code>def groet(naam):
    print("Hallo " + naam)

groet("Jan")</code></pre>
        `,
          quiz: [
            {
              question: "Wat doet groet('Jan')?",
              options: [
                "Toont 'Hallo Jan'",
                "Maakt variabele",
                "Geeft foutmelding"
              ],
              correct: 0
            }
          ]
        },
        {
          id: "python-lists",
          title: "Lijsten",
          content: `
          <h2>Lijsten</h2>
          <pre><code>kleuren = ["rood", "groen", "blauw"]
print(kleuren[1]) # groen</code></pre>
        `,
          quiz: [
            {
              question: "Wat geeft kleuren[2] terug?",
              options: ["blauw", "groen", "rood"],
              correct: 0
            }
          ]
        },
        {
          id: "python-dictionaries",
          title: "Woordenboeken (Dictionaries)",
          content: `
          <h2>Dictionaries</h2>
          <pre><code>persoon = {"naam": "Jan", "leeftijd": 25}
print(persoon["naam"]) # Jan</code></pre>
        `,
          quiz: [
            {
              question: "Hoe haal je 'naam' op uit een dictionary?",
              options: [
                "persoon['naam']",
                "persoon.naam",
                "persoon(nam)"
              ],
              correct: 0
            }
          ]
        },
        {
          id: "python-classes",
          title: "Klassen",
          content: `
          <h2>Klassen en Objecten</h2>
          <pre><code>class Persoon:
    def __init__(self, naam):
        self.naam = naam

    def groet(self):
        print("Hallo " + self.naam)

p = Persoon("Jan")
p.groet()</code></pre>
        `,
          quiz: [
            {
              question: "Wat doet p.groet()?",
              options: ["Toont 'Hallo Jan'", "Maakt nieuw object", "Geeft fout"],
              correct: 0
            }
          ]
        },
        {
          id: "python-files",
          title: "Bestanden lezen en schrijven",
          content: `
          <h2>Bestandsbewerking</h2>
          <pre><code>with open("bestand.txt", "w") as f:
    f.write("Hallo wereld!")</code></pre>
        `,
          quiz: [
            {
              question: "Wat doet open('bestand.txt', 'w')?",
              options: [
                "Opent bestand om te schrijven",
                "Leest bestand",
                "Verwijdert bestand"
              ],
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
                  <span data-id="from1" class="mail-element">support@apple-free-gift.ru</span>
                </div>
                <div>
                  <strong>To:</strong>
                  <span data-id="to1" class="mail-element">My@example.com</span>
                </div>
                <div class="mail-subject">
                  <span data-id="sub1" class="mail-element">Your</span>
                  <span data-id="sub2" class="mail-element">Apple</span>
                  <span data-id="sub3" class="mail-element">account</span>
                  <span data-id="sub4" class="mail-element">will</span>
                  <span data-id="sub5" class="mail-element">be</span>
                  <span data-id="sub6" class="mail-element">closed!</span>
                </div>
              </div>
              <div class="mail-body">
                <p>
                  <span data-id="p1" class="mail-element">Dear</span>
                  <span data-id="p2" class="mail-element">user,</span>
                </p>
                <p>
                  <span data-id="p3" class="mail-element">We</span>
                  <span data-id="p4" class="mail-element">have</span>
                  <span data-id="p5" class="mail-element">detected</span>
                  <span data-id="p6" class="mail-element">suspicious</span>
                  <span data-id="p7" class="mail-element">activity</span>
                  <span data-id="p8" class="mail-element">on</span>
                  <span data-id="p9" class="mail-element">your</span>
                  <span data-id="p10" class="mail-element">account.</span>
                  <span data-id="link" class="mail-element">If</span>
                  <span data-id="link2" class="mail-element">you</span>
                  <span data-id="link3" class="mail-element">do</span>
                  <span data-id="link4" class="mail-element">not</span>
                  <span data-id="link5" class="mail-element">respond</span>
                  <span data-id="link6" class="mail-element">within</span>
                  <span data-id="link7" class="mail-element">24</span>
                  <span data-id="link8" class="mail-element">hours</span>
                  <span data-id="link9" class="mail-element">by</span>
                  <span data-id="link10" class="mail-element">clicking</span>
                  <span data-id="link11" class="mail-element">on</span>
                  <span data-id="link12" class="mail-element">the</span>
                  <span data-id="link13" class="mail-element">link</span>
                  <span data-id="link14" class="mail-element">below,</span>
                  <span data-id="p11" class="mail-element">your</span>
                  <span data-id="p12" class="mail-element">account</span>
                  <span data-id="p13" class="mail-element">will</span>
                  <span data-id="p14" class="mail-element">be</span>
                  <span data-id="p15" class="mail-element">closed</span>
                  <span data-id="p16" class="mail-element">immediately.</span>
                </p>
                <p>
                  <span data-id="p17" class="mail-element">To</span>
                  <span data-id="p18" class="mail-element">protect</span>
                  <span data-id="p19" class="mail-element">your</span>
                  <span data-id="p20" class="mail-element">account,</span>
                  <span data-id="p21" class="mail-element">click</span>
                  <span data-id="link1" class="mail-element">http://apple-secure-login-verify.com</span>
                  <span data-id="p22" class="mail-element">and</span>
                  <span data-id="p23" class="mail-element">enter</span>
                  <span data-id="p24" class="mail-element">your</span>
                  <span data-id="p25" class="mail-element">details.</span>
                </p>
                <p>
                  <span data-id="p26" class="mail-element">Yours</span>
                  <span data-id="p27" class="mail-element">sincerely,</span><br>
                  <span data-id="sig" class="mail-element">Apple Support Team</span>
                </p>
              </div>
            </div>
          `,
              elements: [
                { id: "p1", selector: '[data-id="p1"]', correct: false, explain: "Common greeting, not suspicious." },
                { id: "p2", selector: '[data-id="p2"]', correct: false, explain: "Common greeting, not suspicious." },
                { id: "p3", selector: '[data-id="p3"]', correct: false, explain: "Normal wording." },
                { id: "p4", selector: '[data-id="p4"]', correct: false, explain: "Normal wording." },
                { id: "p5", selector: '[data-id="p5"]', correct: false, explain: "Normal wording." },
                { id: "p6", selector: '[data-id="p6"]', correct: false, explain: "Normal wording." },
                { id: "p7", selector: '[data-id="p7"]', correct: false, explain: "Normal wording." },
                { id: "p8", selector: '[data-id="p8"]', correct: false, explain: "Normal wording." },
                { id: "p9", selector: '[data-id="p9"]', correct: false, explain: "Normal wording." },
                { id: "p10", selector: '[data-id="p10"]', correct: false, explain: "Normal wording." },
                { id: "p11", selector: '[data-id="p11"]', correct: false, explain: "Normal wording." },
                { id: "p12", selector: '[data-id="p12"]', correct: false, explain: "Normal wording." },
                { id: "p13", selector: '[data-id="p13"]', correct: false, explain: "Normal wording." },
                { id: "p14", selector: '[data-id="p14"]', correct: false, explain: "Normal wording." },
                { id: "p15", selector: '[data-id="p15"]', correct: false, explain: "Normal wording." },
                { id: "p16", selector: '[data-id="p16"]', correct: false, explain: "Normal wording." },
                { id: "p17", selector: '[data-id="p17"]', correct: false, explain: "Normal wording." },
                { id: "p18", selector: '[data-id="p18"]', correct: false, explain: "Normal wording." },
                { id: "p19", selector: '[data-id="p19"]', correct: false, explain: "Normal wording." },
                { id: "p20", selector: '[data-id="p20"]', correct: false, explain: "Normal wording." },
                { id: "p21", selector: '[data-id="p21"]', correct: false, explain: "Normal wording." },
                { id: "p22", selector: '[data-id="p22"]', correct: false, explain: "Normal wording." },
                { id: "p23", selector: '[data-id="p23"]', correct: false, explain: "Normal wording." },
                { id: "p24", selector: '[data-id="p24"]', correct: false, explain: "Normal wording." },
                { id: "p25", selector: '[data-id="p25"]', correct: false, explain: "Normal wording." },
                { id: "p26", selector: '[data-id="p26"]', correct: false, explain: "Common closing, not suspicious." },
                { id: "p27", selector: '[data-id="p27"]', correct: false, explain: "Common closing, not suspicious." },
                { id: "link", selector: '[data-id="link"]', correct: true, explain: "Vague appeal to click with urgency — typical phishing tactic." },
                { id: "link1", selector: '[data-id="link1"]', correct: true, explain: "The URL is not the official apple.com domain." },
                { id: "sig", selector: '[data-id="sig"]', correct: false, explain: "Signature looks normal, but is not proof that everything is okay." },
                { id: "from1", selector: '[data-id="from1"]', correct: true, explain: "Suspicious email domain (not apple.com)." },
                { id: "to1", selector: '[data-id="to1"]', correct: false, explain: "Your own email address is safe." },
                { id: "sub1", selector: '[data-id="sub1"]', correct: true, explain: "Alarmist subject line to create urgency." },
                { id: "sub2", selector: '[data-id="sub2"]', correct: true, explain: "Alarmist subject line to create urgency." },
                { id: "sub3", selector: '[data-id="sub3"]', correct: true, explain: "Alarmist subject line to create urgency." },
                { id: "sub4", selector: '[data-id="sub4"]', correct: true, explain: "Alarmist subject line to create urgency." },
                { id: "sub5", selector: '[data-id="sub5"]', correct: true, explain: "Alarmist subject line to create urgency." },
                { id: "sub6", selector: '[data-id="sub6"]', correct: true, explain: "Alarmist subject line to create urgency." },
                { id: "link2", selector: '[data-id="link2"]', correct: true, explain: "Vague appeal to click with urgency — typical phishing tactic." },
                { id: "link3", selector: '[data-id="link3"]', correct: true, explain: "Vague appeal to click with urgency — typical phishing tactic." },
                { id: "link4", selector: '[data-id="link4"]', correct: true, explain: "Vague appeal to click with urgency — typical phishing tactic." },
                { id: "link5", selector: '[data-id="link5"]', correct: true, explain: "Vague appeal to click with urgency — typical phishing tactic." },
                { id: "link6", selector: '[data-id="link6"]', correct: true, explain: "Vague appeal to click with urgency — typical phishing tactic." },
                { id: "link7", selector: '[data-id="link7"]', correct: true, explain: "Vague appeal to click with urgency — typical phishing tactic." },
                { id: "link8", selector: '[data-id="link8"]', correct: true, explain: "Vague appeal to click with urgency — typical phishing tactic." },
                { id: "link9", selector: '[data-id="link9"]', correct: true, explain: "Vague appeal to click with urgency — typical phishing tactic." },
                { id: "link10", selector: '[data-id="link10"]', correct: true, explain: "Vague appeal to click with urgency — typical phishing tactic." },
                { id: "link11", selector: '[data-id="link11"]', correct: true, explain: "Vague appeal to click with urgency — typical phishing tactic." },
                { id: "link12", selector: '[data-id="link12"]', correct: true, explain: "Vague appeal to click with urgency — typical phishing tactic." },
                { id: "link13", selector: '[data-id="link13"]', correct: true, explain: "The URL is not the official apple.com domain." },
                { id: "link14", selector: '[data-id="link14"]', correct: true, explain: "The URL is not the official apple.com domain." },

              ]
            }
          ]
        }
      ]
    }
  ]

// Map van id → correct/fout
const elementCorrectMap = {};
quiz[0].elements.forEach(item => {
  elementCorrectMap[item.id] = item.correct;
});

// Click-event
document.querySelectorAll(".mail-element").forEach(el => {
  el.addEventListener("click", () => {
    el.classList.toggle("selected");
    el.classList.remove("correct", "incorrect");

    const id = el.dataset.id;
    if (el.classList.contains("selected")) {
      if (elementCorrectMap[id]) {
        el.classList.add("correct");   // correct element
      } else {
        el.classList.add("incorrect"); // fout element
      }
    }
  });
});
