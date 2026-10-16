import { useRef, useState } from 'react'
import { FiX } from 'react-icons/fi'
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
  const dialogRef = useRef(null)
  return src && !hasError ? (
    <>
      <button className="project-image-trigger" type="button" aria-label={`View full image: ${alt}`} onClick={() => dialogRef.current.showModal()}>
        <img className="project-image" src={src} alt={alt} loading="lazy" onError={() => setHasError(true)} />
      </button>
      <dialog ref={dialogRef} className="project-image-dialog" aria-label={alt}>
        <button className="project-image-close" type="button" aria-label="Close full image" autoFocus onClick={() => dialogRef.current.close()}><FiX aria-hidden="true" /></button>
        <img className="project-image-full" src={src} alt={alt} />
      </dialog>
    </>
  ) : (
    <div className="project-image-placeholder">
      <span aria-hidden="true">&lt;/&gt;</span>
      <span>Preview coming soon</span>
    </div>
  )
}

function ProjectSlider({ project }) {
  const images = Array.isArray(project.images) && project.images.length
    ? project.images
    : project.imageUrl ? [project.imageUrl] : []
  const [activeIndex, setActiveIndex] = useState(0)
  const currentIndex = activeIndex % (images.length || 1)
  const image = images[currentIndex]
  const src = typeof image === 'string' ? image : image?.src
  const alt = (typeof image === 'object' && image?.alt) || project.imageAlt || `Screenshot of ${project.title}`

  function moveSlide(direction) {
    setActiveIndex((current) => (current + direction + images.length) % images.length)
  }

  return (
    <div className="project-slider" role={images.length > 1 ? 'region' : undefined} aria-label={`${project.title} screenshots`}>
      <ProjectImage key={`${currentIndex}-${src}`} src={src} alt={alt} />
      {images.length > 1 && (
        <div className="project-slider-controls">
          <button type="button" onClick={() => moveSlide(-1)} aria-label={`Previous screenshot of ${project.title}`}>
            <span aria-hidden="true">&#8592;</span>
          </button>
          <span aria-live="polite" aria-atomic="true">{currentIndex + 1} / {images.length}</span>
          <button type="button" onClick={() => moveSlide(1)} aria-label={`Next screenshot of ${project.title}`}>
            <span aria-hidden="true">&#8594;</span>
          </button>
        </div>
      )}
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
                <ProjectSlider project={project} />
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
