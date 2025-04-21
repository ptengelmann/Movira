import React from 'react'
import Hero from '../components/hero/Hero'
import HowItWorks from '../components/home/HowItWorks'
import EcosystemOverview from '../components/home/EcosystemOverview'
import WhyMovira from '../components/home/WhyMovira'
import CallToAction from '../components/home/CallToAction'

const HomePage = () => {
  return (
    <>
      <Hero />
      <HowItWorks />
      <EcosystemOverview />
      <WhyMovira />
      <CallToAction />
    </>
  )
}

export default HomePage
