import { useState } from "react";
import {
    Home,
    User,
    Book,
    Settings,
    Menu,
    X,
    LogOut,
} from "lucide-react";
import { encryptStorage } from "./utils/storage";
import Button from "./ReuseableComponents/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const storeAuth = encryptStorage.getItem("auth")
    const navigate = useNavigate();
    const navItems = [
        { label: "Dashboard", icon: <Home size={20} />, href: "/Admin-home" },
        { label: "Courses", icon: <User size={20} />, href: "/courses" },
        { label: "instructors", icon: <Book size={20} />, href: "#" },
        { label: "Settings", icon: <Settings size={20} />, href: "#" },
    ];

    const handleLogout = () => {
        encryptStorage.removeItem("auth");
        navigate("/signIn");
        toast.success("Logout successfully");
    }
    return (
        <>
            {!isOpen && (
                <div className="md:hidden flex items-center fixed cursor-pointer top-4 left-4 z-50 bg-white shadow rounded p-1">
                    <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
                        <Menu className="cursor-pointer" size={24} />
                    </button>
                </div>
            )}

            {/* Sidebar */}
            <aside
                className={`bg-[#00d4b3]  border-r border-gray-200 h-screen p-4 fixed top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-64`}
            >
                <div className="absolute top-4 right-4 md:hidden">
                    <button onClick={() => setIsOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                {/* Avatar */}
                <div className="flex flex-col items-center mb-8 pt-10 md:pt-0">
                    <img
                        src={storeAuth?.data?.avatar}
                        alt="avatar"
                        className="w-24 h-24 rounded-full object-cover mb-2"
                    />
                    <p className="text-lg font-semibold text-white">{storeAuth?.data?.name}</p>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.href}
                            className="flex items-center px-4 py-2  text-white hover:bg-[#ffffff33] rounded-md transition"
                        >
                            {item.icon}
                            <span className="ml-3">{item.label}</span>
                        </Link>
                    ))}
                    <Button
                        text={<span className="flex justify-center items-center gap-2">
                            Logout <LogOut size={16} />
                        </span>
                        }
                        action={handleLogout}
                        className="fixed bottom-4 right-0 w-[90%] left-1/2 cursor-pointer -translate-x-1/2 bg-[#15B79E] text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition"
                    >
                    </Button>
                </nav>

            </aside>

            {/* خلفية سوداء شفافة عند فتح الموبايل */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
                />
            )}

        </>
    );
}
