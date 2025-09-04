import React, { createContext, useEffect, useState } from "react";
import { encryptStorage } from "@/utils/storage";

export const AdminDataContext = createContext();

export default function AdminCentralData({ children }) {
  const [eventsCount, setEventsCount] = useState(0);
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
        const res = await fetch("http://localhost:3001/api/events/get-events", options);
        const data = await res.json();

        if (Array.isArray(data?.data) && data?.data?.length !== 0) {
          setEventsCount(data?.data?.length);
        }
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };

    fetchCourses();
  }, [eventsCount,storeAuth?.token]);

  return (
    <AdminDataContext.Provider value={{ eventsCount, setEventsCount }}>
      {children}
    </AdminDataContext.Provider>
  );
}
