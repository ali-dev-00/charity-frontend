"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, ArrowUpRight, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface CaseStudy {
  id: string
  author: string
  date: string
  title: string
  description: string
  image: string
  category: string[]
}

const caseStudies: CaseStudy[] = [
  {
    id: "1",
    author: "Alec Whitten",
    date: "17 Jan 2022",
    title: "Fundraising in Nigerian village",
    description:
      "A young girl received life-saving surgery thanks to donations, giving her a second chance at a healthy future.",
    image: "/blogs/blog-01.svg",
    category: ["Design", "Customer Success"],
  },
  {
    id: "2",
    author: "Demi Wilkinson",
    date: "16 Jan 2022",
    title: "Local food lunch for donation",
    description:
      "After a flood destroyed their home, we helped a family rebuild and access food, shelter, and emotional support.",
    image: "/blogs/blog-02.svg",
    category: ["Product", "Customer Success"],
  },
  {
    id: "3",
    author: "Candice Wu",
    date: "15 Jan 2022",
    title: "Donation items for the children",
    description:
      "We provided clean drinking water to a remote village, preventing disease and improving daily life for over 300 families.",
    image: "/blogs/blog-03.svg",
    category: ["Software Development", "Design"],
  },
  {
    id: "4",
    author: "Phoenix Baker",
    date: "14 Jan 2022",
    title: "Building schools in rural areas",
    description:
      "Construction of new educational facilities to provide quality education for children in underserved communities.",
    image: "/blogs/blog-01.svg",
    category: ["Product", "Design"],
  },
  {
    id: "5",
    author: "Lana Steiner",
    date: "13 Jan 2022",
    title: "Medical supplies distribution",
    description: "Emergency medical aid distribution to remote areas affected by natural disasters and health crises.",
    image: "/blogs/blog-02.svg",
    category: ["Software Development", "Customer Success"],
  },
  {
    id: "6",
    author: "Olivia Rhye",
    date: "12 Jan 2022",
    title: "Clean water initiative",
    description: "Installing water purification systems in communities lacking access to clean drinking water.",
    image: "/blogs/blog-03.svg",
    category: ["Design", "Product"],
  },
  {
    id: "7",
    author: "Alec Whitten",
    date: "17 Jan 2022",
    title: "Fundraising in Nigerian village",
    description:
      "A young girl received life-saving surgery thanks to donations, giving her a second chance at a healthy future.",
    image: "/blogs/blog-01.svg",
    category: ["Design", "Customer Success"],
  },
  {
    id: "8",
    author: "Demi Wilkinson",
    date: "16 Jan 2022",
    title: "Local food lunch for donation",
    description:
      "After a flood destroyed their home, we helped a family rebuild and access food, shelter, and emotional support.",
    image: "/blogs/blog-02.svg",
    category: ["Product", "Customer Success"],
  },
  {
    id: "9",
    author: "Candice Wu",
    date: "15 Jan 2022",
    title: "Donation items for the children",
    description:
      "We provided clean drinking water to a remote village, preventing disease and improving daily life for over 300 families.",
    image: "/blogs/blog-03.svg",
    category: ["Software Development", "Design"],
  },
 
]

const tabs = [
  { id: "all", label: "View all" },
  { id: "design", label: "Design" },
  { id: "product", label: "Product" },
  { id: "software", label: "Software Development" },
  { id: "customer", label: "Customer Success" },
]

export default function BlogsList() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const filteredCaseStudies = caseStudies.filter((study) => {
    const matchesTab =
      activeTab === "all" ||
      study.category.some(
        (cat) =>
          cat.toLowerCase().replace(" ", "") ===
          activeTab.replace("customer", "customersuccess").replace("software", "softwaredevelopment"),
      )

    const matchesSearch =
      searchQuery === "" ||
      study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.author.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTab && matchesSearch
  })

  const searchResults = caseStudies.filter((study) => {
    return (
      searchQuery !== "" &&
      (study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.author.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })

  const handleSearchFocus = () => {
    setIsSearchOpen(true)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setIsSearchOpen(true)
  }

  const handleStudySelect = (study: CaseStudy) => {
    setSelectedStudy(study.id)
    setSearchQuery(study.title)
    setIsSearchOpen(false)
    // Scroll to the selected study
    const element = document.getElementById(`study-${study.id}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSelectedStudy(null)
    setIsSearchOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-16">
      {/* Navigation and Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#F25F4A] hover:opacity-90 text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Search with Dropdown */}
        <div className="relative w-full lg:w-80" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 z-10" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              className="pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#F25F4A] focus:border-transparent w-full"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Search Dropdown */}
          {isSearchOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
              {searchQuery === "" ? (
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-3">Recent searches</p>
                  <div className="space-y-2">
                    {caseStudies.slice(0, 3).map((study) => (
                      <button
                        key={study.id}
                        onClick={() => handleStudySelect(study)}
                        className="w-full text-left p-2 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-md flex-shrink-0">
                            <Image
                              src={study.image || "/placeholder.svg"}
                              alt={study.title}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{study.title}</p>
                            <p className="text-xs text-gray-500">{study.author}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="p-2">
                  <p className="text-xs text-gray-500 px-2 py-1 mb-2">
                    {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} found
                  </p>
                  {searchResults.map((study) => (
                    <button
                      key={study.id}
                      onClick={() => handleStudySelect(study)}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-md transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-md flex-shrink-0">
                          <Image
                            src={study.image || "/placeholder.svg"}
                            alt={study.title}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">{study.title}</h4>
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{study.description}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{study.author}</span>
                            <span>•</span>
                            <span>{study.date}</span>
                          </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center">
                  <p className="text-sm text-gray-500">No blogs found for "{searchQuery}"</p>
                  <p className="text-xs text-gray-400 mt-1">Try different keywords</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredCaseStudies.map((study) => (
          <div
            key={study.id}
            id={`study-${study.id}`}
            className={`bg-white rounded-lg overflow-hidden shadow-sm border transition-all cursor-pointer group ${
              selectedStudy === study.id
                ? "border-red-500 shadow-md ring-2 ring-red-100"
                : "border-gray-100 hover:shadow-md"
            }`}
          >
            <div className="relative h-40 sm:h-48 overflow-hidden">
              <Image
                src={study.image || "/placeholder.svg"}
                alt={study.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs sm:text-sm text-gray-600">
                  {study.author} • {study.date}
                </div>
                <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 group-hover:text-[#F25F4A] transition-colors line-clamp-2">
                {study.title}
              </h3>

              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3">{study.description}</p>

              {/* Category Tags */}
              {/* <div className="flex flex-wrap gap-1 mt-3">
                {study.category.map((cat) => (
                  <span key={cat} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {cat}
                  </span>
                ))}
              </div> */}
            </div>
          </div>
        ))}
      </div>

      {/* No results message */}
      {filteredCaseStudies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No case studies found matching your criteria.</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  )
}
