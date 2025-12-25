import React from "react";
import { Link } from "react-router-dom";

interface Agent {
  profileImage: string;
}

interface AgentsProps {
  agents: Agent[];
}

const Agents: React.FC<AgentsProps> = ({ agents = [] }) => {
  return (
    <div className="bg-theme-dark rounded-lg p-2  hidden lg:flex items-start gap-6">
      <div>
        <h2 className="mb-2 text-sm opacity-[0.5] font-bold">Online Agents</h2>
        <div className="flex -space-x-3 items-center">
          {agents.map((item, index) => (
            <img key={index} src={item.profileImage} alt="logo" className="w-10 h-10 rounded-full block border-2" />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-2 text-sm opacity-[0.5] font-bold">New</h1>
        <Link to={"/user/management"}>
          <div className="rounded-full flex flex-col items-center justify-center bg-white text-black font-bold w-10 h-10">
            <i className="bi bi-plus font-bold"></i>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Agents;
