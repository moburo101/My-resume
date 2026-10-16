import { useEffect, useState } from 'react'
import './HeroSection.css'
import { GoArrowUpRight, GoArrowDown } from "react-icons/go";

function AnimatedProfession({ profession, professions }) {
  const [text, setText] = useState(professions?.[0] || profession)

  useEffect(() => {
    const titles = professions?.length ? professions : [profession]
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let timeoutId
    let titleIndex = 0
    let characterCount = titles[0].length
    let isDeleting = true

    function tick() {
      const title = titles[titleIndex]
      characterCount += isDeleting ? -1 : 1
      setText(title.slice(0, characterCount))

      let delay = isDeleting ? 50 : 100
      if (characterCount === 0 && isDeleting) {
        titleIndex = (titleIndex + 1) % titles.length
        isDeleting = false
        delay = 350
      } else if (characterCount === title.length && !isDeleting) {
        isDeleting = true
        delay = 2000
      }
      timeoutId = window.setTimeout(tick, delay)
    }

    function restart() {
      window.clearTimeout(timeoutId)
      titleIndex = 0
      characterCount = titles[0].length
      isDeleting = true
      setText(titles[0])
      if (!motionPreference.matches && titles.length > 1) {
        timeoutId = window.setTimeout(tick, 2000)
      }
    }

    restart()
    motionPreference.addEventListener('change', restart)
    return () => {
      window.clearTimeout(timeoutId)
      motionPreference.removeEventListener('change', restart)
    }
  }, [profession, professions])

  return (
    <p className="hero-profession" aria-label={professions?.join(' and ') || profession}>
      <span aria-hidden="true">{text}<span className="hero-profession-cursor">|</span></span>
    </p>
  )
}

function HeroSection({
  name = 'Your Name',
  profession = 'Your profession',
  professions,
  summary = ['A short introduction to what you do.', 'The value you bring to your next team or project.'],
  cvUrl,
  workUrl,
}) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase()

  return (
    <section id="center" className="hero-section" tabIndex={-1} aria-labelledby="hero-name">
      <div className="hero-content">
        <p className="hero-eyebrow">Hello, I'm</p>
        <h1 id="hero-name">{name}</h1>
        <AnimatedProfession profession={profession} professions={professions} />
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
