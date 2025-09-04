import { useNavigate } from "react-router-dom";
import Button from "../../ReuseableComponents/Button";

export default function IntroductionPage() {
    const navigate = useNavigate();

    return (
        <div className="relative h-screen bg-[url(/src/assets/events-background-1.jpg)] bg-cover bg-center">
            <div className="absolute w-full h-full top-0 bg-black/30 backdrop-blur-[3px]"></div>

            <div className="relative z-50 flex flex-col items-center justify-center h-full text-center px-4">
                <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
                    Welcome to EventX Tickets
                </h1>

                <p className="mt-4 text-xl sm:text-2xl text-white max-w-2xl">
                    Discover and book tickets for amazing events near you. Music, sports, workshops, and more – all in one place!
                </p>

                <div className="flex gap-5 mt-8">
                    <Button
                        className="w-[160px] sm:w-[180px] cursor-pointer hover:opacity-80 bg-[#163852] text-white rounded-2xl py-2"
                        text="Sign Up"
                        action={() => navigate("/signUp")}
                    />
                    <Button
                        className="w-[160px] sm:w-[180px] cursor-pointer hover:opacity-80 bg-[#163852] text-white rounded-2xl py-2"
                        text="Sign In"
                        action={() => navigate("/signIn")}
                    />
                </div>
            </div>
        </div>
    );
}
