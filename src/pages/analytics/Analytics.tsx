import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, CircleDollarSign, FileChartColumnIncreasing, Search, Wallet } from "lucide-react";
import images from "../../constants/images";
import TimeFilterTabs from "../../components/setting/TimeFilterTabs";
import { fetchAnalyticsFraud, fetchAnalyticsGeneral } from "../../services/admin";
import { formatCurrency, formatDateTime, formatNumber } from "../../utils/adminFormatters";

const timeRanges = ["All Time", "7 Days", "1 month", "1 Year", "Custom"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const chartByMode = {
  Revenue: {
    left: [600, 230, 430, 610, 110, 470, 610, 610, 610, 600, 590, 580],
    right: [400, 520, 310, 520, 220, 390, 400, 400, 400, 390, 380, 370],
  },
  Crypto: {
    left: [540, 260, 390, 580, 130, 420, 580, 590, 600, 590, 580, 570],
    right: [380, 490, 330, 500, 220, 390, 400, 400, 390, 380, 370, 360],
  },
  Flat: {
    left: [500, 220, 340, 540, 100, 380, 530, 560, 560, 550, 540, 530],
    right: [360, 450, 300, 470, 190, 360, 370, 380, 360, 350, 340, 330],
  },
} as const;

type ChartMode = keyof typeof chartByMode;

interface FraudRow {
  id: string;
  name: string;
  amount: string;
  type: string;
  prediction: "Legitimate" | "Fraudulent";
  confidence: string;
  riskLevel: "Safe" | "High risk";
  date: string;
}

const mapFraudPrediction = (prediction: string): FraudRow["prediction"] =>
  prediction === "Suspicious" ? "Fraudulent" : "Legitimate";

const mapFraudRiskLevel = (riskLevel: string): FraudRow["riskLevel"] =>
  riskLevel === "High" ? "High risk" : "Safe";

const Analytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"General" | "Fraud Detection">("General");
  const [selectedTimeRange, setSelectedTimeRange] = useState("All Time");
  const [mode, setMode] = useState<ChartMode>("Revenue");
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [currency, setCurrency] = useState("Crypto");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [walletType, setWalletType] = useState("Crypto");
  const [showWalletTypeDropdown, setShowWalletTypeDropdown] = useState(false);
  const [fraudSearch, setFraudSearch] = useState("");
  const [selectedFraudIds, setSelectedFraudIds] = useState<Set<string>>(new Set());
  const [selectedTransactionFilter, setSelectedTransactionFilter] = useState("All Transactions");
  const [showTransactionFilterDropdown, setShowTransactionFilterDropdown] = useState(false);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("All");
  const [showTypeFilterDropdown, setShowTypeFilterDropdown] = useState(false);
  const transactionFilterRef = useRef<HTMLDivElement | null>(null);
  const typeFilterRef = useRef<HTMLDivElement | null>(null);
  const [generalData, setGeneralData] = useState<any>(null);
  const [fraudRows, setFraudRows] = useState<FraudRow[]>([]);
  const [loading, setLoading] = useState(true);

  const transactionFilterOptions = ["All Transactions", "Legitimate", "Fraudulent", "Unassigned"];
  const typeFilterOptions = ["All", "Fiat", "Crypto"];

  useEffect(() => {
    const loadGeneral = async () => {
      setLoading(true);
      try {
        const data = await fetchAnalyticsGeneral({
          range: selectedTimeRange,
          mode,
        });
        setGeneralData(data);
      } catch (error) {
        console.error("Failed to load general analytics:", error);
        setGeneralData(null);
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === "General") {
      loadGeneral();
    }
  }, [activeTab, selectedTimeRange, mode]);

  useEffect(() => {
    const loadFraud = async () => {
      setLoading(true);
      try {
        const data = await fetchAnalyticsFraud({
          range: selectedTimeRange,
          search: fraudSearch.trim() || undefined,
          limit: 100,
        });
        setFraudRows(
          (data?.items || []).map((row: any) => ({
            id: String(row.id),
            name: row.name,
            amount: formatCurrency(row.amount),
            type: row.type === "mixed" ? "Fiat" : String(row.type || "Fiat"),
            prediction: mapFraudPrediction(row.prediction),
            confidence: `${row.confidence || 0}%`,
            riskLevel: mapFraudRiskLevel(row.riskLevel),
            date: formatDateTime(row.date),
          }))
        );
      } catch (error) {
        console.error("Failed to load fraud analytics:", error);
        setFraudRows([]);
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === "Fraud Detection") {
      loadFraud();
    }
  }, [activeTab, selectedTimeRange, fraudSearch]);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (
        transactionFilterRef.current &&
        !transactionFilterRef.current.contains(event.target as Node)
      ) {
        setShowTransactionFilterDropdown(false);
      }
      if (typeFilterRef.current && !typeFilterRef.current.contains(event.target as Node)) {
        setShowTypeFilterDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  const stats = useMemo(() => {
    if (activeTab === "Fraud Detection") {
      const total = fraudRows.length;
      const legitimate = fraudRows.filter((row) => row.prediction === "Legitimate").length;
      const fraudulent = fraudRows.filter((row) => row.prediction === "Fraudulent").length;
      const unassigned = fraudRows.filter((row) => row.riskLevel === "High risk" && row.prediction === "Legitimate").length;
      const values = loading
        ? ["...", "...", "...", "..."]
        : [formatNumber(total), formatNumber(legitimate), formatNumber(fraudulent), formatNumber(unassigned)];

      return [
        { label: "Total Transactions", value: values[0], icon: FileChartColumnIncreasing },
        { label: "Legitimate Transactions", value: values[1], icon: Wallet },
        { label: "Fraudulent Revenue", value: values[2], icon: CircleDollarSign },
        { label: "Unassigned Transactions", value: values[3], icon: Wallet },
      ];
    }

    const values = loading
      ? ["...", "...", "...", "..."]
      : [
          formatNumber(generalData?.transactionCount || 0),
          formatNumber(generalData?.transactionCount || 0),
          `n${formatNumber(generalData?.revenue || 0)}`,
          `n${formatNumber((generalData?.cryptoVolume || 0) + (generalData?.fiatVolume || 0))}`,
        ];

    return [
      { label: "Total users", value: values[0], icon: Wallet },
      { label: "Total Transactions", value: values[1], icon: FileChartColumnIncreasing },
      { label: "Total Revenue", value: values[2], icon: CircleDollarSign },
      { label: "Total Balance", value: values[3], icon: Wallet },
    ];
  }, [activeTab, fraudRows, generalData, loading]);

  const pieValues = useMemo(() => {
    if (activeTab === "Fraud Detection") {
      const total = fraudRows.length || 1;
      const legit = fraudRows.filter((row) => row.prediction === "Legitimate").length;
      const fraud = fraudRows.filter((row) => row.prediction === "Fraudulent").length;
      const unassigned = Math.max(total - legit - fraud, 0);
      return {
        crypto: Math.round((legit / total) * 100),
        flat: Math.round((fraud / total) * 100),
        p2p: Math.round((unassigned / total) * 100),
      };
    }

    const crypto = Number(generalData?.cryptoVolume || 0);
    const flat = Number(generalData?.fiatVolume || 0);
    const total = crypto + flat || 1;
    return {
      crypto: Math.round((crypto / total) * 100),
      flat: Math.round((flat / total) * 100),
      p2p: Math.max(100 - Math.round((crypto / total) * 100) - Math.round((flat / total) * 100), 0),
    };
  }, [activeTab, fraudRows, generalData]);

  const factor = Math.max(Number(generalData?.transactionCount || fraudRows.length || 1) / 200, 0.5);
  const activeChart = useMemo(
    () => ({
      left: chartByMode[mode].left.map((value) => Math.round(value * factor)),
      right: chartByMode[mode].right.map((value) => Math.round(value * factor)),
    }),
    [mode, factor]
  );
  const activeFraudChart = useMemo(() => {
    const legitBase = fraudRows.filter((row) => row.prediction === "Legitimate").length * 40 || 200;
    const fraudBase = fraudRows.filter((row) => row.prediction === "Fraudulent").length * 40 || 120;
    return {
      legit: chartByMode.Revenue.left.map((value) => Math.round((value / 600) * legitBase)),
      fraud: chartByMode.Revenue.right.map((value) => Math.round((value / 400) * fraudBase)),
    };
  }, [fraudRows]);
  const maxValue = 760;
  const filteredFraudRows = useMemo(
    () =>
      fraudRows.filter((row) => {
        const matchesSearch = row.name.toLowerCase().includes(fraudSearch.toLowerCase().trim());
        const matchesType = selectedTypeFilter === "All" || row.type === selectedTypeFilter;
        const matchesTransaction =
          selectedTransactionFilter === "All Transactions" ||
          (selectedTransactionFilter === "Legitimate" && row.prediction === "Legitimate") ||
          (selectedTransactionFilter === "Fraudulent" && row.prediction === "Fraudulent") ||
          (selectedTransactionFilter === "Unassigned" && row.riskLevel === "High risk");

        return matchesSearch && matchesType && matchesTransaction;
      }),
    [fraudSearch, selectedTypeFilter, selectedTransactionFilter]
  );
  const allFraudSelected =
    filteredFraudRows.length > 0 &&
    filteredFraudRows.every((row) => selectedFraudIds.has(row.id));

  const toggleSelectAllFraud = () => {
    if (allFraudSelected) {
      setSelectedFraudIds(new Set());
      return;
    }
    setSelectedFraudIds(new Set(filteredFraudRows.map((row) => row.id)));
  };

  const toggleFraudRowSelection = (id: string) => {
    setSelectedFraudIds((prev) => {
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
          .fraud-checkbox {
            appearance: none;
            width: 13px;
            height: 13px;
            border-radius: 3px;
            border: 1px solid #9CA8B3;
            background-color: transparent;
            cursor: pointer;
          }
          .fraud-checkbox:checked {
            border-color: #A9EF45;
            background-color: #A9EF45;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 13l4 4L19 7'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 9px 9px;
          }
        `}
      </style>
      <div className="md:mx-[-32px] mx-[-16px] md:mt-[-32px] mt-[-16px] mb-3 bg-gradient-to-r from-[#0B1B20] to-[#0A1320] w-[calc(100%+64px)]">
        <div className="flex h-[36px] items-center gap-6 border-b border-b-[rgba(156,163,175,0.25)] px-4">
          {(["General", "Fraud Detection"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative h-full text-[10px] ${
                activeTab === tab ? "text-[#8CC73F]" : "text-[#7B8A96]"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#8CC73F]" />
              )}
            </button>
          ))}
        </div>
      </div>

      <section
        className="mx-[-4px] rounded-2xl p-4 md:mx-[-8px] md:p-5"
        style={{ background: "linear-gradient(90deg, #0A1920 0%, #0A1420 100%)" }}
      >
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1
              className="text-white"
              style={{
                fontFamily: "Agbalumo",
                fontWeight: 400,
                fontSize: "28px",
                lineHeight: "100%",
              }}
            >
              {activeTab === "Fraud Detection" ? "Analytics - Fraud Detection" : "Analytics"}
            </h1>
            <p className="mt-2 text-xs text-[#7B8A96]">View your platform analytics</p>
          </div>
          <TimeFilterTabs
            options={timeRanges}
            value={selectedTimeRange}
            onChange={setSelectedTimeRange}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          {stats.map((stat, statIndex) => {
            const Icon = stat.icon;
            const fraudBg = ["linear-gradient(119.08deg, #4880C0 0%, #1B589E 96.9%)", "#00A000", "#FF1010", "#0B0B0B"];
            const fraudIconBg = ["#4887CF", "#0FAE0F", "#D41414", "#262626"];
            const background = activeTab === "Fraud Detection"
              ? fraudBg[statIndex] ?? fraudBg[0]
              : "linear-gradient(119.08deg, #4880C0 0%, #1B589E 96.9%)";
            const iconBackground = activeTab === "Fraud Detection"
              ? fraudIconBg[statIndex] ?? fraudIconBg[0]
              : "#4887CF";
            return (
              <div
                key={stat.label}
                className="h-[68px] rounded-[8px] px-4 py-2"
                style={{ background }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-[33px] w-[33px] items-center justify-center rounded-full"
                    style={{ backgroundColor: iconBackground }}
                  >
                    {activeTab === "Fraud Detection" && statIndex === 0 ? (
                      <img src={images.Subtitles2} alt="Subtitles icon 2" className="h-3 w-3 object-contain" />
                    ) : activeTab === "Fraud Detection" && statIndex === 1 ? (
                      <img src={images.Subtitles} alt="Subtitles icon" className="h-3 w-3 object-contain" />
                    ) : activeTab === "Fraud Detection" && statIndex === 2 ? (
                      <img src={images.Wallet_icon} alt="Wallet icon" className="h-3 w-3 object-contain" />
                    ) : activeTab === "Fraud Detection" && statIndex === 3 ? (
                      <img src={images.Vector1} alt="Unassigned icon" className="h-3 w-3 object-contain" />
                    ) : (
                      <Icon size={12} className="text-black" />
                    )}
                  </div>
                  <div>
                    <p className="text-[9px] text-[#D7E8FB]">{stat.label}</p>
                    <p className="text-[24px] leading-none text-white">
                      {stat.value.startsWith("n") ? (
                        <>
                          <span className="text-[10px]">n</span>
                          {stat.value.slice(1)}
                        </>
                      ) : (
                        stat.value
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section
        className="mx-[-4px] rounded-2xl p-4 md:mx-[-8px] md:p-5"
        style={{ background: "linear-gradient(90deg, #0A1920 0%, #0A1420 100%)" }}
      >
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-5">
          <div
            className="rounded-[20px] border bg-[#0C1C21] p-3 md:col-span-3 flex flex-col"
            style={{
              height: "258px",
              borderWidth: "0.3px",
              borderStyle: "solid",
              borderColor: "#A9EF45",
              overflow: "hidden",
            }}
          >
            <div
              className="-mx-3 -mt-3 mb-2 flex items-center justify-between px-5"
              style={{ height: "50px", backgroundColor: "#1A252F" }}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#243746]">
                  <FileChartColumnIncreasing size={13} className="text-[#A9EF45]" />
                </span>
                <div>
                  <h3 className="text-[14px] font-semibold leading-none text-white">Analytics</h3>
                  <p className="mt-1 text-[8px] text-[#7B8A96]">View chart analytics for your data</p>
                </div>
              </div>
              {activeTab === "Fraud Detection" ? (
                <div className="flex items-center gap-4 text-[8px] text-[#C7D2DE]">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-[#00B118]" />
                    Legitimate Tx
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-[#FF1B1B]" />
                    Fraudulent Tx
                  </span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="relative">
                    <button
                      onClick={() => setShowModeDropdown((prev) => !prev)}
                      className="flex h-[34px] items-center gap-2 rounded-full border border-[#27353B] bg-[#101F26] px-5 text-[12px] text-white"
                    >
                      {mode}
                      <ChevronDown size={12} />
                    </button>
                    {showModeDropdown && (
                      <div className="absolute right-0 z-20 mt-1 w-[92px] overflow-hidden rounded-lg border border-[#27353B] bg-[#152432]">
                        {(["Revenue", "Crypto", "Flat"] as ChartMode[]).map((option) => (
                          <button
                            key={option}
                            onClick={() => {
                              setMode(option);
                              setShowModeDropdown(false);
                            }}
                            className="block w-full px-3 py-2 text-left text-[10px] text-white hover:bg-[#1B2D36]"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <span className="self-center text-[12px] text-white">|</span>

                  <div className="relative">
                    <button
                      onClick={() => setShowCurrencyDropdown((prev) => !prev)}
                      className="flex h-[34px] items-center gap-2 rounded-full border border-[#27353B] bg-[#101F26] px-5 text-[12px] text-white"
                    >
                      {currency}
                      <ChevronDown size={12} />
                    </button>
                    {showCurrencyDropdown && (
                      <div className="absolute right-0 z-20 mt-1 w-[90px] overflow-hidden rounded-lg border border-[#27353B] bg-[#152432]">
                        {["Crypto", "Flat", "P2P"].map((option) => (
                          <button
                            key={option}
                            onClick={() => {
                              setCurrency(option);
                              setShowCurrencyDropdown(false);
                            }}
                            className="block w-full px-3 py-2 text-left text-[10px] text-white hover:bg-[#1B2D36]"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button className="h-[34px] rounded-full border border-[#27353B] bg-[#101F26] px-5 text-[12px] text-white">
                    Fiat
                  </button>
                </div>
              )}
            </div>

            <div className="mt-3 flex flex-1 px-2 pb-0">
              <div className="mr-3 flex h-full flex-col items-end justify-between pb-0 text-[12px] text-[#B5C0CC]">
                <span>600</span>
                <span>400</span>
                <span>200</span>
                <span>0</span>
              </div>
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
                  <span className="block h-px w-full bg-[rgba(122,140,159,0.2)]" />
                  <span className="block h-px w-full bg-[rgba(122,140,159,0.2)]" />
                  <span className="block h-px w-full bg-[rgba(122,140,159,0.2)]" />
                  <span className="block h-px w-full bg-[rgba(122,140,159,0.2)]" />
                </div>
                <div className="h-full overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                  <div className="relative h-full w-max min-w-full">
                    <div className="absolute bottom-0 left-0 flex items-end gap-4 px-1">
                      {months.map((month, index) => (
                        <div key={month} className="flex h-full w-[41px] flex-col items-center justify-end gap-1">
                          <div className="flex flex-1 items-end gap-1">
                            <div
                              className="rounded-full"
                              style={{
                                width: "20px",
                                height: `${((activeTab === "Fraud Detection" ? activeFraudChart.legit[index] : activeChart.left[index]) / maxValue) * 128}px`,
                                background:
                                activeTab === "Fraud Detection"
                                  ? "repeating-linear-gradient(45deg, rgb(0, 177, 24), rgb(0, 177, 24) 4px, rgb(0, 142, 19) 4px, rgb(0, 142, 19) 8px)"
                                  : "repeating-linear-gradient(45deg, rgb(169, 239, 69), rgb(169, 239, 69) 4px, rgb(130, 191, 41) 4px, rgb(130, 191, 41) 8px)",
                              }}
                            />
                            <div
                              className="rounded-full"
                              style={{
                                width: "20px",
                                height: `${((activeTab === "Fraud Detection" ? activeFraudChart.fraud[index] : activeChart.right[index]) / maxValue) * 128}px`,
                                background:
                                activeTab === "Fraud Detection"
                                  ? "repeating-linear-gradient(45deg, rgb(255, 27, 27), rgb(255, 27, 27) 4px, rgb(210, 20, 20) 4px, rgb(210, 20, 20) 8px)"
                                  : "repeating-linear-gradient(45deg, rgb(81, 147, 222), rgb(81, 147, 222) 4px, rgb(58, 116, 182) 4px, rgb(58, 116, 182) 8px)",
                              }}
                            />
                          </div>
                          <span className="text-[12px] text-[#AEBBC7]">{month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="rounded-[20px] border border-[#2A4260] bg-[#122130] p-3 md:col-span-2"
            style={{ width: "469px", height: "258px", borderWidth: "0.3px", overflow: "hidden", maxWidth: "100%" }}
          >
            <div
              className="-mx-3 -mt-3 mb-3 flex items-center border-b border-[rgba(154,171,190,0.2)] px-5"
              style={{ height: "50px", backgroundColor: "#1A252F" }}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#243746]">
                <FileChartColumnIncreasing size={16} className="text-[#A9EF45]" />
              </span>
              <div className="ml-3">
                <h3 className="text-[14px] font-semibold leading-none text-white">User Data</h3>
                <p className="mt-1 text-[8px] text-[#7B8A96]">View user data</p>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between gap-4 px-2">
              <div
                className="relative mt-2 h-[140px] w-[140px] rounded-full"
                style={{
                  background:
                    activeTab === "Fraud Detection"
                      ? `conic-gradient(#00B60F 0% ${pieValues.crypto}%, #FF1E1E ${pieValues.crypto}% ${pieValues.crypto + pieValues.flat}%, #000000 ${pieValues.crypto + pieValues.flat}% 100%)`
                      : `conic-gradient(#AD3E93 0% ${pieValues.crypto}%, #4C80BE ${pieValues.crypto}% ${pieValues.crypto + pieValues.flat}%, #B59B43 ${pieValues.crypto + pieValues.flat}% 100%)`,
                }}
              >
                {activeTab === "Fraud Detection" ? (
                  <>
                    <span className="absolute left-[26px] top-[72px] text-[12px] font-normal text-white">{pieValues.crypto}%</span>
                    <span className="absolute right-[30px] top-[31px] text-[12px] font-normal text-white">{pieValues.flat}%</span>
                    <span className="absolute right-[33px] top-[90px] text-[12px] font-normal text-white">{pieValues.p2p}%</span>
                  </>
                ) : (
                  <>
                    <span className="absolute right-[31px] top-[25px] text-[12px] font-normal text-[#E7EEF7]">{pieValues.flat}%</span>
                    <span className="absolute left-[71%] top-[70%] z-10 -translate-x-1/2 -translate-y-1/2 text-[12px] font-normal text-[#F0E2AE]">
                      {pieValues.p2p}%
                    </span>
                    <span className="absolute left-[25px] top-[78px] text-[12px] font-normal text-[#F5DFF0]">{pieValues.crypto}%</span>
                  </>
                )}
              </div>

              <div className="space-y-6 text-[#D8E2EC]">
                <p
                  className="flex items-center gap-2"
                  style={{
                    fontFamily: "SF Pro",
                    fontWeight: 274,
                    fontSize: "12px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}
                >
                  <span className={`inline-block h-3 w-3 rounded-full ${activeTab === "Fraud Detection" ? "bg-[#00B118]" : "bg-[#B43E95]"}`} />
                  {activeTab === "Fraud Detection" ? "Legitimate Transaction" : "Active users in crypto"}
                </p>
                <p
                  className="flex items-center gap-2"
                  style={{
                    fontFamily: "SF Pro",
                    fontWeight: 274,
                    fontSize: "12px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}
                >
                  <span className={`inline-block h-3 w-3 rounded-full ${activeTab === "Fraud Detection" ? "bg-[#FF1B1B]" : "bg-[#4C87C9]"}`} />
                  {activeTab === "Fraud Detection" ? "Fraudulent Transaction" : "Active users in Flat"}
                </p>
                <p
                  className="flex items-center gap-2"
                  style={{
                    fontFamily: "SF Pro",
                    fontWeight: 274,
                    fontSize: "12px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}
                >
                  <span className={`inline-block h-3 w-3 rounded-full ${activeTab === "Fraud Detection" ? "bg-[#000000]" : "bg-[#CEB045]"}`} />
                  {activeTab === "Fraud Detection" ? "Unassigned Transaction" : "Active users in P2P"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {activeTab === "Fraud Detection" ? (
        <>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <button className="h-[30px] rounded-full border border-[#27353B] bg-[#101F26] px-4 text-[10px] text-white">Bulk Action</button>
            <div className="relative" ref={transactionFilterRef}>
              <button
                onClick={() => {
                  setShowTransactionFilterDropdown((prev) => !prev);
                  setShowTypeFilterDropdown(false);
                }}
                className="flex h-[30px] w-[115px] items-center justify-between rounded-full border border-[#27353B] bg-[#101F26] px-4 text-[10px] text-white"
              >
                {selectedTransactionFilter}
                <ChevronDown size={10} />
              </button>
              {showTransactionFilterDropdown && (
                <div
                  className="absolute left-0 z-20 mt-1 w-[115px] overflow-hidden rounded-[10px] border border-[#1F3040]"
                  style={{
                    backgroundColor: "rgba(10, 20, 32, 0.96)",
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.35)",
                  }}
                >
                  {transactionFilterOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedTransactionFilter(option);
                        setShowTransactionFilterDropdown(false);
                      }}
                      className="block w-full px-3 py-2 text-left text-[10px] text-white hover:bg-[#162534]"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" ref={typeFilterRef}>
              <button
                onClick={() => {
                  setShowTypeFilterDropdown((prev) => !prev);
                  setShowTransactionFilterDropdown(false);
                }}
                className="flex h-[30px] w-[68px] items-center justify-between rounded-full border border-[#27353B] bg-[#101F26] px-4 text-[10px] text-white"
              >
                {selectedTypeFilter}
                <ChevronDown size={10} />
              </button>
              {showTypeFilterDropdown && (
                <div
                  className="absolute left-0 z-20 mt-1 w-[90px] overflow-hidden rounded-[10px] border border-[#1F3040]"
                  style={{
                    backgroundColor: "rgba(10, 20, 32, 0.96)",
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.35)",
                  }}
                >
                  {typeFilterOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedTypeFilter(option);
                        setShowTypeFilterDropdown(false);
                      }}
                      className="block w-full px-3 py-2 text-left text-[10px] text-white hover:bg-[#162534]"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <section className="w-full overflow-hidden rounded-[14px]" style={{ backgroundColor: "#0B1820" }}>
            <div
              className="flex flex-col gap-3 px-4 py-3 md:h-[60px] md:flex-row md:items-center md:justify-between"
              style={{ backgroundColor: "#020B16" }}
            >
              <h3 className="text-[20px] text-white">Fraud Detection</h3>
              <div className="flex h-[30px] w-full max-w-[210px] items-center rounded-full bg-[#0F1722] px-3">
                <Search size={12} className="mr-2 text-[#7B8A96]" />
                <input
                  value={fraudSearch}
                  onChange={(event) => setFraudSearch(event.target.value)}
                  placeholder="Search"
                  className="w-full bg-transparent text-[10px] text-white outline-none placeholder:text-[#7B8A96]"
                />
              </div>
            </div>

            <div className="overflow-x-auto bg-[#0F1825]">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-[10px] text-white" style={{ backgroundColor: "#1C2530" }}>
                    <th className="px-3 py-3">
                      <input
                        type="checkbox"
                        className="fraud-checkbox"
                        checked={allFraudSelected}
                        onChange={toggleSelectAllFraud}
                      />
                    </th>
                    <th className="px-3 py-3">Name</th>
                    <th className="px-3 py-3">Amount</th>
                    <th className="px-3 py-3">Type</th>
                    <th className="px-3 py-3">Prediction</th>
                    <th className="px-3 py-3">Confidence</th>
                    <th className="px-3 py-3">Risk Level</th>
                    <th className="px-3 py-3">Date</th>
                    <th className="px-3 py-3">Other</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr className="border-b border-[#2B363E] text-[11px] text-[#CFD7DD]">
                      <td colSpan={9} className="px-3 py-6 text-center">Loading fraud data...</td>
                    </tr>
                  ) : filteredFraudRows.length === 0 ? (
                    <tr className="border-b border-[#2B363E] text-[11px] text-[#CFD7DD]">
                      <td colSpan={9} className="px-3 py-6 text-center">No fraud records found</td>
                    </tr>
                  ) : (
                    filteredFraudRows.map((row) => (
                    <tr key={row.id} className="border-b border-[#2B363E] text-[11px] text-white">
                      <td className="px-3 py-3">
                        <input
                          type="checkbox"
                          className="fraud-checkbox"
                          checked={selectedFraudIds.has(row.id)}
                          onChange={() => toggleFraudRowSelection(row.id)}
                        />
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#A9EF45] p-[2px]">
                            <img src={images.avater1} alt={row.name} className="h-full w-full rounded-full object-cover" />
                          </span>
                          {row.name}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-[#CFD7DD]">{row.amount}</td>
                      <td className="px-3 py-3 text-[#CFD7DD]">{row.type}</td>
                      <td className="px-3 py-3">
                        <span className={`rounded-full px-3 py-1 text-[9px] ${row.prediction === "Legitimate" ? "bg-[#00A000] text-white" : "bg-[#FF1010] text-white"}`}>
                          {row.prediction}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-[#CFD7DD]">{row.confidence}</td>
                      <td className="px-3 py-3">
                        <span className={`rounded-full px-3 py-1 text-[9px] ${row.riskLevel === "Safe" ? "bg-[#00A000] text-white" : "bg-[#FF1010] text-white"}`}>
                          {row.riskLevel}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-[#CFD7DD]">{row.date}</td>
                      <td className="px-3 py-3">
                        <button className="h-[28px] rounded-full bg-[#A9EF45] px-4 text-[9px] text-[#0C141C]">User Details</button>
                      </td>
                    </tr>
                  )))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : (
        <section className="rounded-2xl p-4 md:p-5" style={{ background: "linear-gradient(90deg, #0A1920 0%, #0A1420 100%)" }}>
          <div className="mb-5 flex items-center justify-between">
            <h2
              className="text-white"
              style={{
                fontFamily: "Agbalumo",
                fontWeight: 400,
                fontSize: "30px",
                lineHeight: "100%",
              }}
            >
              Wallets Liquidity distribution
            </h2>
            <div className="relative">
              <button
                onClick={() => setShowWalletTypeDropdown((prev) => !prev)}
                className="flex h-[26px] items-center gap-1 rounded-full border border-[#27353B] bg-[#101F26] px-3 text-[9px] text-white"
              >
                {walletType}
                <ChevronDown size={10} />
              </button>
              {showWalletTypeDropdown && (
                <div className="absolute right-0 z-20 mt-1 w-[90px] overflow-hidden rounded-lg border border-[#27353B] bg-[#152432]">
                  {["Crypto", "Flat", "P2P"].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setWalletType(option);
                        setShowWalletTypeDropdown(false);
                      }}
                      className="block w-full px-3 py-2 text-left text-[10px] text-white hover:bg-[#1B2D36]"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="rounded-lg bg-[#F2F4F7] px-3 py-2">
                <div className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#DCE1E7]">
                    <span className="inline-block h-3 w-3 rounded-[2px] bg-gradient-to-r from-[#00A651] via-white to-[#00A651]" />
                  </span>
                  <div>
                    <p className="text-[8px] text-[#67717A]">Nigeria (NGN)</p>
                    <p
                      className="text-[#1A2129]"
                      style={{
                        fontFamily: "SF Pro",
                        fontWeight: 510,
                        fontSize: "17px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                      }}
                    >
                      N2,500
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Analytics;
