import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SupportChatModal from "../../components/support/SupportChatModal";
import ChatAppealsHeroSection from "../../components/chatAppeals/ChatAppealsHeroSection";
import ChatAppealsFilterStrip from "../../components/chatAppeals/ChatAppealsFilterStrip";
import ChatAppealsTable from "../../components/chatAppeals/ChatAppealsTable";
import { AppealRow, AppealStatusOption } from "../../components/chatAppeals/types";
import { fetchP2PAppeals } from "../../services/admin";
import { formatDateTime, formatNumber, mapCountryCode, mapCountryName } from "../../utils/adminFormatters";

const timeRanges = ["All Time", "7 Days", "1 month", "1 Year", "Custom"];
const ITEMS_PER_PAGE = 10;

const splitDateTime = (value: string) => {
  const formatted = formatDateTime(value);
  const [date, time] = formatted.split(", ");
  return { date: date || "-", time: time || "-" };
};

const mapAppealStatus = (status: string): { color: AppealRow["statusColor"]; text?: string } => {
  if (status === "refunded" || status === "completed") {
    return { color: "green", text: "Resolved" };
  }
  if (status === "cancelled") {
    return { color: "red", text: "Won by Vendor" };
  }
  return { color: "yellow", text: "Appealed" };
};

const mapAppealRow = (appeal: {
  id: number | string;
  username: string;
  vendor: string;
  adType: string;
  token: string;
  country?: string | null;
  qty: number;
  amount: number;
  status: string;
  date: string;
}): AppealRow => {
  const { date, time } = splitDateTime(appeal.date);
  const status = mapAppealStatus(appeal.status);
  const adTypeLabel =
    appeal.adType?.toLowerCase() === "sell" ? "Sell Ads" : "Buy ad";
  return {
    id: String(appeal.id),
    username: appeal.username,
    vendor: appeal.vendor,
    adType: adTypeLabel,
    token: appeal.token,
    country: mapCountryName(appeal.country),
    qty: formatNumber(appeal.qty),
    amount: `$${formatNumber(appeal.amount)}`,
    statusColor: status.color,
    statusText: status.text,
    date,
    time,
  };
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
  const [rows, setRows] = useState<AppealRow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loadingRows, setLoadingRows] = useState(false);
  const [activeStats, setActiveStats] = useState({ totalChats: 0, appealed: 0, resolved: 0 });

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
    setCurrentPage(1);
  }, [selectedTimeRange, selectedBuyFilter, selectedCountry, selectedStatus, selectedWonBy, searchText]);

  const loadAppeals = useCallback(async () => {
    setLoadingRows(true);
    try {
      const data = await fetchP2PAppeals({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        range: selectedTimeRange,
        country: mapCountryCode(selectedCountry),
        search: searchText.trim() || undefined,
      });
      const mappedRows = (data?.items || []).map(mapAppealRow);
      setRows(mappedRows);
      const total = data?.pagination?.total || 0;
      setTotalItems(total);
      setActiveStats({
        totalChats: total,
        appealed: total,
        resolved: mappedRows.filter((row: { statusColor: string }) => row.statusColor === "green").length,
      });
    } catch (error) {
      console.error("Failed to load P2P appeals:", error);
      setRows([]);
      setTotalItems(0);
      setActiveStats({ totalChats: 0, appealed: 0, resolved: 0 });
    } finally {
      setLoadingRows(false);
    }
  }, [currentPage, selectedTimeRange, selectedCountry, searchText]);

  useEffect(() => {
    loadAppeals();
  }, [loadAppeals]);

  const filteredRows = useMemo(
    () =>
      rows.filter(
        (row) =>
          (selectedBuyFilter === "Buy" ||
            selectedBuyFilter === "All Ad type" ||
            row.adType === selectedBuyFilter) &&
          (selectedStatus === "All Status" ||
            (selectedStatus === "Appealed" && (row.statusColor === "yellow" || row.statusColor === "red")) ||
            (selectedStatus === "Pending" && row.statusColor === "yellow") ||
            (selectedStatus === "Resolved" && row.statusColor === "green")) &&
          (selectedWonBy === "Won by" || row.statusText?.toLowerCase().includes(selectedWonBy.toLowerCase()))
      ),
    [rows, selectedBuyFilter, selectedStatus, selectedWonBy]
  );

  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

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
        filteredRows={loadingRows ? [] : filteredRows}
        selectedIds={selectedIds}
        partiallySelected={partiallySelected}
        allSelected={allSelected}
        toggleSelectAll={toggleSelectAll}
        toggleRow={toggleRow}
        onViewChat={setActiveChatUser}
      />

      {loadingRows && (
        <p className="text-center text-sm text-white">Loading appeals...</p>
      )}

      <div className="flex flex-col gap-3 rounded-[20px] bg-[#0B1820] px-4 py-3 md:flex-row md:items-center md:justify-between">
        <p className="text-[12px] text-white">
          {totalItems === 0
            ? "Showing 0 appeals"
            : `Showing ${((currentPage - 1) * ITEMS_PER_PAGE) + 1}-${Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of ${formatNumber(totalItems)} appeals`}
        </p>
        <div className="flex items-center gap-2 text-white">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="h-8 w-8 rounded-lg bg-[#1C2630] disabled:opacity-50"
          >
            &lt;
          </button>
          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`h-8 min-w-8 rounded-lg px-2 text-[12px] ${currentPage === pageNum ? "bg-[#1C2630]" : "opacity-70"}`}
            >
              {pageNum}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="h-8 w-8 rounded-lg bg-[#1C2630] disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>

      <SupportChatModal
        isOpen={Boolean(activeChatUser)}
        onClose={() => setActiveChatUser(null)}
        username={activeChatUser?.username ?? "User"}
        orderId={activeChatUser?.id}
        mode="appeal"
        onUpdated={loadAppeals}
      />
    </div>
  );
};

export default ChatAppeals;
