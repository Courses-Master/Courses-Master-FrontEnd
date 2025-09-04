import { useState, useEffect } from "react";
import { Pie, PieChart, Sector, Tooltip } from "recharts";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  ChartContainer,
} from "@/components/ui/chart";


const Dot = ({ color }) => (
  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
);

export default function EventsPieChart({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const chartData = [
    { key: "عدد الطلبات المكتملة", requestNum: data?.completed_requests || 120, browser: "Event-A", visitors: data?.completed || 50, fill: "#FCA700" },
    { key: "عدد الطلبات قيد التنفيذ", requestNum: data?.in_progress_requests || 50, browser: "Event-A", visitors: data?.in_progress || 25, fill: "#FF371F" },
    { key: "عدد الطلبات المرفوضة", requestNum: data?.rejected_requests || 250, browser: "Event-A", visitors: data?.rejected || 25, fill: "#0DF38A" },
    { key: "عدد الطلبات المرفوضة", requestNum: data?.rejected_requests || 250, browser: "Event-A", visitors: data?.rejected || 25, fill: "#7224F2" },
    { key: "عدد الطلبات المرفوضة", requestNum: data?.rejected_requests || 250, browser: "Event-A", visitors: data?.rejected || 25, fill: "#2D44EC" },

  ];


  const chartConfig = {
    visitors: { label: "Visitors" },
    service1: { label: "Accepted Requests", color: "var(--chart-4)" },
    safari: { label: "Pending Review", color: "var(--chart-2)" },
    firefox: { label: "Rejected Requests", color: "var(--chart-3)" },
  };

  const totalVisitors = chartData.reduce((sum, data) => sum + data.visitors, 0);
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white w-44 p-2 flex justify-center gap-2 rounded shadow text-xs border border-gray-200">
          <span>{data.key}</span>
          <p className="font-bold inline">{data.requestNum}</p>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    const highestIndex = chartData.findIndex((data) => data.visitors === Math.max(...chartData.map((item) => item.visitors)));
    setActiveIndex(highestIndex);
  }, []);


  return (
    <>
      <div className="basis-[256px]  mt-5  h-[400px]   flex flex-col gap-1 items-center rounded-2xl bg-white p-4 shadow-md">
        <h1 className="text-2xl text-center ">Customer Engagement</h1>

        <Card className="flex flex-col h-[350px] pt-1 w-full bg-transparent border-transparent shadow-none">
          <CardContent className="h-[290px] flex flex-col px-0 pb-0 ">
            <ChartContainer config={chartConfig} className=" aspect-square max-h-[250px]">
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Pie
                  data={chartData}
                  dataKey="visitors"
                  nameKey="browser"
                  outerRadius={85}
                  innerRadius={60}
                  strokeWidth={5}
                  activeIndex={activeIndex}
                  activeShape={({ outerRadius, index, ...rest }) => (
                    <Sector
                      {...rest}
                      outerRadius={index === activeIndex ? outerRadius + 20 : outerRadius + 10}
                    />
                  )}
                />
              </PieChart>
            </ChartContainer>
            <ul className="grid grid-cols-2 gap-2 gap-x-6 gap-y-1 mx-auto w-fit">
              {chartData.map((data, index) => {
                const percentage = data?.visitors?.toFixed(0);
                return (
                  <li
                    key={index}
                    className="flex justify-start gap-2 items-center"
                  >
                    <Dot color={data.fill} />
                    <div className="basis-3/4">
                      <span className=" text-[12px] font-cairo ">
                        {data.browser}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>

          </CardContent>
        </Card>
      </div>
    </>
  );
}
