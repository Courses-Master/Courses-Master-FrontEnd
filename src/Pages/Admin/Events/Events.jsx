import { encryptStorage } from "@/utils/storage";
import { AdminDataContext } from "@/Context/AdminCentralData";
import React, { useContext, useEffect, useState } from "react";
import EventList from './components/EventList';
import EventsAdminSidebar from "@/Layout/AdminSideBar";
import EventDetails from "./components/EventDetails";
import { useLocation, useParams } from "react-router-dom";
import AddEvent from "./components/AddEvent";
import AttendeeInsightsEvent from "./components/AttendeeInsightsEvent";
export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("")
    const storeAuth = encryptStorage.getItem('auth')
    const { setEventsCount } = useContext(AdminDataContext);
    const location = useLocation()
    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storeAuth?.token}`,
            },
        }
        const fetchEvents = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/events/get-events?name=${searchText}`, options);
                const data = await res.json();
                setEvents(data?.data);
                setEventsCount(data?.data?.length || 0);
            } catch (err) {
                console.error("Error fetching Events:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [searchText]);

    return (
        <div className="flex min-h-screen">
            <EventsAdminSidebar />
            <div className="flex-1">
                {location.pathname === "/events" ? (
                    <EventList
                        setEvents={setEvents}
                        setSearchText={setSearchText}
                        loading={loading}
                        events={events}
                    />
                ) : location.pathname === "/events/add-event" ? (
                    <AddEvent setEvents={setEvents} />
                ) : (
                    <EventDetails setEvents={setEvents} />
                )}
            </div>
        </div>
    )
}
