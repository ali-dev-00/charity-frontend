
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const AboutIntroduction = () => {
  return (
    <section className="w-full ">
    <div className="max-w-[1366px] mx-auto py-16 px-4 md:px-8 lg:px-16">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-8">
        {/* Left Column */}
        <div className="space-y-4">
          <p className="text-sm special-font font-bold max-w-24 rounded-full  bg-[#F9F4E8] px-4 py-3 ">About Us</p>
          <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight">
            Rooted in Service. Driven by Impact.
          </h1>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <p className="text-gray-700 text-base leading-relaxed">
            Olad Foundation is a non-profit organization dedicated to creating meaningful change in underserved
            communities. Through education, healthcare, and social empowerment initiatives, we aim to uplift lives and
            build a future where everyone has the opportunity to succeed.
          </p>
          <Button className="bg-[#f25f4a] hover:bg-[#f25f4a]/90 text-white font-medium px-6 py-2 rounded-full transition-all duration-200 ">
              Donate Now
            </Button>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full">
        <Image
          src="/about/about-introduction.svg"
          alt="Multiple hands coming together in unity and collaboration"
          width={1200}
          height={500}
          className="w-full h-auto rounded-2xl object-cover"
        />
      </div>
    </div>
  </section>
  )
}

export default AboutIntroduction