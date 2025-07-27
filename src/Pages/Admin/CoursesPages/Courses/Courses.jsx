import CoursesBar from './CoursesBar'
import CourseList from './CouresList'
import { encryptStorage } from "@/utils/storage";
import { AdminDataContext } from "@/Context/AdminCentralData";
import React, { useContext, useEffect, useState } from "react";
import Sidebar from '@/SideBar';
export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [courseAdded, setCourseAdded] = useState([])
    const storeAuth = encryptStorage.getItem('auth')
    const { setCourseCount } = useContext(AdminDataContext);

    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storeAuth?.token}`,
            },
        }
        const fetchCourses = async () => {
            try {
                const res = await fetch("https://5e2f3f76c2e7.ngrok-free.app/api/courses", options);
                const data = await res.json();
                setCourses(data?.data);
                setCourseCount(data?.data?.length || 0);
            } catch (err) {
                console.error("Error fetching courses:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [courseAdded]);
    return (
        <div className='flex min-h-screen '>
            <div className="w-64 max-md:w-16 bg-[#E3E8EF] ">
                <Sidebar />
            </div>
            <div className='flex-1 '>
                <CoursesBar setCourseAdded={setCourseAdded} />
                <CourseList loading={loading} courseAdded={courseAdded} courses={courses} />
            </div>
        </div>
    )
}
