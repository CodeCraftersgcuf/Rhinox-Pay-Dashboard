import React from "react";
import { ChevronDown } from "lucide-react";

const dashboardTabs = ["Ads", "Orders"];

const filterButtonStyle: React.CSSProperties = {
  height: "34px",
  borderRadius: "100px",
  borderWidth: "0.3px",
  borderStyle: "solid",
  borderColor: "#27353B",
  backgroundColor: "#101F26",
  fontSize: "12px",
  color: "#DCE6F0",
};

interface P2PControlStripProps {
  activeDashboardTab: string;
  onDashboardTabChange: (tab: string) => void;
  selectedBuy: string;
  selectedCountry: string;
  selectedStatus: string;
  showBuyDropdown: boolean;
  showCountryDropdown: boolean;
  showStatusDropdown: boolean;
  setShowBuyDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setShowCountryDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setShowStatusDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBuy: (value: string) => void;
  setSelectedCountry: (value: string) => void;
  setSelectedStatus: (value: string) => void;
  buyOptions: string[];
  ordersBuyOptions: string[];
  countryOptions: string[];
  statusOptions: string[];
  ordersStatusOptions: string[];
  buyRef: React.RefObject<HTMLDivElement | null>;
  countryRef: React.RefObject<HTMLDivElement | null>;
  statusRef: React.RefObject<HTMLDivElement | null>;
  onOpenPaymentDetailsModal: () => void;
  onOpenAdModal: () => void;
}

const P2PControlStrip: React.FC<P2PControlStripProps> = ({
  activeDashboardTab,
  onDashboardTabChange,
  selectedBuy,
  selectedCountry,
  selectedStatus,
  showBuyDropdown,
  showCountryDropdown,
  showStatusDropdown,
  setShowBuyDropdown,
  setShowCountryDropdown,
  setShowStatusDropdown,
  setSelectedBuy,
  setSelectedCountry,
  setSelectedStatus,
  buyOptions,
  ordersBuyOptions,
  countryOptions,
  statusOptions,
  ordersStatusOptions,
  buyRef,
  countryRef,
  statusRef,
  onOpenPaymentDetailsModal,
  onOpenAdModal,
}) => {
  return (
    <div>
      <div className="mb-2 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex h-[34px] items-center rounded-full border border-[#27353B] bg-[#101F26] p-0.5">
            {dashboardTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onDashboardTabChange(tab)}
                className={`h-[30px] rounded-full px-6 text-[11px] leading-none ${
                  activeDashboardTab === tab ? "bg-[#A9EF45] text-[#0C141C]" : "text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            className="h-[34px] min-w-[84px] rounded-full border border-[#27353B] bg-[#101F26] px-3 text-[11px] text-white"
          >
            Bulk Action
          </button>

          {[
            {
              ref: buyRef,
              value: selectedBuy,
              show: showBuyDropdown,
              setShow: setShowBuyDropdown,
              setValue: setSelectedBuy,
              options: activeDashboardTab === "Orders" ? ordersBuyOptions : buyOptions,
              width: "92px",
            },
            {
              ref: countryRef,
              value: selectedCountry,
              show: showCountryDropdown,
              setShow: setShowCountryDropdown,
              setValue: setSelectedCountry,
              options: countryOptions,
              width: "104px",
            },
            {
              ref: statusRef,
              value: selectedStatus,
              show: showStatusDropdown,
              setShow: setShowStatusDropdown,
              setValue: setSelectedStatus,
              options: activeDashboardTab === "Orders" ? ordersStatusOptions : statusOptions,
              width: "120px",
            },
          ].map((filter) => (
            <div key={`${filter.value}-${filter.width}`} className="relative" ref={filter.ref}>
              <button
                onClick={() => {
                  setShowBuyDropdown(false);
                  setShowCountryDropdown(false);
                  setShowStatusDropdown(false);
                  filter.setShow((prev: boolean) => !prev);
                }}
                className="flex items-center justify-center gap-2 px-4 text-white"
                style={{ ...filterButtonStyle, width: filter.width }}
              >
                <span className="whitespace-nowrap">{filter.value}</span>
                <ChevronDown size={14} className={filter.show ? "rotate-180 transition-transform" : "transition-transform"} />
              </button>
              {filter.show && (
                <div
                  className="absolute left-0 z-20 mt-1 min-w-[130px] overflow-hidden rounded-lg border border-[#27353B]"
                  style={{
                    backgroundColor: "rgba(26, 38, 47, 0.2)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    boxShadow: "5px 5px 15px 0px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  {filter.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        filter.setValue(option);
                        filter.setShow(false);
                      }}
                      className="block w-full px-3 py-2 text-left text-[10px] text-white hover:bg-[#1B2D36]"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPaymentDetailsModal}
            className="inline-flex h-[34px] min-w-[110px] items-center justify-center whitespace-nowrap rounded-full bg-[#A9EF45] px-3 text-[#0C141C]"
            style={{
              fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 400,
              fontSize: "10px",
              lineHeight: "100%",
              letterSpacing: "0%",
            }}
          >
            Payment Accounts
          </button>
          <button
            onClick={onOpenAdModal}
            className="inline-flex h-[34px] min-w-[87px] items-center justify-center gap-1 whitespace-nowrap rounded-full bg-[#A9EF45] px-2.5 text-[#0C141C]"
            style={{
              fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 274,
              fontSize: "10px",
              lineHeight: "100%",
              letterSpacing: "0%",
            }}
          >
            <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-[#0C141C] text-[10px] leading-none text-[#A9EF45]">+</span>
            Create Ad
          </button>
        </div>
      </div>
    </div>
  );
};

export default P2PControlStrip;
