import React, { useEffect, useState } from "react";
import { Search, Pencil, Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";
import images from "../../constants/images";
import TimeFilterTabs from "../../components/setting/TimeFilterTabs";
import { fetchStaffActivity } from "../../services/admin";
import { formatDateTime } from "../../utils/adminFormatters";

const timeRanges = ["All Time", "7 Days", "1 month", "1 Year", "Custom"];

interface ActivityRow {
  id: string;
  activity: string;
  date: string;
}

const AdminProfile: React.FC = () => {
  const { adminId } = useParams();
  const [selectedTimeRange, setSelectedTimeRange] = useState("All Time");
  const [searchText, setSearchText] = useState("");
  const [activities, setActivities] = useState<ActivityRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!adminId) return;

    const loadActivity = async () => {
      setLoading(true);
      try {
        const data = await fetchStaffActivity(adminId, {
          range: selectedTimeRange,
          search: searchText,
          limit: 50,
        });
        setActivities(
          (data?.items || []).map((item: Record<string, unknown>) => ({
            id: String(item.id),
            activity: String(item.activity || "-"),
            date: formatDateTime(item.date as string),
          }))
        );
      } catch (error) {
        console.error("Failed to load admin activity:", error);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    loadActivity();
  }, [adminId, selectedTimeRange, searchText]);

  return (
    <div className="space-y-5">
      <section
        className="rounded-2xl p-4 md:p-5"
        style={{ background: "linear-gradient(90deg, #0A1920 0%, #0A1420 100%)" }}
      >
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
              Admin Profile
            </h1>
            <p className="mt-2 text-sm text-[#7B8A96]">View manage user details</p>
          </div>
          <TimeFilterTabs
            options={timeRanges}
            value={selectedTimeRange}
            onChange={setSelectedTimeRange}
          />
        </div>

        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
          <div
            className="rounded-2xl p-6 lg:min-h-[220px]"
            style={{ background: "linear-gradient(119.08deg, #4880C0 0%, #1B589E 96.9%)" }}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[#2E6AAE]">
                <img src={images.avater1} alt="Admin avatar" className="h-20 w-20 rounded-full" />
              </div>
              <p
                className="text-white"
                style={{
                  fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: 400,
                  fontSize: "20px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
              >
                Qamardeen Abdul Malik
              </p>
              <div className="mt-4 flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm text-white">
                <span className="h-3 w-3 rounded-full bg-white" />
                Active
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-3">
            <div className="rounded-2xl border border-[#1A2A36] bg-[#07131D]">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="flex min-h-[88px] flex-col justify-center border-b border-[#1A2A36] p-3 md:border-r">
                  <p className="text-xs text-[#7D8A95]">Country</p>
                  <p className="mt-2 text-[14px] leading-none text-white">Nigeria</p>
                </div>
                <div className="flex min-h-[88px] flex-col justify-center border-b border-[#1A2A36] p-3 md:border-r">
                  <p className="text-xs text-[#7D8A95]">Name</p>
                  <p className="mt-2 text-[14px] leading-none text-white">Abdul Malik</p>
                </div>
                <div className="flex min-h-[88px] flex-col justify-center border-b border-[#1A2A36] p-3">
                  <p className="text-xs text-[#7D8A95]">Role</p>
                  <p className="mt-2 text-[14px] leading-none text-white">Admin</p>
                </div>
                <div className="flex min-h-[88px] flex-col justify-center p-3 md:border-r md:border-[#1A2A36]">
                  <p className="text-xs text-[#7D8A95]">Email</p>
                  <p className="mt-2 text-[14px] leading-none text-white">abcdefg@gmail.com</p>
                </div>
                <div className="flex min-h-[88px] flex-col justify-center p-3 md:border-r md:border-[#1A2A36]">
                  <p className="text-xs text-[#7D8A95]">Last Login</p>
                  <p className="mt-2 text-[14px] leading-none text-white">Today</p>
                </div>
                <div className="flex min-h-[88px] flex-col justify-center p-3">
                  <p className="text-xs text-[#7D8A95]">Dyas Active</p>
                  <p className="mt-2 text-[14px] leading-none text-white">300</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-8 w-8 rounded-md border border-[#26333F] text-[#C8D0D6] bg-[#0C1620]">
                <Pencil size={14} className="mx-auto" />
              </button>
              <button className="h-8 w-8 rounded-md border border-[#26333F] text-[#E10405] bg-[#0C1620]">
                <Trash2 size={14} className="mx-auto" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-5 md:mt-8">
        <button
          className="text-white flex items-center justify-center"
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
      </div>

      <section
        className="w-full rounded-lg overflow-hidden"
        style={{ backgroundColor: "#0B1820", borderRadius: "20px", marginTop: "9.6px" }}
      >
        <div
          className="flex flex-col items-start gap-3 px-4 py-3 md:h-[60px] md:flex-row md:items-center md:justify-between md:px-6 md:py-0"
          style={{ backgroundColor: "#020B16", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
        >
          <h3 className="text-white text-[20px]">User Activity</h3>
          <div
            className="flex items-center px-3 py-2"
            style={{ width: "100%", maxWidth: "267px", height: "35px", borderRadius: "100px", backgroundColor: "#0F1722" }}
          >
            <Search size={14} className="mr-2 text-gray-400" />
            <input
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search"
              className="bg-transparent text-white outline-none flex-1 placeholder-[#878B90] text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto" style={{ backgroundColor: "#0F1825" }}>
          <table className="min-w-[700px] w-full">
            <thead>
              <tr className="text-left text-[11px] text-[#FFFFFF]" style={{ backgroundColor: "#1C2530" }}>
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 appearance-none rounded-[3px] border border-[#9CA8B3] bg-transparent align-middle checked:border-[#A9EF45] checked:bg-[#A9EF45]"
                  />
                </th>
                <th className="px-4 py-3">Activity</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-xs text-[#7F8B95]">
                    Loading activity...
                  </td>
                </tr>
              ) : activities.length > 0 ? (
                activities.map((row) => (
                  <tr key={row.id} className="border-b border-[#2B363E] text-[12px] text-white">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        className="h-4 w-4 appearance-none rounded-[3px] border border-[#9CA8B3] bg-transparent align-middle checked:border-[#A9EF45] checked:bg-[#A9EF45]"
                      />
                    </td>
                    <td className="px-4 py-3 text-[#CFD7DD]">{row.activity}</td>
                    <td className="px-4 py-3 text-[#CFD7DD]">{row.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-xs text-[#7F8B95]">
                    {adminId ? "No activity found." : "Admin ID is required."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminProfile;
