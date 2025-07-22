"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Play } from "lucide-react"

export default function LivesChanged() {
  const stories = [
    {
      id: 1,
      image: "/home/our-appeal-02.svg",
      title: "Clean Water Initiative",
      description:
        "We provided clean drinking water to a remote village, preventing disease and improving daily life for over 500 families.",
      videoUrl: "#",
    },
    {
      id: 2,
      image: "/home/our-appeal-01.svg",
      title: "Life-Saving Surgery",
      description:
        "A campaign received life-saving surgery thanks to donations, giving her a second chance at a healthy future.",
      videoUrl: "#",
    },
    {
      id: 3,
      image: "/home/our-appeal-03.svg",
      title: "Educational Success",
      description:
        "Through our educational programs, a struggling student earned a scholarship and is now the first in her family to attend college.",
      videoUrl: "#",
    },
    {
      id: 4,
      image: "/home/our-appeal-04.svg",
      title: "Disaster Recovery",
      description:
        "After a flood destroyed their home, we helped a family rebuild and recover both shelter and emotional support.",
      videoUrl: "#",
    },
  ]

  const handleVideoPlay = (videoUrl: string) => {
    // Handle video play functionality
    console.log("Playing video:", videoUrl)
  }

  return (
    <section className="w-full bg-white">
      <div className="container mx-auto max-w-[1366px] py-16 px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Lives Changed Through
            <br />
            Your Support
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Behind every donation is a life uplifted. These are the stories that showcase impact in action.
          </p>
        </div>

        {/* Stories Layout */}
        <div className="space-y-6">
          {/* Top Row - 2 cards full width */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.slice(0, 2).map((story) => (
              <Card
                key={story.id}
                className="border-1 border-gray-50 relative overflow-hidden rounded-lg cursor-pointer group hover:shadow-lg transition-shadow p-0"
                onClick={() => handleVideoPlay(story.videoUrl)}
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image src={story.image || "/placeholder.svg"} alt={story.title} fill className="object-cover" />
                  {/* Light overlay */}
                  <div className="absolute inset-0 bg-black/20" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 text-gray-900 ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* Text overlay with white background */}
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-gray-800 text-sm leading-tight">{story.description}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Bottom Row - 2 cards on left + content on right */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bottom 2 cards - taking 2/3 of the width */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {stories.slice(2, 4).map((story) => (
                <Card
                  key={story.id}
                  className="border-1 border-gray-50 relative overflow-hidden rounded-lg cursor-pointer group hover:shadow-lg transition-shadow p-0"
                  onClick={() => handleVideoPlay(story.videoUrl)}
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image src={story.image || "/placeholder.svg"} alt={story.title} fill className="object-cover" />
                    {/* Light overlay */}
                    <div className="absolute inset-0 bg-black/20" />

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 text-gray-900 ml-1" fill="currentColor" />
                      </div>
                    </div>

                    {/* Text overlay with white background */}
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="bg-white rounded-lg p-2 shadow-sm">
                        <p className="text-gray-800 text-sm leading-tight ">{story.description}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Right side content - taking 1/3 of the width with dashed border */}
            <div className="lg:col-span-1 flex flex-col justify-center lg:pl-6 border-2 border-gray-100 rounded-lg p-6">
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                From despair to hope—these success stories highlight how compassion and action can rewrite futures.
              </p>
              <Button
                className="bg-[#f25f4a] hover:opacity-90 text-white px-8 py-3 rounded-full font-medium self-start"
                asChild
              >
                <a href="#">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
