import SiteHeader from '../components/SiteHeader'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import ExperienceTimeline from '../components/ExperienceTimeline'
import EducationSection from '../components/EducationSection'
import SkillGroups from '../components/SkillGroups'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'
import { experienceEntries } from '../data/experience'
import { educationEntries } from '../data/education'
import { skillGroups } from '../data/skills'
import { profile } from '../data/profile'

function ResumePage() {
  return (
    <>
      <SiteHeader />
      <HeroSection
        name={profile.name}
        profession="Web Developer"
        summary={[
          'I am a web developer with practical experience in React, WordPress and web analytics.',
          'I build responsive interfaces and full-stack applications, maintain production websites, and turn usage data into clear reports. I also combine technical troubleshooting with software testing and documentation.',
        ]}
        cvUrl="https://drive.google.com/uc?export=download&id=1lY10oCLq3_GXH3Y8CqRQevtX4dlYup0E"
        workUrl="/projects"
      />
      <AboutSection statusNote="Currently working in Content Management Services and Web Development at Olive & March Partners Limited, since February 2026." />
      <ExperienceTimeline entries={experienceEntries} />
      <EducationSection entries={educationEntries} />
      <SkillGroups groups={skillGroups} />
      <ContactForm />
      <div className="ticks" aria-hidden="true"></div>
      <div className="ticks" aria-hidden="true"></div>
      <Footer />
    </>
  )
}

export default ResumePage
