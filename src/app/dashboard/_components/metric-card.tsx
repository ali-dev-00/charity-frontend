import React from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: string
  icon: React.ReactNode
  iconBg: string // Tailwind class like "bg-purple-100 text-purple-600"
  isPositive?: boolean
}

export function MetricCard({
  title,
  value,
  change,
  icon,
  iconBg,
  isPositive = true,
}: MetricCardProps) {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm rounded-xl py-0">
      <CardContent className="px-4 py-4 pb-0">
        <div className="flex items-start justify-between">
          {/* Text */}
          <div>
            <p className="text-sm text-gray-500 mb-1">{title}</p>
            <p className="text-xl font-semibold text-gray-900 mb-2">{value}</p>
          </div>

          {/* Icon */}
          <div className={`p-2 rounded-md ${iconBg}`}>
            {icon}
          </div>
        </div>
      </CardContent>
      <div className="border-t border-gray-200 px-4 py-3" >
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Last month</span>
          <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? "text-green-600" : "text-red-500"}`}>
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{change}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
