import React, { useState } from "react";
import { Pencil, MapPin, Calendar, Clock, CircleArrowLeft, CircleDollarSign, Armchair, Sparkle, Tags, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SeatingChange from "./SeatingChange";
import toast, { Toaster } from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "./schema";
import { encryptStorage } from "@/utils/storage";

export default function AddEvent({ setEvents }) {
  const navigate = useNavigate();
  const storeAuth = encryptStorage.getItem('auth')

  const [seats, setSeats] = useState([
    Array(7).fill("empty"),
    Array(8).fill("empty"),
    Array(10).fill("empty"),
    Array(10).fill("empty"),
  ]);

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      event_name: "",
      event_date: "",
      event_venue: "",
      event_time: "",
      description: "",
      ticket_price: 0,
      seat_amount: 0,
      available_seats: 0,
      popularity: "",
      tags: "",
      expected_attendance: "",
      seat_allocation: seats,
    }
  });

  const onSubmit = async (data) => {
    const payload = { ...data, seat_allocation: seats }

    try {
      const res = await fetch("http://localhost:3001/api/events/add-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storeAuth?.token}`,
        },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      console.log("Event Added:", result);
      toast.success("Event Added Successfully");
      setEvents(result?.data)
    } catch (err) {
      console.error("Error adding event:", err);
      toast.error("Failed to add event");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto bg-white rounded-lg shadow p-6 space-y-6">
        <div className="flex justify-center items-center">
          <CircleArrowLeft onClick={() => navigate("/events")} className="cursor-pointer" />
          <h2 className="text-xl font-semibold text-center flex-1">Add Event</h2>
        </div>

        {/* Event Info */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-5 max-lg:flex-col">
            <div className="basis-2/3">
              <label className="block text-sm font-medium">Event Name</label>
              <div className="flex items-center border border-[#ADADAD] rounded-[10px] p-2 mt-1">
                <input type="text" {...register("event_name")} className="flex-1 outline-none" />
                <Pencil className="ml-2 w-5 h-5 cursor-pointer" />
              </div>
              {errors.event_name && <p className="text-red-500 text-sm">{errors.event_name.message}</p>}
            </div>

            <div className="basis-1/3">
              <label className="block text-sm font-medium">Event Date</label>
              <div className="flex items-center border border-[#ADADAD] rounded-[10px] p-2 mt-1">
                <input type="date" {...register("event_date")} className="flex-1 outline-none" />
              </div>
              {errors.event_date && <p className="text-red-500 text-sm">{errors.event_date.message}</p>}
            </div>
          </div>

          <div className="flex gap-5 max-lg:flex-col">
            <div className="basis-2/3">
              <label className="block text-sm font-medium">Event Venue</label>
              <div className="flex items-center border border-[#ADADAD] rounded-[10px]  p-2 mt-1">
                <input type="text" {...register("event_venue")} className="flex-1 outline-none" />
                <MapPin className="ml-2 w-5 h-5" />
              </div>
              {errors.event_venue && <p className="text-red-500 text-sm">{errors.event_venue.message}</p>}
            </div>

            <div className="basis-1/3">
              <label className="block text-sm font-medium">Event Time</label>
              <div className="flex items-center border border-[#ADADAD] rounded-[10px]  p-2 mt-1">
                <input type="text" {...register("event_time")} className="flex-1 outline-none" />
                <Clock className="ml-2 w-5 h-5" />
              </div>
              {errors.event_time && <p className="text-red-500 text-sm">{errors.event_time.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Event Description</label>
            <textarea {...register("description")} className="w-full border border-[#ADADAD] rounded-[10px]  p-2 mt-1 resize-none h-24" />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
        </div>

        {/* Ticket & Seats */}
        <div className="flex justify-between max-[1364px]:flex-wrap gap-4">
          {["ticket_price", "seat_amount", "available_seats", "popularity"].map((field, idx) => {
            const icons = [CircleDollarSign, Armchair, Armchair, Sparkle];
            const labels = ["Ticket Price", "Seat Amount", "Available Seats", "Popularity"];
            const isNumberField = ["ticket_price", "seat_amount", "available_seats"].includes(field);
            const Icon = icons[idx];
            return (
              <div key={field} className="basis-[240px]">
                <label className="block text-sm font-medium">{labels[idx]}</label>
                <div className="flex items-center border border-[#ADADAD] rounded-[10px]  p-2 mt-1">
                  <input
                    type={isNumberField ? "number" : "text"}
                    {...register(field, { valueAsNumber: isNumberField })}
                    className="flex-1 outline-none"
                  />                  <Icon className="ml-2 w-5 h-5" />
                </div>
                {errors[field] && <p className="text-red-500 text-sm">{errors[field].message}</p>}
              </div>
            );
          })}
        </div>

        <div className="flex max-[1200px]:flex-col max-[1200px]:items-center">
          <div className="flex-1">
            <Controller
              control={control}
              name="seat_allocation"
              render={({ field }) => (
                <SeatingChange seats={seats} setSeats={setSeats} event={field.value} />
              )}
            />
          </div>

          {/* Tags & Attendance */}
          <div className="flex gap-4 mt-4 h-fit flex-wrap justify-center">
            <div className="flex flex-col mt-2">
              <label className="block text-sm font-medium mb-1">Tags</label>
              <div className="flex w-[194px] items-center border border-[#ADADAD] rounded-[10px] p-2">
                <input type="text" {...register("tags")} className="w-[90%] outline-none" />
                <Tags className="ml-2 w-5 h-5" />
              </div>
              {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
            </div>

            <div className="flex flex-col mt-2">
              <label className="block text-sm font-medium mb-1">Expected Attendance</label>
              <div className="flex w-[194px] items-center border border-[#ADADAD] rounded-[10px] p-2">
                <input type="number" {...register("expected_attendance")} className="w-[90%] outline-none" />
                <Users className="ml-2 w-5 h-5" />
              </div>
              {errors.expected_attendance && <p className="text-red-500 text-sm">{errors.expected_attendance.message}</p>}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button type="submit" className="bg-[#CF730A] cursor-pointer rounded-[10px] w-[196px] font-bold text-white px-4 py-2 hover:bg-[#CF730A]/80">
            Add
          </button>
        </div>
        <Toaster />
      </form>
    </div>
  );
}
