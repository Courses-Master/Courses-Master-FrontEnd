import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Calendar, CircleArrowRight, CirclePlus } from "lucide-react"
import { Search, Filter } from "lucide-react"
import cash from "/src/assets/Cash.svg"
import seat from "/src/assets/Flight Seat.svg"
import ticket from "/src/assets/Ticket.svg"
import { useNavigate } from "react-router-dom"

export default function EventListUser({ events, setSearchText }) {
    const navigate = useNavigate(null)
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-2xl">
                <h1 className="text-2xl font-bold ml-5">Event Management Section</h1>
                <div className="flex flex-wrap justify-between items-center  p-4 rounded-lg shadow-md mb-6">
                    <div className="flex gap-3 items-center">
                        <Button variant="outline" className="flex gap-2 border border-[#434343] text-[#434343] ">
                            <Filter className="w-4 h-4 " /> Filter
                        </Button>
                        <div className="relative">
                            <Search className="absolute left-2 top-2 w-4 h-4  text-[#434343] " />
                            <Input onChange={(e) => setSearchText(e.target.value)} type="text" placeholder="Search..." className="pl-8 w-48 border border-[#434343] text-[#434343] " />
                        </div>
                        <Select className="border border-[#434343] text-[#434343] ">
                            <SelectTrigger className="w-32 border border-[#434343] text-[#434343] ">
                                <SelectValue placeholder="Sort By" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="status">Status</SelectItem>
                                <SelectItem value="date">Date</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" className="flex gap-2 border border-[#434343] text-[#434343] ">
                            <Calendar className="w-4 h-4" /> Pick Date
                        </Button>
                    </div>
                </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.length > 0 ? events.map((event, index) => (
                    <div key={index} className="bg-white group  cursor-default p-4 rounded-lg shadow hover:shadow-lg transition">
                        <div className="flex justify-between">
                            <h3 className="font-medium text-[16px]">{event.event_name}</h3>
                        </div>
                        <div className="flex gap-4 border-b border-b-[#666666] pb-2 mb-3">
                            <div className="flex gap-0.5">
                                <img src={cash} />

                                <p className="text-[#0F5D13]">{event.ticket_price || 0} LKR</p>
                            </div>
                            <div className="flex gap-0.5">
                                <img src={seat} />
                                <p className="text-[#EB3223]">{event.seat_amount || 0}</p>
                            </div>
                            <div className="flex gap-0.5">
                                <img src={ticket} />
                                <p className="text-[#8B2CF5]">{event.expected_attendance || 0}</p>
                            </div>
                        </div>
                        <p >
                            <span className="text-[#666666]" >Venue: </span>
                            <span className=" text-[16px] font-medium ml-1" >
                                {event.event_venue?.split(" ").length > 2 ? event.event_venue?.split(" ")[0] + " " + event.event_venue?.split(" ")[1] + "...."
                                    : event.event_venue
                                }

                            </span>
                        </p>
                        <p >
                            <span className="text-[#666666]" >Date: </span>
                            <span className=" text-[16px] font-medium ml-1" >{new Date(event.event_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).replace(/ /g, ' ')}</span>
                        </p>
                        <p >
                            <span className="text-[#666666]" >Time: </span>
                            <span className=" text-[16px] font-medium ml-1" >{event.event_time}</span>
                        </p>
                        <Button onClick={() => navigate(`/events/${event?.id}`)} variant="link" className="h-0 w-full  cursor-pointer justify-end ">
                           <p className="flex items-center gap-2  font-bold underline-offset-2">View Details <CircleArrowRight className="!w-7 !h-7 group-hover:animate-bounce" /></p>
                        </Button>
                    </div>
                )) : (
                    <p className="text-center col-span-3 font-medium">No Events Found</p>
                )}
            </div>
        </div>
    )
}
