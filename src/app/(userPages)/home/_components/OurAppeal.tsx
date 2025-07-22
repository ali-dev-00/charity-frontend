"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function OurAppeals() {
  const appeals = [
    {
      id: 1,
      image: "/home/our-appeal-01.svg",
      title: "Sponsor an Orphan",
      description: "Your generosity supports our efforts to educate orphans.",
      sponsorLink: "#",
      learnMoreLink: "#",
    },
    {
      id: 2,
      image: "/home/our-appeal-02.svg",
      title: "Sponsor an Orphan",
      description: "Your generosity supports our efforts to educate orphans.",
      sponsorLink: "#",
      learnMoreLink: "#",
    },
    {
      id: 3,
      image: "/home/our-appeal-03.svg",
      title: "Sponsor an Orphan",
      description: "Your generosity supports our efforts to educate orphans.",
      sponsorLink: "#",
      learnMoreLink: "#",
    },
    {
      id: 4,
      image: "/home/our-appeal-01.svg",
      title: "Sponsor an Orphan",
      description: "Your generosity supports our efforts to educate orphans.",
      sponsorLink: "#",
      learnMoreLink: "#",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const updateCardsPerView = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1)
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2)
      } else {
        setCardsPerView(3)
      }
    }

    updateCardsPerView()
    window.addEventListener("resize", updateCardsPerView)
    return () => window.removeEventListener("resize", updateCardsPerView)
  }, [])

  useEffect(() => {
    setCurrentIndex(0)
  }, [cardsPerView])

  const maxIndex = appeals.length - cardsPerView
  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < maxIndex

  const nextSlide = () => setCurrentIndex((prev) => (prev >= maxIndex ? maxIndex : prev + 1))
  const prevSlide = () => setCurrentIndex((prev) => (prev <= 0 ? 0 : prev - 1))

  return (
    <section className="w-full lg:-mt-15 mt-0">
      <div className="max-w-[1366px] mx-auto py-16 px-4 md:px-8 lg:px-16 ">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-2">Our Appeals</h2>
          <p className="text-gray-600 text-base">Support ongoing efforts to save lives today.</p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-x-hidden mb-5 pb-5">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${(currentIndex * 100) / cardsPerView}%)`,
              }}
            >
              {appeals.map((appeal) => (
                <div
                  key={appeal.id}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / cardsPerView}%` }}
                >
                  <Card className="border-gray-50 rounded-2xl h-full px-4">
                    <div className="relative h-48 w-full">
                      <Image
                        src={appeal.image}
                        alt={appeal.title}
                        fill
                        className="object-cover rounded-2xl"
                      />
                    </div>
                    <CardContent className="p-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{appeal.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{appeal.description}</p>
                      <div className="flex gap-3">
                        <Button
                          className="bg-[#f25f4a] hover:bg-[#e85642] text-white text-sm px-5 py-2.5 rounded-full font-medium"
                          asChild
                        >
                          <a href={appeal.sponsorLink}>Donate Now</a>
                        </Button>
                        <Button
                          variant="outline"
                          className="text-gray-800 text-sm border-gray-300 px-5 py-2.5 rounded-full font-medium hover:bg-gray-50"
                          asChild
                        >
                          <a href={appeal.learnMoreLink}>Learn more</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {isClient && appeals.length > cardsPerView && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full w-10 h-10 border-[#007466] text-[#007466] bg-transparent transition-opacity ${
                  canGoPrev ? "hover:bg-[#007466]/10 cursor-pointer" : "opacity-50 cursor-not-allowed"
                }`}
                onClick={prevSlide}
                disabled={!canGoPrev}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full w-10 h-10 bg-[#007466] text-white border-[#007466] transition-opacity ${
                  canGoNext ? "hover:bg-[#01453C] cursor-pointer" : "opacity-50 cursor-not-allowed"
                }`}
                onClick={nextSlide}
                disabled={!canGoNext}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
