import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import SideBar from "../../../SideBar";
import { encryptStorage } from "@/utils/storage";

const STORAGE_KEY = "instructors";

const InstructorList = () => {
  const [instructors, setInstructors] = useState([]);
  const location = useLocation();
  const token = encryptStorage.getItem("auth")?.token;

  const fetchInstructors = async () => {
    try {
      const res = await axios.get(
        "https://courses-master-backend-production-f0cc.up.railway.app/api/Instructors",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const apiData = Array.isArray(res.data) ? res.data : [];
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      const merged = mergeUnique(stored, apiData);
      setInstructors(merged);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch (error) {
      console.error(error);
    }
  };

  const mergeUnique = (arr1, arr2) => {
    const map = new Map();
    [...arr1, ...arr2].forEach((item) => {
      map.set(item.email, item);
    });
    return Array.from(map.values());
  };

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setInstructors(JSON.parse(stored));
    }
    fetchInstructors();
  }, []);

  useEffect(() => {
    if (location.state?.newInstructor) {
      const updated = mergeUnique(instructors, [location.state.newInstructor]);
      setInstructors(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  }, [location.state]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <main className="flex-1 p-8 space-y-6 md:ml-64">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Instructors</h1>
          <Link
            to="/add-instructor"
            className="bg-[#00d4b3]  text-white px-5 py-2 rounded-lg shadow-md transition"
          >
            + Add Instructor
          </Link>
        </div>
        <div className="overflow-hidden bg-white rounded-xl shadow">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
              </tr>
            </thead>
            <tbody>
              {instructors.length > 0 ? (
                instructors.map((inst, index) => (
                  <tr
                    key={inst._id || index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4">{inst.name}</td>
                    <td className="p-4">{inst.email}</td>
                    <td className="p-4">{inst.phone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="p-4 text-center text-gray-500 italic"
                  >
                    No instructors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default InstructorList;
