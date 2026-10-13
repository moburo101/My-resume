import './HeroSection.css'
import { GoArrowUpRight, GoArrowDown } from "react-icons/go";

function HeroSection({
  name = 'Your Name',
  profession = 'Your profession',
  summary = ['A short introduction to what you do.', 'The value you bring to your next team or project.'],
  cvUrl,
  workUrl,
  portraitUrl,
}) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase()

  return (
    <section id="center" className="hero-section" tabIndex={-1} aria-labelledby="hero-name">
      <div className="hero-content">
        <p className="hero-eyebrow">Hello, I'm</p>
        <h1 id="hero-name">{name}</h1>
        <p className="hero-profession">{profession}</p>
        <p className="hero-summary">
          {summary.map((line, index) => <span key={index}>{line}</span>)}
        </p>
        <div className="hero-actions">
          {cvUrl ? (
            <a className="hero-action hero-action-primary" href={cvUrl} download>Download CV <span aria-hidden="true" style={{ paddingTop: '5px' }}><GoArrowDown /></span></a>
          ) : (
            <button className="hero-action hero-action-primary" type="button" disabled>Download CV <span aria-hidden="true" style={{ paddingTop: '5px' }}><GoArrowDown /></span></button>
          )}
          {workUrl ? (
            <a className="hero-action hero-action-secondary" href={workUrl}>View Work <span aria-hidden="true" style={{ paddingTop: '5px' }}><GoArrowUpRight /></span></a>
          ) : (
            <button className="hero-action hero-action-secondary" type="button" disabled>View Work <span aria-hidden="true" style={{ paddingTop: '5px' }}><GoArrowUpRight /></span></button>
          )}
        </div>
      </div>
      {/* <div className="hero-visual">
        {portraitUrl ? (
          <img className="hero-portrait" src={portraitUrl} alt={`Portrait of ${name}`} />
        ) : (
          <div className="hero-monogram" aria-hidden="true">
            <span className="hero-monogram-label">Personal portfolio</span>
            <span className="hero-initials">{initials}</span>
            <span className="hero-monogram-caption">{name}</span>
          </div>
        )}
      </div> */}
    </section>
  )
}

export default HeroSection
