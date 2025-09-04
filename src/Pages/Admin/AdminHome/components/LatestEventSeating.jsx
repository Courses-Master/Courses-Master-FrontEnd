import { encryptStorage } from "@/utils/storage";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LatestEventSeating = () => {
  
  const storeAuth = encryptStorage.getItem('auth')
  const [event, setEvent] = useState()


  const getColor = (status) => {
    switch (status) {
      case "sold":
        return "bg-purple-700"; 
      case "reserved":
        return "bg-purple-400"; 
      case "empty":
        return "bg-gray-300";
      default:
        return "bg-gray-300";
    }
  };

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
        const res = await fetch(`http://localhost:3001/api/events/get-events?latest=${true}`, options);
        const data = await res.json();
        setEvent(data?.data);
      } catch (err) {
        console.error("Error fetching Events:", err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="bg-white w-[828px] min-h-[300px] p-6 rounded-xl flex ml-5 items-center justify-between">
      {/* Left Info */}
      <div className="w-1/3">
        <h2 className="text-xl font-bold mb-4">Latest Event</h2>
        <p className="text-sm mb-2">
          <span className="font-semibold">Event Name:</span> {event?.event_name}
        </p>
        <p className="text-sm mb-4">
          <span className="font-semibold">Event Date:</span>
          {new Date(event?.event_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).replace(/ /g, ' ')}
        </p>
        {/* Legend */}
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-purple-700 rounded-full"></span> Paid Seats
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-purple-400 rounded-full"></span> Reserved Seats
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-gray-300 rounded-full"></span> To be sold
          </div>
        </div>
      </div>

      {/* Right Grid */}
      <div className="flex flex-col flex-1 items-center gap-2">
        {event?.seat_allocation?.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map((seat, index) => (
              <div
                key={index}
                className={`w-10 h-10 rounded-lg ${getColor(seat)}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestEventSeating;
