"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Grid2X2 , Users, UserCheck, MessageSquare, UserPlus, Settings, UserCircleIcon } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

const menuItems = [
  { title: "Dashboard", icon: Grid2X2 , href: "/dashboard" },
  { title: "Alumni Management", icon: UserCheck, href: "/dashboard/alumni-management" },
  { title: "Volunteer Management", icon: Users, href: "/dashboard/volunteer-management" },
  { title: "Member Management", icon: UserCircleIcon, href: "/dashboard/member-management" },
  { title: "Messages", icon: MessageSquare, href: "/dashboard/messages" },
  { title: "Add Managers", icon: UserPlus, href: "/dashboard/add-managers" },
]

const bottomMenuItems = [
  { title: "Settings", icon: Settings, href: "/dashboard/settings" },
  { title: "Notifications", icon: Bell, href: "/dashboard/notifications" },
]

export function AppSidebar({ ...props }: any) {
  const pathname = usePathname()

  return (
    <Sidebar className="bg-[#02544a]  border-r-0 h-screen" {...props}>
      <SidebarHeader className="bg-[#02544a] p-6 border-b border-white/10 shrink-0">
        <div className="flex flex-col items-start">
          <Image src="/logo.svg" alt="dashboard logo" height="150" width="150" />
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-[#02544a] px-4 py-4 flex-1 overflow-y-auto">
        <SidebarMenu className="space-y-1">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className="text-white hover:bg-[#003B37] data-[active=true]:bg-[#003B37] data-[active=true]:text-white rounded-md"
              >
                <Link href={item.href} className="flex items-center gap-3 px-3 py-3">
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <div className="flex-1" />

        <SidebarMenu className="bg-[#02544a] space-y-1 mt-4">
          {bottomMenuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className="text-white hover:bg-[#003B37] rounded-md">
                <Link href={item.href} className="flex items-center gap-3 px-3 py-2.5">
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className="text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="bg-[#02544a] p-4 border-t border-white/10 shrink-0">
        <div className="flex items-center gap-3 text-white">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback className="bg-white/20 text-white text-xs">SH</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium truncate">Sienna Hewitt</span>
            <span className="text-xs text-white/70 truncate">sienna@olad.com</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
