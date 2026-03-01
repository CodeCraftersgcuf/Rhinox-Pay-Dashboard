import React from "react";
import images from "../../constants/images";
import TimeFilterTabs from "../setting/TimeFilterTabs";

interface P2PHeroSectionProps {
  timeRanges: string[];
  selectedTimeRange: string;
  onTimeRangeChange: (range: string) => void;
  activeStats: {
    totalAds: number;
    buyOrders: number;
    sellOrders: number;
  };
}

const P2PHeroSection: React.FC<P2PHeroSectionProps> = ({
  timeRanges,
  selectedTimeRange,
  onTimeRangeChange,
  activeStats,
}) => {
  return (
    <section
      className="rounded-2xl p-4 md:p-5"
      style={{ background: "linear-gradient(90deg, #0A1920 0%, #0A1420 100%)" }}
    >
      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1
            className="text-white"
            style={{ fontFamily: "Agbalumo", fontWeight: 400, fontSize: "clamp(28px, 6vw, 34px)", lineHeight: "100%" }}
          >
            P2P Profile
          </h1>
          <p className="mt-1 text-[10px] text-[#7B8A96]">View and manage user p2p details</p>
        </div>
        <TimeFilterTabs options={timeRanges} value={selectedTimeRange} onChange={onTimeRangeChange} className="pt-0.5" />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {[
          { label: "Total Ads", value: activeStats.totalAds },
          { label: "Buy Orders", value: activeStats.buyOrders },
          { label: "Sell Orders", value: activeStats.sellOrders },
        ].map((stat) => (
          <div
            key={stat.label}
            className="h-[74px] rounded-[10px] px-4 py-2.5"
            style={{ background: "linear-gradient(119.08deg, #4880C0 0%, #1B589E 96.9%)" }}
          >
            <p className="text-[8px] text-[#D7E8FB]">{stat.label}</p>
            <div className="mt-1 flex items-center gap-3">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#5E98DA]">
                <img src={images.ChatCircledark} alt={`${stat.label} icon`} className="h-2.5 w-2.5 object-contain" />
              </span>
              <p className="text-[31px] leading-none text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default P2PHeroSection;
