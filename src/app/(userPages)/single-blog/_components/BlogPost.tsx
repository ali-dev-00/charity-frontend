import Image from "next/image"
import { Copy, Twitter, Facebook, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BlogPostSection() {
    return (
        <div className="max-w-[1366px] mx-auto py-4 px-4 md:px-8 lg:px-16">
            {/* Header tags */}
            <div className="rounded-full  bg-[#F9F4E8] px-1 py-1 flex items-center gap-4 mb-6 max-w-[220px]">
                <span className="text-sm bg-white py-2 px-3 rounded-full  font-semibold">Leadership</span>
                <span className="text-sm text-gray-500">6 min read</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">Bill Walsh leadership lessons</h1>

            {/* Subtitle */}
            <p className="text-[18px] max-w-3xl text-gray-500 mb-8 leading-relaxed">
                Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning dynasty? Lorem ipsum dolor sit
                amet, consectetur adipiscing elit.
            </p>

            {/* Hero image */}
            <div className="mb-8">
                <Image
                    src="/about/about-introduction.svg"
                    alt="Multiple hands stacked together representing teamwork and collaboration"
                    width={800}
                    height={400}
                    className="w-full h-[400px] object-cover rounded-lg"
                />
            </div>

            {/* Footer with author, date, and social icons */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ">
                {/* Author and Date Info */}
                <div className="flex  items-start sm:items-center gap-4">
                    {/* Author */}
                    <div className="flex flex-col gap-1">
                        <p className="text-[12px] text-gray-500">Written by</p>
                        <p className="text-sm font-medium text-gray-900">Alec Whitten</p>
                    </div>
                    {/* Date */}
                    <div className="flex flex-col gap-1">
                        <p className="text-[12px] text-gray-500">Published on</p>
                        <p className="text-sm font-medium text-gray-900">17 Jan 2022</p>
                    </div>
                </div>

                {/* Social Icons */}
                <div className="flex items-center flex-wrap gap-3">
                    {/* Copy Link */}
                    <div className="flex items-center gap-2 px-2 py-2 rounded-md border border-gray-200 bg-white hover:bg-[#F9F4E8] transition-colors cursor-pointer">
                        <Copy className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">Copy link</span>
                    </div>

                    {/* Twitter */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer rounded-md border border-gray-200 bg-white p-2 hover:bg-[#F9F4E8] transition-colors"
                    >
                        <Twitter className="h-4 w-4 text-gray-500" />
                        <span className="sr-only">Share on Twitter</span>
                    </Button>

                    {/* Facebook */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer rounded-md border border-gray-200 bg-white p-2 hover:bg-[#F9F4E8] transition-colors"
                    >
                        <Facebook className="h-4 w-4 text-gray-500" />
                        <span className="sr-only">Share on Facebook</span>
                    </Button>

                    {/* LinkedIn */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer rounded-md border border-gray-200 bg-white p-2 hover:bg-[#F9F4E8] transition-colors"
                    >
                        <Linkedin className="h-4 w-4 text-gray-500" />
                        <span className="sr-only">Share on LinkedIn</span>
                    </Button>
                </div>
            </div>

        </div>
    )
}
