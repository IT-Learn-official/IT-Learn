import React from 'react';
import Header from './components/Header';
import ProjectCard from './components/ProjectCard';

function App() {
  // TODO: Add your projects data and build the layout
  return (
    <div className="portfolio">
      <Header />
      <main>
        <h1>Welcome to my Portfolio</h1>
        <section id="projects">
          {/* TODO: Map through projects and render ProjectCard components */}
        </section>
      </main>
    </div>
  );
}

export default App;
