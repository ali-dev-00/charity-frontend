import Image from "next/image"
import Link from "next/link"
import { Linkedin } from "lucide-react"

const teamMembers = [
    {
        name: "Olivia Rhye",
        title: "CEO & Chairman",
        imageUrl: "/contact-us/team-section-01.svg",
        link: "https://www.linkedin.com",
    },
    {
        name: "Phoenix Baker",
        title: "Director and President",
        imageUrl: "/contact-us/team-section-02.svg",
        link: "https://www.linkedin.com",
    },
    {
        name: "Lana Steiner",
        title: "Director and President",
        imageUrl: "/contact-us/team-section-03.svg",
        link: "https://www.linkedin.com",
    },
    {
        name: "Demi Wilkinson",
        title: "Director and President",
        imageUrl: "/contact-us/team-section-04.svg",
        link: "https://www.linkedin.com",
    },
    {
        name: "Candice Wu",
        title: "Director and President",
        imageUrl: "/contact-us/team-section-05.svg",
        link: "https://www.linkedin.com",
    },
    {
        name: "Natali Craig",
        title: "Director and President",
        imageUrl: "/contact-us/team-section-06.svg",
        link: "https://www.linkedin.com",
    },
    {
        name: "Drew Cano",
        title: "Director and President",
        imageUrl: "/contact-us/team-section-07.svg",
        link: "https://www.linkedin.com",
    },
    {
        name: "Orlando Diggs",
        title: "Director and President",
        imageUrl: "/contact-us/team-section-08.svg",
        link: "https://www.linkedin.com",
    },
]

const TeamSection = () => {
    return (
        <div className="w-full max-w-[1366px] mx-auto px-4 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl overflow-hidden  "
                    >
                        <div className="relative aspect-square w-full">
                            <Image
                                src={member.imageUrl || "/placeholder.svg"}
                                alt={member.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            />
                        </div>
                        <div className="py-6 px-1 space-y-3">
                            <div>
                                <div className="flex justify-between">
                                    <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                                     <Image src="/contact-us/linkdin.svg" height={30} width={30} alt="linkdin icon" />
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{member.title}</p>
                            </div>

                            <div className="flex items-center justify-between pt-2">

                                <Link
                                    href={member.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#007466] hover:opacity-90 underline text-sm font-semibold transition-colors"
                                >
                                    View More
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TeamSection
