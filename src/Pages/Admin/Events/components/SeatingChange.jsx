import { encryptStorage } from "@/utils/storage";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SeatingChange = ({ seats, setSeats, event }) => {

  const getColor = (status) => {
    switch (status) {
      case "sold": return "bg-purple-700";
      case "reserved": return "bg-purple-400";
      case "empty": return "bg-gray-300";
      default: return "bg-gray-300";
    }
  };



  const toggleSeat = (rowIndex, seatIndex) => {
    setSeats(prev => {
      const newRows = [...prev];
      const current = newRows[rowIndex][seatIndex];

      if (current === "empty") newRows[rowIndex][seatIndex] = "sold";
      else if (current === "sold") newRows[rowIndex][seatIndex] = "reserved";
      else newRows[rowIndex][seatIndex] = "empty";

      return newRows;
    });
  };

  return (
    <div className="bg-white w-fit border border-[#ADADAD] min-h-[300px] p-6 pt-2 rounded-xl flex  items-center justify-between">
      <div className="w-[500px]">
        <h1 className="text-center text-2xl font-bold mb-2">Seat Allocation</h1>
        <div className="space-y-2 text-sm flex justify-center mb-2 items-center gap-5">
          <div className="flex items-center gap-2"><span className="w-4 h-4 bg-purple-700 rounded-full"></span> Paid Seats</div>
          <div className="flex items-center gap-2"><span className="w-4 h-4 bg-purple-400 rounded-full"></span> Reserved Seats</div>
          <div className="flex items-center gap-2 mb-1.5"><span className="w-4 h-4  bg-gray-300 rounded-full"></span> To be sold</div>
        </div>


        {/* Right Grid */}
        <div className="flex flex-col flex-1 items-center gap-2">
          {seats.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2">
              {row.map((seat, seatIndex) => (
                <div
                  key={seatIndex}
                  className={`w-10 h-10 rounded-lg cursor-pointer ${getColor(seat)}`}
                  onClick={() => toggleSeat(rowIndex, seatIndex)} // هنا بنخلي الضغط يغير الحالة
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatingChange;
