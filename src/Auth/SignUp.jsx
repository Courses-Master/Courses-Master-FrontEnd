import { useForm } from 'react-hook-form'
import SideImage from './SideImage'
import Button from '../ReuseableComponents/Button';
import toast, { Toaster } from 'react-hot-toast';
import { encryptStorage } from '../utils/storage';
import { ArrowBigLeft, ArrowDown, ArrowUp } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '@/ReuseableComponents/LoadingPage';

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
        console.log(e);

        const file = e.target.files[0];
        setFileName(file ? file.name : "No file chosen");
        setValue("profile_photo", e.target.files, { shouldValidate: true });

    };

    const onSubmit = async (data) => {
        const formData = new FormData()
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("role", data.role);
        formData.append("phone", data.phone);
        if (data.profile_photo && data.profile_photo[0]) {
            formData.append("avatar", data.profile_photo[0]);
        }
        const options = {
            method: "POST",
            body: formData
        };
        setLoading(true);
        try {
            const url = "http://localhost:3001/api/users/register";
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            encryptStorage.setItem('auth', result)
            encryptStorage.setItem('userEmail', data.email)
            if (response.status === 201) {
                navigate("/verifyCode")
            }
        } catch (error) {
            console.error("Error:", error.message);
            toast.error(error.message)
        } finally {
            setTimeout(() => setLoading(false), 1000);
        }
    };

    return (
        <div className='flex justify-between items-center h-screen max-lg:justify-center'>
            {loading && <LoadingPage />}
            <div onClick={() => navigate('/')} className=' absolute top-10 left-10 flex items-center cursor-pointer hover:animate-bounce' >
                <ArrowBigLeft color='#15B79E' fill='#15B79E' size={25} className='mt-1  ' />
                <span className='text-xl text-[#15B79E] font-bold'>Back</span>
            </div>

            <div className="basis-1/2 sm:mx-20 max-sm:basis-full max-sm:px-10">
                <div className='flex flex-col gap-5 items-center justify-center '>
                    <img className='w-16' src='/Vector.png' />
                    <h1 className='text-3xl'>Ready to join us?</h1>
                    <p className='text-lg'>Sign up and explore the experience</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="mb-2">
                        <label htmlFor="name" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder='Enter Your Name'
                            {...register("name", { required: "name is required" })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
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
                    <div className="mb-2">
                        <label htmlFor="password" className="block mb-2 text-basefont-medium text-gray-900 dark:text-white">
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
                    <div className="mb-2 relative">
                        <label htmlFor="role" className="block mb-2 text-basefont-medium text-gray-900 dark:text-white">
                            Role
                        </label>
                        <select
                            {...register("role", { required: "Role is required" })}
                            className="bg-gray-50 cursor-pointer border  appearance-none border-[#15B79E] text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value={""}>choose</option>
                            <option value={"admin"}>Admin</option>
                            <option value={"student"}>Student</option>
                        </select>
                        <svg
                            className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 translate-y-1/2 dark:text-gray-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="phone" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                            phone (optional)
                        </label>
                        <input
                            type="text"
                            id="phone"
                            placeholder='Enter Your Phone'
                            {...register("phone")}
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                            }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                            Profile Photo (optional)
                        </label>

                        <div className=" flex flex-wrap gap-3 items-center">
                            <label
                                htmlFor="profile_photo"
                                className="cursor-pointer inline-block px-4 py-2 text-white bg-[#15B79E] 
                     font-medium text-sm rounded-lg transition duration-200"
                            >
                                Upload Photo
                            </label>

                            <span className="text-sm text-gray-600 dark:text-gray-300">{fileName}</span>
                        </div>

                        <input
                            type="file"
                            id="profile_photo"
                            accept="image/*"
                            onChange={handleChange}
                            className="hidden"
                        />
                    </div>


                    <Button
                        className={"w-full mt-1 cursor-pointer hover:opacity-80 bg-[#15B79E] text-white rounded-md py-1"}
                        text={'Sign Up'}
                        type={"submit"}
                    />
                </form>
            </div>
            <SideImage />
            <Toaster />
        </div>
    );
}
