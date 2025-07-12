import React from 'react';
import {
  BookOpen,
  GraduationCap,
  Users,
  TrendingUp
} from 'lucide-react';

const StatisticalNumbers = () => {
  return (
    <div className="flex-1 flex justify-around items-center gap-6">
      
      <div className='basis-1/2 h-full'>
        {/* Courses Box */}
        <div className="bg-white h-1/2 content-center rounded-2xl shadow-md p-6 text-center">
          <BookOpen size={28} className="mx-auto text-blue-600 mb-1" />
          <h2 className="text-2xl font-bold text-blue-600">120</h2>
          <p className="text-blue-600 text-2xl mt-2">Courses</p>
        </div>

        {/* Instructors Box */}
        <div className="bg-white mt-1 h-1/2 content-center rounded-2xl shadow-md p-6 text-center">
          <GraduationCap size={28} className="mx-auto text-green-600 mb-1" />
          <h2 className="text-2xl font-bold text-green-600">35</h2>
          <p className="text-green-600 text-2xl mt-2">Instructors</p>
        </div>
      </div>

      <div className='basis-1/2 h-full'>
        {/* Students Box */}
        <div className="bg-white  h-1/2 content-center rounded-2xl shadow-md p-6 text-center">
          <Users size={28} className="mx-auto text-purple-600 mb-1" />
          <h2 className="text-2xl font-bold text-purple-600">780</h2>
          <p className=" mt-2 text-purple-600 text-2xl">Students</p>
        </div>

        {/* Revenue Box */}
        <div className="bg-white mt-1 h-1/2 content-center rounded-2xl shadow-md p-6 text-center">
          <TrendingUp size={28} className="mx-auto text-yellow-600 mb-1" />
          <h2 className="text-2xl font-bold text-yellow-600">84%</h2>
          <p className="text-yellow-600 mt-2 text-2xl">Revenue Growth</p>
        </div>
      </div>

    </div>
  );
};

export default StatisticalNumbers;
