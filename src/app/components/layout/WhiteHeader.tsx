"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, AlignRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface DropdownItem {
  label: string
  href: string
}

interface NavItem {
  label: string
  href?: string
  dropdown?: DropdownItem[]
}

const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Programs",
    dropdown: [
      { label: "Our Programs", href: "/programs/our-program" },
      { label: "Our Appeals", href: "/programs/our-appeals" },
      { label: "Program Details", href: "/programs/program-details" },
      { label: "Zakat Calculator", href: "/programs/zakat-calculator" },
    ],
  },
  { label: "Appeals", href: "/programs/our-appeals" },
  { label: "Financials", href: "/financials" },
  { label: "Blogs", href: "/blog" },
  {
    label: "Join Us",
    dropdown: [
      { label: "Alumni Registration", href: "/join-us/alumni-registration" },
      { label: "Voluteer Registration", href: "/join-us/voluteer-registration" },
      { label: "Members Registration", href: "/join-us/members-registration" },
    ],
  },
  {
    label: "Contact",
    dropdown: [
      { label: "Get in Touch", href: "/contact-us" },
      { label: "Office Locations", href: "/contact-us/board-of-directors" },
      { label: "Board of Directors ", href: "/contact-us/board-of-directors" },
      { label: "Message", href: "/contact-us/message" },
    ],
  },
]

export default function WhiteNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  const toggleMobileDropdown = (label: string) => {
    setMobileActiveDropdown(mobileActiveDropdown === label ? null : label)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  return (
    <nav className="bg-white text-white relative z-50 mb-10">
      <div className="max-w-[1366px] mx-auto px-4 md:px-8 lg:px-16 border-b border border-gray-100">
        <div className="flex items-center justify-between  py-3 ">
          {/* Logo */}
          <div className="">
            <Link href="/home">
              <Image src="/white-logo.svg" height={70} width={120} alt="site logo" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href || "#"}
                    className="flex items-center px-2 py-2 text-sm font-medium text-black hover:text-[#f25f4a] transition-colors duration-200 relative"
                  >
                    {item.label}
                    {item.dropdown && (
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                    {/* Hover border animation */}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f25f4a] transition-all duration-300 group-hover:w-full"></span>
                  </Link>

                  {/* Desktop Dropdown */}
                  {item.dropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-[#F9F4E8] rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#f25f4a] hover:text-[#007466] transition-colors duration-200 rounded-md m-1"
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Donate Button */}
          <div className="hidden lg:block">
            <Button className="bg-[#f25f4a] hover:bg-[#f25f4a]/90 text-white font-medium px-6 py-2 rounded-full transition-all duration-200 hover:scale-105">
              Donate Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-[#f25f4a] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <AlignRight className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className="fixed top-0 left-0 bottom-0 w-1/2 min-w-[280px] max-w-[400px] bg-[#F9F4E8] z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out"
        style={{ transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-100%)" }}
      >
        <div className="px-4 pt-16 pb-6">
          {navItems.map((item) => (
            <div key={item.label} className="mb-2">
              <div className="flex items-center justify-between">
                <Link
                  href={item.href || "#"}
                  className="flex-1 block px-2 py-3 text-base font-medium text-[#007466] hover:text-[#f25f4a] transition-all duration-200 group"
                  onClick={() => setIsMobileMenuOpen(false)} // Close mobile menu on link click
                >
                  <span className="relative inline-block">
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f25f4a] transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
                {item.dropdown && (
                  <button
                    onClick={() => toggleMobileDropdown(item.label)}
                    className="p-2 text-[#007466] hover:text-[#f25f4a] transition-colors duration-200"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${mobileActiveDropdown === item.label ? "rotate-180" : ""}`}
                    />
                  </button>
                )}
              </div>

              {/* Mobile Dropdown */}
              {item.dropdown && (
                <div
                  className={`ml-4 mt-2 space-y-1 overflow-hidden transition-all duration-300 ${mobileActiveDropdown === item.label ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  {item.dropdown.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.label}
                      href={dropdownItem.href}
                      className="block px-3 py-2 text-sm text-[#007466] hover:text-[#f25f4a] hover:bg-white/20 rounded transition-all duration-200 group"
                      onClick={() => setIsMobileMenuOpen(false)} // Close mobile menu on link click
                    >
                      <span className="relative inline-block">
                        {dropdownItem.label}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f25f4a] transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Mobile Donate Button */}
          <div className="mt-6 px-3">
            <Button
              className="w-full bg-[#f25f4a] hover:bg-[#f25f4a]/90 text-white font-medium py-3 rounded-full transition-all duration-200 hover:scale-105"
              onClick={() => setIsMobileMenuOpen(false)} // Close mobile menu when Donate button is clicked
            >
              Donate Now
            </Button>
          </div>
        </div>
      </div>

    </nav>
  )
}
