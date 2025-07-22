'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function VolunteerEngagementChart() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const values = [20, 45, 90, 65, 45, 20, 50]
  const max = Math.max(...values)

  const pct = (v: number) => (v / max) * 100

  return (
    <Card className="border-gray-200 bg-white">
      {/* ---------- header ---------- */}
      <CardHeader className="flex items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold">
          Weekly Volunteer Engagement
        </CardTitle>

        <Select defaultValue="this-week">
          <SelectTrigger className="w-32 border-gray-200">
            <SelectValue placeholder="This Week" />
          </SelectTrigger>
          <SelectContent className='bg-white border-gray-200'>
            <SelectItem value="this-week">This Week</SelectItem>
            <SelectItem value="last-week">Last Week</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      {/* ---------- chart with Y-axis ---------- */}
      <CardContent>
        <div className="relative flex h-64">
          {/* Y-axis labels */}
          <div className="flex flex-col justify-between pr-2 text-xs text-gray-400">
            {[100, 80, 60, 40, 20, 0].map((label) => (
              <div key={label} className="h-full flex items-center justify-end">
                <span className="translate-y-1">{label}%</span>
              </div>
            ))}
          </div>

          {/* chart area */}
          <div className="relative flex-1">
            {/* horizontal grid lines */}
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-full border-t border-gray-200" />
              ))}
            </div>

            {/* bars */}
            <div className="relative z-10 flex h-full items-end justify-between gap-2 px-1">
              {days.map((day, i) => {
                const highlight = day === 'Tue'
                return (
                  <div
                    key={day}
                    className="flex h-full flex-1 flex-col justify-end items-center gap-2"
                  >
                    <div
                      className={`w-full rounded-t-sm transition-colors duration-300
                        ${highlight
                          ? 'bg-teal-700 hover:bg-teal-800'
                          : 'bg-gray-200 hover:bg-gray-300'}`}
                      style={{ height: `${pct(values[i])}%`, minHeight: '4px' }}
                    />
                    <span className="text-xs text-gray-600">{day}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
