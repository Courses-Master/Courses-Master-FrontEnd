import { encryptStorage } from "@/utils/storage"
import defaultAvatar from "../assets/profile-picture.png"
export default function Navbar() {
    const userName = encryptStorage.getItem("auth")?.data?.name
    const role = encryptStorage.getItem("auth")?.data?.role
    const avatar = encryptStorage.getItem("auth")?.data?.avatar
    return (
        <nav className="max-w-full h-[90px] bg-black m-2 mx-6 text-white flex items-center justify-between px-6 rounded-2xl shadow-md">

            <div className="flex items-center gap-3">
                <img
                    src={avatar || defaultAvatar}
                    alt="logo"
                    className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col text-justify">
                    <span className="text-lg">Welcome <b>{userName}</b></span>
                    <span className="text-[12px] pl-1">{role}</span>
                </div>
            </div>
            <div className="flex items-center gap-3">

            </div>
        </nav>
    )
}
