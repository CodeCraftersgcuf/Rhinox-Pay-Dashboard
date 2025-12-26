import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Profile from "./components/Profile";

const Layout: React.FC = () => {
  // const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  return (
    <div className="flex bg-white">
      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 z-20 transition-transform transform ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-fit`}
      >
        <Sidebar setMobileOpen={setMobileOpen} />
      </div>
      {/* Main Content */}
      <div 
        className="w-full h-screen overflow-auto transition-all duration-300"
        style={{
          background: 'linear-gradient(90deg, #05161A 0%, #020C19 100%)'
        }}
      >
        <div>
          <div 
            className="min-h-[72px] sticky top-0 z-[100] flex justify-between items-center px-4 md:px-8 py-2"
            style={{ backgroundColor: '#020B16' }}
          >
            <div className="flex items-center gap-2">
              <button
                className="block lg:hidden text-white"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <i className="bi bi-list text-4xl"></i>
              </button>
            </div>
            <div>
              <Profile />
            </div>
          </div>
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
