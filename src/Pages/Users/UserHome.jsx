"use client";

import React from "react";
import { encryptStorage } from "@/utils/storage";
import EventsUserSidebar from "@/Layout/UserSideBar";
import Navbar from "@/Layout/NavBar";
import { useEffect, useState } from "react";
import cash from "/src/assets/Cash.svg"
import seat from "/src/assets/Flight Seat.svg"
import ticket from "/src/assets/Ticket.svg"

export default function UserHome({ payments }) {
  const [events, setEvents] = useState([]);
  const [paid, setPaid] = useState([]);
  const storeAuth = encryptStorage.getItem('auth')
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storeAuth?.token}`,
      },
    };
    const fetchEvents = async () => {

      try {
        const res = await fetch(`http://localhost:3001/has-payment?email=${storeAuth?.data?.email}`, options)
        const data = await res.json()
        console.log(data);

        setPaid(data.data || [])
      } catch (err) {
        console.error("Error fetching events:", err)
      }
    }

    if (storeAuth?.data?.email) fetchEvents()
  }, [storeAuth?.data?.email])

  // حساب بعض الإحصائيات
  const totalPayments = payments?.length || 0;
  const successfulPayments = payments?.filter(p => p.success).length || 0;
  const upcomingEvents = payments?.filter(p => !p.success) || [];
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
        const res = await fetch(`http://localhost:3001/api/events/get-events`, options);
        const data = await res.json();
        setEvents(data?.data);
      } catch (err) {
        console.error("Error fetching Events:", err);
      }
    };

    fetchEvents();
  }, [])

  return (
    <div className="flex">
      <EventsUserSidebar />
      <div className="p-3 flex-1 mx-6">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="mx-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div style={{
              background: "linear-gradient(270deg, #8b5cf6, #ec4899)"
            }} className=" text-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold">Total Events Paid</h3>
              <p className="text-3xl mt-2">{paid.length}</p>
            </div>

            <div style={{
              background: "linear-gradient(270deg, #8b5cf6, #ec4899)"
            }} className="bg-green-500 text-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold">Successful Payments</h3>
              <p className="text-3xl mt-2">{paid.length}</p>
            </div>

            <div style={{
              background: "linear-gradient(270deg, #8b5cf6, #ec4899)"
            }} className=" text-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
              <p className="text-3xl mt-2">{events.length}</p>
            </div>
          </div>

          {/* Upcoming Events Section */}
          <div >
            <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                </div>
              )) : (
                <p className="text-center col-span-3 font-medium">No Events Found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
