import React from 'react'
import StatsSection from './_components/StatsSection'
import OurAppeals from './_components/OurAppeal'
import VolunteerSection from './_components/VolunteerSection'
import LatestUpdates from './_components/LatestUpdates'
import LivesChanged from './_components/LivesChanged'
import Hero from './_components/Hero'
import SupporterTestimonials from './_components/SupportersSection'

const HomePage = () => {
  return (
    <>
     <Hero/>
     <OurAppeals/>
     <StatsSection/>
     <SupporterTestimonials />
     <LivesChanged />
     <LatestUpdates />
     <VolunteerSection/>
    </>
  )
}

export default HomePage