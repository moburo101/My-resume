import './SkillGroups.css'

function SkillGroups({ groups = [] }) {
  return (
    <section id="skills" className="skills-section" tabIndex={-1} aria-labelledby="skills-title">
      <p className="skills-eyebrow">Technical toolkit</p>
      <h2 id="skills-title">Skills</h2>
      <ul className="skills-groups">
        {groups.map((group) => (
          <li key={group.id}>
            <article className="skills-group" aria-labelledby={`skills-${group.id}`}>
              <h3 id={`skills-${group.id}`}>{group.title}</h3>
              <ul className="skills-list">
                {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SkillGroups
