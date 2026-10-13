import { useState } from 'react'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { profile } from '../data/profile'
import './Footer.css'

function confirmedLinkedInUrl(linkedin) {
  if (linkedin?.confirmed !== true) return null
  try {
    const url = new URL(linkedin.url)
    return url.protocol === 'https:'
      && ['linkedin.com', 'www.linkedin.com'].includes(url.hostname)
      && !url.username && !url.password
      && url.pathname.startsWith('/in/') && url.pathname.length > 4 ? url.href : null
  } catch {
    return null
  }
}

function Footer() {
  const [year] = useState(() => new Intl.DateTimeFormat('en', { year: 'numeric', timeZone: 'Africa/Lagos' }).format(new Date()))
  const linkedinUrl = confirmedLinkedInUrl(profile.linkedin)

  return (
    <footer className="site-footer">
      <div className="footer-identity">
        <p className="footer-name">{profile.name}</p>
        <p className="footer-copyright">&copy; {year}. All rights reserved.</p>
      </div>
      <nav aria-label="Footer links">
        <ul className="footer-links">
          <li><a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)"><FiGithub size={20} aria-hidden="true" />GitHub</a></li>
          <li><a href={`mailto:${profile.email}`}><FiMail size={20} aria-hidden="true" />Email</a></li>
          {linkedinUrl && (
            <li><a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)"><FiLinkedin size={20} aria-hidden="true" />LinkedIn</a></li>
          )}
        </ul>
      </nav>
    </footer>
  )
}

export default Footer
