import React, { useEffect, useMemo, useRef, useState } from "react";
import SupportChatModal from "../../components/support/SupportChatModal";
import ChatAppealsHeroSection from "../../components/chatAppeals/ChatAppealsHeroSection";
import ChatAppealsFilterStrip from "../../components/chatAppeals/ChatAppealsFilterStrip";
import ChatAppealsTable from "../../components/chatAppeals/ChatAppealsTable";
import { AppealRow, AppealStatusOption } from "../../components/chatAppeals/types";

const timeRanges = ["All Time", "7 Days", "1 month", "1 Year", "Custom"];

const rows: AppealRow[] = [
  {
    id: "1",
    username: "Qamardeen Malik",
    vendor: "Lawal Adewale",
    adType: "Buy ad",
    token: "USDT",
    country: "Nigeria",
    qty: "100",
    amount: "$100",
    statusColor: "red",
    statusText: "Won by Vendor",
    date: "22/10/25",
    time: "07:22 AM",
  },
  {
    id: "2",
    username: "Qamardeen Malik",
    vendor: "Lawal Adewale",
    adType: "Sell Ads",
    token: "USDT",
    country: "Nigeria",
    qty: "100",
    amount: "$100",
    statusColor: "yellow",
    date: "22/10/25",
    time: "07:22 AM",
  },
  {
    id: "3",
    username: "Qamardeen Malik",
    vendor: "Lawal Adewale",
    adType: "Buy ad",
    token: "USDT",
    country: "Nigeria",
    qty: "100",
    amount: "$100",
    statusColor: "green",
    date: "22/10/25",
    time: "07:22 AM",
  },
  {
    id: "4",
    username: "Qamardeen Malik",
    vendor: "Lawal Adewale",
    adType: "Sell Ads",
    token: "USDT",
    country: "Nigeria",
    qty: "100",
    amount: "$100",
    statusColor: "yellow",
    date: "22/10/25",
    time: "07:22 AM",
  },
  {
    id: "5",
    username: "Qamardeen Malik",
    vendor: "Lawal Adewale",
    adType: "Buy ad",
    token: "USDT",
    country: "Nigeria",
    qty: "100",
    amount: "$100",
    statusColor: "yellow",
    date: "22/10/25",
    time: "07:22 AM",
  },
];

const rowsByTimeRange: Record<string, AppealRow[]> = {
  "All Time": rows,
  "7 Days": rows.slice(0, 3),
  "1 month": rows.slice(0, 4),
  "1 Year": rows,
  Custom: rows.slice(1, 4),
};

const statsByTimeRange: Record<string, { totalChats: number; appealed: number; resolved: number }> = {
  "All Time": { totalChats: 250, appealed: 150, resolved: 100 },
  "7 Days": { totalChats: 72, appealed: 41, resolved: 24 },
  "1 month": { totalChats: 138, appealed: 85, resolved: 54 },
  "1 Year": { totalChats: 250, appealed: 150, resolved: 100 },
  Custom: { totalChats: 96, appealed: 58, resolved: 36 },
};

