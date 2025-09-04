import React, { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    PieChart, Pie, Cell, ResponsiveContainer
} from "recharts"; import { Filter, Users, CircleArrowLeftIcon, Search, Calendar, User, MapPin, Music, TrendingUp, TrendingDown, MousePointer } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import EventsAdminSidebar from "@/Layout/AdminSideBar";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { encryptStorage } from "@/utils/storage";

export default function AttendeeInsightsEvent() {
    const [event, setEvent] = useState([])
    const navigate = useNavigate(null)
    const storeAuth = encryptStorage.getItem('auth');
    const { id } = useParams();
    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storeAuth?.token}`,
            },
        };

        const fetchEvent = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/events/get-events/${id}`, options);
                const data = await res.json();
                const eventData = data?.data[0] || {};
                setEvent(eventData)
            } catch (err) {
                console.error("Error fetching Event:", err);
            }
        };

        fetchEvent();
    }, [id]);
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

    const interests = [
        { name: "Interest - A", value: 265 },
        { name: "Interest - B", value: 234 },
    ];

    const interestColors = ["#7C4DFF", "#FF9800", "#F44336", "#2196F3", "#4CAF50"];

    const ages = [
        { name: "18 - 24 Years", value: 2345 },
        { name: "25 - 34 Years", value: 1342 },
    ];

    const ageColors = ["#7C4DFF", "#8B0000", "#4CAF50", "#FFD600"];

    return (
        <div className="flex">
            <EventsAdminSidebar />

            <div className="p-4 space-y-4 flex-1">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <div className="flex gap-2 items-center" onClick={() => navigate(`/events/${id}`)}>
                            <CircleArrowLeftIcon className="cursor-pointer" />
                            <h1 className="text-xl font-bold cursor-pointer">Attendee Insights – {event?.event_name}</h1>
                        </div>
                        <p className="text-gray-600 text-sm">Event Venue: {event?.event_venue}</p>
                        <p className="text-gray-600 text-sm">Event Date: {new Date(event.event_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).replace(/ /g, ' ')}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="relative">
                            <input type="text" placeholder="Search..." className="pl-8 pr-2 py-1 border rounded-md" />
                            <Search className="absolute left-2 top-1.5 w-4 h-4 text-gray-500" />
                        </div>
                        <button className="flex items-center border rounded-md px-3 py-1 text-sm bg-white shadow">
                            <Users className="w-4 h-4 mr-1" /> 570 Attendees
                        </button>
                        <button className="flex items-center border rounded-md px-3 py-1 text-sm bg-white shadow">
                            <Filter className="w-4 h-4 mr-1" /> Filter
                        </button>
                    </div>
                </div>

                {/* Top Grid */}
                <div className="flex min-h-screen">
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
                            <Card className="bg-white  p-0 basis-[50%] border-none h-full">
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
                            <Card className="bg-white  p-0 basis-[50%] border-none h-full">
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
                    <div className="flex flex-col basis-[30%] gap-5">
                        <Card className="bg-white h-[400px] border-none py-1">
                            <CardContent className="p-3 relative h-full">
                                {/* العنوان والوصف */}
                                <div className="flex flex-col justify-between mb-4">
                                    <p className="text-black font-medium text-sm">
                                        Engagement & Social Media Reach
                                    </p>
                                    <p className="text-gray-600 font-medium text-xs">
                                        How attendees engaged with the event
                                    </p>
                                </div>

                                {/* قائمة السوشيال ميديا */}
                                <div className="space-y-5 mt-6">
                                    {/* Instagram */}
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            {/* Instagram SVG */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#E4405F" viewBox="0 0 24 24" className="w-6 h-6">
                                                <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm4.5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z" />
                                            </svg>
                                            <span className="text-sm font-medium">Instagram</span>
                                        </div>
                                        <span className="font-semibold">5,200</span>
                                    </div>

                                    {/* Facebook */}
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#1877F2" viewBox="0 0 24 24" className="w-6 h-6">
                                                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5a3.5 3.5 0 0 1 3.8-3.9c.8 0 1.7.1 1.7.1v2.4H15a1.5 1.5 0 0 0-1.7 1.6V12H18l-.5 3h-3v7A10 10 0 0 0 22 12Z" />
                                            </svg>
                                            <span className="text-sm font-medium">Facebook</span>
                                        </div>
                                        <span className="font-semibold">3,800</span>
                                    </div>

                                    {/* Twitter */}
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#1DA1F2" viewBox="0 0 24 24" className="w-6 h-6">
                                                <path d="M19.6 7.2c.01.2.01.4.01.6A10 10 0 0 1 4 17.3c.3 0 .7.1 1 .1a7 7 0 0 0 4.3-1.5 3.5 3.5 0 0 1-3.3-2.5c.2 0 .5.1.7.1.3 0 .7 0 1-.1a3.5 3.5 0 0 1-2.8-3.4v-.1c.5.3 1 .4 1.6.4a3.5 3.5 0 0 1-1.1-4.7 10 10 0 0 0 7.2 3.6 3.5 3.5 0 0 1 6-3.2 7 7 0 0 0 2.2-.8 3.5 3.5 0 0 1-1.5 1.9 7 7 0 0 0 2-.6 7 7 0 0 1-1.7 1.8Z" />
                                            </svg>
                                            <span className="text-sm font-medium">Twitter</span>
                                        </div>
                                        <span className="font-semibold">1,200</span>
                                    </div>

                                    {/* LinkedIn */}
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#0A66C2" viewBox="0 0 24 24" className="w-6 h-6">
                                                <path d="M20.45 20.45h-3.6v-5.4c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9v5.5h-3.6V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.3 4.3 5.2v6.6ZM5.34 7.43a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM7.14 20.45h-3.6V9h3.6v11.45Z" />
                                            </svg>
                                            <span className="text-sm font-medium">LinkedIn</span>
                                        </div>
                                        <span className="font-semibold">980</span>
                                    </div>
                                </div>

                                {/* QR Scan */}
                                <div className="flex justify-between items-center mt-6  pt-3">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src="https://api.qrserver.com/v1/create-qr-code/?size=40x40&data=EventScan"
                                            alt="QR Code"
                                            className="w-6 h-6"
                                        />
                                        <span className="text-sm font-medium">QR Scans</span>
                                    </div>
                                    <span className="font-semibold">2,345</span>
                                </div>

                                {/* الإجمالي */}
                                <p className="absolute w-full text-center bottom-3 left-1/2 -translate-x-1/2 text-blue-300 text-lg font-medium">
                                    Total Count: 13,525
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="w-full max-w-lg mx-auto rounded-2xl border border-black">
                            <CardContent className="">
                                <table className="w-full text-center ">
                                    <thead>
                                        <tr>
                                            <th className="border border-black px-4 py-2 rounded-tl-2xl">Location</th>
                                            <th className="border border-black px-4 py-2 rounded-tr-2xl">Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-black px-4 py-2">colombia</td>
                                            <td className="border border-black px-4 py-2">120</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-black px-4 py-2">kandy</td>
                                            <td className="border border-black px-4 py-2">85</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-black px-4 py-2">galle</td>
                                            <td className="border border-black px-4 py-2">60</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-black px-4 py-2 rounded-bl-2xl">jaffna</td>
                                            <td className="border border-black px-4 py-2 rounded-br-2xl">30</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </div>
    );
}
