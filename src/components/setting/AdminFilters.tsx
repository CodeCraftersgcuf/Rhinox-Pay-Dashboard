import React, { useEffect, useRef, useState } from "react";
import images from "../../constants/images";
import { ChevronDown } from "lucide-react";

interface AdminFiltersProps {
  onSendNew: () => void;
  country: string;
  status: string;
  onCountryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const pillButtonClass =
  "text-white flex items-center justify-center";

const countryOptions = ["All", "Nigeria", "Ghana", "Kenya"];
const statusOptions = ["All", "Active", "Inactive"];

const AdminFilters: React.FC<AdminFiltersProps> = ({
  onSendNew,
  country,
  status,
  onCountryChange,
  onStatusChange,
}) => {
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const countryRef = useRef<HTMLDivElement | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setShowStatusDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="mt-5 md:mt-8">
      <div className="mb-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex w-full flex-wrap gap-2 sm:gap-3 md:w-auto">
          <button
            className={pillButtonClass}
            style={{
              width: "100px",
              height: "38px",
              borderRadius: "100px",
              borderWidth: "0.3px",
              borderStyle: "solid",
              borderColor: "#27353B",
              backgroundColor: "#101F26",
              fontSize: "12px",
              fontWeight: 400,
            }}
          >
            Bulk Action
          </button>
          <div className="relative" ref={countryRef}>
            <button
              onClick={() => {
                setShowCountryDropdown((prev) => !prev);
                setShowStatusDropdown(false);
              }}
              className={`${pillButtonClass} gap-2`}
              style={{
                width: "100px",
                height: "38px",
                borderRadius: "100px",
                borderWidth: "0.3px",
                borderStyle: "solid",
                borderColor: "#27353B",
                backgroundColor: "#101F26",
                fontSize: "12px",
                fontWeight: 400,
              }}
            >
              {country === "All" ? "Country" : country}
              <ChevronDown size={12} className={showCountryDropdown ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>
            {showCountryDropdown && (
              <div
                className="absolute left-0 z-20 mt-1 w-[130px] overflow-hidden rounded-lg border border-[#27353B]"
                style={{
                  backgroundColor: "rgba(26, 38, 47, 0.2)",
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                  boxShadow: "5px 5px 15px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                {countryOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      onCountryChange(option);
                      setShowCountryDropdown(false);
                    }}
                    className="block w-full px-3 py-2 text-left text-xs text-white hover:bg-[#1B2D36]"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative" ref={statusRef}>
            <button
              onClick={() => {
                setShowStatusDropdown((prev) => !prev);
                setShowCountryDropdown(false);
              }}
              className={`${pillButtonClass} gap-2`}
              style={{
                width: "100px",
                height: "38px",
                borderRadius: "100px",
                borderWidth: "0.3px",
                borderStyle: "solid",
                borderColor: "#27353B",
                backgroundColor: "#101F26",
                fontSize: "12px",
                fontWeight: 400,
              }}
            >
              {status === "All" ? "Status" : status}
              <ChevronDown size={12} className={showStatusDropdown ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>
            {showStatusDropdown && (
              <div
                className="absolute left-0 z-20 mt-1 w-[130px] overflow-hidden rounded-lg border border-[#27353B]"
                style={{
                  backgroundColor: "rgba(26, 38, 47, 0.2)",
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                  boxShadow: "5px 5px 15px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                {statusOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      onStatusChange(option);
                      setShowStatusDropdown(false);
                    }}
                    className="block w-full px-3 py-2 text-left text-xs text-white hover:bg-[#1B2D36]"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onSendNew}
          className="flex w-full items-center justify-center gap-2 text-black md:w-auto"
          style={{
            height: "38px",
            borderRadius: "100px",
            paddingTop: "9px",
            paddingRight: "18px",
            paddingBottom: "9px",
            paddingLeft: "18px",
            backgroundColor: "#A9EF45",
            fontSize: "12px",
            fontWeight: 400,
          }}
        >
          <img src={images.pluscircle} alt="Add" className="h-4 w-4" />
          Send New
        </button>
      </div>
    </div>
  );
};

export default AdminFilters;
