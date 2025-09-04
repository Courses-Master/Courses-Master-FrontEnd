import { encryptStorage } from "@/utils/storage";
import { AdminDataContext } from "@/Context/AdminCentralData";
import React, { useContext, useEffect, useState } from "react";
import EventListUser from './EventListUser';
import EventsAdminSidebar from "@/Layout/AdminSideBar";
import { useLocation, useParams } from "react-router-dom";
import EventDetails from "@/Pages/Admin/Events/components/EventDetails";
import EventsUserSidebar from "@/Layout/UserSideBar";
export default function EventsUser() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [courseAdded, setCourseAdded] = useState([])
    const [searchText, setSearchText] = useState("")
    const storeAuth = encryptStorage.getItem('auth')
    const { setEventsCount } = useContext(AdminDataContext);
    const location = useLocation()
    const { id } = useParams()
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
            <EventsUserSidebar />
            <div className="flex-1">
                {location.pathname === "/events" ? (
                    <EventListUser
                        setEvents={setEvents}
                        setSearchText={setSearchText}
                        loading={loading}
                        events={events}
                    />
                ) : (
                    <EventDetails setEvents={setEvents} />
                )}
            </div>
        </div>
    )
}
