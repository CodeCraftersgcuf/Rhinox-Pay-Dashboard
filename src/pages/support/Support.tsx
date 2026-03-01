import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { MessageCircle } from "lucide-react";
import images from "../../constants/images";
import TimeFilterTabs from "../../components/setting/TimeFilterTabs";
import SupportChatModal from "../../components/support/SupportChatModal";

interface SupportRow {
  id: string;
  username: string;
  category: string;
  country: string;
  status: "Resolved" | "Pending" | "In session" | "Active";
  agent: string;
  date: string;
}

const timeRanges = ["All Time", "7 Days", "1 month", "1 Year", "Custom"];
const rows: SupportRow[] = [
  { id: "1", username: "Qamardeen Malik", category: "Payment Issue", country: "Nigeria", status: "Resolved", agent: "Adewale", date: "22/10/25 07:22 AM" },
  { id: "2", username: "Qamardeen Malik", category: "Payment Issue", country: "Nigeria", status: "Pending", agent: "-", date: "22/10/25 07:22 AM" },
  { id: "3", username: "Qamardeen Malik", category: "Payment Issue", country: "Nigeria", status: "In session", agent: "Adewale", date: "22/10/25 07:22 AM" },
  { id: "4", username: "Qamardeen Malik", category: "Payment Issue", country: "Nigeria", status: "Active", agent: "Adewale", date: "22/10/25 07:22 AM" },
  { id: "5", username: "Qamardeen Malik", category: "Payment Issue", country: "Nigeria", status: "Resolved", agent: "Adewale", date: "22/10/25 07:22 AM" },
];

const statusClass: Record<SupportRow["status"], string> = {
  Resolved: "bg-[#0C9E2A] text-white",
  Pending: "bg-[#F59E0B] text-[#101418]",
  "In session": "bg-[#2563EB] text-white",
  Active: "bg-[#A21CAF] text-white",
};

