import { useNavigate } from "react-router-dom";
import Button from "../../ReuseableComponents/Button";

export default function IntroductionPage() {
    const navigate = useNavigate(null)
    return (
        <div className=" relative content-center bg-[url(/src/assets/Image.png)]  bg-[#202939]  h-screen bg-cover">
            <div className=" h-1/2 text-center py-9 flex flex-col items-center gap-7">
                <h1 className=" text-4xl font-bold  text-white">Welcome to Course Master</h1>
                <p className=" text-2xl  text-white">Your gateway to online learning</p>
                <Button
                    className={"w-[179px] cursor-pointer hover:opacity-80 bg-[#15B79E] text-white rounded-2xl py-1"}
                    text={'Sign Up'}
                    action={() => navigate("/signUp")}
                />
                <Button
                    className={"w-[179px] cursor-pointer hover:opacity-80 bg-[#15B79E] text-white rounded-2xl py-1"}
                    text={'Sign in'}
                    action={() => navigate("/signIn")}
                />
            </div>
        </div>
    )
}
