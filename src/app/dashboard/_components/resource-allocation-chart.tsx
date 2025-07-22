'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface LegendItemProps {
  label: string
  value: number
  color: string         
}

const LegendItem: React.FC<LegendItemProps> = ({ label, value, color }) => (
  <div className="flex items-center justify-between rounded-lg bg-gray-50 px-1 py-2">
    <div className="flex items-center gap-3">
      <span className={`h-6 w-1 rounded ${color}`} />     
      <span className="text-[13px] text-gray-600">{label}</span>
    </div>

    {/* percentage */}
    <div className="flex items-baseline">
      <span className="text-lg font-semibold text-gray-900">{value}</span>
      <span className="ml-0.5 text-xs text-gray-500">%</span>
    </div>
  </div>
)

/* ---------- Main component ---------- */
export function ResourceAllocationChart() {
  return (
    <Card className="bg-white border border-gray-200">
      {/* title */}
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Program Resource Allocation
        </CardTitle>
      </CardHeader>

      {/* legend + chart */}
      <CardContent className="pt-0 flex flex-col sm:flex-row items-center sm:items-start gap-2">
        {/* left legend */}
        <div className="space-y-4 w-full sm:w-68 mt-8">
          <LegendItem label="Education Programs" value={40} color="bg-cyan-500" />
          <LegendItem label="Healthcare Support"  value={30} color="bg-amber-500" />
          <LegendItem label="Community Aid"      value={30} color="bg-red-500"   />
        </div>

        {/* donut */}
        <div className="flex-shrink-0 mt-4">
          <div className="relative w-52 h-52">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {/* 40 % – cyan */}
              <circle
                cx="50" cy="50" r="40" fill="none" stroke="#06b6d4" strokeWidth="8"
                strokeDasharray="100.53 251.33" strokeDashoffset="0"
              />
              {/* 30 % – yellow */}
              <circle
                cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="8"
                strokeDasharray="75.4 251.33" strokeDashoffset="-100.53"
              />
              {/* 30 % – red */}
              <circle
                cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="8"
                strokeDasharray="75.4 251.33" strokeDashoffset="-175.93"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">100%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
