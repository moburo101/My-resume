import './AboutSection.css'

function AboutSection({ statusNote }) {
  return (
    <section id="about" className="about-section" tabIndex={-1} aria-labelledby="about-title">
      <div className="about-introduction">
        <p className="about-eyebrow">About me</p>
        <h2 id="about-title">Building for the people who use the web.</h2>
        <p className="about-summary">
          My work brings together interface development, website maintenance,
          and an understanding of how people use digital products.
        </p>
      </div>
      <div className="about-narrative">
        <p>
          I work across React applications and WordPress websites, connecting
          the interface people see with the systems that support it. My experience
          includes both creating new functionality and looking after websites
          already in use.
        </p>
        <p>
          That work also involves investigating problems, testing changes, and
          documenting how things work. Web analytics adds another perspective:
          translating usage patterns into reports that make the data easier
          to understand.
        </p>
        <aside className="about-status" aria-labelledby="about-status-title">
          <h3 id="about-status-title">Latest-status review</h3>
          <p>{statusNote}</p>
        </aside>
      </div>
    </section>
  )
}

export default AboutSection
