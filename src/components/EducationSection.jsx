import './EducationSection.css'

function EducationSection({ entries = [] }) {
  return (
    <section id="education" className="education-section" tabIndex={-1} aria-labelledby="education-title">
      <div className="education-heading">
        <p className="education-eyebrow">Academic background</p>
        <h2 id="education-title">Education</h2>
      </div>
      <ul className="education-list">
        {entries.map((entry) => (
          <li key={entry.id}>
            <article className="education-entry" aria-labelledby={`education-${entry.id}`}>
              <h3 id={`education-${entry.id}`}>{entry.degree}</h3>
              <p className="education-institution">{entry.institution}</p>
              <p className="education-location">{entry.location}</p>
              <p className="education-completion">
                {entry.completionLabel}: <time dateTime={entry.completionYear}>{entry.completionYear}</time>
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default EducationSection
