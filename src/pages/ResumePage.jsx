import SiteHeader from '../components/SiteHeader'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import ExperienceTimeline from '../components/ExperienceTimeline'
import EducationSection from '../components/EducationSection'
import SkillGroups from '../components/SkillGroups'
import ContactForm from '../components/ContactForm'
import ResourcesSection from '../components/ResourcesSection'
import SocialSection from '../components/SocialSection'
import { experienceEntries } from '../data/experience'
import { educationEntries } from '../data/education'
import { skillGroups } from '../data/skills'

function ResumePage() {
  return (
    <>
      <SiteHeader />
      <HeroSection
        name="M'obunoburo Odungide Kendu Arah"
        profession="Web Developer"
        summary={[
          'Web developer with practical experience in React, WordPress and web analytics.',
          'Builds responsive interfaces and full-stack applications, maintains production websites, and turns usage data into clear reports. Combines technical troubleshooting with software testing and documentation.',
        ]}
        cvUrl="https://drive.google.com/uc?export=download&id=1osUD7xRW2DeHbakIvbAdueIpWkOPtWSu"
        workUrl="/projects"
      />
      <AboutSection statusNote="Currently working in Content Management Services and Web Development at Olive & March Partners Limited, since February 2026. Current role and employment dates confirmed by me on 13 October 2026; availability and project details are not yet listed." />
      <ExperienceTimeline entries={experienceEntries} />
      <EducationSection entries={educationEntries} />
      <SkillGroups groups={skillGroups} />
      <ContactForm />
      <div className="ticks" aria-hidden="true"></div>
      <section id="next-steps">
        <ResourcesSection />
        <SocialSection />
      </section>
      <div className="ticks" aria-hidden="true"></div>
      <section id="spacer"></section>
    </>
  )
}

export default ResumePage
