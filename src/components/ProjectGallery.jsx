import { useState } from 'react'
import './ProjectGallery.css'

function getExternalUrl(value) {
  try {
    const url = new URL(value)
    return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password ? url.href : null
  } catch {
    return null
  }
}

function ProjectImage({ src, alt }) {
  const [hasError, setHasError] = useState(false)
  return src && !hasError ? (
    <img className="project-image" src={src} alt={alt} loading="lazy" onError={() => setHasError(true)} />
  ) : (
    <div className="project-image-placeholder">
      <span aria-hidden="true">&lt;/&gt;</span>
      <span>Preview coming soon</span>
    </div>
  )
}

function ProjectGallery({ projects = [] }) {
  const items = projects.length ? projects : Array.from({ length: 3 }, (_, index) => ({
    id: `placeholder-${index}`, title: 'Project details coming soon',
  }))

  return (
    <section className="project-gallery-section" aria-labelledby="projects-title">
      <p className="project-gallery-eyebrow">Portfolio</p>
      <h1 id="projects-title">Selected projects</h1>
      <p className="project-gallery-intro">A collection of my work in web development.</p>
      {!projects.length && <p className="project-gallery-note">Project placeholders below will be replaced as I add my work.</p>}
      <ul className="project-gallery">
        {items.map((project) => {
          const demoUrl = getExternalUrl(project.demoUrl)
          const repoUrl = getExternalUrl(project.repoUrl)
          return (
            <li key={project.id}>
              <article className="project-card" aria-labelledby={`project-${project.id}`}>
                <ProjectImage key={project.imageUrl || 'placeholder'} src={project.imageUrl} alt={project.imageAlt || `Screenshot of ${project.title}`} />
                <div className="project-card-content">
                  <h2 id={`project-${project.id}`}>{project.title}</h2>
                  <dl className="project-details">
                    <div><dt>Role</dt><dd>{project.role || 'To be added'}</dd></div>
                    <div><dt>Stack</dt><dd>{project.stack?.length ? project.stack.join(' · ') : 'To be added'}</dd></div>
                    <div><dt>Problem</dt><dd>{project.problem || 'To be added'}</dd></div>
                    <div><dt>Contribution</dt><dd>{project.contribution || 'To be added'}</dd></div>
                    <div><dt>Outcome</dt><dd>{project.outcome || 'To be added'}</dd></div>
                  </dl>
                  {(demoUrl || repoUrl) && (
                    <div className="project-links">
                      {demoUrl && <a href={demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`View demo for ${project.title} (opens in a new tab)`}>Live demo <span aria-hidden="true">&#8599;</span></a>}
                      {repoUrl && <a href={repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`View repository for ${project.title} (opens in a new tab)`}>Repository <span aria-hidden="true">&#8599;</span></a>}
                    </div>
                  )}
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default ProjectGallery
