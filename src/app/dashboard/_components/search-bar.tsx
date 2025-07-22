"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  if (!isOpen) return null

  return (
    <div className="border-b bg-white px-4 lg:px-6 py-3">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 cursor-pointer -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search dashboard, users, programs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 h-10 border-gray-300 focus:border-[#667085] focus:ring-[#667085]"
            autoFocus
          />
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-600 hover:text-gray-900 h-10 w-10">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
