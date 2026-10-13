import ProjectGallery from '../components/ProjectGallery'
import { projects } from '../data/projects'

function ProjectsPage() {
  return (
    <>
      <header className="site-header">
        <a className="site-header-brand" href="/">
          My Resume<span aria-hidden="true">.</span>
        </a>
        <a href="/">Back to resume</a>
      </header>
      <main>
        <ProjectGallery projects={projects} />
      </main>
    </>
  )
}

export default ProjectsPage
