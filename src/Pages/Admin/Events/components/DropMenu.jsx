"use client"

import * as React from "react"
import { MoreVertical } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { encryptStorage } from "@/utils/storage"
import { AdminDataContext } from "@/Context/AdminCentralData"

export function DropMenu({ id, setEvents }) {
    const { setEventsCount } = React.useContext(AdminDataContext)
    const storeAuth = encryptStorage.getItem('auth')
    const handleDeleteEvent = async () => {
        const options = {
            method: "Delete",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storeAuth?.token}`,
            },
        }
        try {
            const res = await fetch(`http://localhost:3001/api/events/delete_event/${id}`, options);
            const data = await res.json();
            console.log(data);

            setEvents(data?.data);
            setEventsCount(data?.data?.length || 0);
        } catch (err) {
            console.error("Error fetching Events:", err);
        }
    }

    return (
        <DropdownMenu className='relative z-50'>
            <DropdownMenuTrigger className=" cursor-pointer" asChild>
                <button className="p-2 rounded-full hover:bg-gray-100">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="relative w-32 bg-white z-100 shadow-md rounded-md p-1">
                <DropdownMenuItem
                    onClick={handleDeleteEvent}
                    className="text-red-600 cursor-pointer hover:bg-black/10"
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
