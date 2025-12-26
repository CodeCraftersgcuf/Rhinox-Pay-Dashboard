import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LinkComp from "./components/Link";
import { Sidebar_links } from "../constants/sidebarLinks";
import images from "../constants/images";
interface SidebarProps {
    setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ setMobileOpen }) => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState<string>("/dashboard");
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname]);

    return (
        <>
            <style>
                {`
                    .sidebar-scroll::-webkit-scrollbar {
                        display: none;
                    }
                    .sidebar-scroll {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}
            </style>
            <div
                className={`h-screen flex flex-col transition-all duration-300 ${menuOpen ? "w-[80px]" : "w-[300px]"} text-white`}
                style={{ 
                    background: 'linear-gradient(180deg, #020C19 0%, #00200A 100%)'
                }}
            >
            {/* Sidebar Header - Fixed */}
            <div 
                className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 h-[72px] flex-shrink-0"
                style={{ backgroundColor: '#020B16', borderBottom: '1px solid #252B31' }}
            >
                {/* Mobile Close Button */}
                <div className="flex justify-end lg:hidden absolute right-4">
                    <button
                        className="text-xl cursor-pointer text-white"
                        onClick={() => setMobileOpen(false)}
                    >
                        ✕
                    </button>
                </div>
                {/* Toggle Menu Icon */}
                {menuOpen && (
                    <div
                        onClick={() => setMenuOpen(false)}
                        className="absolute top-4 left-4 bg-gray-800 p-2 rounded-md"
                    >
                        <i className="bi bi-arrow-left-short text-2xl"></i>
                    </div>
                )}
            </div>

            {/* Scrollable Content */}
            <div 
                className="flex-1 overflow-auto sidebar-scroll"
                style={{ borderRight: '1px solid #131C24' }}
            >
                {/* Menu Items */}
                <nav className="mt-4 px-4">
                    <ul className="space-y-2">
                        {Sidebar_links.map((x, index) => (
                            <li key={index}>
                                <LinkComp
                                    name={x.name}
                                    link={x.link}
                                    icon={x.icon}
                                    sub={x.sublinks}
                                    isActiveCheck={activeLink === x.link}
                                    onClick={() => setActiveLink(x.link)}
                                    menuStatus={menuOpen}
                                />
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Logout Button */}
                <div className="p-4 mt-4 flex items-center justify-center">
                    <button className="flex items-center justify-center p-2 gap-2 text-white font-medium rounded-lg w-full hover:bg-white/10 transition-colors">
                        <img src={images.logout_icon} alt="Logout" className="w-5 h-5" />
                        {!menuOpen && <span>Logout</span>}
                    </button>
                </div>
            </div>
        </div>
        </>
    );
};

export default Sidebar;
