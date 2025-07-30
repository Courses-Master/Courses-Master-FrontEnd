import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "../../../SideBar";
import toast, { Toaster } from "react-hot-toast";
import { encryptStorage } from "@/utils/storage";

const AddInstructor = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();
  const token = encryptStorage.getItem("auth")?.token;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://courses-master-backend-production-f0cc.up.railway.app/api/Instructors/add-instructor",
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Instructor added successfully");

      const tempInstructor = {
        ...form,
        _id: Date.now().toString(), 
      };

      setTimeout(() => {
        navigate("/instructors", { state: { newInstructor: tempInstructor } });
      }, 1000);
    } catch (error) {
      toast.error(
        "Error: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <main className="flex-1 p-8 md:ml-64">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Add New Instructor
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#00d4b3]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-600">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#00d4b3]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-600">
                Phone
              </label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#00d4b3]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-600">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#00d4b3]"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/instructors")}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#00d4b3] text-white "
              >
                Save Instructor
              </button>
            </div>
          </form>
        </div>
        <Toaster position="top-center" />
      </main>
    </div>
  );
};

export default AddInstructor;
