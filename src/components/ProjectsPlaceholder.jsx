import './ProjectsPlaceholder.css'

function ProjectsPlaceholder() {
  return (
    <section className="projects-placeholder" aria-labelledby="projects-title">
      <p className="projects-eyebrow">Portfolio</p>
      <h1 id="projects-title">Selected projects</h1>
      <p className="projects-intro">A collection of my work in web development.</p>
      <div className="projects-empty-state">
        <span className="projects-symbol" aria-hidden="true">&lt;/&gt;</span>
        <h2>Projects coming soon</h2>
        <p>I'm preparing project details, screenshots, and links. Check back soon to explore my work.</p>
        <a href="/">Back to resume <span aria-hidden="true">&rarr;</span></a>
      </div>
    </section>
  )
}

export default ProjectsPlaceholder
