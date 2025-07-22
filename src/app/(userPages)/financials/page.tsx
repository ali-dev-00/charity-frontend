import React from 'react'
import FinancialHero from './_components/FinancialHero'
import AuditReports from './_components/AuditReports'
import VolunteerSection from '../home/_components/VolunteerSection'

const Financials = () => {
  return (
   <>
    <FinancialHero />
    <AuditReports />
    <VolunteerSection />
   </>
  )
}

export default Financials