import React from 'react'
import AboutHero from './_components/Hero'
import StatsSection from '../home/_components/StatsSection'
import VolunteerSection from '../home/_components/VolunteerSection'
import PurposeSection from './_components/PurposeSection'
import AboutIntroduction from './_components/AboutIntroduction'
import CompaniesSection from './_components/CompaniesSection'



const AboutPage = () => {
  return (
    <>
      <AboutHero />
      <AboutIntroduction/>
      <StatsSection />
      <PurposeSection />
      <VolunteerSection/>
      <CompaniesSection />
    </>
  )
}

export default AboutPage