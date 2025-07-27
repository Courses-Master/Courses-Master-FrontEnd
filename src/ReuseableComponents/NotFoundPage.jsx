import { Frown } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom'; // لو بتستخدم React Router

export default function NotFoundPage() {
  return (
    <div className="h-screen flex flex-col items-center bg-[url(/src/assets/Image.png)] bg-cover justify-center text-center px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-2xl text-gray-800 mb-6 flex gap-1 items-center">Oops! Page not found. <Frown size={40}/></p>
      <Link
        to="/signin"
        className="px-6 py-2 bg-[#15B79E] text-white rounded-lg hover:bg-teal-600 transition"
      >
        Go to login
      </Link>
    </div>
  );
}
