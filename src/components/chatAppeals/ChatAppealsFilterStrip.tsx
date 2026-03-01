import React from "react";
import { ChevronDown } from "lucide-react";
import { AppealStatusOption } from "./types";

const filterButtonStyle: React.CSSProperties = {
  height: "38px",
  borderRadius: "100px",
  borderWidth: "0.3px",
  borderStyle: "solid",
  borderColor: "#27353B",
  backgroundColor: "#101F26",
  fontSize: "12px",
  fontWeight: 400,
};

interface ChatAppealsFilterStripProps {
  selectedBuyFilter: string;
  selectedCountry: string;
  selectedStatus: string;
  selectedWonBy: string;
  showBuyDropdown: boolean;
  showCountryDropdown: boolean;
  showStatusDropdown: boolean;
  showWonByDropdown: boolean;
  setShowBuyDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setShowCountryDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setShowStatusDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setShowWonByDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBuyFilter: (value: string) => void;
  setSelectedCountry: (value: string) => void;
  setSelectedStatus: (value: string) => void;
  setSelectedWonBy: (value: string) => void;
  buyOptions: string[];
  countryOptions: string[];
  statusOptions: AppealStatusOption[];
  wonByOptions: string[];
  buyRef: React.RefObject<HTMLDivElement | null>;
  countryRef: React.RefObject<HTMLDivElement | null>;
  statusRef: React.RefObject<HTMLDivElement | null>;
  wonByRef: React.RefObject<HTMLDivElement | null>;
}

const ChatAppealsFilterStrip: React.FC<ChatAppealsFilterStripProps> = ({
  selectedBuyFilter,
  selectedCountry,
  selectedStatus,
  selectedWonBy,
  showBuyDropdown,
  showCountryDropdown,
  showStatusDropdown,
  showWonByDropdown,
  setShowBuyDropdown,
  setShowCountryDropdown,
  setShowStatusDropdown,
  setShowWonByDropdown,
  setSelectedBuyFilter,
  setSelectedCountry,
  setSelectedStatus,
  setSelectedWonBy,
  buyOptions,
  countryOptions,
  statusOptions,
  wonByOptions,
  buyRef,
  countryRef,
  statusRef,
  wonByRef,
}) => {
  return (
    <div className="mt-5 md:mt-8">
      <div className="mb-4 flex flex-wrap items-center gap-2 sm:gap-3">
        <button className="text-white px-4" style={{ ...filterButtonStyle, width: "100px" }}>
          Bulk Action
        </button>

        {[
          { ref: buyRef, value: selectedBuyFilter, show: showBuyDropdown, setShow: setShowBuyDropdown, setValue: setSelectedBuyFilter, options: buyOptions, width: "84px" },
          { ref: countryRef, value: selectedCountry, show: showCountryDropdown, setShow: setShowCountryDropdown, setValue: setSelectedCountry, options: countryOptions, width: "100px" },
          { ref: statusRef, value: selectedStatus, show: showStatusDropdown, setShow: setShowStatusDropdown, setValue: setSelectedStatus, options: statusOptions, width: "100px" },
          { ref: wonByRef, value: selectedWonBy, show: showWonByDropdown, setShow: setShowWonByDropdown, setValue: setSelectedWonBy, options: wonByOptions, width: "100px" },
        ].map((filter) => (
          <div key={`${filter.value}-${filter.width}`} className="relative" ref={filter.ref}>
            <button
              onClick={() => {
                setShowBuyDropdown(false);
                setShowCountryDropdown(false);
                setShowStatusDropdown(false);
                setShowWonByDropdown(false);
                filter.setShow((prev: boolean) => !prev);
              }}
              className="text-white flex items-center justify-center gap-2 px-4 whitespace-nowrap"
              style={{ ...filterButtonStyle, width: filter.width }}
            >
              {filter.value}
              <ChevronDown size={12} className={filter.show ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>
            {filter.show && (
              <div
                className="absolute left-0 z-20 mt-1 w-[130px] overflow-hidden rounded-lg border border-[#27353B]"
                style={{
                  backgroundColor: "rgba(26, 38, 47, 0.2)",
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                  boxShadow: "5px 5px 15px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                {filter.options.map((option) => (
                  <button
                    key={typeof option === "string" ? option : option.value}
                    onClick={() => {
                      filter.setValue(typeof option === "string" ? option : option.value);
                      filter.setShow(false);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-white hover:bg-[#1B2D36]"
                  >
                    {typeof option === "string" ? (
                      option
                    ) : (
                      <>
                        {option.dot ? <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: option.dot }} /> : null}
                        {option.value}
                      </>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatAppealsFilterStrip;
