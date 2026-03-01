import React from "react";
import images from "../../constants/images";
import TimeFilterTabs from "../setting/TimeFilterTabs";

interface ChatAppealsHeroSectionProps {
  timeRanges: string[];
  selectedTimeRange: string;
  onTimeRangeChange: (range: string) => void;
  activeStats: {
    totalChats: number;
    appealed: number;
    resolved: number;
  };
}

const ChatAppealsHeroSection: React.FC<ChatAppealsHeroSectionProps> = ({
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
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1
            className="text-white"
            style={{ fontFamily: "Agbalumo", fontWeight: 400, fontSize: "clamp(28px, 6vw, 40px)", lineHeight: "100%" }}
          >
            Chat Appeals
          </h1>
          <p className="mt-2 text-sm text-[#7B8A96]">View and manage chat appeals</p>
        </div>
        <TimeFilterTabs options={timeRanges} value={selectedTimeRange} onChange={onTimeRangeChange} />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {[
          { label: "Total Chats", value: activeStats.totalChats },
          { label: "Appealed", value: activeStats.appealed },
          { label: "Resolved", value: activeStats.resolved },
        ].map((stat) => (
          <div
            key={stat.label}
            className="h-[92px] rounded-[10px] px-4 py-3"
            style={{ background: "linear-gradient(119.08deg, #4880C0 0%, #1B589E 96.9%)" }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5E98DA]">
                <img src={images.ChatCircledark} alt="chat icon" className="h-4 w-4 object-contain" />
              </div>
              <div>
                <p className="text-[10px] text-[#D7E8FB]">{stat.label}</p>
                <p className="mt-1 text-[36px] leading-none text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChatAppealsHeroSection;
