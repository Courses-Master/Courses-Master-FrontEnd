"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts"; import { Filter, Search, Calendar, User, MapPin, Music, TrendingUp, TrendingDown, MousePointer } from "lucide-react";

export default function AttendeeInsightsCharts() {
  const locations = [
    { name: "853", value: 853 },
    { name: "743", value: 743 },
    { name: "763", value: 763 },
    { name: "934", value: 934 },
    { name: "783", value: 783 },
    { name: "643", value: 643 },
    { name: "687", value: 687 },
    { name: "936", value: 936 },
    { name: "573", value: 573 },
    { name: "345", value: 345 },
  ];

  const locationColors = [
    "#0070FF", "#FF2B2B", "#2ECC40", "#9B59B6", "#000000",
    "#FF851B", "#00BFA6", "#FFD600", "#AAAAAA", "#B388FF"
  ];

  // Data للـ Pie Chart (Interests)
  const interests = [
    { name: "Interest - A", value: 265 },
    { name: "Interest - B", value: 234 },
    { name: "Interest - C", value: 212 },
    { name: "Interest - D", value: 123 },
    { name: "Interest - E", value: 218 },
  ];

  const interestColors = ["#7C4DFF", "#FF9800", "#F44336", "#2196F3", "#4CAF50"];

  // Data للـ Pie Chart (Ages)
  const ages = [
    { name: "18 - 24 Years", value: 2345 },
    { name: "25 - 34 Years", value: 1342 },
    { name: "35 - 44 Years", value: 245 },
    { name: "44+ Years", value: 124 },
  ];

  const ageColors = ["#7C4DFF", "#8B0000", "#4CAF50", "#FFD600"];
  return (
    <div className="p-4 space-y-4 flex-1">
      {/* Header */}
      <div className="bg-white rounded-2xl flex justify-between items-center">
        <h1 className="text-2xl font-bold  ml-5">All Attendee Insights</h1>
        <div className="flex flex-wrap justify-between items-center  p-4 rounded-lg ">


          <div className="flex gap-3 items-center">
            <p className="border border-[#434343] text-[#434343] p-1 px-2 rounded-[10px]">Attendees : 5487</p>
            <Button variant="outline" className="flex gap-2 text-[#434343] border border-[#434343]">
              <Filter className="w-4 h-4 " /> Filter
            </Button>
            <div className="relative ">
              <Search className="absolute  left-2 top-2 w-4 h-4 text-gray-400" />
              <Input type="text" placeholder="Search..." className="pl-8 w-48 border border-[#434343]" />
            </div>

          </div>
        </div>

      </div>

      {/* Top Grid */}
      <div className="flex">
        <div className="flex flex-col basis-[25%] gap-5">
          <Card className="bg-white h-[150px] border-none shadow shadow-gray-500 py-1">
            <CardContent className="p-3 relative h-full">
              <div className="flex justify-between">
                <p className="text-black font-medium text-lg">ATTENDEE AGE</p>
                <Calendar size={18} />
              </div>
              <h3 className="text-2xl font-bold">18 - 24 Years</h3>
              <div className="flex mt-5 ml-5 items-center gap-1">
                <p className="text-green-500 text-xs">30% increase</p>
                <TrendingUp className="text-green-500 w-4 h-4" />
              </div>
              <p className="absolute bottom-3 right-8 text-black text-[22px] font-bold">2345</p>
            </CardContent>
          </Card>

          {/* GENDER */}
          <Card className="bg-white h-[150px] border-none shadow shadow-gray-500 py-1">
            <CardContent className="p-3 relative h-full">
              <div className="flex justify-between">
                <p className="text-black font-medium text-lg">ATTENDEE GENDER</p>
                <User size={18} />
              </div>
              <h3 className="text-2xl font-bold">Male</h3>
              <div className="flex mt-5 ml-5 items-center gap-1">
                <p className="text-green-500 text-xs">18% increase</p>
                <TrendingUp className="text-green-500 w-4 h-4" />
              </div>
              <p className="absolute bottom-3 right-8 text-black text-[22px] font-bold">3345</p>
            </CardContent>
          </Card>

          {/* LOCATION */}
          <Card className="bg-white h-[150px] border-none shadow shadow-gray-500 py-1">
            <CardContent className="p-3 relative h-full">
              <div className="flex justify-between">
                <p className="text-black font-medium text-lg">ATTENDEE LOCATION</p>
                <MapPin size={18} />
              </div>
              <h3 className="text-2xl font-bold">Colombo</h3>
              <div className="flex mt-5 ml-5 items-center gap-1">
                <p className="text-red-500 text-xs">15% decrease</p>
                <TrendingDown className="text-red-500 w-4 h-4" />
              </div>
              <p className="absolute bottom-3 right-8 text-black text-[22px] font-bold">845</p>
            </CardContent>
          </Card>

          {/* INTERESTS */}
          <Card className="bg-white h-[150px] border-none shadow shadow-gray-500 py-1">
            <CardContent className="p-3 relative h-full">
              <div className="flex justify-between">
                <p className="text-black font-medium text-lg">ATTENDEE INTERESTS</p>
                <Music size={18} />
              </div>
              <h3 className="text-2xl font-bold">EDM Music</h3>
              <div className="flex mt-5 ml-5 items-center gap-1">
                <p className="text-green-500 text-xs">63% increase</p>
                <TrendingUp className="text-green-500 w-4 h-4" />
              </div>
              <p className="absolute bottom-3 right-8 text-black text-[22px] font-bold">123</p>
            </CardContent>
          </Card>

          {/* ENGAGEMENT */}
          <Card className="bg-white h-[150px] border-none shadow shadow-gray-500 py-1">
            <CardContent className="p-3 relative h-full">
              <div className="flex justify-between">
                <p className="text-black font-medium text-lg">TOTAL ENGAGEMENT</p>
                <MousePointer size={18} />
              </div>
              <h3 className="text-2xl font-bold">Facebook Ads</h3>
              <div className="flex mt-5 ml-5 items-center gap-1">
                <p className="text-red-500 text-xs">21% decrease</p>
                <TrendingDown className="text-red-500 w-4 h-4" />
              </div>
              <p className="absolute bottom-3 right-8 text-black text-[22px] font-bold">21</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className=" flex flex-col mx-5 gap-5 flex-1">
          <Card className="bg-white  border-none shadow shadow-gray-500 h-[320px] col-span-2">
            <CardContent className="p-4">
              <h3 className="font-semibold text-black mb-4">ALL ATTENDEE LOCATIONS</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={locations}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={20}>
                    {locations.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={locationColors[index % locationColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Interests Donut */}
          <div className="flex justify-between gap-5 flex-1">
            <Card className="bg-white  basis-[50%] border-none h-full">
              <CardContent className="p-4 h-full flex flex-col">
                <h3 className="font-semibold text-black text-2xl text-center">ATTENDEE INTERESTS</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={interests}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {interests.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={interestColors[index % interestColors.length]} />
                      ))}
                    </Pie>
                    <Legend
                      wrapperStyle={{
                        marginTop: 20,
                        marginBottom: 10,
                      }}
                      className="grid grid-cols-2" />
                    <Tooltip className="mt-5" />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Ages Pie */}
            <Card className="bg-white basis-[50%] border-none h-full">
              <CardContent className="p-4 h-full flex flex-col">
                <h3 className="font-semibold text-black text-2xl  text-center">ATTENDEE AGES</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ages}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      dataKey="value"
                    >
                      {ages.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={ageColors[index % ageColors.length]} />
                      ))}
                    </Pie>
                    <Legend
                      wrapperStyle={{
                        marginTop: 20,
                        marginBottom: 10,
                      }}
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
