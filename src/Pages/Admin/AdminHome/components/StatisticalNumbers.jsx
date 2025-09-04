import React from 'react';
import {
  BookOpen,
  GraduationCap,
  Users,
  TrendingUp,
  Music,
  TicketPlus
} from 'lucide-react';
import { useContext } from 'react';
import { AdminDataContext } from "@/Context/AdminCentralData";
import dancing from "/src/assets/Dancing.png"
import Ticket from "/src/assets/Movie Ticket.png"
import revenue from "/src/assets/Transaction.png"
const StatisticalNumbers = ({ statNumbers }) => {
  return (
    <div className="w-full flex pr-1  items-start  max-md:gap-3">

      <div className='flex justify-between gap-6'>
        <div className="bg-white w-[256px]   flex justify-center items-center gap-6 content-center rounded-xl shadow-md p-4  max-md:p-4  text-center">
          <img src={dancing} className="mb-1 !w-14 !h-[50px]" />
          <div>
            <p className="text-[#000000]/69 text-start text-[14px] mt-2 max-sm:text-base">Events</p>
            <h2 className="text-[24px] font-bold text-[#1968AF]">{statNumbers?.events_numbers || 0} Events</h2>
          </div>
        </div>

        <div className="bg-white w-[256px]  flex justify-center items-center gap-6 content-center rounded-xl shadow-md p-4  max-md:p-4  text-center">
          <img src={Ticket} className="mb-1 !w-14 !h-[50px]" />
          <div c>
            <p className="text-[#000000]/69 text-start text-[14px] mt-2 max-sm:text-base">BOOKING</p>
            <h2 className="text-[24px] font-bold text-[#F29D38]">2,7598</h2>
          </div>
        </div>


        <div className="bg-white  w-[256px]  flex justify-center items-center gap-3 content-center rounded-xl shadow-md p-4  max-md:p-4  text-center">
          <img src={revenue} className="mb-1 !w-14 " />
          <div c>
            <p className="text-[#000000]/69 text-start text-[14px] mt-2 max-sm:text-base">REVENUE</p>
            <h2 className="text-[24px] font-bold text-[#197920]">623,500LKR</h2>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StatisticalNumbers;
