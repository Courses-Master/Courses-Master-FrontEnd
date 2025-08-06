import React, { useRef, useState, useEffect } from "react";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import Button from "@/ReuseableComponents/Button";
import { encryptStorage } from "@/utils/storage";
import { CourseSchema } from "./Courses/CourseSchema";

export default function AddCourse({ setCourseAdded }) {
  const token = encryptStorage.getItem("auth")?.token;
  const fileInputRef = useRef(null);

  const [data, setData] = useState({
    title: "",
    price: "",
    instructor: "",
    description: "",
    courseImage: null,
  });

  const [instructors, setInstructors] = useState([]);
  const [error, setError] = useState({});

  // Fetch instructors
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await fetch(
          "https://courses-master-backend-production-f0cc.up.railway.app/api/Instructors",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await res.json();
        setInstructors(result?.data || []);
      } catch (error) {
        toast.error("Failed to load instructors");
        console.error(error);
      }
    };

    fetchInstructors();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "price" && !/^\d*$/.test(value)) return;

    if (name === "courseImage") {
      setData({ ...data, courseImage: files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsed = CourseSchema.safeParse(data);
    if (!parsed.success) {
      const errorMap = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0];
        errorMap[field] = issue.message;
      });
      setError(errorMap);
      return;
    }

    setError({});
    const formData = new FormData();
    formData.append("title", parsed.data.title);
    formData.append("price", parsed.data.price + "$");
    formData.append("instructor", parsed.data.instructor);
    formData.append("description", parsed.data.description);
    if (data.courseImage) {
      formData.append("courseImage", data.courseImage);
    }

    const res = await fetch(
      "https://courses-master-backend-production-f0cc.up.railway.app/api/courses/addCourse",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const result = await res.json();
    if (res.ok) {
      toast.success("Course added");
      setCourseAdded((prev) => [...prev, ""]);
    } else {
      toast.error(result.message || "Something went wrong");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {error.title && <p className="text-red-500">{error.title}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="text"
            name="price"
            value={data.price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {error.price && <p className="text-red-500">{error.price}</p>}
        </div>

        {/* Instructor */}
        <div>
          <label className="block mb-1 font-medium">Instructor</label>
          <select
            name="instructor"
            value={data.instructor}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Instructor</option>
            {instructors.map((inst) => (
              <option key={inst._id} value={inst._id}>
                {inst.name}
              </option>
            ))}
          </select>
          {error.instructor && <p className="text-red-500">{error.instructor}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded resize-none px-3 py-2"
          />
          {error.description && (
            <p className="text-red-500">{error.description}</p>
          )}
        </div>

        {/* Course Image */}
        <div>
          <label className="block mb-1 font-medium">Course Image</label>
          <Button
            type="button"
            action={triggerFileInput}
            className="bg-[#15B79E] hover:opacity-80 text-white cursor-pointer px-4 py-2 rounded-md"
            text={data.courseImage ? "Change Image" : "Upload Image"}
          />
          {data.courseImage && (
            <p className="mt-1 inline ml-4 text-sm text-gray-600">
              {data.courseImage?.name}
            </p>
          )}
          <input
            ref={fileInputRef}
            type="file"
            name="courseImage"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          {error.courseImage && (
            <p className="text-red-500">{error.courseImage}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          text="Add Course"
          type="submit"
          className="w-full mt-2 h-10 cursor-pointer bg-[#15B79E] text-white rounded-md"
        />
      </form>
      <Toaster />
    </>
  );
}
