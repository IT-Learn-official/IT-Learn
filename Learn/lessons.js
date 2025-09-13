const modulesData = [
  // ================= HTML =================
  {
    id: "html",
    title: "HTML",
    lessons: [
      {
        id: "html-intro",
        title: "Wat is HTML?",
        content: `
          <h2>Wat is HTML?</h2>
          <p>HTML is de taal om webpagina's te maken. Het bepaalt de structuur en inhoud van een pagina met tags.</p>
          <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;&lt;title&gt;Titel&lt;/title&gt;&lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hallo wereld!&lt;/h1&gt;
    &lt;p&gt;Dit is een paragraaf.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
        `,
        quiz: [
          {
            question: "Wat doet HTML?",
            options: [
              "Bepaalt structuur van pagina",
              "Bepaalt kleuren van pagina",
              "Maakt pagina interactief"
            ],
            correct: 0
          }
        ]
      },
      {
        id: "html-tags",
        title: "Belangrijke HTML-tags",
        content: `
          <h2>Veelgebruikte HTML-tags</h2>
          <ul>
            <li>&lt;h1&gt; t/m &lt;h6&gt;: Kopteksten</li>
            <li>&lt;p&gt;: Paragraaf</li>
            <li>&lt;a href=\"url\"&gt;: Link</li>
            <li>&lt;img src=\"afbeelding.jpg\" alt=\"beschrijving\"&gt;: Afbeelding</li>
            <li>&lt;ul&gt; en &lt;ol&gt;: Lijsten</li>
            <li>&lt;form&gt;: Formulier</li>
          </ul>
        `,
        quiz: [
          {
            question: "Welke tag is voor een hyperlink?",
            options: ["&lt;a&gt;", "&lt;img&gt;", "&lt;div&gt;"],
            correct: 0
          }
        ]
      },
      {
        id: "html-attributes",
        title: "HTML attributen",
        content: `
          <h2>Wat zijn attributen?</h2>
          <p>Attributen geven extra informatie aan tags, zoals <code>href</code> bij links of <code>alt</code> bij afbeeldingen.</p>
          <pre><code>&lt;a href="https://example.com"&gt;Bezoek site&lt;/a&gt;
&lt;img src="foto.jpg" alt="Mijn foto"&gt;</code></pre>
        `,
        quiz: [
          {
            question: "Wat doet het 'alt' attribuut bij een afbeelding?",
            options: [
              "Geeft een alternatieve tekst voor schermlezers",
              "Verandert de afbeelding",
              "Voegt een link toe"
            ],
            correct: 0
          }
        ]
      },
      {
        id: "html-links",
        title: "Links maken",
        content: `
          <h2>Hyperlinks</h2>
          <p>Met de <code>&lt;a&gt;</code> tag maak je links naar andere pagina's of websites.</p>
          <pre><code>&lt;a href="https://google.com"&gt;Google&lt;/a&gt;</code></pre>
        `,
        quiz: [
          {
            question: "Hoe maak je een link naar https://google.com?",
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
        title: "Afbeeldingen toevoegen",
        content: `
          <h2>Afbeeldingen</h2>
          <p>Met de <code>&lt;img&gt;</code> tag voeg je een afbeelding toe.</p>
          <pre><code>&lt;img src="foto.jpg" alt="Beschrijving"&gt;</code></pre>
        `,
        quiz: [
          {
            question: "Wat is verplicht bij een afbeelding voor toegankelijkheid?",
            options: ["alt attribuut", "title attribuut", "href attribuut"],
            correct: 0
          }
        ]
      },
      {
        id: "html-lijsten",
        title: "Lijsten maken",
        content: `
          <h2>Lijsten</h2>
          <p>Er zijn ongeordende lijsten (<code>&lt;ul&gt;</code>) en geordende lijsten (<code>&lt;ol&gt;</code>).</p>
          <pre><code>&lt;ul&gt;
  &lt;li&gt;Item 1&lt;/li&gt;
  &lt;li&gt;Item 2&lt;/li&gt;
&lt;/ul&gt;</code></pre>
        `,
        quiz: [
          {
            question: "Welke tag gebruik je voor een lijstitem?",
            options: ["&lt;li&gt;", "&lt;ul&gt;", "&lt;ol&gt;"],
            correct: 0
          }
        ]
      },
      {
        id: "html-tables",
        title: "Tabellen maken",
        content: `
          <h2>Tabellen</h2>
          <p>Gebruik <code>&lt;table&gt;</code> met rijen (<code>&lt;tr&gt;</code>) en cellen (<code>&lt;td&gt;</code> en <code>&lt;th&gt;</code>).</p>
          <pre><code>&lt;table&gt;
  &lt;tr&gt;
    &lt;th&gt;Naam&lt;/th&gt;
    &lt;th&gt;Leeftijd&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Jan&lt;/td&gt;
    &lt;td&gt;25&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</code></pre>
        `,
        quiz: [
          {
            question: "Welke tag gebruik je voor een kopcel in een tabel?",
            options: ["&lt;th&gt;", "&lt;td&gt;", "&lt;tr&gt;"],
            correct: 0
          }
        ]
      },
      {
        id: "html-forms",
        title: "Formulieren",
        content: `
          <h2>Formulieren</h2>
          <p>Met formulieren kan de gebruiker data invoeren.</p>
          <pre><code>&lt;form action='/submit' method='post'&gt;
  &lt;label&gt;Naam:&lt;/label&gt;
  &lt;input type='text' name='naam'&gt;
  &lt;input type='submit' value='Verstuur'&gt;
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
        title: "Semantische tags",
        content: `
          <h2>Semantische HTML</h2>
          <p>Gebruik tags die de betekenis van content aangeven, zoals <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code> en <code>&lt;footer&gt;</code>.</p>
        `,
        quiz: [
          {
            question: "Welke tag gebruik je voor de navigatie?",
            options: ["&lt;nav&gt;", "&lt;div&gt;", "&lt;header&gt;"],
            correct: 0
          }
        ]
      },
      {
        id: "html-media",
        title: "Media toevoegen",
        content: `
          <h2>Audio en Video</h2>
          <p>HTML ondersteunt audio en video met respectievelijk de <code>&lt;audio&gt;</code> en <code>&lt;video&gt;</code> tags.</p>
          <pre><code>&lt;video controls&gt;
  &lt;source src="video.mp4" type="video/mp4"&gt;
&lt;/video&gt;</code></pre>
        `,
        quiz: [
          {
            question: "Welke tag gebruik je om video toe te voegen?",
            options: ["&lt;video&gt;", "&lt;img&gt;", "&lt;media&gt;"],
            correct: 0
          }
        ]
      },
      {
        id: "html-accessibility",
        title: "Toegankelijkheid",
        content: `
          <h2>Toegankelijkheid</h2>
          <p>Gebruik alt-teksten, labels, en ARIA-attributes om websites toegankelijk te maken voor iedereen.</p>
          <pre><code>&lt;img src='foto.jpg' alt='Beschrijving van de afbeelding'&gt;</code></pre>
        `,
        quiz: [
          {
            question: "Waarom gebruik je alt-teksten?",
            options: [
              "Voor schermlezers en zoekmachines",
              "Voor styling",
              "Voor animaties"
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
        title: "Introductie tot CSS",
        content: `
          <h2>Wat is CSS?</h2>
          <p>CSS bepaalt de visuele stijl van je website: kleuren, lettertypes, afstanden, en layout.</p>
          <pre><code>body {
  background-color: #f0f0f0;
  color: navy;
  font-family: Arial, sans-serif;
}</code></pre>
        `,
        quiz: [
          {
            question: "Waarvoor gebruik je CSS?",
            options: [
              "Structuur van pagina bepalen",
              "Opmaak en stijl van pagina bepalen",
              "Pagina interactief maken"
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
          <p>Met selectors kies je welke HTML-elementen je wilt stijlen: tags, classes en id's.</p>
          <ul>
            <li>Element selector: <code>p {}</code></li>
            <li>Class selector: <code>.menu {}</code></li>
            <li>ID selector: <code>#header {}</code></li>
          </ul>
        `,
        quiz: [
          {
            question: "Hoe selecteer je elementen met class 'menu'?",
            options: [".menu", "#menu", "menu"],
            correct: 0
          }
        ]
      },
      {
        id: "css-boxmodel",
        title: "Het CSS Box Model",
        content: `
          <h2>Het CSS Box Model</h2>
          <p>Elke HTML-box heeft:</p>
          <ul>
            <li><strong>Content</strong>: de inhoud</li>
            <li><strong>Padding</strong>: ruimte binnen de rand</li>
            <li><strong>Border</strong>: de rand zelf</li>
            <li><strong>Margin</strong>: ruimte buiten de rand</li>
          </ul>
          <pre><code>div {
  margin: 10px;
  border: 2px solid black;
  padding: 5px;
}</code></pre>
        `,
        quiz: [
          {
            question: "Welke laag zit tussen content en border?",
            options: ["Padding", "Margin", "Outline"],
            correct: 0
          }
        ]
      },
      {
        id: "css-colors",
        title: "Kleuren in CSS",
        content: `
          <h2>Kleuren</h2>
          <p>Je kunt kleuren instellen met namen, hexcodes, rgb en rgba.</p>
          <pre><code>color: red;
background-color: #00ff00;
border-color: rgb(0,0,255);
opacity: 0.5;</code></pre>
        `,
        quiz: [
          {
            question: "Hoe geef je de kleur blauw in hexcode?",
            options: ["#0000ff", "#ff0000", "#00ff00"],
            correct: 0
          }
        ]
      },
      {
        id: "css-fonts",
        title: "Lettertypes en tekst",
        content: `
          <h2>Lettertypes en tekst</h2>
          <p>Pas lettertypes, grootte, kleur en uitlijning aan.</p>
          <pre><code>font-family: Arial, sans-serif;
font-size: 16px;
color: navy;
text-align: center;</code></pre>
        `,
        quiz: [
          {
            question: "Welke CSS-eigenschap verandert het lettertype?",
            options: ["font-family", "font-style", "font-weight"],
            correct: 0
          }
        ]
      },
      {
        id: "css-layout",
        title: "Layouts: display en position",
        content: `
          <h2>Layouts</h2>
          <p>Met <code>display</code> bepaal je of een element inline of block is.</p>
          <p><code>position</code> bepaalt hoe een element gepositioneerd wordt.</p>
          <pre><code>div {
  display: block;
  position: relative;
  top: 10px;
  left: 5px;
}</code></pre>
        `,
        quiz: [
          {
            question: "Wat doet 'display: block;'?",
            options: [
              "Element neemt hele regel in",
              "Element neemt alleen ruimte van inhoud",
              "Element wordt verborgen"
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
          <p>Flexbox is een krachtige manier om layouts te maken die flexibel en responsief zijn.</p>
          <pre><code>container {
  display: flex;
  justify-content: center;
  align-items: center;
}</code></pre>
        `,
        quiz: [
          {
            question: "Wat doet 'justify-content: center;'?",
            options: [
              "Centraal uitlijnen van flex-items horizontaal",
              "Centraal uitlijnen van tekst",
              "Element verbergen"
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
          <p>Grid is een layoutsysteem met rijen en kolommen voor complexe designs.</p>
          <pre><code>container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-gap: 10px;
}</code></pre>
        `,
        quiz: [
          {
            question: "Wat doet 'grid-template-columns: 1fr 2fr 1fr;'?",
            options: [
              "Maakt 3 kolommen met breedtes in verhouding 1:2:1",
              "Verandert de rijhoogte",
              "Verbergt een kolom"
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
          <p>Met media queries pas je je design aan voor verschillende schermgroottes (responsief design).</p>
          <pre><code>@media (max-width: 600px) {
  body {
    background-color: lightgray;
  }
}</code></pre>
        `,
        quiz: [
          {
            question: "Wat doet een media query?",
            options: [
              "Past stijl aan afhankelijk van schermgrootte",
              "Voegt animaties toe",
              "Verandert HTML structuur"
            ],
            correct: 0
          }
        ]
      },
      {
        id: "css-animations",
        title: "Animaties en Transities",
        content: `
          <h2>Animaties</h2>
          <p>Met <code>transition</code> en <code>@keyframes</code> maak je animaties.</p>
          <pre><code>div {
  transition: background-color 0.5s ease;
}
div:hover {
  background-color: blue;
}</code></pre>
        `,
        quiz: [
          {
            question: "Wat doet 'transition: background-color 0.5s;'?",
            options: [
              "Laat kleur langzaam veranderen",
              "Verandert kleur direct",
              "Verbergt het element"
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
  }
];
