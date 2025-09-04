"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Legend } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A linear line chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "July", desktop: 280 },
  { month: "August", desktop: 320 },
  { month: "September", desktop: 150 },
  { month: "October", desktop: 400 },
  { month: "November", desktop: 370 },
  { month: "December", desktop: 290 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
}

export function AdminLineChart() {
  return (
    <Card className="border-none bg-white max-w-[542px] h-[400px] mt-5 flex-1">
      <CardHeader>
        <div className="flex justify-around text-[12px]">
          <div>
            <p>Total Revenue</p>
            <p>156,500 LKR</p>
          </div>
          <div>
            <p>Total Tickets</p>
            <p>156,500 LKR</p>
          </div>
          <div>
            <p>Total Events</p>
            <p>156,500 LKR</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <Legend />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="linear"
              stroke="#4F46E5" // أي لون واضح مثلاً أزرق
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
