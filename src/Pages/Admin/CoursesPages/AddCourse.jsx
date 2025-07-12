import React, { useState } from "react";
import Button from "@/ReuseableComponents/Button";
import toast, { Toaster } from "react-hot-toast";
import { encryptStorage } from "@/utils/storage";

export default function AddCourse() {
  const storeAuth = encryptStorage.getItem('auth')
  const [CourseData, setCourseData] = useState({
    title: "",
    price: "",
    instructor: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: CourseData.title,
      description: CourseData.description,
      price: `${CourseData.price}$`,
      instructor: CourseData.instructor
    };
    console.log("Submitted data:", CourseData);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${storeAuth?.token}`
      },
      body: JSON.stringify(data)
    };
    try {
      const url = "http://localhost:3001/api/courses/addCourse";
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      toast.success("course added Successfully")
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(error.message)
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Course Name</label>
          <input
            type="text"
            name="title"
            value={CourseData.title}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={CourseData.price}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Instructor</label>
          <input
            type="text"
            name="instructor"
            value={CourseData.instructor}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={CourseData.description}
            onChange={handleChange}
            rows={3}
            required
            className="w-full border rounded resize-none px-3 py-2"
          ></textarea>
        </div>

        {/* <div>
        <label className="block mb-1 font-medium">Course Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div> */}

        <Button
          text="Add Course"
          type="submit"
          className="w-full mr-5 mt-1 h-10 cursor-pointer hover:opacity-80 bg-[#15B79E] text-white rounded-md py-1"
        >
        </Button>
      </form>
      <Toaster/>
    </>
  );
}
