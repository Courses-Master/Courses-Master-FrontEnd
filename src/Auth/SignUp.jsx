import { useForm } from 'react-hook-form'
import Button from '../ReuseableComponents/Button';
import { ArrowBigLeft } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { encryptStorage } from '../utils/storage';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Users, Phone, Ticket } from 'lucide-react';
import { useState } from 'react';

export default function SignUp() {
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const handleChange = (e) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : "No file chosen");
        setValue("profile_photo", e.target.files, { shouldValidate: true });
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("role", data.role);
        formData.append("phone", data.phone);
        if (data.profile_photo && data.profile_photo[0]) {
            formData.append("avatar", data.profile_photo[0]);
        }
        const options = { method: "POST", body: formData };
        setLoading(true);
        try {
            const url = "http://localhost:3001/api/users/register";
            const response = await fetch(url, options);
            const result = await response.json();
            encryptStorage.setItem('auth', result);
            encryptStorage.setItem('userEmail', data.email);
            if (response.status === 201) {
                navigate("/verifyCode")
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setTimeout(() => setLoading(false), 1000);
        }
    };

    return (
        <div className="relative h-screen bg-[url(/src/assets/events-background-1.jpg)] bg-cover bg-center overflow-hidden">
            <div className="absolute w-full h-full top-0 bg-black/30 backdrop-blur-[3px]"></div>

            <div className="flex h-screen justify-center items-center px-4">
                <div className="fixed top-4 left-4 z-50">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 border border-white cursor-pointer backdrop-blur-md px-4 py-2 rounded-lg shadow hover:opacity-50 transition"
                    >
                        <ArrowBigLeft size={20} color="white" />
                        <span className="text-white font-medium">Back</span>
                    </button>
                </div>
                <div className="relative z-50 w-full max-w-md mx-auto p-8 bg-white/30 backdrop-blur-md rounded-2xl shadow-lg">
                    <div className="w-12 h-12 mx-auto mb-1">
                        <svg viewBox="0 0 30 28" fill="url(#ticketGradient)" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="ticketGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#8b5cf6" />
                                    <stop offset="50%" stopColor="#ec4899" />
                                    <stop offset="100%" stopColor="#f43f5e" />
                                </linearGradient>
                            </defs>
                            <Ticket size={30} fill="url(#ticketGradient)" />
                        </svg>
                    </div>

                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                        Create Your Account
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        <div className="relative">
                            <User className="absolute top-[22px]  left-3 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Name"
                                {...register("name", { required: "Name is required" })}
                                className={`w-full pl-10 p-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-[#163852] focus:border-[#163852] outline-none dark:bg-gray-700 dark:text-white ${errors.name && 'border-red-500'}`}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        <div className="relative">
                            <Mail className="absolute top-[22px]  left-3 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="email"
                                placeholder="Email"
                                {...register("email", { required: "Email is required" })}
                                className={`w-full pl-10 p-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-[#163852] focus:border-[#163852] outline-none dark:bg-gray-700 dark:text-white ${errors.email && 'border-red-500'}`}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <div className="relative">
                            <Lock className="absolute top-[22px]  left-3 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="password"
                                placeholder="Password"
                                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
                                className={`w-full pl-10 p-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-[#163852] focus:border-[#163852] outline-none dark:bg-gray-700 dark:text-white ${errors.password && 'border-red-500'}`}
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        <div className="relative">
                            <Users className="absolute top-[25px] left-3 -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                {...register("role", { required: "Role is required" })}
                                className={`w-full pl-10 p-2.5 bg-gray-50 border border-[#163852] rounded-lg text-gray-900 text-sm cursor-pointer focus:ring-[#163852] focus:border-[#163852] outline-none dark:bg-gray-700 dark:text-white ${errors.role && 'border-red-500'}`}
                            >
                                <option value="">Choose Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
                        </div>

                        <div className="relative">
                            <Phone className="absolute top-[22px]  left-3 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Phone (optional)"
                                {...register("phone")}
                                onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); }}
                                className={`w-full pl-10 p-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-[#163852] focus:border-[#163852] outline-none dark:bg-gray-700 dark:text-white ${errors.phone && 'border-red-500'}`}
                            />
                        </div>

                        <div>
                            <label className="flex gap-3 items-center cursor-pointer px-4 py-2 bg-[#163852] w-fit text-white rounded-lg text-sm font-medium hover:opacity-80 transition">
                                Upload Photo
                            </label>
                            <span className="text-gray-600 dark:text-gray-300 text-sm">{fileName}</span>
                            <input type="file" id="profile_photo" accept="image/*" onChange={handleChange} className="hidden" />
                        </div>

                        <Button
                            type="submit"
                            text="Sign Up"
                            className="w-full mt-4 text-white cursor-pointer rounded-lg py-2 font-medium relative overflow-hidden"
                            style={{
                                background: "linear-gradient(270deg, #8b5cf6, #ec4899, #f43f5e, #8b5cf6)",
                                backgroundSize: "600% 600%",
                                animation: "moveGradient 4s linear infinite"
                            }}
                        />



                    </form>
                </div>
            </div>
            <Toaster />
        </div>
    );
}
