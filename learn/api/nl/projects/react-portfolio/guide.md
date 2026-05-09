# Persoonlijk Portfolio (React)

Bouw een professionele portfolio-website om je werk te laten zien. Dit project laat je kennismaken met React-componenten, props en hooks.

## Doel

- Een navigatiebalk die tussen secties schakelt
- Een hero-sectie met je naam en bio
- Een overzicht van projecten met een herbruikbaar component
- Een contactsectie met een formulier

## Stappen

- [ ] Maak een `Header` component in `components/Header.js`.
- [ ] Stel in `App.js` de hoofdlay-out in en importeer je header.
- [ ] Maak een `ProjectCard` component die `title`, `description` en `link` als props accepteert.
- [ ] Gebruik een array van projectobjecten en `map()` er doorheen om je werk weer te geven.
- [ ] Gebruik de `useState` hook om de actieve sectie of een simpele "Like"-knop op projecten te beheren.
- [ ] Style je portfolio met moderne CSS (Flexbox/Grid).

## Hints

- Onthoud dat in React `class` verandert in `className`.
- Gebruik functionele componenten: `function MyComponent() { return <div>...</div> }`.
- Exporteer je componenten met `export default MyComponent;`.
