import { MetricCard } from "./metric-card"
import { ProgramCompletionChart } from "./program-completion-chart"
import { VolunteerEngagementChart } from "./volunteer-engagement-chart"
import { ResourceAllocationChart } from "./resource-allocation-chart"
import { Users, BookOpen } from "lucide-react"
import Image from "next/image"

export function DashboardContent() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Volunteers Engaged"
        value="512"
        change="28.4%"
        icon={<Users className="h-5 w-5 text-purple-600" />}
        iconBg="bg-purple-100"
        isPositive={false}
      />
      <MetricCard
        title="Donations Received"
        value="$54K"
        change="28.4%"
        icon={<Image src="/dashboard/coins-stacked-02.svg" alt="Coins images" height={23} width={23} />}
        iconBg="bg-green-100"
        isPositive={true}
      />
      <MetricCard
        title="Active Programs"
        value="20"
        change="28.4%"
        icon={<Image src="/dashboard/presentation-chart-03.svg" alt="Coins images" height={23} width={23} />}
        iconBg="bg-red-100"
        isPositive={false}
      />
      <MetricCard
        title="Total Beneficiaries"
        value="1200"
        change="28.4%"
        icon={<BookOpen className="h-5 w-5 text-orange-500" />}
        iconBg="bg-orange-100"
        isPositive={true}
      />
    </div>

      {/* Program Completion Chart */}
      <ProgramCompletionChart />

      {/* Bottom Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <VolunteerEngagementChart />
        <ResourceAllocationChart />
      </div>
    </div>
  )
}
