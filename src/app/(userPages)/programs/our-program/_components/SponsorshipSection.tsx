import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Define types for the sections prop (optional if you're using TypeScript)
interface SponsorshipSectionProps {
  sponsorshipSections: {
    id: number;
    title: string;
    description: string[];
    image: string;
    imageAlt: string;
    buttonText: string;
    buttonLink: string;
  }[];
}

export default function SponsorshipSection({ sponsorshipSections }: SponsorshipSectionProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {sponsorshipSections.map((section, index) => {
        const isEven = index % 2 === 0

        return (
          <div
            key={section.id}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index !== sponsorshipSections.length - 1 ? "mb-16 lg:mb-24" : ""}`}
          >
            {/* Text Content */}
            <div className={`space-y-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{section.title}</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                {section.description.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}
              </div>
              <Link href={section.buttonLink}>
                <Button variant="ghost" className="px-6 py-5 font-medium rounded-full border border-gray-300">
                  {section.buttonText}
                </Button>
              </Link>
            </div>

            {/* Image */}
            <div className={`${isEven ? "order-first lg:order-2" : "lg:order-1"}`}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={section.image || "/placeholder.svg"}
                  alt={section.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
