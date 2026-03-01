import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, MoreVertical, Pencil, Search, Trash2, X } from "lucide-react";
import images from "../../constants/images";
import SupportChatModal from "../../components/support/SupportChatModal";
import P2PHeroSection from "../../components/p2p/P2PHeroSection";
import P2PControlStrip from "../../components/p2p/P2PControlStrip";

interface P2PRow {
  id: string;
  username: string;
  adType: "Buy" | "Sell";
  token: string;
  country: string;
  qty: string;
  amount: string;
  noOfOrders: string;
  vendor: string;
  statusColor: "green" | "yellow";
  statusText?: string;
  date: string;
  time: string;
}

const timeRanges = ["All Time", "7 days", "1 month", "1 Year", "Custom"];

const rows: P2PRow[] = [
  {
    id: "1",
    username: "Qamardeen Malik",
    adType: "Buy",
    token: "USDT",
    country: "Nigeria",
    qty: "100",
    amount: "$100",
    noOfOrders: "500",
    vendor: "Adewale Chris",
    statusColor: "yellow",
    statusText: "Order Placed",
    date: "22/10/25",
    time: "07:22 AM",
  },
  {
    id: "2",
    username: "Qamardeen Malik",
    adType: "Buy",
    token: "USDT",
    country: "Nigeria",
    qty: "100",
    amount: "$100",
    noOfOrders: "500",
    vendor: "Adewale Chris",
    statusColor: "yellow",
    statusText: "Awaiting Payment",
    date: "22/10/25",
    time: "07:22 AM",
  },
  {
    id: "3",
    username: "Qamardeen Malik",
    adType: "Buy",
    token: "USDT",
    country: "Nigeria",
    qty: "100",
    amount: "$100",
    noOfOrders: "500",
    vendor: "Adewale Chris",
    statusColor: "yellow",
    statusText: "Awaiting Release",
    date: "22/10/25",
    time: "07:22 AM",
  },
  {
    id: "4",
    username: "Qamardeen Malik",
    adType: "Buy",
    token: "USDT",
    country: "Nigeria",
    qty: "100",
    amount: "$100",
    noOfOrders: "500",
    vendor: "Adewale Chris",
    statusColor: "green",
    statusText: "Completed",
    date: "22/10/25",
    time: "07:22 AM",
  },
  {
    id: "5",
    username: "Qamardeen Malik",
    adType: "Buy",
    token: "USDT",
    country: "Nigeria",
    qty: "100",
    amount: "$100",
    noOfOrders: "500",
    vendor: "Adewale Chris",
    statusColor: "green",
    statusText: "Completed",
    date: "22/10/25",
    time: "07:22 AM",
  },
];

const rowsByTimeRange: Record<string, P2PRow[]> = {
  "All Time": rows,
  "7 days": rows.slice(0, 3),
  "1 month": rows.slice(0, 4),
  "1 Year": rows,
  Custom: rows.slice(1, 5),
};

const statsByTimeRange: Record<string, { totalAds: number; buyOrders: number; sellOrders: number }> = {
  "All Time": { totalAds: 250, buyOrders: 150, sellOrders: 100 },
  "7 days": { totalAds: 90, buyOrders: 50, sellOrders: 35 },
  "1 month": { totalAds: 160, buyOrders: 92, sellOrders: 61 },
  "1 Year": { totalAds: 250, buyOrders: 150, sellOrders: 100 },
  Custom: { totalAds: 118, buyOrders: 70, sellOrders: 43 },
};

