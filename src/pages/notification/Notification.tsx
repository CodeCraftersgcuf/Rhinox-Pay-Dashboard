import React, { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, Pencil, Trash2 } from "lucide-react";
import TimeFilterTabs from "../../components/setting/TimeFilterTabs";
import SendNotificationModal from "../../components/notification/SendNotificationModal";
import SendBannerModal from "../../components/notification/SendBannerModal";

const pageTabs = ["Notification", "Banner"] as const;
const timeRanges = ["All Time", "7 Days", "1 month", "1 Year", "Custom"];

const cards = Array.from({ length: 6 }).map((_, index) => ({
  id: String(index + 1),
  subject: "Get the best service",
  message:
    "Get the best service, Get the best service, Get the best service,Get the best service,Get the best service",
  regions: "NG ,GH, KY, SA",
  date: "Oct 22, 2025 - 10:22 AM",
}));

const bannerCards = Array.from({ length: 3 }).map((_, index) => ({
  id: String(index + 1),
  image: "/src/assets/images/Rectangle-202.png",
  regions: "NG ,GH, KY, SA",
  date: "Oct 22, 2025 - 10:22 AM",
}));

const pillButtonStyle: React.CSSProperties = {
  width: "100px",
  height: "38px",
  borderRadius: "100px",
  borderWidth: "0.3px",
  borderStyle: "solid",
  borderColor: "#27353B",
  backgroundColor: "#101F26",
  fontSize: "12px",
  fontWeight: 400,
};

