import React, { createContext, useEffect, useState } from "react";
import { encryptStorage } from "@/utils/storage";

export const AdminDataContext = createContext();

export default function AdminCentralData({ children }) {
  const [courseCount, setCourseCount] = useState(0);
  const storeAuth = encryptStorage.getItem('auth');
  useEffect(() => {
    const fetchCourses = async () => {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storeAuth?.token}`,
        },
      }
      try {
        const res = await fetch("https://1234abcd.ngrok.io/api/courses", options);
        const data = await res.json();

        if (Array.isArray(data?.data) && data?.data?.length !== 0) {
          setCourseCount(data?.data?.length);
        }
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };

    fetchCourses();
  }, [courseCount]);

  return (
    <AdminDataContext.Provider value={{ courseCount, setCourseCount }}>
      {children}
    </AdminDataContext.Provider>
  );
}