const P2P: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("All Time");
  const [activeDashboardTab, setActiveDashboardTab] = useState("Ads");
  const [searchText, setSearchText] = useState("");
  const [selectedBuy, setSelectedBuy] = useState("Buy");
  const [selectedCountry, setSelectedCountry] = useState("Country");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [showBuyDropdown, setShowBuyDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);
  const [showAdModal, setShowAdModal] = useState(false);
  const [adTypeTab, setAdTypeTab] = useState<"Buy" | "Sell">("Sell");
  const [showOpenAdModal, setShowOpenAdModal] = useState(false);
  const [openAdType, setOpenAdType] = useState("USDT");
  const [selectedOrderTab, setSelectedOrderTab] = useState("Received");
  const [showPaymentDetailsModal, setShowPaymentDetailsModal] = useState(false);
  const [showAccountTypeDropdown, setShowAccountTypeDropdown] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState("All");
  const [showAddNewAccountModal, setShowAddNewAccountModal] = useState(false);
  const [showAddAccountTypeDropdown, setShowAddAccountTypeDropdown] = useState(false);
  const [selectedAddAccountType, setSelectedAddAccountType] = useState("Select Account type");
  const [showTransactionDetailsModal, setShowTransactionDetailsModal] = useState(false);
  const [selectedTransactionStatus, setSelectedTransactionStatus] = useState<string>("Order Placed");
  const [activeChatUsername, setActiveChatUsername] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const buyRef = useRef<HTMLDivElement | null>(null);
  const countryRef = useRef<HTMLDivElement | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);

  const buyOptions = ["Buy", "Sell", "All Ad Type"];
  const ordersBuyOptions = ["All Ad type", "Buy ad", "Sell Ads"];
  const countryOptions = ["Country", "Nigeria", "Ghana", "Kenya"];
  const statusOptions = ["All Status", "Active", "Pending"];
  const ordersStatusOptions = ["All Status", "Order Placed", "Awaiting Payment", "Awaiting Release", "Completed"];

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (buyRef.current && !buyRef.current.contains(event.target as Node)) setShowBuyDropdown(false);
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) setShowCountryDropdown(false);
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) setShowStatusDropdown(false);
      if (!target.closest("[data-p2p-action-menu]")) setOpenActionMenuId(null);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  useEffect(() => {
    setSelectedIds(new Set());
  }, [selectedTimeRange]);

  useEffect(() => {
    if (activeDashboardTab === "Orders") {
      setSelectedBuy("All Ad type");
      setSelectedStatus("All Status");
      return;
    }
    setSelectedBuy("Buy");
    setSelectedStatus("All Status");
  }, [activeDashboardTab]);

  const activeRows = rowsByTimeRange[selectedTimeRange] ?? rows;
  const activeStats = statsByTimeRange[selectedTimeRange] ?? statsByTimeRange["All Time"];

  const filteredRows = useMemo(
    () =>
      activeRows.filter(
        (row) =>
          row.username.toLowerCase().includes(searchText.toLowerCase().trim()) &&
          (activeDashboardTab === "Orders"
            ? selectedBuy === "All Ad type" ||
              (selectedBuy === "Buy ad" && row.adType === "Buy") ||
              (selectedBuy === "Sell Ads" && row.adType === "Sell")
            : selectedBuy === "All Ad Type" || row.adType === selectedBuy) &&
          (selectedCountry === "Country" || row.country === selectedCountry) &&
          (activeDashboardTab === "Orders"
            ? selectedStatus === "All Status" ||
              (selectedStatus === "Order Placed" && row.statusText === "Order Placed") ||
              (selectedStatus === "Awaiting Payment" && row.statusText === "Awaiting Payment") ||
              (selectedStatus === "Awaiting Release" && row.statusText === "Awaiting Release") ||
              (selectedStatus === "Completed" && row.statusText === "Completed")
            : selectedStatus === "All Status" ||
              (selectedStatus === "Active" && row.statusColor === "green") ||
              (selectedStatus === "Pending" && row.statusColor === "yellow"))
      ),
    [activeRows, searchText, activeDashboardTab, selectedBuy, selectedCountry, selectedStatus]
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
    <div className="space-y-4">
      <style>
        {`
          .p2p-checkbox {
            appearance: none;
            width: 13px;
            height: 13px;
            border-radius: 3px;
            border: 1px solid #71808E;
            background-color: transparent;
            cursor: pointer;
          }
          .p2p-checkbox:checked {
            border-color: #A9EF45;
            background-color: #A9EF45;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 13l4 4L19 7'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 8px 8px;
          }
          .p2p-checkbox-indeterminate {
            border-color: #A9EF45;
            background-color: #A9EF45;
            position: relative;
          }
          .p2p-checkbox-indeterminate::after {
            content: "";
            position: absolute;
            left: 3px;
            right: 3px;
            top: 5px;
            height: 2px;
            background: #0B1820;
            border-radius: 1px;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
        `}
      </style>

      <P2PHeroSection
        timeRanges={timeRanges}
        selectedTimeRange={selectedTimeRange}
        onTimeRangeChange={setSelectedTimeRange}
        activeStats={activeStats}
      />

      <P2PControlStrip
        activeDashboardTab={activeDashboardTab}
        onDashboardTabChange={setActiveDashboardTab}
        selectedBuy={selectedBuy}
        selectedCountry={selectedCountry}
        selectedStatus={selectedStatus}
        showBuyDropdown={showBuyDropdown}
        showCountryDropdown={showCountryDropdown}
        showStatusDropdown={showStatusDropdown}
        setShowBuyDropdown={setShowBuyDropdown}
        setShowCountryDropdown={setShowCountryDropdown}
        setShowStatusDropdown={setShowStatusDropdown}
        setSelectedBuy={setSelectedBuy}
        setSelectedCountry={setSelectedCountry}
        setSelectedStatus={setSelectedStatus}
        buyOptions={buyOptions}
        ordersBuyOptions={ordersBuyOptions}
        countryOptions={countryOptions}
        statusOptions={statusOptions}
        ordersStatusOptions={ordersStatusOptions}
        buyRef={buyRef}
        countryRef={countryRef}
        statusRef={statusRef}
        onOpenPaymentDetailsModal={() => setShowPaymentDetailsModal(true)}
        onOpenAdModal={() => setShowAdModal(true)}
      />

      <section>
        <section className="w-full overflow-hidden rounded-[12px]" style={{ backgroundColor: "#0B1820" }}>
          <div
            className="flex flex-col gap-3 px-4 py-2.5 md:flex-row md:items-center md:justify-between"
            style={{ backgroundColor: "#020B16" }}
          >
            <h3 className="text-[16px] text-white">{activeDashboardTab === "Orders" ? "P2P Orders" : "P2P Ads Posted"}</h3>
            <div className="flex h-[26px] w-full max-w-[188px] items-center rounded-full bg-[#0F1722] px-2.5">
              <Search size={11} className="mr-1.5 text-gray-400" />
              <input
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search"
                className="flex-1 bg-transparent text-[10px] text-white outline-none placeholder:text-[#77828C]"
              />
            </div>
          </div>

          <div className="overflow-x-auto bg-[#0F1825]">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[10px] text-white" style={{ backgroundColor: "#1C2530" }}>
                  <th className="px-3 py-2.5">
                    <input
                      type="checkbox"
                      className={`p2p-checkbox ${partiallySelected ? "p2p-checkbox-indeterminate" : ""}`}
                      checked={allSelected}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-3 py-2.5">User name</th>
                  <th className="px-3 py-2.5">Ad Type</th>
                  <th className="px-3 py-2.5">Token</th>
                  <th className="px-3 py-2.5">Country</th>
                  <th className="px-3 py-2.5">Qty</th>
                  <th className="px-3 py-2.5">Amount</th>
                  {activeDashboardTab === "Orders" ? (
                    <>
                      <th className="px-3 py-2.5">Vendor</th>
                      <th className="px-3 py-2.5">Status</th>
                    </>
                  ) : (
                    <>
                      <th className="px-3 py-2.5">No of orders</th>
                      <th className="px-3 py-2.5">Status</th>
                    </>
                  )}
                  <th className="px-3 py-2.5">Date</th>
                  <th className="px-3 py-2.5">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id} className="border-b border-[#2B363E] text-[10px] text-white">
                    <td className="px-3 py-2.5">
                      <input
                        type="checkbox"
                        className="p2p-checkbox"
                        checked={selectedIds.has(row.id)}
                        onChange={() => toggleRow(row.id)}
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <img src={images.avater1} alt={row.username} className="h-6 w-6 rounded-full bg-[#A9EF45]" />
                        <span className="whitespace-nowrap">{row.username}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-[#CFD7DD]">{row.adType}</td>
                    <td className="px-3 py-2.5 text-[#CFD7DD]">
                      <span className="inline-flex items-center gap-1.5">
                        <img src={images.cryptocurrency_color_usdt} alt="USDT" className="h-3.5 w-3.5 rounded-full" />
                        {row.token}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-[#CFD7DD]">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="inline-block h-3.5 w-3.5 rounded-full bg-gradient-to-r from-[#0A9E58] via-white to-[#0A9E58]" />
                        {row.country}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-[#CFD7DD]">{row.qty}</td>
                    <td className="px-3 py-2.5 text-[#CFD7DD]">{row.amount}</td>
                    {activeDashboardTab === "Orders" ? (
                      <>
                        <td className="px-3 py-2.5 text-[#CFD7DD] whitespace-nowrap">{row.vendor}</td>
                        <td className="px-3 py-2.5 text-[#0C9E2A]">{row.statusText ?? "Completed"}</td>
                      </>
                    ) : (
                      <>
                        <td className="px-3 py-2.5 text-[#CFD7DD]">{row.noOfOrders}</td>
                        <td className="px-3 py-2.5 text-[#CFD7DD]">
                          <span
                            className={`inline-block h-2.5 w-2.5 rounded-full ${
                              row.statusColor === "green" ? "bg-[#0C9E2A]" : "bg-[#F5A60A]"
                            }`}
                          />
                        </td>
                      </>
                    )}
                    <td className="px-3 py-2.5 text-[#CFD7DD] whitespace-nowrap">
                      {row.date} - {row.time}
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="relative" data-p2p-action-menu>
                        <button
                          onClick={() =>
                            setOpenActionMenuId((prev) => (prev === row.id ? null : row.id))
                          }
                          className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#1B2A35] text-[#C6D0D9]"
                        >
                          <MoreVertical size={12} />
                        </button>
                        {openActionMenuId === row.id && (
                          <div
                            className="absolute right-0 top-7 z-30 w-[110px] overflow-hidden rounded-md border border-[#27353B]"
                            style={{
                              backgroundColor: "rgba(16, 31, 38, 0.95)",
                              boxShadow: "5px 5px 15px 0px rgba(0, 0, 0, 0.35)",
                              backdropFilter: "blur(4px)",
                              WebkitBackdropFilter: "blur(4px)",
                            }}
                          >
                            <button
                              onClick={() => {
                                setOpenActionMenuId(null);
                                setSelectedTransactionStatus(row.statusText ?? "Order Placed");
                                setShowTransactionDetailsModal(true);
                              }}
                              className="block w-full px-2.5 py-2 text-left text-[8px] text-white hover:bg-[#1B2D36]"
                            >
                              Full Details
                            </button>
                            <button className="block w-full px-2.5 py-2 text-left text-[8px] text-white hover:bg-[#1B2D36]">
                              Customer p2p profile
                            </button>
                            {activeDashboardTab === "Orders" && (
                              <button
                                onClick={() => {
                                  setOpenActionMenuId(null);
                                  setActiveChatUsername(row.username);
                                }}
                                className="block w-full px-2.5 py-2 text-left text-[8px] text-white hover:bg-[#1B2D36]"
                              >
                                View Chat
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>

      {showAdModal && (
        <div
          className="fixed inset-0 z-[130] flex items-center justify-end bg-[rgba(12,29,51,0.7)] p-3 md:p-4"
          style={{ backdropFilter: "blur(5px)", WebkitBackdropFilter: "blur(5px)" }}
          onClick={() => setShowAdModal(false)}
        >
          <div
            className="h-[calc(100vh-24px)] w-full max-w-[390px] overflow-hidden rounded-2xl border border-[#132635] bg-[#020B16] shadow-2xl md:h-[calc(100vh-32px)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-full flex-col">
              <div className="flex h-[54px] items-center justify-between border-b border-[rgba(255,255,255,0.08)] px-4">
                <h3 className="text-[18px] font-semibold text-white">Ads details</h3>
                <button onClick={() => setShowAdModal(false)} className="text-[#D3DBE3]">
                  <X size={16} />
                </button>
              </div>

              <div className="hide-scrollbar flex-1 space-y-3 overflow-y-auto p-3">
                <div className="flex h-9 items-center rounded-full border border-[#2B3745] bg-[#101A25] p-0.5">
                  {(["Buy", "Sell"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setAdTypeTab(tab)}
                      className={`h-full flex-1 rounded-full text-[12px] ${
                        adTypeTab === tab ? "bg-[#A9EF45] text-[#0C141C]" : "text-[#9BA9B6]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="rounded-xl border border-[#1D2B36] bg-[#0A1420] p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-[20px] text-white">My Ads</h4>
                    <button className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#A9EF45]">
                      <img src={images.pluscircle} alt="add" className="h-4 w-4 object-contain" />
                    </button>
                  </div>

                  {[
                    { token: "USDT", quantity: "50 USDT", priceLabel: "Price / 1 USDT" },
                    { token: "ETH", quantity: "50 ETH", priceLabel: "Price / 1 USDT" },
                  ].map((ad) => (
                    <div
                      key={ad.token}
                      className="mb-2.5 min-h-[270px] rounded-xl border border-[#35504A] bg-[linear-gradient(180deg,#111E26_0%,#0F1A20_100%)] p-3 last:mb-0"
                    >
                      <div className="mb-3 flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <img src={images.profile_image} alt="profile" className="h-7 w-7 rounded-full object-cover" />
                          <div>
                            <p className="text-[14px] text-white">{ad.token} Sell AD</p>
                            <p className="text-[10px] text-[#95D440]">Online</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full border border-[#A77000] bg-[#2E2D28] px-2 py-0.5 text-[9px] text-[#FFA500]">
                          <img src={images.vector5} alt="running" className="h-2.5 w-2.5 object-contain" />
                          Running
                        </span>
                      </div>

                      <div className="mb-2 grid grid-cols-3 gap-2 text-[8px] text-[#98A6B5]">
                        <p>Orders Received : <span className="text-white">1,200</span></p>
                        <p>Response Time : <span className="text-white">15min</span></p>
                        <p>Score : <span className="text-white">98%</span></p>
                      </div>

                      <div className="mb-2 overflow-hidden rounded-[8px] border border-[#2B3745]">
                        <div className="flex items-center justify-between border-b border-[#2B3745] bg-[#1E2833] px-2.5 py-2 text-[11px]">
                          <span className="text-[#98A6B5]">Available Quantity</span>
                          <span className="text-white">{ad.quantity}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-[#2B3745] bg-[#1E2833] px-2.5 py-2 text-[11px]">
                          <span className="text-[#98A6B5]">Limits</span>
                          <span className="text-white">1,600 - 75,000 NGN</span>
                        </div>
                        <div className="flex items-start justify-between bg-[#1E2833] px-2.5 py-2 text-[11px]">
                          <span className="text-[#98A6B5]">Payment Methods</span>
                          <span className="max-w-[145px] text-right text-white">Opay , Palmpay , Moniepoint ,Kudabank , Chipper Cash</span>
                        </div>
                      </div>

                      <div className="mt-6 flex items-end justify-between gap-2">
                        <div className="flex flex-col gap-1">
                          <p className="text-[9px] text-[#98A6B5]">{ad.priceLabel}</p>
                          <p
                            className="text-[#A9EF45]"
                            style={{
                              fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                              fontWeight: 700,
                              fontSize: "19.05px",
                              lineHeight: "100%",
                              letterSpacing: "0%",
                            }}
                          >
                            1,550.70 NGN
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button className="h-[30px] rounded-full border border-[#A9EF45] px-3 text-[10px] text-[#A9EF45]">
                            New Order
                          </button>
                          <button
                            onClick={() => {
                              setOpenAdType(ad.token);
                              setShowAdModal(false);
                              setShowOpenAdModal(true);
                            }}
                            className="h-[30px] rounded-full bg-[#A9EF45] px-3 text-[10px] text-[#0C141C]"
                          >
                            Open AD
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showOpenAdModal && (
        <div
          className="fixed inset-0 z-[140] flex items-center justify-end bg-[rgba(12,29,51,0.7)] p-3 md:p-4"
          style={{ backdropFilter: "blur(5px)", WebkitBackdropFilter: "blur(5px)" }}
          onClick={() => setShowOpenAdModal(false)}
        >
          <div
            className="h-[calc(100vh-24px)] w-full max-w-[390px] overflow-hidden rounded-2xl border border-[#132635] bg-[#020B16] shadow-2xl md:h-[calc(100vh-32px)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-full flex-col">
              <div className="flex h-[54px] items-center justify-between border-b border-[rgba(255,255,255,0.08)] px-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setShowOpenAdModal(false);
                      setShowAdModal(true);
                    }}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#27353B] text-[#D3DBE3]"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <h3 className="text-[13px] font-semibold text-white">{openAdType} Sell AD</h3>
                </div>
                <button onClick={() => setShowOpenAdModal(false)} className="text-[#D3DBE3]">
                  <X size={14} />
                </button>
              </div>

              <div className="hide-scrollbar flex-1 space-y-3 overflow-y-auto p-3">
                <div className="rounded-xl border border-[#1D2B36] bg-[#0A1420] p-2.5">
                  <div className="mb-3 px-1">
                    <p className="text-[16px] text-[#DCE4EC]">{openAdType} Sell Ad</p>
                  </div>

                  <div className="rounded-xl border border-[#35504A] bg-[linear-gradient(180deg,#111E26_0%,#0F1A20_100%)] p-3">
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <img src={images.profile_image} alt="profile" className="h-7 w-7 rounded-full object-cover" />
                        <div>
                          <p className="text-[13px] text-white">{openAdType} Sell AD</p>
                          <p className="text-[9px] text-[#95D440]">Online</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#A77000] bg-[#2E2D28] px-2 py-0.5 text-[8px] text-[#FFA500]">
                        <img src={images.vector5} alt="running" className="h-2.5 w-2.5 object-contain" />
                        Running
                      </span>
                    </div>

                    <div className="mb-2 grid grid-cols-3 gap-1.5 text-[7px] text-[#98A6B5]">
                      <p>Orders Received : <span className="text-white">1,200</span></p>
                      <p>Response Time : <span className="text-white">15min</span></p>
                      <p>Score : <span className="text-white">98%</span></p>
                    </div>

                    <div className="mb-2 overflow-hidden rounded-[8px] border border-[#2B3745]">
                      {[
                        { key: "Completed Orders", value: "200" },
                        { key: "Cancelled Orders", value: "200" },
                        { key: "Available Quantity", value: `50 ${openAdType}` },
                        { key: "Limits", value: "1,600 - 75,000 NGN" },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between border-b border-[#2B3745] bg-[#1E2833] px-2.5 py-1.5 text-[10px] last:border-b-0">
                          <span className="text-[#98A6B5]">{item.key}</span>
                          <span className="text-white">{item.value}</span>
                        </div>
                      ))}
                      <div className="flex items-start justify-between bg-[#1E2833] px-2.5 py-1.5 text-[10px]">
                        <span className="text-[#98A6B5]">Payment Methods</span>
                        <span className="max-w-[145px] text-right text-white">Opay , Palmpay , Moniepoint Kudabank , Chipper Cash</span>
                      </div>
                    </div>

                    <div className="mt-2 flex items-end justify-between gap-2">
                      <div>
                        <p className="text-[8px] text-[#98A6B5]">Price / 1 {openAdType}</p>
                        <p className="text-[24px] font-bold leading-none text-[#A9EF45]">1,550.70 NGN</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button className="h-[28px] rounded-full border border-[#86BE40] px-3 text-[8px] text-[#86BE40]">Delete Ad</button>
                        <button className="h-[28px] rounded-full bg-[#A9EF45] px-3 text-[8px] text-[#0C141C]">Edit AD</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex h-[34px] items-center rounded-full border border-[#27353B] bg-[#101A25] p-0.5">
                  {["Received", "Unpaid", "Paid", "Appeal"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedOrderTab(tab)}
                      className={`h-full flex-1 rounded-full text-[10px] ${
                        selectedOrderTab === tab ? "bg-[#A9EF45] text-[#0C141C]" : "text-[#6E7C88]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="rounded-xl border border-[#1D2B36] bg-[#0A1420] p-2.5">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-[14px] text-white">Received Orders</h4>
                    <div className="flex items-center gap-2 text-[8px]">
                      <button className="text-[#A9EF45]">Accept All</button>
                      <button className="text-[#8B99A6]">Decline All</button>
                    </div>
                  </div>

                  {[1, 2, 3].map((order) => (
                    <div key={order} className="mb-2 overflow-hidden rounded-lg border border-[#27353B] bg-[#1B2430] last:mb-0">
                      <div className="flex items-start justify-between gap-2 bg-[#17202C] p-2.5">
                        <div className="flex items-center gap-2">
                          <img src={images.profile_image} alt="profile" className="h-7 w-7 rounded-full object-cover" />
                          <div>
                            <p className="text-[10px] text-white">Qamar Malik</p>
                            <p className="text-[8px] text-[#8B99A6]">
                              Sell {openAdType} <span className="text-[#95D440]">Active</span>
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-[#00B533]">
                            N20,000 <span className="text-[#AAB5C0]">(15 {openAdType})</span>
                          </p>
                          <p className="text-[7px] text-[#8B99A6]">Oct 15, 2025</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-2">
                        <button className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#2A3440]">
                          <img src={images.ChatCircle} alt="chat" className="h-3.5 w-3.5 object-contain" />
                        </button>
                        <div className="flex items-center gap-1.5">
                          <button className="h-[22px] rounded-full border border-[#86BE40] px-3 text-[7px] text-[#86BE40]">Cancel</button>
                          <button
                            onClick={() => {
                              if (order === 2) return;
                              setShowOpenAdModal(false);
                              setActiveChatUsername("Qamar Malik");
                            }}
                            className="h-[22px] rounded-full bg-[#A9EF45] px-3 text-[7px] text-[#0C141C]"
                          >
                            {order === 2 ? "View" : "Accept"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPaymentDetailsModal && (
        <div
          className="fixed inset-0 z-[145] flex items-center justify-end bg-[rgba(12,29,51,0.7)] p-3 md:p-4"
          style={{ backdropFilter: "blur(5px)", WebkitBackdropFilter: "blur(5px)" }}
          onClick={() => setShowPaymentDetailsModal(false)}
        >
          <div
            className="hide-scrollbar h-[calc(100vh-24px)] w-full max-w-[420px] overflow-y-auto rounded-2xl border border-[#132635] bg-[#020B16] shadow-2xl md:h-[calc(100vh-32px)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div style={{ padding: "24px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                  paddingBottom: "16px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  width: "calc(100% + 48px)",
                  marginLeft: "-24px",
                  marginRight: "-24px",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  boxSizing: "border-box",
                }}
              >
                <h3
                  style={{
                    fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    margin: 0,
                  }}
                >
                  Payment Accounts
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <button
                    onClick={() => setShowAddNewAccountModal(true)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "100px",
                      border: "none",
                      backgroundColor: "#A9EF45",
                      color: "#000000",
                      cursor: "pointer",
                      fontSize: "10px",
                      fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                      fontWeight: 400,
                      height: "34px",
                    }}
                  >
                    Add New
                  </button>
                  <button
                    onClick={() => setShowPaymentDetailsModal(false)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#FFFFFF",
                      fontSize: "24px",
                      cursor: "pointer",
                      padding: 0,
                      width: "24px",
                      height: "24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: "24px", position: "relative" }}>
                <button
                  onClick={() => setShowAccountTypeDropdown(!showAccountTypeDropdown)}
                  style={{
                    width: "100%",
                    padding: "10px 16px",
                    backgroundColor: "#1E2833",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "130.23px",
                    height: "50.79px",
                    color: "#FFFFFF",
                    fontSize: "14px",
                    fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    boxSizing: "border-box",
                    textAlign: "left",
                  }}
                >
                  <span>{selectedAccountType}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                {showAccountTypeDropdown && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      marginTop: "4px",
                      backgroundColor: "#1E2833",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      zIndex: 1000,
                      overflow: "hidden",
                    }}
                  >
                    {["All", "Bank Transfer", "Mobile Money", "Crypto"].map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setSelectedAccountType(type);
                          setShowAccountTypeDropdown(false);
                        }}
                        style={{
                          width: "100%",
                          padding: "10px 16px",
                          backgroundColor: type === selectedAccountType ? "#2B3745" : "transparent",
                          border: "none",
                          color: "#FFFFFF",
                          fontSize: "14px",
                          fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ backgroundColor: "#0A1420", borderRadius: "12px", padding: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    { id: 1, bankName: "Opay", accountNumber: "1234567890", accountName: "Qamardeen Abdul Malik", selected: true },
                    { id: 2, bankName: "Opay", accountNumber: "1234567890", accountName: "Qamardeen Abdul Malik", selected: false },
                  ].map((account) => (
                    <div key={account.id}>
                      {account.selected && (
                        <div style={{ marginBottom: "0", display: "flex", flexDirection: "column", gap: "8px" }}>
                          <span style={{ fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif", fontSize: "14px", color: "#9CA3AF" }}>
                            Bank Transfer
                          </span>
                          <div
                            style={{
                              padding: "4px 12px",
                              backgroundColor: "#A9EF45",
                              borderTopLeftRadius: "6px",
                              borderTopRightRadius: "6px",
                              borderBottomLeftRadius: "0",
                              borderBottomRightRadius: "0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              alignSelf: "flex-start",
                              marginTop: "8px",
                              marginLeft: "0",
                              marginBottom: "-1px",
                              position: "relative",
                              zIndex: 1,
                            }}
                          >
                            <span style={{ fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif", fontSize: "12px", color: "#000000", fontWeight: 500, whiteSpace: "nowrap" }}>
                              Selected
                            </span>
                          </div>
                        </div>
                      )}

                      <div
                        style={{
                          backgroundColor: "#1E2833",
                          borderRadius: "12px",
                          padding: "16px",
                          border: account.selected ? "2px solid #A9EF45" : "1px solid rgba(255, 255, 255, 0.1)",
                          position: "relative",
                          borderTopLeftRadius: account.selected ? "0" : "12px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingBottom: "12px",
                            marginBottom: "12px",
                            marginLeft: "-16px",
                            marginRight: "-16px",
                            paddingLeft: "16px",
                            paddingRight: "16px",
                            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                          }}
                        >
                          <span style={{ fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif", fontSize: "12px", color: "#9CA3AF" }}>Bank Name:</span>
                          <span style={{ fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif", fontSize: "14px", color: "#FFFFFF" }}>{account.bankName}</span>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingBottom: "12px",
                            marginBottom: "12px",
                            marginLeft: "-16px",
                            marginRight: "-16px",
                            paddingLeft: "16px",
                            paddingRight: "16px",
                            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                          }}
                        >
                          <span style={{ fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif", fontSize: "12px", color: "#9CA3AF" }}>Account Number:</span>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <button
                              onClick={() => navigator.clipboard.writeText(account.accountNumber)}
                              style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: "0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "#9CA3AF" }}>
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                            </button>
                            <span style={{ fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif", fontSize: "14px", color: "#FFFFFF" }}>{account.accountNumber}</span>
                          </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif", fontSize: "12px", color: "#9CA3AF" }}>Account Name:</span>
                          <span style={{ fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif", fontSize: "14px", color: "#FFFFFF" }}>{account.accountName}</span>
                        </div>
                      </div>

                      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "12px", marginTop: "12px" }}>
                        <button
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            borderRadius: "4px",
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "#FFFFFF" }}>
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            borderRadius: "4px",
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "#FF4444" }}>
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddNewAccountModal && (
        <div
          className="fixed inset-0 z-[146] flex items-start justify-end bg-[rgba(12,29,51,0.7)] pt-[15px] pr-[15px]"
          style={{ backdropFilter: "blur(5px)", WebkitBackdropFilter: "blur(5px)" }}
          onClick={() => setShowAddNewAccountModal(false)}
        >
          <div
            className="w-full max-w-[420px] max-h-[calc(100vh-32px)] overflow-visible rounded-2xl border border-[#132635] bg-[#020B16] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-col">
              <div className="flex h-[54px] items-center justify-between border-b border-[rgba(255,255,255,0.08)] px-4">
                <h3 className="text-[13px] font-semibold text-white">Add New Account</h3>
                <div className="flex items-center gap-2">
                  <button className="inline-flex h-[22px] items-center rounded-full bg-[#A9EF45] px-3 text-[7px] text-[#0C141C]">
                    Add New
                  </button>
                  <button
                    onClick={() => setShowAddNewAccountModal(false)}
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#4A5663] text-[#D3DBE3]"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              <div className="hide-scrollbar p-4">
                <div className="rounded-xl border border-[#1D2B36] bg-[#0A1420] p-3">
                  <div className="space-y-3">
                    <div className="relative z-[250]">
                      <label className="mb-1.5 block text-[12px] text-white">Account type</label>
                      <div className="relative">
                        <button
                          onClick={() => setShowAddAccountTypeDropdown((prev) => !prev)}
                          className="flex h-[42px] w-full items-center justify-between rounded-[8px] border border-[#27353B] bg-[#1E2833] px-3 text-left text-[12px] text-[#7F8B99]"
                        >
                          <span>{selectedAddAccountType}</span>
                          <ChevronDown
                            size={14}
                            className={`text-[#BFCAD4] transition-transform ${showAddAccountTypeDropdown ? "rotate-180" : ""}`}
                          />
                        </button>

                        {showAddAccountTypeDropdown && (
                          <div className="absolute left-0 right-0 top-[46px] z-[300] overflow-hidden rounded-[10px] border border-[#27353B] bg-[#020B16] shadow-[0_12px_30px_rgba(0,0,0,0.45)]">
                            {["All", "RhinoxPay ID", "Bank Transfer", "Opay", "Palmpay", "Kuda Bank", "Access Bank", "Ec Bank"].map((type) => (
                              <button
                                key={type}
                                onClick={() => {
                                  setSelectedAddAccountType(type);
                                  setShowAddAccountTypeDropdown(false);
                                }}
                                className={`block w-full px-3 py-3 text-left text-[12px] ${
                                  selectedAddAccountType === type
                                    ? "bg-[#1E2833] text-white"
                                    : "text-[#D3DBE3] hover:bg-[#142132]"
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[12px] text-white">Bank Name</label>
                      <input
                        placeholder="Enter Account type"
                        className="h-[42px] w-full rounded-[8px] border border-[#27353B] bg-[#1E2833] px-3 text-[12px] text-white outline-none placeholder:text-[#7F8B99]"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[12px] text-white">Account Number</label>
                      <input
                        placeholder="Type account number"
                        className="h-[42px] w-full rounded-[8px] border border-[#27353B] bg-[#1E2833] px-3 text-[12px] text-white outline-none placeholder:text-[#7F8B99]"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[12px] text-white">Account Name</label>
                      <input
                        placeholder="Type account name"
                        className="h-[42px] w-full rounded-[8px] border border-[#27353B] bg-[#1E2833] px-3 text-[12px] text-white outline-none placeholder:text-[#7F8B99]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showTransactionDetailsModal && (
        <div
          className="fixed inset-0 z-[147] flex items-start justify-end bg-[rgba(12,29,51,0.7)] p-3 md:p-4"
          style={{ backdropFilter: "blur(5px)", WebkitBackdropFilter: "blur(5px)" }}
          onClick={() => setShowTransactionDetailsModal(false)}
        >
          <div
            className="h-[calc(100vh-24px)] w-full max-w-[360px] overflow-hidden rounded-2xl border border-[#132635] bg-[#020B16] shadow-2xl md:h-[calc(100vh-32px)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-full flex-col">
              <div className="flex h-[54px] items-center justify-between border-b border-[rgba(255,255,255,0.08)] px-4">
                <h3 className="text-[13px] font-semibold text-white">Transaction details</h3>
                <button
                  onClick={() => setShowTransactionDetailsModal(false)}
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#4A5663] text-[#D3DBE3]"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="hide-scrollbar flex-1 overflow-y-auto p-3">
                <div className="mb-3 flex flex-col items-center">
                  <div className="inline-flex h-[82px] w-[82px] items-center justify-center">
                    <img
                      src={
                        selectedTransactionStatus === "Awaiting Payment"
                          ? images.Seal3
                          : selectedTransactionStatus === "Completed"
                            ? images.seal
                            : images.Seal2
                      }
                      alt="Transaction status"
                      className="h-[82px] w-[82px] object-contain"
                    />
                  </div>
                  <p
                    className={`mt-3 text-[24px] ${
                      selectedTransactionStatus === "Awaiting Payment"
                        ? "text-[#FFB800]"
                        : selectedTransactionStatus === "Completed"
                          ? "text-[#0C9E2A]"
                          : "text-white"
                    }`}
                  >
                    {selectedTransactionStatus === "Awaiting Payment"
                      ? "Payment Made"
                      : selectedTransactionStatus === "Completed"
                        ? "Completed"
                        : "Order Placed"}
                  </p>
                </div>

                <div className="mb-3 overflow-hidden rounded-lg border border-[#27353B] bg-[#0F1825]">
                  <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.1)] px-3 py-2.5 text-[10px]">
                    <span className="text-[#9CA3AF]">Merchant Name</span>
                    <span className="text-[#DCE4EC]">Qamar Malik</span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2.5 text-[10px]">
                    <span className="text-[#9CA3AF]">Contact</span>
                    <button
                      onClick={() => {
                        setShowTransactionDetailsModal(false);
                        setActiveChatUsername("Qamar Malik");
                      }}
                      className="h-[28px] rounded-full bg-[#A9EF45] px-4 text-[10px] text-[#0C141C]"
                    >
                      Chat
                    </button>
                  </div>
                </div>

                <div className="overflow-hidden rounded-lg border border-[#27353B] bg-[#0F1825]">
                  {[
                    ["P2P Type", "Crypto Sell"],
                    ["Amount", "10,000 NGN"],
                    ["Price", "1,500 NGN"],
                    ["Total Qty", "5.2 USDT"],
                    ["Tx Fee", "0"],
                    ["Tx id", "128DJ2I31IDJKQKCM"],
                    ["Payment method", "Bank Transfer View Account"],
                    ["Order time", "Oct 16, 2025 - 07:22AM"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between border-b border-[rgba(255,255,255,0.1)] px-3 py-2.5 text-[10px] last:border-b-0"
                    >
                      <span className="text-[#9CA3AF]">{label}</span>
                      <span className={`${label === "Payment method" ? "text-[#DCE4EC]" : "text-[#DCE4EC]"}`}>
                        {label === "Payment method" ? (
                          <>
                            Bank Transfer <span className="text-[#A9EF45]">View Account</span>
                          </>
                        ) : (
                          value
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                {selectedTransactionStatus === "Completed" && (
                  <div className="mt-2 overflow-hidden rounded-lg border border-[#27353B] bg-[#0F1825]">
                    <div className="border-b border-[rgba(255,255,255,0.1)] px-3 py-2.5 text-[10px] text-white">
                      My Review
                    </div>
                    <div className="p-3">
                      <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#0C9E2A] bg-[#10251A] px-3 py-1 text-[8px] text-[#9AF25F]">
                        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#0C9E2A] text-[10px] text-[#07160C]">
                          👍
                        </span>
                        You gave this order a like
                      </div>
                      <div className="rounded-md bg-[#1E2833] px-3 py-2 text-[10px] text-[#DCE4EC]">
                        He is fast and reliable
                      </div>
                      <div className="mt-2 flex items-center justify-end gap-3">
                        <button className="text-[#DCE4EC]">
                          <Pencil size={14} />
                        </button>
                        <button className="text-[#FF0000]">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <SupportChatModal
        isOpen={Boolean(activeChatUsername)}
        onClose={() => setActiveChatUsername(null)}
        username={activeChatUsername ?? "Qamar Malik"}
      />
    </div>
  );
};

export default P2P;
