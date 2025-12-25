import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface SubLink {
  name: string;
  link: string;
  icon?: string;
}

interface LinkCompProps {
  name: string;
  link: string;
  sub?: SubLink[];
  isActiveCheck: boolean;
  icon: string;
  onClick: () => void;
  menuStatus: boolean;
}

const LinkComp: React.FC<LinkCompProps> = ({
  name,
  link,
  sub = [],
  isActiveCheck,
  icon,
  onClick,
  menuStatus,
}) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState<boolean>(isActiveCheck);

  useEffect(() => {
    setIsActive(
      location.pathname.split('/')[1] === link.split('/')[1] 
    );
  }, [location.pathname, link, sub]);

  return (
    <div className="relative">
      {/* Purple Side Border for Active Tab */}
      {/* {isActive && <div className="absolute left-0 top-0 h-full bg-purple-500 w-2 rounded"></div>} */}

      <Link
        to={link}
        onClick={onClick}
        className={`flex items-center justify-between gap-3 px-4 py-3 rounded-md transition-all duration-200 link_effect
          ${isActive ? "bg-theme-dark text-white" : "text-black hover:bg-[#FF0000] hover:text-white"}`}
      >
        <div className="flex items-center gap-3">
          <img src={icon} alt={`${name} icon`} className={`w-5 h-5 ${isActive && 'invert'}`} />
          {!menuStatus && <span className="font-medium">{name}</span>}
        </div>
        {!menuStatus && sub.length > 0 && (
          isActive ? (<ChevronDown className="text-white" />) : (
            <ChevronRight className="text-gray-500" />
          )
        )}
      </Link>
      {isActive && sub.length > 0 && (
        <div
          className={`sublinks relative flex flex-col ${!menuStatus ? "ml-6" : ""
            } gap-4 mt-4 mb-4 animate-slide-down`}
        >
          {sub.map((item, index) => (
            <Link to={link + item.link} key={index}>
              <div
                className={`flex items-center gap-2 text-sm
                   ${location.pathname.split('/')[location.pathname.split('/').length - 1] === item.link.split('/')[1] ? "text-[#FF0000]" : "text-black/50 hover:text-[#FF0000]" } relative`}
              >
                {item.icon && <i className={`${item.icon}`}></i>}
                {!menuStatus && (
                  <span className="capitalize font-semibold">
                    {item.name}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkComp;
