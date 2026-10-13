import './ExperienceTimeline.css'

function formatMonth(value) {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(value ?? '')) return null
  return new Intl.DateTimeFormat('en', {
    month: 'short', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${value}-01T00:00:00Z`))
}

function ExperienceTimeline({ entries = [] }) {
  const verifiedEntries = entries
    .filter((entry) => entry.datesVerified === true
      && formatMonth(entry.startDate)
      && (entry.isCurrent === true || (formatMonth(entry.endDate) && entry.endDate >= entry.startDate)))
    .toSorted((first, second) => second.startDate.localeCompare(first.startDate))

  return (
    <section id="experience" className="experience-section" tabIndex={-1} aria-labelledby="experience-title">
      <div className="experience-heading">
        <p className="experience-eyebrow">Career</p>
        <h2 id="experience-title">Experience</h2>
      </div>
      {verifiedEntries.length === 0 ? (
        <p className="experience-empty">Professional experience details coming soon.</p>
      ) : (
        <ol className="experience-timeline">
          {verifiedEntries.map((entry) => {
            const confirmedOutcomes = (entry.outcomes ?? []).filter((outcome) => outcome.confirmed === true)
            return (
              <li className="experience-entry" key={entry.id}>
                <p className="experience-dates">
                  <time dateTime={entry.startDate}>{formatMonth(entry.startDate)}</time>
                  {' – '}
                  {entry.isCurrent ? 'Present' : <time dateTime={entry.endDate}>{formatMonth(entry.endDate)}</time>}
                </p>
                <article className="experience-details" aria-labelledby={`experience-${entry.id}`}>
                  <h3 id={`experience-${entry.id}`}>{entry.jobTitle}</h3>
                  <p className="experience-company">{entry.company}</p>
                  {entry.responsibilities?.length > 0 && (
                    <ul className="experience-responsibilities">
                      {entry.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}
                    </ul>
                  )}
                  {confirmedOutcomes.length > 0 && (
                    <div className="experience-outcomes">
                      <h4>Key outcomes</h4>
                      <ul>{confirmedOutcomes.map((outcome) => <li key={outcome.text}>{outcome.text}</li>)}</ul>
                    </div>
                  )}
                </article>
              </li>
            )
          })}
        </ol>
      )}
    </section>
  )
}

export default ExperienceTimeline