const Notification: React.FC = () => {
  const [activeTab, setActiveTab] =
    useState<(typeof pageTabs)[number]>("Notification");
  const [selectedTimeRange, setSelectedTimeRange] = useState("All Time");
  const [showSendNotificationModal, setShowSendNotificationModal] = useState(false);
  const [showSendBannerModal, setShowSendBannerModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Country");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement | null>(null);

  const countryOptions = ["Country", "Nigeria", "Ghana", "Kenya", "South Africa"];
  const isBannerTab = activeTab === "Banner";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="space-y-5">
      <div className="md:mx-[-32px] mx-[-16px] md:mt-[-32px] mt-[-16px] mb-4 md:mb-6 bg-gradient-to-r from-[#0B1B20] to-[#0A1320] w-[calc(100%+64px)]">
        <div className="flex gap-2 md:gap-6 border-b border-gray-700 flex-wrap md:flex-nowrap overflow-x-auto w-full h-[50px] pl-4 pr-0 items-center box-border border-b-[0.3px] border-b-solid border-b-[rgba(156,163,175,0.5)] relative">
          {pageTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative h-full flex items-center ml-4 p-0 cursor-pointer shrink-0 text-[11px] ${
                tab === activeTab
                  ? "text-[#77AD3A] font-semibold"
                  : "text-[#9CA3AF] font-normal"
              }`}
            >
              {tab}
              {tab === activeTab && (
                <span className="absolute bottom-[-0.3px] left-0 right-0 h-0.5 bg-[#77AD3A]" />
              )}
            </button>
          ))}
        </div>
      </div>

      <section
        className="rounded-2xl h-[110px] p-4 md:p-5 flex items-center"
        style={{ background: "linear-gradient(90deg, #0A1920 0%, #0A1420 100%)" }}
      >
        <div className="w-full flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1
              className="text-white"
              style={{
                fontFamily: "Agbalumo",
                fontWeight: 400,
                fontSize: "clamp(28px, 6vw, 40px)",
                lineHeight: "100%",
              }}
            >
              {isBannerTab ? "Banner" : "Notification"}
            </h1>
            <p className="mt-2 text-sm text-[#7B8A96]">
              {isBannerTab ? "View and manage banners" : "View and manage notification"}
            </p>
          </div>
          <TimeFilterTabs
            options={timeRanges}
            value={selectedTimeRange}
            onChange={setSelectedTimeRange}
            className="mt-4"
          />
        </div>
      </section>

      <div className="mt-5 md:mt-8">
        <div className="mb-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex w-full flex-wrap gap-2 sm:gap-3 md:w-auto">
            <button
              className="text-white flex items-center justify-center"
              style={pillButtonStyle}
            >
              Bulk Action
            </button>
            <div className="relative" ref={countryDropdownRef}>
              <button
                onClick={() => setShowCountryDropdown((prev) => !prev)}
                className="text-white flex items-center justify-center gap-2"
                style={pillButtonStyle}
              >
                {selectedCountry}
                <ChevronDown
                  size={12}
                  className={showCountryDropdown ? "rotate-180 transition-transform" : "transition-transform"}
                />
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
                  {countryOptions.map((country) => (
                    <button
                      key={country}
                      onClick={() => {
                        setSelectedCountry(country);
                        setShowCountryDropdown(false);
                      }}
                      className="block w-full px-3 py-2 text-left text-xs text-white hover:bg-[#1B2D36]"
                    >
                      {country}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() =>
              isBannerTab
                ? setShowSendBannerModal(true)
                : setShowSendNotificationModal(true)
            }
            className="flex w-full items-center justify-center gap-2 text-black md:w-auto"
            style={{
              height: "38px",
              borderRadius: "100px",
              padding: "9px 18px",
              backgroundColor: "#A9EF45",
              fontSize: "12px",
              fontWeight: 400,
            }}
          >
            <Bell size={12} />
            Send New
          </button>
        </div>
      </div>

      <SendNotificationModal
        isOpen={showSendNotificationModal}
        onClose={() => setShowSendNotificationModal(false)}
      />
      <SendBannerModal
        isOpen={showSendBannerModal}
        onClose={() => setShowSendBannerModal(false)}
      />

      {isBannerTab ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {bannerCards.map((card) => (
            <article
              key={card.id}
              className="overflow-hidden rounded-2xl border border-[#1A2A36]"
              style={{ background: "linear-gradient(90deg, #1D2F3C 0%, #0E1925 100%)" }}
            >
              <div className="p-3 pb-2">
                <img
                  src={card.image}
                  alt="Banner"
                  className="h-[120px] w-full rounded-xl object-cover"
                />
              </div>
              <div className="flex items-center justify-between rounded-t-2xl border-t border-[#1A2A36] bg-[#1B2430] px-4 py-3">
                <div className="flex items-center gap-2">
                  <button className="h-8 w-8 rounded-md border border-[#26333F] text-[#C8D0D6] bg-[#1B2430]">
                    <Pencil size={14} className="mx-auto" />
                  </button>
                  <button className="h-8 w-8 rounded-md border border-[#26333F] text-[#E10405] bg-[#1B2430]">
                    <Trash2 size={14} className="mx-auto" />
                  </button>
                  <button className="h-8 w-8 rounded-md border border-[#26333F] bg-[#1B2430] flex items-center justify-center">
                    <span className="relative h-[14px] w-[24px] rounded-full bg-[#A9EF45]">
                      <span className="absolute right-[2px] top-1/2 h-[10px] w-[10px] -translate-y-1/2 rounded-full bg-[#13263A]" />
                    </span>
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-[#8A97A3]">{card.regions}</p>
                  <p className="text-[9px] text-[#6C7781]">{card.date}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.id}
              className="overflow-hidden rounded-2xl border border-[#1A2A36]"
              style={{ background: "linear-gradient(90deg, #1D2F3C 0%, #0E1925 100%)" }}
            >
              <div className="space-y-3 p-4">
                <div>
                  <p className="text-xs text-[#7D8A95]">Subject</p>
                  <p className="mt-2 text-[18px] leading-none text-white">Get the best service</p>
                </div>
                <div>
                  <p className="text-xs text-[#7D8A95]">Message</p>
                  <p className="mt-2 text-[11px] leading-5 text-white">{card.message}</p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-t-2xl border-t border-[#1A2A36] bg-[#182834] px-4 py-3">
                <div className="flex items-center gap-2">
                  <button className="h-8 w-8 rounded-md border border-[#26333F] text-[#C8D0D6] bg-[#0C1620]">
                    <Pencil size={14} className="mx-auto" />
                  </button>
                  <button className="h-8 w-8 rounded-md border border-[#26333F] text-[#E10405] bg-[#0C1620]">
                    <Trash2 size={14} className="mx-auto" />
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-[#8A97A3]">{card.regions}</p>
                  <p className="text-[9px] text-[#6C7781]">{card.date}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;
