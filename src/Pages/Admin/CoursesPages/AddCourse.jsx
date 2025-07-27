import React, { useRef, useState } from "react";
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

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log(files);

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

    const res = await fetch("https://1234abcd.ngrok.io/api/courses/addCourse", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

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
        {["title", "price", "instructor", "description", "courseImage"].map((field) => (
          <>
            <div key={field}>
              {field !== "courseImage" && (<label className="block mb-1 font-medium capitalize">{field}</label>)}
              {field === "description" ? (
                <textarea
                  name={field}
                  value={data[field]}
                  onChange={handleChange}
                  title="Description should be at least 20 characters long"
                  rows={3}
                  className="w-full border rounded resize-none px-3 py-2"
                />
              ) : field === "courseImage" ? (
                <>
                  <div>
                    <label className="block mb-1 font-medium">Course Image</label>
                    <Button
                      type="button"
                      action={triggerFileInput}
                      className="bg-[#15B79E] hover:opacity-80 text-white cursor-pointer  px-4 py-2 rounded-md"
                      text={data.image ? "Image Selected" : "Upload Image"}
                    />
                    {data.courseImage && (
                      <p className="mt-1 inline ml-4 text-sm text-gray-600">{data.courseImage?.name}</p>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      name="courseImage"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </div>
                </>
              ) : (
                <input
                  type="text"
                  name={field}
                  value={data[field]}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              )}
              {error[field] && <p className="text-red-500">{error[field]}</p>}
            </div>
          </>
        ))}

        {/* Image upload button */}

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
