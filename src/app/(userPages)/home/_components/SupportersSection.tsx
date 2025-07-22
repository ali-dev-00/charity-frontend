"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Quote } from "lucide-react"

export default function SupporterTestimonials() {
  const testimonials = [
    {
      id: 1,
      type: "video",
      cover: "/home/support-01.png",
      avatar: "/home/support-avatar.png",
      name: "Nancy A.",
    },
    {
      id: 2,
      type: "text",
      content:
        "Our whole family visits United Smiles. We are very happy with their services. The staff is very friendly and welcoming. The Invisalign process was so smooth! I felt taken care of every step of the way. The results are amazing!",
      avatar: "/home/support-avatar.png",
      name: "Nancy A.",
    },
    {
      id: 3,
      type: "video",
      cover: "/home/support-02.png",
      avatar: "/home/support-avatar.png",
      name: "Nancy A.",
    },
    {
      id: 4,
      type: "text",
      content:
        "I had a great experience at Dr. office! The staff was friendly and welcoming from the moment I walked in. They explained everything clearly during my check-up, and the dentist was gentle yet effective. 10/10!",
      avatar: "/home/support-avatar.png",
      name: "Nancy A.",
    },
    {
      id: 5,
      type: "text",
      content:
        "I had a great experience at Dr. office! The staff was friendly and welcoming from the moment I walked in. They explained everything clearly during my check-up, and the dentist was gentle yet effective. 10/10!",
      avatar: "/home/support-avatar.png",
      name: "Nancy A.",
    },
    {
      id: 6,
      type: "text",
      content:
        "I had a great experience at Dr. office! The staff was friendly and welcoming from the moment I walked in. They explained everything clearly during my check-up, and the dentist was gentle yet effective. 10/10!",
      avatar: "/home/support-avatar.png",
      name: "Nancy A.",
    },
    {
      id: 7,
      type: "text",
      content:
        "I had a great experience at Dr. office! The staff was friendly and welcoming from the moment I walked in. They explained everything clearly during my check-up, and the dentist was gentle yet effective. 10/10!",
      avatar: "/home/support-avatar.png",
      name: "Nancy A.",
    },
  ]

  const [cardsPerView, setCardsPerView] = useState<number>(3.2)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setCardsPerView(1)
      else if (window.innerWidth < 1024) setCardsPerView(1.8)
      else setCardsPerView(3.2)
    }

    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const cardWidth = 100 / cardsPerView
  const maxIndex = Math.max(0, testimonials.length - Math.ceil(cardsPerView))

  useEffect(() => {
    const start = Math.floor(maxIndex / 2)
    setIndex(start)
  }, [cardsPerView, maxIndex])

  const canPrev = index > 0
  const canNext = index < maxIndex

  const prev = () => canPrev && setIndex(index - 1)
  const next = () => canNext && setIndex(index + 1)

  return (
    <section className="w-full py-16 bg-white px-4">
      {/* Heading */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-2">What Our Supporters Say</h2>
        <p className="text-gray-600 text-sm max-w-md mx-auto">
          From kind words to powerful stories, these voices reflect the passion and trust behind our work.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative pl-4 overflow-hidden max-w-[1366px] mx-auto">
        <div
          className="flex gap-6 transition-transform duration-300 ease-out py-4"
          style={{ transform: `translateX(-${index * cardWidth}%)` }}
        >
          {testimonials.map((t) => (
            <div key={t.id} style={{ width: `${cardWidth}%` }} className="flex-shrink-0 max-w-[340px]">
              <Card className="h-full  rounded-2xl py-0 overflow-hidden group border-0 shadow-sm bg-white">

                {/* VIDEO CARD */}
                {t.type === "video" ? (
                  <div className="relative h-[100%] w-full">
                    <Image
                      src={t.cover || "/placeholder.svg"}
                      alt="testimonial video"
                      fill
                      className="object-cover rounded-2xl "
                    />
                   

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <Play className="h-6 w-6 text-gray-800 ml-1" fill="currentColor" />
                      </div>
                    </div>
                    <CardContent className="flex items-center justify-between p-4  z-50 absolute w-full bottom-0">
                      <div className="flex items-center gap-2">
                        <Image
                          src={t.avatar || "/placeholder.svg"}
                          alt={t.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                        <span className="text-sm font-semibold text-white">{t.name}</span>
                      </div>
                     <Image src="/home/white-coloumn.svg" height={35} width={35} alt="coloumn icon" />
                    </CardContent>
                  </div>
                ) : (
                  <>
                    {/* TEXT CARD */}
                    <div className="h-64 p-6 flex items-start">
                      <p className="text-gray-800 text-sm leading-relaxed font-normal">{t.content}</p>
                    </div>

                    {/* Footer only for text cards */}
                    <CardContent className="flex items-center justify-between p-4  bg-white">
                      <div className="flex items-center gap-2">
                        <Image
                          src={t.avatar || "/placeholder.svg"}
                          alt={t.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                        <span className="text-sm font-semibold text-gray-900">{t.name}</span>
                      </div>
                      <Image src="/home/orange-coloumn.svg" height={35} width={35} alt="coloumn icon" />
                    </CardContent>
                  </>
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <div className="flex justify-center mt-8 gap-4">
        <Button
          size="icon"
          variant="outline"
          className={`w-10 h-10 rounded-full border-[#007466] text-[#007466] ${canPrev ? "hover:bg-[#007466]/10" : "opacity-50 cursor-not-allowed"}`}
          onClick={prev}
          disabled={!canPrev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className={`w-10 h-10 rounded-full bg-[#007466] text-white border-[#007466] ${canNext ? "hover:bg-[#01453C]" : "opacity-50 cursor-not-allowed"}`}
          onClick={next}
          disabled={!canNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}
