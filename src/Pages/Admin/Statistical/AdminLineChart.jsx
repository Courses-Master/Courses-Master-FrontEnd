import React from "react"
import { TrendingUp } from "lucide-react"
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Dot,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"

const chartData = [
  { browser: "Chrome", visitors: 500},
  { browser: "Safari", visitors: 200},
  { browser: "Firefox", visitors: 187},
  { browser: "Edge", visitors: 173 },
  { browser: "Other", visitors: 90},
]

export default function AdminLineChart() {
  return (
    <div className="p-6 rounded-xl shadow-md bg-white w-full max-w-full ">
      <div className="mb-4">
        <h2 className="text-xl text-[#15B79E] font-bold">Instructors Performance</h2>
        <p className="text-sm text-gray-500">Instructors / Completed Courses</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#ccc" vertical={false} />
          <XAxis dataKey="browser" />
          <YAxis />
          <Tooltip
            formatter={(value) => [`${value} visitors`, ""]}
            labelFormatter={(label) => `Browser: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="visitors"
            stroke="#15B79E"
            strokeWidth={2}
            dot={({ cx, cy, payload }) => (
              <Dot
                cx={cx}
                cy={cy}
                r={6}
                fill="#15B79E"
                stroke={payload.fill}
              />
            )}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
