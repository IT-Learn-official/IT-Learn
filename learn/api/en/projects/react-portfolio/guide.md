# Personal Portfolio (React)

Build a professional portfolio website to showcase your work. This project introduces you to React components, props, and hooks.

## Goal

- A navigation bar that switches between sections
- A hero section with your name and bio
- A grid of projects using a reusable component
- A contact section with a form

## Steps

- [ ] Create a `Header` component in `components/Header.js`.
- [ ] In `App.js`, set up the main layout and import your header.
- [ ] Create a `ProjectCard` component that accepts `title`, `description`, and `link` as props.
- [ ] Use an array of project objects and `map()` through them to display your work.
- [ ] Use the `useState` hook to manage the active section or a simple "Like" button on projects.
- [ ] Style your portfolio using modern CSS (Flexbox/Grid).

## Hints

- Remember that in React, `class` becomes `className`.
- Use functional components: `function MyComponent() { return <div>...</div> }`.
- Export your components using `export default MyComponent;`.
