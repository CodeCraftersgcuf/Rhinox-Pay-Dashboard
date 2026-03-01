import React from "react";

interface StatCard {
  label: string;
  value: number;
}

interface AdminStatsCardsProps {
  stats: StatCard[];
  icon: string;
}

const AdminStatsCards: React.FC<AdminStatsCardsProps> = ({ stats, icon }) => {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[10px] px-4 py-3 md:h-[92px]"
          style={{ background: "linear-gradient(119.08deg, #4880C0 0%, #1B589E 96.9%)" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5E98DA]">
              <img src={icon} alt="Admin stat icon" className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] text-[#D7E8FB]">{stat.label}</p>
              <p className="mt-1 text-[30px] leading-none text-white md:text-[36px]">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStatsCards;
