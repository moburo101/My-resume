import { useEffect, useRef, useState } from 'react'

const navigationLinks = [
  { href: '#center', label: 'Overview' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '#social', label: 'Connect' },
]

function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleRef = useRef(null)
  const navigationRef = useRef(null)

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 960px)')
    function handleBreakpointChange(event) {
      if (event.matches) {
        setIsMenuOpen(false)
        if (document.activeElement === toggleRef.current) {
          navigationRef.current?.querySelector('a')?.focus()
        }
      } else if (navigationRef.current?.contains(document.activeElement)) {
        toggleRef.current?.focus()
      }
    }
    desktopQuery.addEventListener('change', handleBreakpointChange)
    return () => desktopQuery.removeEventListener('change', handleBreakpointChange)
  }, [])

  function handleNavigation(event) {
    setIsMenuOpen(false)
    const { hash } = event.currentTarget
    if (!hash || hash === '#') return
    const target = document.getElementById(decodeURIComponent(hash.slice(1)))
    target?.focus({ preventScroll: true })
  }

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && isMenuOpen) {
          setIsMenuOpen(false)
          toggleRef.current?.focus()
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsMenuOpen(false)
        }
      }}
    >
      <a className="site-header-brand" href="#center" onClick={handleNavigation}>
        My Resume<span aria-hidden="true">.</span>
      </a>
      <button
        ref={toggleRef}
        className="site-header-toggle"
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="site-navigation"
        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setIsMenuOpen((previous) => !previous)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          {isMenuOpen ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>
      <nav
        ref={navigationRef}
        id="site-navigation"
        className={`site-header-navigation${isMenuOpen ? ' is-open' : ''}`}
        aria-label="Primary navigation"
      >
        <ul>
          {navigationLinks.map(({ href, label }) => (
            <li key={href}><a href={href} onClick={handleNavigation}>{label}</a></li>
          ))}
          <li><a className="site-header-contact" href="#contact" onClick={handleNavigation}>Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default SiteHeader
