import React from 'react'
import OurAppealHero from './_components/OurApealHero'
import VolunteerSection from '../../home/_components/VolunteerSection'
import OurAppealDonationForm from './_components/DonationForm'

const OurAppealPage = () => {
  return (
    <>
     <OurAppealHero />
     <OurAppealDonationForm />
     <VolunteerSection />
    </>
  )
}

export default OurAppealPage