import { useForm } from 'react-hook-form'
import SideImage from './SideImage'
import Button from '../ReuseableComponents/Button';
import toast, { Toaster } from 'react-hot-toast';
import { encryptStorage } from '../utils/storage';
import { Navigate, useNavigate } from 'react-router-dom';
import { ArrowBigLeft, ArrowDown, ArrowUp, Ticket } from 'lucide-react';
import { useContext } from 'react';
import { Auth } from '../Context/AuthContext';
export default function SignIn() {
    const storeAuth = encryptStorage.getItem('auth')
    const { setAuth } = useContext(Auth)
    const navigate = useNavigate(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
        try {
            const url = "http://localhost:3001/api/users/login";
            const response = await fetch(url, options);
            const result = await response.json();
            encryptStorage.setItem('auth', result)
            setAuth(result)
            if (result?.data?.role == "user" || storeAuth?.data?.role === "user") {
                navigate("/user-home")
            } else {
                navigate("/Admin-home")
            }
            response.status === 200 ? toast.success("Sign In Successfully") : toast.error(result.message)
        } catch (error) {
            console.error("Error:", error.message);
            toast.error("failed to Sign In")
        }
    };

    return (
        <div className="relative h-screen bg-[url(/src/assets/events-background-1.jpg)] bg-cover bg-center">
            <div className="fixed top-4 left-4 z-50">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 border border-white cursor-pointer backdrop-blur-md px-4 py-2 rounded-lg shadow hover:opacity-50 transition"
                >
                    <ArrowBigLeft size={20} color="white" />
                    <span className="text-white font-medium">Back</span>
                </button>
            </div>
            <div className="absolute w-full h-full top-0 bg-black/30 backdrop-blur-[3px]"></div>

            <div className='flex h-screen justify-center items-center'>
                <div className="relative z-50 w-[600px] mx-auto p-6 bg-white/30 backdrop-blur-md rounded-xl">
                    <div className='flex flex-col gap-5 items-center justify-center mb-4'>
                        <div className="w-12 h-12">
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
                        <h1 className='text-3xl'>Welcome Back...</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Email
                            </label>
                            <input
                                id="email"
                                placeholder='username@gmail.com'
                                {...register("email", { required: "Email is required" })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder='must be at least 8 characters'
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Minimum 6 characters" },
                                })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        <Button
                            type="submit"
                            text="Sign in"
                            className="w-full mt-4 text-white cursor-pointer rounded-lg py-2 font-medium relative overflow-hidden"
                            style={{
                                background: "linear-gradient(270deg, #8b5cf6, #ec4899, #f43f5e, #8b5cf6)",
                                backgroundSize: "600% 600%",
                                animation: "moveGradient 4s linear infinite"
                            }}
                        />
                    </form>
                    <div className='text-center mt-5'>
                        <h1>Not Have Account ?  <span onClick={() => navigate("/signUp")} className='text-[#ec4899] underline cursor-pointer'>Sign Up</span></h1>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
}
