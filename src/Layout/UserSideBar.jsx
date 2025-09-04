import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FileChartPie, CalendarPlus2, TicketMinus, Users, ChartSpline, Menu, Plus, ArrowDown, ChevronDown } from "lucide-react";
import * as Collapsible from "@radix-ui/react-collapsible";

import sideBarIcon from "../assets/Mask group.png";
import EventIcon from "../assets/EventX.png";
import studio from "../assets/studio.png";
import { useState } from "react";
import { encryptStorage } from "@/utils/storage";

export default function EventsUserSidebar() {
    const location = useLocation();
    const navigate = useNavigate(null)
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [openGroups, setOpenGroups] = useState({
        mainNav: true,
        support: true,
        features: true,
        account: true,
    });
    const menuItems = {
        mainNav: [
            { title: "Dashboard", icon: FileChartPie, url: "/user-home" },
            { title: "Manage Events", icon: CalendarPlus2, url: "/events" },
            { title: "View My Tickets", icon: Users, url: "/tickets" },
        ],
        account: [
            { title: "Logout", icon: null, url: "/signin" },
        ],
    };

    const renderSidebarGroup = (label, items, group) => {
        return (
            <SidebarGroup className={`${group !== "account" && "border-b border-b-white"}`}>
                <Collapsible.Root
                    onOpenChange={(isOpen) =>
                        setOpenGroups((prev) => ({ ...prev, [group]: isOpen }))
                    }
                    defaultOpen >
                    <SidebarGroupLabel asChild>
                        <Collapsible.Trigger className="flex justify-between hover:bg-black w-full cursor-pointer p-2 text-white  rounded">
                            <span>{label}</span>
                            <span className="text-white">< ChevronDown
                                className={`transition-transform duration-300 ${!openGroups[group] ? "rotate-180 text-white" : ""}`}
                                size={18}
                            /></span>
                        </Collapsible.Trigger>
                    </SidebarGroupLabel>

                    <Collapsible.Content>
                        <SidebarGroupContent className="text-white">
                            <SidebarMenu>
                                {items.map((item, index) => (
                                    <SidebarMenuItem key={index}>
                                        <SidebarMenuButton
                                            className={`${location.pathname === item.url && "bg-white/15"} hover:bg-white/15 hover:text-white`}
                                            asChild
                                        >
                                            <Link to={item.url} onClick={() => {
                                                if (item.url === "/signin") {
                                                    encryptStorage.setItem("auth", null);
                                                }
                                            }} className="flex items-center gap-2 p-2 rounded">
                                                {item.icon && <item.icon className="w-4 h-4" />}
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </Collapsible.Content>
                </Collapsible.Root>
            </SidebarGroup >
        );
    };

    return (
        <SidebarProvider className="w-fit bg-black text-white !border-none">
            {/* Logo + Quick Event */}
            <Sidebar collapsible="icon" className={`relative h-full w-fit transition-all duration-1000 ${sidebarOpen ? "w-fit" : "w-0 overflow-hidden"
                }`}>
                <div className="flex items-center bg-black gap-4 p-4">
                    <img src={sideBarIcon} alt="Logo" className="w-10 h-10" />
                    <div>
                        <img src={EventIcon} alt="Event Icon" className="mb-2" />
                        <img src={studio} alt="Studio" />
                    </div>
                </div>


                <SidebarContent className="bg-black relative border-r-transparent">
                    {renderSidebarGroup("Main Navigation", menuItems.mainNav, "mainNav")}
                    {renderSidebarGroup("Account Management", menuItems.account, "account")}
                </SidebarContent>
            </Sidebar>

            <SidebarTrigger className="cursor-pointer" onClick={() => setSidebarOpen(prev => !prev)}>
                <Menu className="w-6 h-6 fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg md:hidden" />
            </SidebarTrigger>
        </SidebarProvider>
    );
}
