import LoadingPage from "@/ReuseableComponents/LoadingPage";


const CourseList = ({ courses, loading }) => {


    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {loading && (<LoadingPage />)}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <div
                        key={course._id}
                        className="bg-white flex flex-col   duration-700 rounded-2xl shadow-md overflow-hidden transition hover:shadow-xl"
                    >
                        <img
                            src={course.courseImage}
                            alt={course.title}
                            className="w-full h-48 object-fit"
                        />
                        <div className="p-4 flex flex-col  flex-1">
                            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                            <p className="text-gray-600 flex-1 text-sm mb-4">{course.description}</p>
                            <div className=" align-bottom">
                                <p className="text-gray-600 text-lg mb-4"> price :{course.price}</p>
                                <button className="bg-[#15B79E] text-white px-4 py-2 rounded hover:bg-[#15b79fb0] cursor-pointer transition">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseList;
