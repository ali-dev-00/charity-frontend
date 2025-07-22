"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProgramCompletionChart() {
  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <CardTitle className="text-lg font-semibold text-gray-900">Program Completion Over the Year</CardTitle>
        <Select defaultValue="this-year">
          <SelectTrigger className="w-32 border-gray-300 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-year">This Year</SelectItem>
            <SelectItem value="last-year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-80 relative">
          <svg viewBox="0 0 800 280" className="w-full h-full">
            {/* Y-axis labels */}
            <text x="20" y="25" className="text-sm fill-gray-500 font-medium">
              100%
            </text>
            <text x="25" y="70" className="text-sm fill-gray-500 font-medium">
              80%
            </text>
            <text x="25" y="115" className="text-sm fill-gray-500 font-medium">
              60%
            </text>
            <text x="25" y="160" className="text-sm fill-gray-500 font-medium">
              40%
            </text>
            <text x="25" y="205" className="text-sm fill-gray-500 font-medium">
              20%
            </text>
            <text x="35" y="250" className="text-sm fill-gray-500 font-medium">
              0
            </text>

            {/* X-axis labels */}
            <text x="50" y="270" className="text-sm fill-gray-500 font-medium">
              JAN
            </text>
            <text x="110" y="270" className="text-sm fill-gray-500 font-medium">
              FEB
            </text>
            <text x="170" y="270" className="text-sm fill-gray-500 font-medium">
              MAR
            </text>
            <text x="230" y="270" className="text-sm fill-gray-500 font-medium">
              APR
            </text>
            <text x="290" y="270" className="text-sm fill-gray-500 font-medium">
              MAY
            </text>
            <text x="350" y="270" className="text-sm fill-gray-500 font-medium">
              JUN
            </text>
            <text x="410" y="270" className="text-sm fill-gray-500 font-medium">
              JUL
            </text>
            <text x="470" y="270" className="text-sm fill-gray-500 font-medium">
              AUG
            </text>
            <text x="530" y="270" className="text-sm fill-gray-500 font-medium">
              SEP
            </text>
            <text x="590" y="270" className="text-sm fill-gray-500 font-medium">
              OCT
            </text>
            <text x="650" y="270" className="text-sm fill-gray-500 font-medium">
              NOV
            </text>
            <text x="710" y="270" className="text-sm fill-gray-500 font-medium">
              DEC
            </text>

            {/* Main line chart - matching the exact curve from the image */}
            <path
              d="M 50 140 
                 Q 80 120 110 100 
                 Q 140 80 170 120 
                 Q 200 160 230 140 
                 Q 260 120 290 100 
                 Q 320 80 350 60 
                 Q 380 40 410 80 
                 Q 440 120 470 100 
                 Q 500 80 530 60 
                 Q 560 40 590 120 
                 Q 620 200 650 140 
                 Q 680 80 710 100 
                 Q 740 120 770 80"
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Area fill under the curve */}
            <path
              d="M 50 140 
                 Q 80 120 110 100 
                 Q 140 80 170 120 
                 Q 200 160 230 140 
                 Q 260 120 290 100 
                 Q 320 80 350 60 
                 Q 380 40 410 80 
                 Q 440 120 470 100 
                 Q 500 80 530 60 
                 Q 560 40 590 120 
                 Q 620 200 650 140 
                 Q 680 80 710 100 
                 Q 740 120 770 80
                 L 770 240 L 50 240 Z"
              fill="url(#redGradient)"
              opacity="0.15"
            />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Tooltip point and line */}
            <circle cx="590" cy="120" r="5" fill="#ef4444" stroke="white" strokeWidth="2" />
            <line
              x1="590"
              y1="120"
              x2="590"
              y2="240"
              stroke="#ef4444"
              strokeWidth="2"
              opacity="0.7"
            />
            <rect x="510" y="70" width="120" height="45" rx="6" fill="#1f2937" />
            <text x="525" y="88" className="text-xs fill-white font-medium">
              Total Programs
            </text>
            <text x="545" y="105" className="text-md fill-white">
              1,300
            </text>
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}
