"use client"

import type React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import DonateForOrphansForm from "./DonateForOrphansForm"

export default function OurAppealDonationForm() {


  return (
    <div className="max-w-[1366px] mx-auto py-8 md:py-16 px-4 md:px-8 lg:px-16">
      <div className="bg-white overflow-hidden flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left side - Image */}
        <div className="relative w-full lg:w-1/2 rounded-3xl overflow-hidden min-h-[300px] md:min-h-[400px]">
          <Image
            src="/programs/our-appeal.svg"
            alt="Children in need of support - donation appeal"
            fill
            className="object-cover scale-[1.15] "
            priority
          />

        </div>

        {/* Right side - Donation Form */}
        <div className="w-full lg:w-1/2">
          <Card className="border-gray-200 rounded-3xl h-full">
            <CardContent className="px-4 sm:px-6 lg:px-8 flex items-center h-full">
              <DonateForOrphansForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
