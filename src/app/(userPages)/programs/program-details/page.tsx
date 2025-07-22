import React from 'react'
import ProgramDetailHero from './_components/ProgramDetailHero'
import StatsSection from '../../home/_components/StatsSection'
import FaqSection from './_components/FaqSection'
import SponsorshipSection from '../our-program/_components/SponsorshipSection'
import RelevantStories from './_components/RelevantStories'
const sponsorshipSections = [
  {
      id: 1,
      title: "Sponsor an Orphan",
      description: [
          "OLAD Foundation, in 1997, launched its Orphans Sponsorship Programme to provide free and quality education to the Orphans. With the help of philanthropists and our generous and kind donors, this programme enables the Foundation to provide free education to thousands of orphan students from across the country.",
          "Under the Orphan Sponsorship Programme, over 13,000 orphans are currently enrolled at 400 different institutes of READ Foundation, more than 23,000 have been benefited through this programme, while a total of over 500 Million Rupees are spent annually on educational expenses of under this programme",
      ],
      image: "/programs/our-program/our-program-01.svg",
      imageAlt: "Group of diverse people including adults and children smiling together",
      buttonText: "Donate Now",
      buttonLink: "#",
  },
]
const ProgramDetailPage = () => {
  return (
    <>
      <ProgramDetailHero />
      <StatsSection />
      <SponsorshipSection  sponsorshipSections={sponsorshipSections} />
      <FaqSection />
      <RelevantStories />
    </>
  )
}

export default ProgramDetailPage