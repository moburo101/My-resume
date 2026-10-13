import ResumePage from './pages/ResumePage'
import ProjectsPage from './pages/ProjectsPage'
import './App.css'

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '')
  return pathname === '/projects' ? <ProjectsPage /> : <ResumePage />
}

export default App
