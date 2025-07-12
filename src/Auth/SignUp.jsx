import { useForm } from 'react-hook-form'
import SideImage from './SideImage'
import Button from '../ReuseableComponents/Button';
import toast, { Toaster } from 'react-hot-toast';
import { encryptStorage } from '../utils/storage';

export default function SignUp() {
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
            const url = "http://localhost:3001/api/users/register";
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            encryptStorage.setItem('auth', result)
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
                    <h1 className='text-3xl'>Ready to join us?</h1>
                    <p className='text-lg'>Sign up and explore the experience</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="mb-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                        <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Role
                        </label>
                        <select
                            {...register("role", { required: "Role is required" })}
                            className="bg-gray-50 border appearance-none border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value={""}></option>
                            <option value={"admin"}>Admin</option>
                            <option value={"student"}>Student</option>
                        </select>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <div className="mb-5">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            phone
                        </label>
                        <input
                            type="text"
                            id="phone"
                            placeholder='Enter Your Phone'
                            {...register("phone", {
                                required: "Phone is required",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Only numbers are allowed"
                                }
                            })}
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                            }}
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
