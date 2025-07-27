import React from 'react';
import {
  BookOpen,
  GraduationCap,
  Users,
  TrendingUp
} from 'lucide-react';
import { useContext } from 'react';
import { AdminDataContext } from "@/Context/AdminCentralData";
const StatisticalNumbers = () => {
  const { courseCount } = useContext(AdminDataContext);
  return (
    <div className="flex-1 w-full flex justify-around items-center gap-6  max-md:gap-3">
      
      <div className='basis-1/2 h-full'>
        <div className="bg-white h-1/2 content-center rounded-2xl shadow-md p-6  max-md:p-4  text-center">
          <BookOpen size={28} className="mx-auto text-[#15B79E] mb-1" />
          <h2 className="text-2xl font-bold text-[#15B79E]">{courseCount}</h2>
          <p className="text-[#15B79E] text-2xl mt-2 max-sm:text-base">Courses</p>
        </div>

        <div className="bg-white mt-1 h-1/2 content-center rounded-2xl shadow-md p-6  max-md:p-4  text-center">
          <GraduationCap size={28} className="mx-auto text-[#15B79E] mb-1" />
          <h2 className="text-2xl font-bold text-[#15B79E]">35</h2>
          <p className="text-[#15B79E] text-2xl mt-2 max-sm:text-base">Instructors</p>
        </div>
      </div>

      <div className='basis-1/2 h-full'>
        <div className="bg-white  h-1/2 content-center rounded-2xl shadow-md p-6  max-md:p-4  text-center">
          <Users size={28} className="mx-auto text-[#15B79E] mb-1" />
          <h2 className="text-2xl font-bold text-[#15B79E]">780</h2>
          <p className=" mt-2 text-[#15B79E] text-2xl max-sm:text-base">Students</p>
        </div>

        <div className="bg-white mt-1 h-1/2 content-center rounded-2xl shadow-md p-6 max-md:p-4 text-center">
          <TrendingUp size={28} className="mx-auto text-[#15B79E] mb-1" />
          <h2 className="text-2xl font-bold text-[#15B79E]">84%</h2>
          <p className="text-[#15B79E] mt-2 text-2xl max-sm:text-base">Revenue Growth</p>
        </div>
      </div>

    </div>
  );
};

export default StatisticalNumbers;
