import { useForm } from 'react-hook-form'
import SideImage from './SideImage'
import Button from '../ReuseableComponents/Button';
import toast, { Toaster } from 'react-hot-toast';
import { encryptStorage } from '../utils/storage';
import { Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Auth } from './AuthContext';
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
            toast.success("Sign In Successfully")
            if (result?.data?.role == "student" || storeAuth?.data?.role === "student") {
                navigate("/student-home")
            } else {
                navigate("/Admin-home")
            }
        } catch (error) {
            console.error("Error:", error.message);
            toast.error(error.message)
        }
    };

    return (
        <div className='flex justify-between items-center h-screen max-lg:justify-center'>
            <div className="basis-1/2 sm:mx-20 max-sm:basis-full max-sm:px-10">
                <div className='flex flex-col gap-5 items-center justify-center mb-4'>
                    <img className='w-28' src='/Vector.png' />
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
                        className={"w-[100px] mt-1 cursor-pointer hover:opacity-80 bg-[#15B79E] text-white rounded-md py-1"}
                        text={'Sign In'}
                        type={"submit"}
                    />
                </form>
                <div className='text-center mt-5'>
                    <h1>Not Have Account ?  <span onClick={() => navigate("/signUp")} className='text-[#15B79E] underline cursor-pointer'>Sign Up</span></h1>
                </div>
            </div>
            <SideImage />
            <Toaster />
        </div>
    );
}
