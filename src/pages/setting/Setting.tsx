import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import images from "../../constants/images";
import TimeFilterTabs from "../../components/setting/TimeFilterTabs";
import AdminStatsCards from "../../components/setting/AdminStatsCards";
import AdminFilters from "../../components/setting/AdminFilters";
import AdminTable, { type AdminUser } from "../../components/setting/AdminTable";
import AddAdminModal from "../../components/setting/AddAdminModal";

const timeRanges = ["All Time", "7 Days", "1 month", "1 Year", "Custom"];
const settingTabs = ["General", "Admin Management"] as const;

const allTimeAdmins: AdminUser[] = [
  {
    id: "1",
    username: "Qamardeen Malik",
    role: "Agent",
    country: "Nigeria",
    status: "Active",
    date: "22/10/25 07:22 AM",
  },
  {
    id: "2",
    username: "Qamardeen Malik",
    role: "Agent",
    country: "Nigeria",
    status: "Inactive",
    date: "22/10/25 07:22 AM",
  },
  {
    id: "3",
    username: "Qamardeen Malik",
    role: "Agent",
    country: "Nigeria",
    status: "Active",
    date: "22/10/25 07:22 AM",
  },
  {
    id: "4",
    username: "Qamardeen Malik",
    role: "Agent",
    country: "Nigeria",
    status: "Active",
    date: "22/10/25 07:22 AM",
  },
  {
    id: "5",
    username: "Qamardeen Malik",
    role: "Agent",
    country: "Nigeria",
    status: "Active",
    date: "22/10/25 07:22 AM",
  },
];

const adminsByTimeRange: Record<string, AdminUser[]> = {
  "All Time": allTimeAdmins,
  "7 Days": allTimeAdmins.slice(0, 3),
  "1 month": allTimeAdmins.slice(0, 4),
  "1 Year": [
    ...allTimeAdmins,
    {
      id: "6",
      username: "Qamardeen Malik",
      role: "Agent",
      country: "Nigeria",
      status: "Active",
      date: "22/10/25 07:22 AM",
    },
  ],
  Custom: allTimeAdmins.slice(0, 2),
};

const Setting: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] =
    useState<(typeof settingTabs)[number]>("Admin Management");
  const [selectedTimeRange, setSelectedTimeRange] = useState("All Time");
  const [searchText, setSearchText] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);

  const currentAdmins = adminsByTimeRange[selectedTimeRange] ?? allTimeAdmins;
  const totalAdmins = currentAdmins.length;
  const activeAdmins = currentAdmins.filter((admin) => admin.status === "Active").length;
  const inactiveAdmins = totalAdmins - activeAdmins;

  const filteredAdmins = useMemo(
    () =>
      currentAdmins.filter((admin) =>
        admin.username.toLowerCase().includes(searchText.toLowerCase().trim()) &&
        (selectedCountry === "All" || admin.country === selectedCountry) &&
        (selectedStatus === "All" || admin.status === selectedStatus)
      ),
    [currentAdmins, searchText, selectedCountry, selectedStatus]
  );

  return (
    <div className="space-y-5">
      <div className="md:mx-[-32px] mx-[-16px] md:mt-[-32px] mt-[-16px] mb-4 md:mb-6 bg-gradient-to-r from-[#0B1B20] to-[#0A1320] w-[calc(100%+64px)]">
        <div className="flex gap-2 md:gap-6 border-b border-gray-700 flex-wrap md:flex-nowrap overflow-x-auto w-full h-[50px] pl-4 pr-0 items-center box-border border-b-[0.3px] border-b-solid border-b-[rgba(156,163,175,0.5)] relative">
          {settingTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative h-full flex items-center ml-4 p-0 cursor-pointer shrink-0 text-[11px] ${
                tab === activeTab ? "text-[#77AD3A] font-semibold" : "text-[#9CA3AF] font-normal"
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

      {activeTab === "Admin Management" ? (
        <>
          <section className="rounded-2xl bg-[#091520] p-4 md:p-5">
            <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
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
                  Admin Management
                </h1>
                <p className="mt-2 text-sm text-[#7B8A96]">View manage admin details</p>
              </div>

              <TimeFilterTabs
                options={timeRanges}
                value={selectedTimeRange}
                onChange={setSelectedTimeRange}
              />
            </div>

            <AdminStatsCards
              stats={[
                { label: "Total Admin", value: totalAdmins },
                { label: "Currently Active", value: activeAdmins },
                { label: "Inactive", value: inactiveAdmins },
              ]}
              icon={images.UsersThree}
            />
          </section>

          <AdminFilters
            onSendNew={() => setShowAddAdminModal(true)}
            country={selectedCountry}
            status={selectedStatus}
            onCountryChange={setSelectedCountry}
            onStatusChange={setSelectedStatus}
          />
          <AdminTable
            rows={filteredAdmins}
            searchText={searchText}
            onSearch={setSearchText}
            onViewDetails={(admin) => navigate(`/settings/admin/${admin.id}`)}
          />
          <AddAdminModal
            isOpen={showAddAdminModal}
            onClose={() => setShowAddAdminModal(false)}
          />
        </>
      ) : (
        <section className="rounded-2xl bg-[#091520] p-6">
          <h2 className="text-xl font-semibold text-white">General Settings</h2>
          <p className="mt-2 text-sm text-[#7B8A96]">
            General preferences will appear here.
          </p>
        </section>
      )}
    </div>
  );
};

export default Setting;