const ChatAppeals: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("All Time");
  const [searchText, setSearchText] = useState("");
  const [selectedBuyFilter, setSelectedBuyFilter] = useState("Buy");
  const [selectedCountry, setSelectedCountry] = useState("Country");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedWonBy, setSelectedWonBy] = useState("Won by");
  const [showBuyDropdown, setShowBuyDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showWonByDropdown, setShowWonByDropdown] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeChatUser, setActiveChatUser] = useState<AppealRow | null>(null);

  const buyRef = useRef<HTMLDivElement | null>(null);
  const countryRef = useRef<HTMLDivElement | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);
  const wonByRef = useRef<HTMLDivElement | null>(null);

  const buyOptions = ["All Ad type", "Buy ad", "Sell Ads"];
  const countryOptions = ["Country", "Nigeria", "Ghana", "Kenya"];
  const statusOptions: AppealStatusOption[] = [
    { value: "All Status", dot: "" },
    { value: "Appealed", dot: "#FF0000" },
    { value: "Pending", dot: "#F5A60A" },
    { value: "Resolved", dot: "#0C9E2A" },
  ];
  const wonByOptions = ["Won by", "User", "Vendor"];

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (buyRef.current && !buyRef.current.contains(event.target as Node)) setShowBuyDropdown(false);
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) setShowCountryDropdown(false);
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) setShowStatusDropdown(false);
      if (wonByRef.current && !wonByRef.current.contains(event.target as Node)) setShowWonByDropdown(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  useEffect(() => {
    setSelectedIds(new Set());
  }, [selectedTimeRange]);

  const activeRows = rowsByTimeRange[selectedTimeRange] ?? rows;
  const activeStats = statsByTimeRange[selectedTimeRange] ?? statsByTimeRange["All Time"];

  const filteredRows = useMemo(
    () =>
      activeRows.filter(
        (row) =>
          row.username.toLowerCase().includes(searchText.toLowerCase().trim()) &&
          (selectedBuyFilter === "Buy" ||
            selectedBuyFilter === "All Ad type" ||
            row.adType === selectedBuyFilter) &&
          (selectedCountry === "Country" || row.country === selectedCountry) &&
          (selectedStatus === "All Status" ||
            (selectedStatus === "Appealed" && row.statusColor === "red") ||
            (selectedStatus === "Pending" && row.statusColor === "yellow") ||
            (selectedStatus === "Resolved" && row.statusColor === "green")) &&
          (selectedWonBy === "Won by" || row.statusText?.toLowerCase().includes(selectedWonBy.toLowerCase()))
      ),
    [activeRows, searchText, selectedBuyFilter, selectedCountry, selectedStatus, selectedWonBy]
  );

  const allSelected = filteredRows.length > 0 && filteredRows.every((row) => selectedIds.has(row.id));
  const partiallySelected = selectedIds.size > 0 && !allSelected;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
      return;
    }
    setSelectedIds(new Set(filteredRows.map((row) => row.id)));
  };

  const toggleRow = (id: string) => {
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
          .appeals-checkbox {
            appearance: none;
            width: 14px;
            height: 14px;
            border-radius: 3px;
            border: 1px solid #9CA8B3;
            background-color: transparent;
            cursor: pointer;
          }
          .appeals-checkbox:checked {
            border-color: #A9EF45;
            background-color: #A9EF45;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 13l4 4L19 7'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 9px 9px;
          }
          .appeals-checkbox-indeterminate {
            border-color: #A9EF45;
            background-color: #A9EF45;
            position: relative;
          }
          .appeals-checkbox-indeterminate::after {
            content: "";
            position: absolute;
            left: 3px;
            right: 3px;
            top: 6px;
            height: 2px;
            background: #0B1820;
            border-radius: 2px;
          }
        `}
      </style>

      <ChatAppealsHeroSection
        timeRanges={timeRanges}
        selectedTimeRange={selectedTimeRange}
        onTimeRangeChange={setSelectedTimeRange}
        activeStats={activeStats}
      />

      <ChatAppealsFilterStrip
        selectedBuyFilter={selectedBuyFilter}
        selectedCountry={selectedCountry}
        selectedStatus={selectedStatus}
        selectedWonBy={selectedWonBy}
        showBuyDropdown={showBuyDropdown}
        showCountryDropdown={showCountryDropdown}
        showStatusDropdown={showStatusDropdown}
        showWonByDropdown={showWonByDropdown}
        setShowBuyDropdown={setShowBuyDropdown}
        setShowCountryDropdown={setShowCountryDropdown}
        setShowStatusDropdown={setShowStatusDropdown}
        setShowWonByDropdown={setShowWonByDropdown}
        setSelectedBuyFilter={setSelectedBuyFilter}
        setSelectedCountry={setSelectedCountry}
        setSelectedStatus={setSelectedStatus}
        setSelectedWonBy={setSelectedWonBy}
        buyOptions={buyOptions}
        countryOptions={countryOptions}
        statusOptions={statusOptions}
        wonByOptions={wonByOptions}
        buyRef={buyRef}
        countryRef={countryRef}
        statusRef={statusRef}
        wonByRef={wonByRef}
      />

      <ChatAppealsTable
        searchText={searchText}
        onSearchTextChange={setSearchText}
        filteredRows={filteredRows}
        selectedIds={selectedIds}
        partiallySelected={partiallySelected}
        allSelected={allSelected}
        toggleSelectAll={toggleSelectAll}
        toggleRow={toggleRow}
        onViewChat={setActiveChatUser}
      />

      <SupportChatModal
        isOpen={Boolean(activeChatUser)}
        onClose={() => setActiveChatUser(null)}
        username={activeChatUser?.username ?? "User"}
      />
    </div>
  );
};

export default ChatAppeals;
