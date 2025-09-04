"use client";

import React, { useEffect, useState } from "react";
import {
  Pencil,
  MapPin,
  Calendar,
  Clock,
  CircleArrowLeft,
  CircleDollarSign,
  Armchair,
  Sparkle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import SeatingChange from "./SeatingChange";
import { encryptStorage } from "@/utils/storage";
import toast, { Toaster } from "react-hot-toast";
import QrCode from "./QrCode";

export default function EventDetails({ setEvents }) {
  const navigate = useNavigate();
  const storeAuth = encryptStorage.getItem("auth");
  const isUser = storeAuth?.data?.role === "user"; // تحديد إذا كان user
  const { id } = useParams();

  const [event, setEvent] = useState({
    name: "",
    date: "",
    venue: "",
    time: "",
    description: "",
    ticketPrice: "",
    seatAmount: "",
    availableSeats: "",
    popularity: "",
    tags: "",
    expectedAttendance: "",
    seat_allocation: [],
  });

  const [seats, setSeats] = useState([]);

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
        const res = await fetch(
          `http://localhost:3001/api/events/get-events/${id}`,
          options
        );
        const data = await res.json();
        const eventData = data?.data[0] || {};
        setEvent({
          id: eventData?.id,
          event_name: eventData.event_name || "",
          event_date: eventData.event_date || "",
          event_venue: eventData.event_venue || "",
          event_time: eventData.event_time || "",
          description: eventData.description || "",
          ticket_price: eventData.ticket_price || "",
          seat_amount: eventData.seat_amount || "",
          available_seats: eventData.available_seats || "",
          popularity: eventData.popularity || "",
          tags: eventData.tags || "",
          expected_attendance: eventData.expected_attendance || "",
          seat_allocation: eventData.seat_allocation || [],
        });
        setSeats(eventData.seat_allocation || []);
      } catch (err) {
        console.error("Error fetching Event:", err);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storeAuth?.token}`,
        },
        body: JSON.stringify(event),
      };
      const res = await fetch(
        `http://localhost:3001/api/events/update-event/${id}`,
        options
      );
      const data = await res.json();
      setEvents(data?.data);
      toast.success("Event Updated Successfully");
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="mx-auto bg-white rounded-lg shadow p-6 space-y-6"
      >
        <div className="flex justify-center items-center">
          <CircleArrowLeft
            onClick={() => navigate("/events")}
            className="cursor-pointer"
          />
          <h2 className="text-xl font-semibold text-center flex-1">
            Event Details
          </h2>
        </div>

        {/* Event Info */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-5 max-lg:flex-col">
            <div className="basis-2/3">
              <label className="block text-sm font-medium">Event Name</label>
              <div className="flex items-center border border-[#ADADAD] rounded-[10px] p-2 mt-1">
                <input
                  type="text"
                  name="event_name"
                  value={event.event_name}
                  onChange={handleChange}
                  className="flex-1 outline-none"
                  disabled={isUser}
                />
                <Pencil className="ml-2 w-5 h-5 cursor-pointer" />
              </div>
            </div>
            <div className="basis-1/3">
              <label className="block text-sm font-medium">Event Date</label>
              <div className="flex items-center border border-[#ADADAD] rounded-[10px] p-2 mt-1">
                <input
                  type="date"
                  name="event_date"
                  value={
                    event.event_date
                      ? new Date(event.event_date).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setEvent((prev) => ({ ...prev, event_date: e.target.value }))
                  }
                  className="flex-1 outline-none"
                  disabled={isUser}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-5 max-lg:flex-col">
            <div className="basis-2/3">
              <label className="block text-sm font-medium">Event Venue</label>
              <div className="flex items-center border border-[#ADADAD] rounded-[10px] p-2 mt-1">
                <input
                  type="text"
                  name="event_venue"
                  value={event.event_venue}
                  onChange={handleChange}
                  className="flex-1 outline-none"
                  disabled={isUser}
                />
                <MapPin className="ml-2 w-5 h-5" />
              </div>
            </div>
            <div className="basis-1/3">
              <label className="block text-sm font-medium">Event Time</label>
              <div className="flex items-center border border-[#ADADAD] rounded-[10px] p-2 mt-1">
                <input
                  type="text"
                  name="event_time"
                  value={event.event_time}
                  onChange={handleChange}
                  className="flex-1 outline-none"
                  disabled={isUser}
                />
                <Clock className="ml-2 w-5 h-5" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Event Description</label>
            <textarea
              name="description"
              value={event.description}
              onChange={handleChange}
              className="w-full border border-[#ADADAD] rounded-[10px] p-2 mt-1 resize-none h-24"
              disabled={isUser}
            />
          </div>
        </div>

        {/* Ticket & Seats */}
        <div className="flex justify-between max-[1364px]:flex-wrap gap-4">
          <div className="basis-[240px]">
            <label className="block text-sm font-medium">Ticket Price</label>
            <div className="flex items-center border border-[#ADADAD] rounded-[10px] p-2 mt-1">
              <input
                type="number"
                name="ticket_price"
                value={event.ticket_price}
                onChange={handleChange}
                className="flex-1 outline-none"
                disabled={isUser}
              />
              <CircleDollarSign className="ml-2 w-5 h-5" />
            </div>
          </div>
          <div className="basis-[240px]">
            <label className="block text-sm font-medium">Seat Amount</label>
            <div className="flex items-center border border-[#ADADAD] rounded-[10px] p-2 mt-1">
              <input
                name="seat_amount"
                value={event.seat_amount}
                onChange={handleChange}
                className="flex-1 outline-none"
                disabled={isUser}
              />
              <Armchair className="ml-2 w-5 h-5" />
            </div>
          </div>
          <div className="basis-[240px]">
            <label className="block text-sm font-medium">Available Seats</label>
            <div className="flex items-center border border-[#ADADAD] rounded-[10px] p-2 mt-1">
              <input
                type="number"
                name="available_seats"
                value={event.available_seats}
                onChange={handleChange}
                className="flex-1 outline-none"
                disabled={isUser}
              />
              <Armchair className="ml-2 w-5 h-5" />
            </div>
          </div>
          <div className="basis-[240px]">
            <label className="block text-sm font-medium">Popularity</label>
            <div className="flex items-center border border-[#ADADAD] rounded-[10px] p-2 mt-1">
              <input
                type="text"
                name="popularity"
                value={event.popularity}
                onChange={handleChange}
                className="flex-1 outline-none"
                disabled={isUser}
              />
              <Sparkle className="ml-2 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Seating & Tags */}
        <div className="flex max-[1200px]:flex-col max-[1200px]:items-center">
          <SeatingChange
            event={event}
            seats={seats}
            setSeats={setSeats}
            disabled={isUser} // منع التعديل لو user
          />

          <div className="flex flex-col items-center flex-1 gap-4 h-fit mt-4 flex-wrap justify-center ">
            <div className="w-full flex justify-center flex-wrap gap-5">
              <div className="w-[196px] h-fit">
                <label className="block text-sm font-medium">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={event.tags}
                  onChange={handleChange}
                  className="border border-[#ADADAD] rounded-[10px] p-2 w-full"
                  disabled={isUser}
                />
              </div>
              <div className="w-[196px] h-fit">
                <label className="block text-sm font-medium">
                  Expected Attendance
                </label>
                <input
                  name="expected_attendance"
                  value={event.expected_attendance}
                  onChange={handleChange}
                  className="border border-[#ADADAD] rounded-[10px] p-2 w-full"
                  disabled={isUser}
                />
              </div>
            </div>
            <QrCode id={event.id} />
          </div>
        </div>

        {/* Buttons */}
        {!isUser && (
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="submit"
              className="bg-[#CF730A] cursor-pointer rounded-[10px] w-[196px] font-bold text-white px-4 py-2 hover:bg-[#CF730A]/80"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() =>
                navigate(`/events/${event.id}/attendee-insights`)
              }
              className="bg-[#1A6291] cursor-pointer rounded-[10px] text-white px-4 py-2 hover:bg-[#1A6291]/80"
            >
              Attendee Insights
            </button>
          </div>
        )}
        <Toaster />
      </form>
    </div>
  );
}
