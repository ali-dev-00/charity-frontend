"use client"

import type React from "react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Home, Search } from "lucide-react"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { AppSidebar } from "./app-sidebar"
import { NotificationDropdown } from "./notification-dropdown"
import { ProfileDropdown } from "./profile-dropdown"
import { SearchBar } from "./search-bar"

interface DashboardShellProps {
  children: React.ReactNode
}

const pageTitle: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/alumni-management": "Alumni Management",
  "/dashboard/volunteer-management": "Volunteer Management",
  "/dashboard/member-management": "Member Management",
  "/dashboard/messages": "Messages",
  "/dashboard/add-managers": "Add Managers",
  "/dashboard/settings": "Settings",
  "/dashboard/notifications": "Notifications",
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const title = pageTitle[pathname] || "Dashboard"

  return (
    <div className="flex w-[100%] h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar - Fixed height, no scroll */}
      <div className="hidden lg:block w-64 shrink-0 h-screen">
        <AppSidebar collapsible="none" />
      </div>

      {/* Mobile Sidebar - Overlay */}
      <div className="lg:hidden">
        <AppSidebar collapsible="offcanvas" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col  h-screen overflow-hidden ">
        {/* Fixed Header */}
        <header className="shrink-0 bg-white border-b border-gray-200 ">
          <div className="flex h-16 items-center justify-between px-4 lg:px-6">
            <div className="flex items-center text-gray-500 gap-4">
              <SidebarTrigger className="lg:hidden" />
              <div className="flex gap-2 items-center">
                <Home className="h-4 w-4" />
                <h1 className="text-sm  ">{title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 cursor-pointer hover:text-gray-900"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-4 w-4" />
              </Button>
              <NotificationDropdown />
              <ProfileDropdown />
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </header>

        {/* Scrollable Content Only */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
