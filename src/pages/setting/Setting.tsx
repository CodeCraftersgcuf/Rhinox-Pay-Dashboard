import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import images from "../../constants/images";
import TimeFilterTabs from "../../components/setting/TimeFilterTabs";
import AdminStatsCards from "../../components/setting/AdminStatsCards";
import AdminFilters from "../../components/setting/AdminFilters";
import AdminTable, { type AdminUser } from "../../components/setting/AdminTable";
import AddAdminModal from "../../components/setting/AddAdminModal";
import { fetchStaff, updateStaff, deleteStaff } from "../../services/admin";
import { formatDateTime } from "../../utils/adminFormatters";

const timeRanges = ["All Time", "7 Days", "1 month", "1 Year", "Custom"];
const settingTabs = ["General", "Admin Management"] as const;

const countryLabels: Record<string, string> = {
  NG: "Nigeria",
  GH: "Ghana",
  KE: "Kenya",
  ZA: "South Africa",
  UG: "Uganda",
  BW: "Botswana",
  TZ: "Tanzania",
};

const mapStaffToAdmin = (staff: Record<string, unknown>): AdminUser => {
  const countryCode = staff.country ? String(staff.country) : "";
  return {
    id: String(staff.id),
    username: String(staff.username || "N/A"),
    role: String(staff.role || "-"),
    country: countryLabels[countryCode] || countryCode || "-",
    status: staff.status === "active" ? "Active" : "Inactive",
    date: formatDateTime((staff.date || staff.createdAt) as string),
  };
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
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (activeTab !== "Admin Management") return;

    const loadStats = async () => {
      try {
        const [all, active, inactive] = await Promise.all([
          fetchStaff({ range: selectedTimeRange, limit: 1 }),
          fetchStaff({ range: selectedTimeRange, status: "Active", limit: 1 }),
          fetchStaff({ range: selectedTimeRange, status: "Inactive", limit: 1 }),
        ]);
        setStats({
          total: all?.pagination?.total || 0,
          active: active?.pagination?.total || 0,
          inactive: inactive?.pagination?.total || 0,
        });
      } catch (error) {
        console.error("Failed to load admin stats:", error);
      }
    };

    loadStats();
  }, [activeTab, selectedTimeRange, refreshKey]);

  useEffect(() => {
    if (activeTab !== "Admin Management") return;

    const loadAdmins = async () => {
      setLoading(true);
      try {
        const data = await fetchStaff({
          range: selectedTimeRange,
          search: searchText,
          country: selectedCountry,
          status: selectedStatus,
          limit: 50,
        });
        setAdmins((data?.items || []).map(mapStaffToAdmin));
      } catch (error) {
        console.error("Failed to load admins:", error);
        setAdmins([]);
      } finally {
        setLoading(false);
      }
    };

    loadAdmins();
  }, [activeTab, selectedTimeRange, searchText, selectedCountry, selectedStatus, refreshKey]);

  const handleAdminCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

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
                { label: "Total Admin", value: stats.total },
                { label: "Currently Active", value: stats.active },
                { label: "Inactive", value: stats.inactive },
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
          {loading ? (
            <div className="py-8 text-center text-sm text-[#7F8B95]">Loading admins...</div>
          ) : (
            <AdminTable
              rows={admins}
              searchText={searchText}
              onSearch={setSearchText}
              onViewDetails={(admin) => navigate(`/settings/admin/${admin.id}`)}
              onToggleStatus={async (admin) => {
                try {
                  await updateStaff(admin.id, {
                    status: admin.status === "Active" ? "inactive" : "active",
                  });
                  setRefreshKey((k) => k + 1);
                } catch (error) {
                  console.error("Failed to update admin status:", error);
                }
              }}
              onDelete={async (admin) => {
                if (!window.confirm(`Deactivate admin ${admin.username}?`)) return;
                try {
                  await deleteStaff(admin.id);
                  setRefreshKey((k) => k + 1);
                } catch (error) {
                  console.error("Failed to deactivate admin:", error);
                }
              }}
            />
          )}
          <AddAdminModal
            isOpen={showAddAdminModal}
            onClose={() => setShowAddAdminModal(false)}
            onSuccess={handleAdminCreated}
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