const filterButtonStyle: React.CSSProperties = {
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

const Support: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("All Time");
  const [searchText, setSearchText] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("Country");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedWonBy, setSelectedWonBy] = useState("Won by");
  const [showWonByDropdown, setShowWonByDropdown] = useState(false);
  const [activeChatUser, setActiveChatUser] = useState<SupportRow | null>(null);
  const countryDropdownRef = useRef<HTMLDivElement | null>(null);
  const statusDropdownRef = useRef<HTMLDivElement | null>(null);
  const wonByDropdownRef = useRef<HTMLDivElement | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const countryOptions = ["Country", "Nigeria", "Ghana", "Kenya", "South Africa"];
  const statusOptions = ["All Status", "Pending", "In session", "Active", "Resolved"];
  const wonByOptions = ["Won by", "Adewale", "-"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false);
      }
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target as Node)
      ) {
        setShowStatusDropdown(false);
      }
      if (
        wonByDropdownRef.current &&
        !wonByDropdownRef.current.contains(event.target as Node)
      ) {
        setShowWonByDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredRows = useMemo(
    () =>
      rows.filter((row) =>
        row.username.toLowerCase().includes(searchText.toLowerCase().trim()) &&
        (selectedCountry === "Country" || row.country === selectedCountry) &&
        (selectedStatus === "All Status" || row.status === selectedStatus) &&
        (selectedWonBy === "Won by" || row.agent === selectedWonBy)
      ),
    [searchText, selectedCountry, selectedStatus, selectedWonBy]
  );
  const allSelected =
    filteredRows.length > 0 && filteredRows.every((row) => selectedIds.has(row.id));
  const partiallySelected = selectedIds.size > 0 && !allSelected;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
      return;
    }
    setSelectedIds(new Set(filteredRows.map((row) => row.id)));
  };

  const toggleRowSelection = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-5">
      <style>
        {`
          .support-checkbox {
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 3px;
            border: 1px solid #9CA8B3;
            background-color: transparent;
            cursor: pointer;
          }
          .support-checkbox:checked {
            border-color: #A9EF45;
            background-color: #A9EF45;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 13l4 4L19 7'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 10px 10px;
          }
          .support-checkbox-indeterminate {
            border-color: #A9EF45;
            background-color: #A9EF45;
            background-image: none;
            position: relative;
          }
          .support-checkbox-indeterminate::after {
            content: "";
            position: absolute;
            left: 3px;
            right: 3px;
            top: 7px;
            height: 2px;
            background: #0B1820;
            border-radius: 2px;
          }
        `}
      </style>
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
              Support
            </h1>
            <p className="mt-2 text-sm text-[#7B8A96]">View and manage chat appeals</p>
          </div>
          <TimeFilterTabs
            options={timeRanges}
            value={selectedTimeRange}
            onChange={setSelectedTimeRange}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            { label: "Total Chats", value: 250 },
            { label: "Pending", value: 150 },
            { label: "Resolved", value: 100 },
          ].map((stat) => (
            <div
              key={stat.label}
              className="h-[92px] rounded-[10px] px-4 py-3"
              style={{ background: "linear-gradient(119.08deg, #4880C0 0%, #1B589E 96.9%)" }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5E98DA]">
                  <MessageCircle size={16} className="text-[#0B1820]" />
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

      <div className="mt-5 md:mt-8">
        <div className="mb-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex w-full flex-wrap gap-2 sm:gap-3 md:w-auto">
            <button className="text-white flex items-center justify-center" style={filterButtonStyle}>
              Bulk Action
            </button>
            <div className="relative" ref={countryDropdownRef}>
              <button
                onClick={() => {
                  setShowCountryDropdown((prev) => !prev);
                  setShowStatusDropdown(false);
                  setShowWonByDropdown(false);
                }}
                className="text-white flex items-center justify-center gap-2"
                style={filterButtonStyle}
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
                  {countryOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedCountry(option);
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
            <div className="relative" ref={statusDropdownRef}>
              <button
                onClick={() => {
                  setShowStatusDropdown((prev) => !prev);
                  setShowCountryDropdown(false);
                  setShowWonByDropdown(false);
                }}
                className="text-white flex items-center justify-center gap-2"
                style={filterButtonStyle}
              >
                {selectedStatus}
                <ChevronDown
                  size={12}
                  className={showStatusDropdown ? "rotate-180 transition-transform" : "transition-transform"}
                />
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
                        setSelectedStatus(option);
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
            <div className="relative" ref={wonByDropdownRef}>
              <button
                onClick={() => {
                  setShowWonByDropdown((prev) => !prev);
                  setShowCountryDropdown(false);
                  setShowStatusDropdown(false);
                }}
                className="text-white flex items-center justify-center gap-2"
                style={filterButtonStyle}
              >
                {selectedWonBy}
                <ChevronDown
                  size={12}
                  className={showWonByDropdown ? "rotate-180 transition-transform" : "transition-transform"}
                />
              </button>
              {showWonByDropdown && (
                <div
                  className="absolute left-0 z-20 mt-1 w-[130px] overflow-hidden rounded-lg border border-[#27353B]"
                  style={{
                    backgroundColor: "rgba(26, 38, 47, 0.2)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    boxShadow: "5px 5px 15px 0px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  {wonByOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedWonBy(option);
                        setShowWonByDropdown(false);
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
        </div>
      </div>

      <section
        className="w-full rounded-lg overflow-hidden"
        style={{ backgroundColor: "#0B1820", borderRadius: "20px", marginTop: "9.6px" }}
      >
        <div
          className="flex flex-col items-start gap-3 px-4 py-3 md:h-[60px] md:flex-row md:items-center md:justify-between md:px-6 md:py-0"
          style={{ backgroundColor: "#020B16", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
        >
          <h3 className="text-white text-[20px]">Support Chats</h3>
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
          <table className="w-full">
            <colgroup>
              <col style={{ width: "44px" }} />
              <col style={{ width: "165px" }} />
              <col style={{ width: "130px" }} />
              <col style={{ width: "120px" }} />
              <col style={{ width: "120px" }} />
              <col style={{ width: "105px" }} />
              <col style={{ width: "145px" }} />
              <col style={{ width: "120px" }} />
            </colgroup>
            <thead>
              <tr className="text-left text-[11px] text-[#FFFFFF]" style={{ backgroundColor: "#1C2530" }}>
                <th className="px-2 py-3">
                  <input
                    type="checkbox"
                    className={`support-checkbox ${partiallySelected ? "support-checkbox-indeterminate" : ""}`}
                    checked={allSelected}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-0 py-3">User name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Agent</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.id} className="border-b border-[#2B363E] text-[12px] text-white">
                  <td className="px-2 py-3">
                    <input
                      type="checkbox"
                      className="support-checkbox"
                      checked={selectedIds.has(row.id)}
                      onChange={() => toggleRowSelection(row.id)}
                    />
                  </td>
                  <td className="px-0 py-3">
                    <div className="flex items-center gap-0.5">
                      <img
                        src={images.avater1}
                        alt={row.username}
                        className="h-8 w-8 rounded-full bg-[#A9EF45]"
                      />
                      <span>{row.username}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#CFD7DD]">{row.category}</td>
                  <td className="px-4 py-3 text-[#CFD7DD]">
                    <span className="inline-flex items-center gap-2">
                      <span className="inline-block h-4 w-4 rounded-full bg-gradient-to-r from-[#0A9E58] via-white to-[#0A9E58]" />
                      {row.country}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-3 py-1 text-[11px] ${statusClass[row.status]}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#CFD7DD]">{row.agent}</td>
                  <td className="px-4 py-3 text-[#CFD7DD]">{row.date}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setActiveChatUser(row)}
                      className="h-[35px] min-w-[96px] whitespace-nowrap rounded-full bg-[#A9EF45] px-5 text-[11px] font-medium text-[#0C141C]"
                    >
                      View Chat
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <SupportChatModal
        isOpen={Boolean(activeChatUser)}
        onClose={() => setActiveChatUser(null)}
        username={activeChatUser?.username ?? "User"}
      />
    </div>
  );
};

export default Support;
