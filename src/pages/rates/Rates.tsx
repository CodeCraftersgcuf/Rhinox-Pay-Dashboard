import React, { useState, useRef, useEffect } from "react";
import images from "../../constants/images";

interface ExchangeRate {
  id: string;
  mainCurrency: string;
  otherCurrency: string;
  marketRate: string;
  rhinoxRate: string;
  percentage: string;
  isIncrease: boolean;
}

const Rates: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Rates" | "Fees">("Rates");
  const [selectedTimeRange, setSelectedTimeRange] = useState("All Time");
  const [searchQuery, setSearchQuery] = useState("");
  const [showBulkActionDropdown, setShowBulkActionDropdown] = useState(false);
  const [showMainCurrencyDropdown, setShowMainCurrencyDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFromCurrencyDropdown, setShowFromCurrencyDropdown] = useState(false);
  const [showToCurrencyDropdown, setShowToCurrencyDropdown] = useState(false);
  const [showSetRateModal, setShowSetRateModal] = useState(false);
  const [showSetFeesModal, setShowSetFeesModal] = useState(false);
  const [showRateDirectionDropdown, setShowRateDirectionDropdown] = useState(false);
  const [showModalCurrencyDropdown, setShowModalCurrencyDropdown] = useState(false);
  const [showFeeServiceDropdown, setShowFeeServiceDropdown] = useState(false);
  const [showFeeBulkDropdown, setShowFeeBulkDropdown] = useState(false);
  const [selectedRateDirection, setSelectedRateDirection] = useState("Select Increase or Decrease");
  const [selectedModalCurrency, setSelectedModalCurrency] = useState("Nigeria");
  const [selectedFeeCategory, setSelectedFeeCategory] = useState<"Fiat" | "Crypto">("Fiat");
  const [selectedFeeServiceType, setSelectedFeeServiceType] = useState("All");
  const [selectedFeeSubType, setSelectedFeeSubType] = useState("All");
  const [feeSearch, setFeeSearch] = useState("");
  const [ratePercentage, setRatePercentage] = useState("");
  const [selectedMainCurrency, setSelectedMainCurrency] = useState("Nigeria (NGN)");
  const [selectedFromCurrency, setSelectedFromCurrency] = useState("Nigeria");
  const [selectedToCurrency, setSelectedToCurrency] = useState("Ghana");
  const [selectedRates, setSelectedRates] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const bulkActionDropdownRef = useRef<HTMLDivElement>(null);
  const mainCurrencyDropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const fromCurrencyDropdownRef = useRef<HTMLDivElement>(null);
  const toCurrencyDropdownRef = useRef<HTMLDivElement>(null);
  const rateDirectionDropdownRef = useRef<HTMLDivElement>(null);
  const modalCurrencyDropdownRef = useRef<HTMLDivElement>(null);
  const feeServiceDropdownRef = useRef<HTMLDivElement>(null);
  const feeBulkDropdownRef = useRef<HTMLDivElement>(null);

  const timeRanges = ["All Time", "7 Days", "1 Month", "1 Year", "Custom"];

  const currencies = [
    { name: "Nigeria", code: "NGN", symbol: "N", flag: images.flag, balance: "N200,000" },
    { name: "Botswana", code: "BWP", symbol: "P", flag: images.flag2, balance: "P200,000" },
    { name: "Ghana", code: "GHC", symbol: "c", flag: images.flag3, balance: "c200,000" },
    { name: "Kenya", code: "KES", symbol: "Ksh", flag: images.flag4, balance: "Ksh200,000" },
    { name: "South Africa", code: "ZAR", symbol: "R", flag: images.flag5, balance: "R200,000" },
    { name: "Tanzania", code: "TZS", symbol: "Tsh", flag: images.flag6, balance: "Tsh200,000" },
    { name: "Uganda", code: "UGX", symbol: "Ush", flag: images.flag7, balance: "Ush200,000" },
  ];

  const exchangeRates: ExchangeRate[] = [
    {
      id: "1",
      mainCurrency: "Nigeria (NGN)",
      otherCurrency: "Ghana (GHC)",
      marketRate: "N1 = c0.0073",
      rhinoxRate: "N1 = c0.0093",
      percentage: "5% increase",
      isIncrease: true,
    },
    {
      id: "2",
      mainCurrency: "Nigeria (NGN)",
      otherCurrency: "South Africa (ZAR)",
      marketRate: "N1 = R0.023",
      rhinoxRate: "N1 = R0.023",
      percentage: "5% increase",
      isIncrease: true,
    },
    {
      id: "3",
      mainCurrency: "Nigeria (NGN)",
      otherCurrency: "Kenya (KSH)",
      marketRate: "N1 = Ksh20.22",
      rhinoxRate: "N1 = Ksh20.22",
      percentage: "5% decrease",
      isIncrease: false,
    },
    {
      id: "4",
      mainCurrency: "Nigeria (NGN)",
      otherCurrency: "Botswana (BWP)",
      marketRate: "N1 = P2,000",
      rhinoxRate: "N1 = P2,000",
      percentage: "5% increase",
      isIncrease: true,
    },
    {
      id: "5",
      mainCurrency: "Nigeria (NGN)",
      otherCurrency: "Uganda (UGX)",
      marketRate: "N1 = Ush2.234",
      rhinoxRate: "N1 = Ush2.234",
      percentage: "5% increase",
      isIncrease: true,
    },
    {
      id: "6",
      mainCurrency: "Nigeria (NGN)",
      otherCurrency: "Tanzania (TZS)",
      marketRate: "N1 = Tsh1,500",
      rhinoxRate: "N1 = Tsh1,575",
      percentage: "5% increase",
      isIncrease: true,
    },
  ];

  const feeRows = [
    { id: "f1", category: "Fiat", serviceType: "Fiat - Send", subType: "Bank Transfer", fixedCommission: "-", commission: "10%" },
    { id: "f2", category: "Fiat", serviceType: "Fiat - Fund", subType: "Crypto", fixedCommission: "-", commission: "10%" },
    { id: "f3", category: "Fiat", serviceType: "Fiat - Convert", subType: "Bank Transfer", fixedCommission: "-", commission: "10%" },
    { id: "f4", category: "Crypto", serviceType: "Crypto - Send", subType: "Wallet Address", fixedCommission: "-", commission: "10%" },
    { id: "f5", category: "Crypto", serviceType: "Crypto - Receive", subType: "Rhinox ID", fixedCommission: "$2", commission: "10%" },
  ];

  const fiatServiceTypeSubTypeMap: Record<string, string[]> = {
    Send: ["Bank Transfer", "Rhinox Pay ID", "Mobile Money"],
    Fund: ["Bank Transfer", "Crypto", "Conversion", "Mobile Money"],
    Convert: ["Bank Transfer", "Conversion", "Mobile Money"],
    Withdrawal: ["Bank Transfer", "Mobile Money"],
    "Bill Payments": ["Airtime", "Data Recharge", "Electricity", "Cable TV", "Betting"],
  };

  const filteredRates = exchangeRates.filter((rate) =>
    rate.mainCurrency.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rate.otherCurrency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRates.length / itemsPerPage);
  const displayedRates = filteredRates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fromCurrency = currencies.find((c) => c.name === selectedFromCurrency);
  const toCurrency = currencies.find((c) => c.name === selectedToCurrency);
  const modalCurrency = currencies.find((c) => c.name === selectedModalCurrency);
  const isCryptoFees = selectedFeeCategory === "Crypto";
  const feeServiceTypeOptions = isCryptoFees
    ? ["Send", "Receive", "P2P"]
    : ["Send", "Fund", "Convert", "Withdrawal", "Bill Payments"];
  const getServiceSubTypeOptions = (serviceType: string) => {
    if (isCryptoFees) {
      if (serviceType === "P2P") return ["Buy", "Sell"];
      return ["Wallet Address", "Rhinox Pay ID"];
    }
    return fiatServiceTypeSubTypeMap[serviceType] || [];
  };
  const currentSubTypeOptions = getServiceSubTypeOptions(selectedFeeServiceType);

  const filteredFeeRows = feeRows.filter((row) => {
    const byCategory = row.category === selectedFeeCategory;
    const byService =
      selectedFeeServiceType === "All" ||
      row.serviceType.toLowerCase().includes(selectedFeeServiceType.toLowerCase());
    const normalizedSubType =
      selectedFeeSubType === "Rhinox Pay ID"
        ? "rhinox id"
        : selectedFeeSubType.toLowerCase();
    const bySubType =
      selectedFeeSubType === "All" ||
      row.subType.toLowerCase().includes(normalizedSubType);
    const bySearch =
      feeSearch.trim() === "" ||
      row.category.toLowerCase().includes(feeSearch.toLowerCase()) ||
      row.serviceType.toLowerCase().includes(feeSearch.toLowerCase()) ||
      row.subType.toLowerCase().includes(feeSearch.toLowerCase());
    return byCategory && byService && bySubType && bySearch;
  });

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        bulkActionDropdownRef.current &&
        !bulkActionDropdownRef.current.contains(event.target as Node)
      ) {
        setShowBulkActionDropdown(false);
      }
      if (
        mainCurrencyDropdownRef.current &&
        !mainCurrencyDropdownRef.current.contains(event.target as Node)
      ) {
        setShowMainCurrencyDropdown(false);
      }
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setShowSortDropdown(false);
      }
      if (
        fromCurrencyDropdownRef.current &&
        !fromCurrencyDropdownRef.current.contains(event.target as Node)
      ) {
        setShowFromCurrencyDropdown(false);
      }
      if (
        toCurrencyDropdownRef.current &&
        !toCurrencyDropdownRef.current.contains(event.target as Node)
      ) {
        setShowToCurrencyDropdown(false);
      }
      if (
        rateDirectionDropdownRef.current &&
        !rateDirectionDropdownRef.current.contains(event.target as Node)
      ) {
        setShowRateDirectionDropdown(false);
      }
      if (
        modalCurrencyDropdownRef.current &&
        !modalCurrencyDropdownRef.current.contains(event.target as Node)
      ) {
        setShowModalCurrencyDropdown(false);
      }
      if (
        feeServiceDropdownRef.current &&
        !feeServiceDropdownRef.current.contains(event.target as Node)
      ) {
        setShowFeeServiceDropdown(false);
      }
      if (
        feeBulkDropdownRef.current &&
        !feeBulkDropdownRef.current.contains(event.target as Node)
      ) {
        setShowFeeBulkDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectAll = () => {
    if (selectedRates.size === displayedRates.length) {
      setSelectedRates(new Set());
    } else {
      setSelectedRates(new Set(displayedRates.map((r) => r.id)));
    }
  };

  const handleSelectRate = (id: string) => {
    setSelectedRates((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div>
      {/* Top Navigation Bar */}
      <div className="md:mx-[-32px] mx-[-16px] md:mt-[-32px] mt-[-16px] mb-6 md:mb-6 bg-gradient-to-r from-[#0B1B20] to-[#0A1320] w-[calc(100%+64px)]">
        <div className="flex gap-2 md:gap-6 border-b border-gray-700 flex-wrap md:flex-nowrap overflow-x-hidden w-full h-[50px] pl-4 pr-0 items-center box-border border-b-[0.3px] border-b-solid border-b-[rgba(156,163,175,0.5)] relative">
          <button
            onClick={() => setActiveTab("Rates")}
            className={`relative h-full flex items-center ml-4 p-0 cursor-pointer ${
              activeTab === "Rates" ? "text-[#77AD3A] font-semibold" : "text-[#9CA3AF] font-normal"
            }`}
          >
            Rates
            {activeTab === "Rates" && (
              <span className="absolute bottom-[-0.3px] left-0 right-0 h-0.5 bg-[#77AD3A]"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("Fees")}
            className={`relative h-full flex items-center ml-4 p-0 cursor-pointer ${
              activeTab === "Fees" ? "text-[#77AD3A] font-semibold" : "text-[#9CA3AF] font-normal"
            }`}
          >
            Fees
            {activeTab === "Fees" && (
              <span className="absolute bottom-[-0.3px] left-0 right-0 h-0.5 bg-[#77AD3A]"></span>
            )}
          </button>
        </div>
      </div>

      {activeTab === "Fees" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <div
                className="inline-flex h-[34px] items-center rounded-[100px] border bg-[#101F26] p-[2px]"
                style={{ borderWidth: "0.3px", borderColor: "#27353B" }}
              >
                <button
                  onClick={() => {
                    setSelectedFeeCategory("Fiat");
                    setSelectedFeeServiceType("Send");
                    setSelectedFeeSubType("Bank Transfer");
                  }}
                  className={`h-[30px] rounded-full px-4 text-[11px] ${
                    selectedFeeCategory === "Fiat"
                      ? "bg-[#A9EF45] text-[#0C141C]"
                      : "bg-transparent text-[#B8C4D0]"
                  }`}
                >
                  Fiat
                </button>
                <button
                  onClick={() => {
                    setSelectedFeeCategory("Crypto");
                    setSelectedFeeServiceType("Send");
                    setSelectedFeeSubType("Wallet Address");
                  }}
                  className={`h-[30px] rounded-full px-4 text-[11px] ${
                    selectedFeeCategory === "Crypto"
                      ? "bg-[#A9EF45] text-[#0C141C]"
                      : "bg-transparent text-[#B8C4D0]"
                  }`}
                >
                  Crypto
                </button>
              </div>
              <div ref={feeServiceDropdownRef} className="relative">
                <button
                  onClick={() =>
                    setShowFeeServiceDropdown((prev) => {
                      const nextOpen = !prev;
                      if (nextOpen) {
                        setSelectedFeeServiceType("Send");
                        setSelectedFeeSubType(selectedFeeCategory === "Crypto" ? "Wallet Address" : "Bank Transfer");
                      }
                      return nextOpen;
                    })
                  }
                  className="inline-flex h-[34px] min-w-[97px] items-center justify-center gap-1.5 rounded-[100px] border bg-[#101F26] px-3 text-[11px] text-[#DCE6F0]"
                  style={{ borderWidth: "0.3px", borderColor: "#27353B" }}
                >
                  Service
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                {showFeeServiceDropdown && (
                  <div
                    className="absolute top-[32px] z-[160] overflow-visible border border-[#132635] bg-[#020B16] shadow-[0_18px_36px_rgba(0,0,0,0.55)]"
                    style={{
                      left: isCryptoFees ? "-125px" : "-125px",
                      width: isCryptoFees ? "300px" : "521px",
                      minHeight: isCryptoFees ? "257px" : "326px",
                      height: "auto",
                      borderRadius: "15px",
                      opacity: 1
                    }}
                  >
                    <div
                      className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] px-5"
                      style={{ width: isCryptoFees ? "300px" : "521px", height: "53px", borderBottomWidth: "0.3px", opacity: 1 }}
                    >
                      <p className="font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-[16px] font-normal leading-none text-white">Filter</p>
                      <button
                        onClick={() => setShowFeeServiceDropdown(false)}
                        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#1D2B38]"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-4 p-5" style={{ height: "auto" }}>
                      <div>
                        <p className="mb-3 font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-[14px] font-[274] leading-none text-[#96A4B2]">
                          Service Type
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {feeServiceTypeOptions.map((type) => (
                            <button
                              key={type}
                              onClick={() => {
                                setSelectedFeeServiceType(type);
                                const nextOptions = getServiceSubTypeOptions(type);
                                setSelectedFeeSubType(nextOptions[0] || "All");
                              }}
                              className={`h-[34px] rounded-[100px] text-[10px] font-normal leading-none ${
                                selectedFeeServiceType === type
                                  ? "bg-white text-[#1A2735]"
                                  : "border border-[#27353B] bg-[#101F26] text-[#DDE7F1]"
                              }`}
                              style={{
                                width: !isCryptoFees && type === "Convert" ? "82px" : undefined,
                                borderWidth: selectedFeeServiceType === type ? undefined : "0.3px",
                                paddingTop: "11px",
                                paddingRight: "22px",
                                paddingBottom: "11px",
                                paddingLeft: "22px",
                                gap: "10px",
                                opacity: 1,
                                fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                                lineHeight: "100%",
                                letterSpacing: "0%",
                              }}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {(isCryptoFees || selectedFeeServiceType !== "Convert") && (
                        <div
                          className="border bg-[#0E1A2A] flex flex-col justify-start"
                          style={{
                            width: isCryptoFees ? "260px" : "475px",
                            minHeight: isCryptoFees ? "62px" : "102px",
                            height: "auto",
                            borderRadius: "10px",
                            opacity: 1,
                            gap: "10px",
                            borderWidth: "0.3px",
                            borderColor: "#1F3041",
                            paddingTop: "16px",
                            paddingRight: "14px",
                            paddingBottom: "16px",
                            paddingLeft: "14px",
                          }}
                        >
                          {currentSubTypeOptions.map((subType) => (
                            <button
                              key={subType}
                              onClick={() => setSelectedFeeSubType(subType)}
                              className="flex w-full items-center justify-between py-0.5 text-left"
                            >
                              <span className="font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-[12px] font-[274] leading-none text-[#DDE7F1]">
                                {subType}
                              </span>
                              <span
                                className={`inline-flex h-[13px] w-[13px] items-center justify-center rounded-full border ${
                                  selectedFeeSubType === subType
                                    ? "border-[#A9EF45] bg-transparent"
                                    : "border-[#7D8A97] bg-transparent"
                                }`}
                              >
                                {selectedFeeSubType === subType && (
                                  <span className="h-[5px] w-[5px] rounded-full bg-[#A9EF45]" />
                                )}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}

                      <button
                        onClick={() => setShowFeeServiceDropdown(false)}
                        className="inline-flex items-center justify-center rounded-[100px] bg-[#A9EF45] text-[#0C141C]"
                        style={{
                          width: "91px",
                          height: "31px",
                          opacity: 1,
                          fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                          fontWeight: 274,
                          fontSize: "10px",
                          lineHeight: "100%",
                          letterSpacing: "0%",
                        }}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div ref={feeBulkDropdownRef} className="relative">
                <button
                  onClick={() => setShowFeeBulkDropdown((prev) => !prev)}
                  className="inline-flex h-[34px] w-[97px] items-center justify-center gap-1.5 rounded-[100px] border bg-[#101F26] px-3 text-[11px] text-[#DCE6F0]"
                  style={{ borderWidth: "0.3px", borderColor: "#27353B" }}
                >
                  Bulk Action
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                {showFeeBulkDropdown && (
                  <div className="absolute left-0 top-[30px] z-[120] w-[128px] overflow-hidden rounded-lg border border-[#27353B] bg-[#0F1825]">
                    {["Delete", "Export", "Mark Active"].map((option) => (
                      <button key={option} className="block w-full px-3 py-2 text-left text-[10px] text-white hover:bg-[#1B2D36]">
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setShowSetFeesModal(true)}
              className="inline-flex h-[34px] min-w-[87px] items-center justify-center self-start rounded-[100px] bg-[#A9EF45] px-3 text-[10px] font-medium text-[#0C141C]"
            >
              Set Rate
            </button>
          </div>

          <div style={{ width: '100%' }}>
            <div
              className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 pb-4 gap-4"
              style={{
                backgroundColor: '#020B16',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px'
              }}
            >
              <h2
                style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 274,
                  fontStyle: 'normal',
                  fontSize: '20px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  color: '#FFFFFF'
                }}
              >
                Fees
              </h2>
              <div className="relative w-full max-w-[240px]">
                <input
                  value={feeSearch}
                  onChange={(e) => setFeeSearch(e.target.value)}
                  placeholder="Search"
                  className="h-[30px] w-full rounded-full border border-[#24313A] bg-[#0F1825] pl-9 pr-3 text-[10px] text-white placeholder:text-[#6D7883] outline-none"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D7883]"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
            </div>

            <div style={{ backgroundColor: '#1C2530', width: '100%' }}>
              <table className="w-full" style={{ height: '60px', width: '100%', tableLayout: 'auto' }}>
                <colgroup>
                  <col style={{ width: '5%' }} />
                  <col style={{ width: '19%' }} />
                  <col style={{ width: '21%' }} />
                  <col style={{ width: '18%' }} />
                  <col style={{ width: '16%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '9%' }} />
                </colgroup>
                <thead>
                  <tr style={{ height: '100%', width: '100%' }}>
                    <th className="text-left py-3" style={{ verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '24px', paddingRight: '12px' }}>
                      <input type="checkbox" className="h-3.5 w-3.5 accent-[#A9EF45]" />
                    </th>
                    <th className="text-left py-3 text-white" style={{ fontSize: '12px', fontWeight: 400, verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '24px', paddingRight: '24px' }}>
                      Service Category
                    </th>
                    <th className="text-left py-3 text-white" style={{ fontSize: '12px', fontWeight: 400, verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '24px', paddingRight: '24px' }}>
                      Service Type
                    </th>
                    <th className="text-left py-3 text-white" style={{ fontSize: '12px', fontWeight: 400, verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '24px', paddingRight: '24px' }}>
                      Sub Type
                    </th>
                    <th className="text-left py-3 text-white whitespace-nowrap" style={{ fontSize: '12px', fontWeight: 400, verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '24px', paddingRight: '24px', whiteSpace: 'nowrap' }}>
                      Fixed Commision
                    </th>
                    <th className="text-left py-3 text-white whitespace-nowrap" style={{ fontSize: '12px', fontWeight: 400, verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '24px', paddingRight: '24px', whiteSpace: 'nowrap' }}>
                      % Commission
                    </th>
                    <th className="text-left py-3 text-white" style={{ fontSize: '12px', fontWeight: 400, verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '24px', paddingRight: '24px' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
              </table>
            </div>

            <div style={{ backgroundColor: '#0F1825', width: '100%' }}>
              <table className="w-full" style={{ width: '100%', tableLayout: 'auto' }}>
                <colgroup>
                  <col style={{ width: '5%' }} />
                  <col style={{ width: '19%' }} />
                  <col style={{ width: '21%' }} />
                  <col style={{ width: '18%' }} />
                  <col style={{ width: '16%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '9%' }} />
                </colgroup>
                <tbody>
                  {filteredFeeRows.map((row) => (
                    <tr key={row.id} className="border-b border-[#2B363E] hover:bg-[#1A252F] transition-colors">
                      <td className="py-3" style={{ verticalAlign: 'middle', paddingLeft: '24px', paddingRight: '12px' }}>
                        <input type="checkbox" className="h-3.5 w-3.5 accent-[#A9EF45]" />
                      </td>
                      <td className="py-3 text-white" style={{ fontSize: '12px', fontWeight: 400, paddingLeft: '24px', paddingRight: '24px', verticalAlign: 'middle' }}>{row.category}</td>
                      <td className="py-3 text-white" style={{ fontSize: '12px', fontWeight: 400, paddingLeft: '24px', paddingRight: '24px', verticalAlign: 'middle' }}>{row.serviceType}</td>
                      <td className="py-3 text-white" style={{ fontSize: '12px', fontWeight: 400, paddingLeft: '24px', paddingRight: '24px', verticalAlign: 'middle' }}>{row.subType}</td>
                      <td className="py-3 text-white" style={{ fontSize: '12px', fontWeight: 400, paddingLeft: '24px', paddingRight: '24px', verticalAlign: 'middle' }}>{row.fixedCommission}</td>
                      <td className="py-3 text-white" style={{ fontSize: '12px', fontWeight: 400, paddingLeft: '24px', paddingRight: '24px', verticalAlign: 'middle' }}>{row.commission}</td>
                      <td className="py-3" style={{ paddingLeft: '24px', paddingRight: '24px', verticalAlign: 'middle' }}>
                        <button className="rounded-full px-4 py-1.5 text-black text-xs font-medium whitespace-nowrap cursor-pointer transition-opacity hover:opacity-90 bg-[#A9EF45]">
                          Edit %
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center p-6 pt-4 gap-4" style={{ backgroundColor: '#0B1820', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
              <div className="text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '14px', fontWeight: 400 }}>
                Showing 1-5 of 200 Users
              </div>
              <div className="flex items-center gap-2 text-white">
                <button className="h-8 w-8 rounded-lg bg-[#1C2630]">&lt;</button>
                <button className="h-8 w-8 rounded-lg bg-[#1C2630]">1</button>
                <button className="opacity-70">2</button>
                <span className="px-1 opacity-70">...</span>
                <button className="opacity-70">10</button>
                <button className="opacity-70">11</button>
                <button className="h-8 w-8 rounded-lg bg-[#1C2630]">&gt;</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Rates" && (
      <>
      {/* Title and Cards Container */}
      <div className="bg-[#0B1B20] rounded-lg p-6 mb-6">
        {/* Title Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div>
            <h1 className="font-['Agbalumo'] font-normal text-[30px] leading-[100%] tracking-[0%] text-white mb-2">
              Rates Management
            </h1>
            <p className="font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] font-normal text-sm leading-[100%] tracking-[0%] text-[#757E81]">
              View and manage user wallet details
            </p>
          </div>
          <div className="flex flex-col mt-4 md:mt-0">
            <div className="flex gap-[10px] mb-[15px] mt-2 flex-wrap md:flex-nowrap">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedTimeRange(range)}
                  className={`transition-colors whitespace-nowrap min-w-[68px] h-[34px] rounded-full flex items-center justify-center px-[18px] py-[11px] font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] font-[274] text-[13px] leading-[100%] tracking-[0%] ${
                    selectedTimeRange === range
                      ? "bg-white text-gray-900 border-0"
                      : "bg-transparent text-white border-[0.3px] border-solid border-[#383F49]"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <div className="w-full h-[0.3px] bg-[rgba(156,163,175,0.5)]"></div>
          </div>
        </div>

        {/* Main Cards Section */}
        <div className="flex min-w-0 flex-col gap-6 mt-6 lg:flex-row">
           {/* Currency Conversion Card */}
           <div className="relative h-[265px] w-full min-w-0 flex-1 rounded-[20px]" style={{ background: 'linear-gradient(119.08deg, #4880C0 0%, #1B589E 96.9%)', overflow: 'visible' }}>
             {/* Top Section - Conversion Rate (Blue) */}
             <div className="flex items-center justify-between px-6 pt-6 pb-8">
               <div className="flex items-baseline">
                 <span className="font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-2xl font-normal text-white align-sub" style={{ verticalAlign: 'sub' }}>
                   {fromCurrency?.symbol || 'N'}
                 </span>
                 <span className="font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-5xl font-semibold text-white">
                   1
                 </span>
               </div>

               <div className="flex items-center justify-center">
                 <span className="font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-5xl font-normal text-white">
                   ≈
                 </span>
               </div>

               <div className="flex items-baseline">
                 <span className="font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-2xl font-normal text-white align-sub" style={{ verticalAlign: 'sub' }}>
                   {toCurrency?.symbol || 'c'}
                 </span>
                 <span className="font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-5xl font-semibold text-white">
                   0.0073
                 </span>
               </div>
             </div>

             {/* Bottom Section - Currency Selection (White) */}
             <div className="bg-white px-6 pb-6 pt-4 relative h-[110px] mt-13 rounded-b-[20px]" style={{ overflow: 'visible' }}>
               {/* Circular Flag Buttons - Overlapping */}
               <div className="flex items-center justify-between -mt-12 mb-4 px-12">
                 <div className="w-16 h-16 rounded-full bg-white border-2 border-white shadow-lg flex items-center justify-center relative z-10">
                   <div className="w-12 h-12 rounded-full overflow-hidden">
                     <img src={fromCurrency?.flag} alt={selectedFromCurrency} className="w-full h-full object-cover" />
                   </div>
                 </div>
                 <div className="w-16 h-16 rounded-full bg-white border-2 border-white shadow-lg flex items-center justify-center relative z-10">
                   <div className="w-12 h-12 rounded-full overflow-hidden">
                     <img src={toCurrency?.flag} alt={selectedToCurrency} className="w-full h-full object-cover" />
                   </div>
                 </div>
               </div>

               {/* Currency Selection Dropdowns Row */}
               <div className="flex items-center justify-between px-10">
                 <div ref={fromCurrencyDropdownRef} className="relative z-50">
                   <button
                     onClick={(e) => {
                       e.stopPropagation();
                       setShowFromCurrencyDropdown(!showFromCurrencyDropdown);
                       setShowToCurrencyDropdown(false);
                     }}
                     className="w-[131px] h-[50px] flex items-center gap-2 rounded-full px-4 cursor-pointer font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-sm font-normal text-black"
                     style={{ background: '#00000026' }}
                   >
                     <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                       <img src={fromCurrency?.flag} alt={selectedFromCurrency} className="w-full h-full object-cover" />
                     </div>
                     <span>{selectedFromCurrency}</span>
                     <svg
                       width="12"
                       height="12"
                       viewBox="0 0 24 24"
                       fill="none"
                       stroke="currentColor"
                       strokeWidth="2"
                       className={`ml-auto transition-transform ${showFromCurrencyDropdown ? 'rotate-180' : ''}`}
                     >
                       <polyline points="6 9 12 15 18 9"></polyline>
                     </svg>
                   </button>
                   {showFromCurrencyDropdown && (
                     <div className="absolute top-full left-0 mt-2 w-[290px] rounded-2xl border border-[#10283B] bg-[#020B16] p-2 z-[120] shadow-[0_14px_30px_rgba(0,0,0,0.45)]">
                       {currencies.map((currency) => (
                         <button
                           key={currency.name}
                           onClick={(e) => {
                             e.stopPropagation();
                             setSelectedFromCurrency(currency.name);
                             setShowFromCurrencyDropdown(false);
                           }}
                           className="w-full flex items-center justify-between gap-2 rounded-xl px-2.5 py-2 text-left text-white hover:bg-[#0B1B2D] transition-colors"
                         >
                           <div className="flex items-center gap-2.5">
                             <div className="w-5 h-5 rounded-sm overflow-hidden flex-shrink-0">
                               <img src={currency.flag} alt={currency.name} className="w-full h-full object-cover" />
                             </div>
                             <div className="min-w-0">
                               <p className="font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-[12px] leading-[100%] text-[#E5EDF6]">
                                 {currency.name} ({currency.code})
                               </p>
                               <p className="mt-1 font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-[9px] leading-[100%] text-[#7B8A99]">
                                 Bal : {currency.balance}
                               </p>
                             </div>
                           </div>
                           <span
                             className={`h-[12px] w-[12px] rounded-full border ${
                               selectedFromCurrency === currency.name
                                 ? "border-[#A9EF45] bg-[#A9EF45]"
                                 : "border-[#667481] bg-transparent"
                             }`}
                           />
                         </button>
                       ))}
                     </div>
                   )}
                 </div>

                 <div ref={toCurrencyDropdownRef} className="relative z-50">
                   <button
                     onClick={(e) => {
                       e.stopPropagation();
                       setShowToCurrencyDropdown(!showToCurrencyDropdown);
                       setShowFromCurrencyDropdown(false);
                     }}
                     className="w-[131px] h-[50px] flex items-center gap-2 rounded-full px-4 cursor-pointer font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-sm font-normal text-black"
                     style={{ background: '#00000026' }}
                   >
                     <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                       <img src={toCurrency?.flag} alt={selectedToCurrency} className="w-full h-full object-cover" />
                     </div>
                     <span>{selectedToCurrency}</span>
                     <svg
                       width="12"
                       height="12"
                       viewBox="0 0 24 24"
                       fill="none"
                       stroke="currentColor"
                       strokeWidth="2"
                       className={`ml-auto transition-transform ${showToCurrencyDropdown ? 'rotate-180' : ''}`}
                     >
                       <polyline points="6 9 12 15 18 9"></polyline>
                     </svg>
                   </button>
                   {showToCurrencyDropdown && (
                     <div className="absolute top-full left-0 mt-2 w-[131px] bg-[#0F1825] border border-[#214369] rounded-lg overflow-hidden z-[100] shadow-lg">
                       {currencies.map((currency) => (
                         <button
                           key={currency.name}
                           onClick={(e) => {
                             e.stopPropagation();
                             setSelectedToCurrency(currency.name);
                             setShowToCurrencyDropdown(false);
                           }}
                           className="w-full flex items-center gap-2 px-4 py-3 text-left text-white font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-sm hover:bg-[#1C2530] transition-colors"
                         >
                           <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                             <img src={currency.flag} alt={currency.name} className="w-full h-full object-cover" />
                           </div>
                           <span>{currency.name}</span>
                         </button>
                       ))}
                     </div>
                   )}
                 </div>
               </div>
             </div>
           </div>

           {/* Flat Rate Card */}
          <div className="h-[265px] w-full min-w-0 overflow-hidden rounded-[20px] p-6 flex flex-col justify-between lg:w-[32%]" style={{ background: 'linear-gradient(180deg, #A9EF45 0%, #0BAE3C 100%)' }}>
             <div className="flex-1 flex flex-col items-center justify-center">
               <div className="flex items-center justify-center mb-4">
                 <div className="w-12 h-12 rounded-full bg-[#75BF22] flex items-center justify-center">
                   <img src={images.ArrowsCounterClockwise} alt="Refresh" className="w-6 h-6" />
                 </div>
               </div>
               <h3 className="font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-xl font-semibold text-black mb-2 text-center">
                 Flat Rate
               </h3>
               <p className="font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-xs font-normal text-black mb-4 text-center">
                 This is the rate set for all fiat conversion
               </p>
               <div className="font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-6xl pb-2 font-semibold text-black leading-none text-center">
                 5%
               </div>
             </div>
             <div className="flex justify-center mt-auto">
              <button
                onClick={() => setShowSetRateModal(true)}
                className="bg-white rounded-full w-[89px] h-[34px] flex items-center justify-center font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-sm font-medium text-[#2D5016] cursor-pointer transition-opacity hover:opacity-90"
              >
                 Settings
               </button>
             </div>
           </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div ref={bulkActionDropdownRef} className="relative">
          <button
            onClick={() => setShowBulkActionDropdown(!showBulkActionDropdown)}
            className="bg-[#0F1825] border border-[#404951] rounded-full px-4 py-2.5 text-white font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-sm cursor-pointer flex items-center gap-2"
          >
            Bulk Action
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>

        <div ref={mainCurrencyDropdownRef} className="relative">
          <button
            onClick={() => setShowMainCurrencyDropdown(!showMainCurrencyDropdown)}
            className="bg-[#0F1825] border border-[#404951] rounded-full px-4 py-2.5 text-white font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-sm cursor-pointer flex items-center gap-2"
          >
            Main Currency
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>

        <div ref={sortDropdownRef} className="relative">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="bg-[#0F1825] border border-[#404951] rounded-full px-4 py-2.5 text-white font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-sm cursor-pointer flex items-center gap-2"
          >
            Sort
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {/* Exchange Rates Table */}
      <div style={{ width: '100%' }}>
        {/* Table Title Header */}
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 pb-4 gap-4"
          style={{
            backgroundColor: '#020B16',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px'
          }}
        >
          <h2
            style={{
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 274,
              fontStyle: 'normal',
              fontSize: '20px',
              lineHeight: '100%',
              letterSpacing: '0%'
            }}
            className="text-white"
          >
            Exchange Rates
          </h2>
        </div>

        {/* Table Header */}
        <div style={{ backgroundColor: '#1C2530', width: '100%' }}>
          <table className="w-full" style={{ height: '60px', width: '100%', tableLayout: 'auto' }}>
            <colgroup>
              <col style={{ width: '5%' }} />
              <col style={{ width: '18%' }} />
              <col style={{ width: '18%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '18%' }} />
              <col style={{ width: '11%' }} />
            </colgroup>
            <thead>
              <tr style={{ height: '100%', width: '100%' }}>
                <th className="text-left py-3" style={{ verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '24px', paddingRight: '12px' }}>
                  <div className="relative inline-block" style={{ width: '16px', height: '16px' }}>
                    <input
                      type="checkbox"
                      checked={selectedRates.size === displayedRates.length && displayedRates.length > 0}
                      onChange={handleSelectAll}
                      className="rounded appearance-none cursor-pointer"
                      style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: selectedRates.size === displayedRates.length && displayedRates.length > 0 ? '#A9EF45' : '#1C2830',
                        borderColor: 'white',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        outline: 'none',
                        margin: 0,
                        padding: 0
                      }}
                    />
                    {selectedRates.size === displayedRates.length && displayedRates.length > 0 && (
                      <svg
                        className="absolute pointer-events-none"
                        style={{
                          width: '10px',
                          height: '10px',
                          top: '3px',
                          left: '3px'
                        }}
                        fill="none"
                        stroke="black"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </th>
                <th className="text-left py-3 text-white whitespace-nowrap" style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '12px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                  backgroundColor: '#1C2530',
                  paddingLeft: '24px',
                  paddingRight: '24px'
                }}>
                  Main Currency
                </th>
                <th className="text-left py-3 text-white whitespace-nowrap" style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '12px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  whiteSpace: 'nowrap',
                  verticalAlign: 'middle',
                  backgroundColor: '#1C2530',
                  paddingLeft: '24px',
                  paddingRight: '24px'
                }}>
                  Other Currencies
                </th>
                <th className="text-left py-3 text-white whitespace-nowrap" style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '12px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  whiteSpace: 'nowrap',
                  verticalAlign: 'middle',
                  backgroundColor: '#1C2530',
                  paddingLeft: '24px',
                  paddingRight: '24px'
                }}>
                  Market Rate
                </th>
                <th className="text-left py-3 text-white" style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '12px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                  backgroundColor: '#1C2530',
                  paddingLeft: '24px',
                  paddingRight: '24px'
                }}>
                  Rhinox Rate
                </th>
                <th className="text-left py-3 text-white" style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '12px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                  backgroundColor: '#1C2530',
                  paddingLeft: '24px',
                  paddingRight: '24px'
                }}>
                  % Increase/Decrease
                </th>
                <th className="text-left py-3 text-white" style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '12px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                  backgroundColor: '#1C2530',
                  paddingLeft: '24px',
                  paddingRight: '24px'
                }}>
                  Actions
                </th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Table Body */}
        <div style={{ backgroundColor: '#0F1825', width: '100%' }}>
          <table className="w-full" style={{ width: '100%', tableLayout: 'auto' }}>
            <colgroup>
              <col style={{ width: '5%' }} />
              <col style={{ width: '18%' }} />
              <col style={{ width: '18%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '18%' }} />
              <col style={{ width: '11%' }} />
            </colgroup>
            <tbody>
              {displayedRates.length > 0 ? (
                displayedRates.map((rate) => {
                  const mainCurrencyData = currencies.find(c => rate.mainCurrency.includes(c.name));
                  const otherCurrencyData = currencies.find(c => rate.otherCurrency.includes(c.name));
                  
                  return (
                    <tr
                      key={rate.id}
                      className="border-b border-[#2B363E] hover:bg-[#1A252F] transition-colors"
                      style={{ width: '100%', display: 'table-row' }}
                    >
                      <td className="py-3" style={{ paddingLeft: '24px', paddingRight: '12px', verticalAlign: 'middle' }}>
                        <div className="relative inline-block" style={{ width: '16px', height: '16px' }}>
                          <input
                            type="checkbox"
                            checked={selectedRates.has(rate.id)}
                            onChange={() => handleSelectRate(rate.id)}
                            className="rounded appearance-none cursor-pointer"
                            style={{
                              width: '16px',
                              height: '16px',
                              backgroundColor: selectedRates.has(rate.id) ? '#A9EF45' : '#1C2830',
                              borderColor: 'white',
                              borderWidth: '1px',
                              borderStyle: 'solid',
                              outline: 'none',
                              margin: 0,
                              padding: 0
                            }}
                          />
                          {selectedRates.has(rate.id) && (
                            <svg
                              className="absolute pointer-events-none"
                              style={{
                                width: '10px',
                                height: '10px',
                                top: '3px',
                                left: '3px'
                              }}
                              fill="none"
                              stroke="black"
                              strokeWidth="2.5"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </td>
                      <td className="py-3 text-white" style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: '12px',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        verticalAlign: 'middle'
                      }}>
                        <div className="flex items-center gap-3">
                          {mainCurrencyData && (
                            <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                              <img src={mainCurrencyData.flag} alt={mainCurrencyData.name} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <span>{rate.mainCurrency}</span>
                        </div>
                      </td>
                      <td className="py-3 text-white" style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: '12px',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        verticalAlign: 'middle'
                      }}>
                        <div className="flex items-center gap-3">
                          {otherCurrencyData && (
                            <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                              <img src={otherCurrencyData.flag} alt={otherCurrencyData.name} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <span>{rate.otherCurrency}</span>
                        </div>
                      </td>
                      <td className="py-3 text-white" style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: '12px',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        verticalAlign: 'middle'
                      }}>
                        {rate.marketRate}
                      </td>
                      <td className="py-3 text-white" style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: '12px',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        verticalAlign: 'middle'
                      }}>
                        {rate.rhinoxRate}
                      </td>
                      <td className={`py-3 ${
                        rate.isIncrease ? 'text-[#065A0E]' : 'text-[#C30609]'
                      }`} style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: '14px',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        verticalAlign: 'middle'
                      }}>
                        {rate.percentage}
                      </td>
                      <td className="py-3" style={{
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        verticalAlign: 'middle'
                      }}>
                       <button className="rounded-full px-4 py-1.5 text-black font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-xs font-medium whitespace-nowrap cursor-pointer transition-opacity hover:opacity-90" style={{ backgroundColor: '#A9EF45' }}>
                          Edit %
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-white">
                    No rates found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center p-6 pt-4 gap-4" style={{ backgroundColor: '#0B1820', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
          <div className="text-white" style={{
            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '14px',
            fontWeight: 400
          }}>
            Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredRates.length)} of {filteredRates.length} Rates
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="text-white disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#1C2630',
                color: '#FFFFFF',
                border: 'none',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              &lt;
            </button>
            
            {/* Show pages based on current page and total pages */}
            {totalPages <= 11 ? (
              // Show all pages if 11 or fewer
              Array.from({ length: totalPages }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    style={{
                      minWidth: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: currentPage === pageNum ? '#1C2630' : 'transparent',
                      color: currentPage === pageNum ? '#FFFFFF' : '#FFFFFF',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      opacity: currentPage === pageNum ? 1 : 0.7
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })
            ) : (
              // Show: 1, 2, ..., 10, 11 (or adjust based on current page)
              <>
                <button
                  onClick={() => setCurrentPage(1)}
                  style={{
                    minWidth: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: currentPage === 1 ? '#1C2630' : 'transparent',
                    color: '#FFFFFF',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    opacity: currentPage === 1 ? 1 : 0.7
                  }}
                >
                  1
                </button>
                {currentPage === 2 ? (
                  <button
                    onClick={() => setCurrentPage(2)}
                    style={{
                      minWidth: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: '#1C2630',
                      color: '#FFFFFF',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400
                    }}
                  >
                    2
                  </button>
                ) : (
                  <span
                    onClick={() => setCurrentPage(2)}
                    style={{
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      opacity: 0.7
                    }}
                  >
                    2
                  </span>
                )}
                <span className="text-white px-2" style={{ opacity: 0.7 }}>...</span>
                <span
                  onClick={() => setCurrentPage(10)}
                  style={{
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    opacity: 0.7
                  }}
                >
                  10
                </span>
                <span
                  onClick={() => setCurrentPage(11)}
                  style={{
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    opacity: 0.7
                  }}
                >
                  11
                </span>
              </>
            )}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="text-white disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#1C2630',
                color: '#FFFFFF',
                border: 'none',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      </>
      )}

      {showSetRateModal && (
        <div
          className="fixed inset-0 z-[170] flex items-start justify-end bg-[rgba(2,10,23,0.7)] backdrop-blur-[2px] p-3 md:p-4"
          onClick={() => {
            setShowSetRateModal(false);
            setShowRateDirectionDropdown(false);
            setShowModalCurrencyDropdown(false);
          }}
        >
          <div
            className="h-[calc(100vh-32px)] w-full max-w-[390px] overflow-y-scroll rounded-2xl border border-[#132635] bg-[#020B16] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.08)]">
                <p className="font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-[14px] text-white">Set Rate</p>
                <button
                  onClick={() => {
                    setShowSetRateModal(false);
                    setShowRateDirectionDropdown(false);
                    setShowModalCurrencyDropdown(false);
                  }}
                  className="text-[#D3DFEA] hover:text-white"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="px-4 py-6">
                <div className="mb-6 text-center">
                  <p className="font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-[28px] leading-none text-white">Set Rate</p>
                  <p className="mt-3 font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-[10px] text-[#6E7D8C]">
                    This rate will apply to all currency conversion pairs
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex h-[54px] items-center justify-between rounded-[8px] border border-[#1B2F42] bg-[#0C1A2A] px-3">
                    <p className="font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-[11px] text-[#8A98A7]">
                      Selected Currency
                    </p>
                    <div className="flex items-center gap-2.5">
                      <div className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#25384A]">
                        <img src={toCurrency?.flag || images.flag3} alt="From currency" className="h-[18px] w-[18px] rounded-full object-cover" />
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6F8193" strokeWidth="1.8">
                        <path d="M7 7h10" />
                        <path d="M13 4l4 3-4 3" />
                        <path d="M17 17H7" />
                        <path d="M11 20l-4-3 4-3" />
                      </svg>
                      <div ref={modalCurrencyDropdownRef} className="relative">
                        <button
                          onClick={() => setShowModalCurrencyDropdown((prev) => !prev)}
                          className="flex h-[34px] min-w-[96px] items-center justify-between gap-2 rounded-full border border-[#243648] bg-[#1B2A3A] px-2.5 text-[#D7E2EC]"
                        >
                          <img src={modalCurrency?.flag || images.flag} alt={selectedModalCurrency} className="h-[20px] w-[20px] rounded-full object-cover" />
                          <span className="text-[10px]">{selectedModalCurrency}</span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8FA0B0" strokeWidth="2">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </button>
                        {showModalCurrencyDropdown && (
                          <div className="absolute right-0 top-[38px] z-[195] w-[150px] overflow-hidden rounded-lg border border-[#1B2F42] bg-[#091524] shadow-[0_12px_24px_rgba(0,0,0,0.45)]">
                            {currencies.map((currency) => (
                              <button
                                key={currency.name}
                                onClick={() => {
                                  setSelectedModalCurrency(currency.name);
                                  setShowModalCurrencyDropdown(false);
                                }}
                                className="flex w-full items-center gap-2 px-2.5 py-2 text-left text-[10px] text-[#D5DFE9] hover:bg-[#0E2338]"
                              >
                                <img src={currency.flag} alt={currency.name} className="h-[14px] w-[14px] rounded-sm object-cover" />
                                <span>{currency.name}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div ref={rateDirectionDropdownRef} className="relative">
                    <p className="mb-2 font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-[12px] text-white">
                      Rate increase/Decrease
                    </p>
                    <button
                      onClick={() => setShowRateDirectionDropdown((prev) => !prev)}
                      className="flex h-[38px] w-full items-center justify-between rounded-[8px] border border-[#1B2F42] bg-[#0C1A2A] px-3 text-[11px] text-[#6F8193]"
                    >
                      <span>{selectedRateDirection}</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`transition-transform ${showRateDirectionDropdown ? "rotate-180" : ""}`}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    {showRateDirectionDropdown && (
                      <div className="absolute left-0 top-[44px] z-[190] w-full overflow-hidden rounded-lg border border-[#1B2F42] bg-[#091524] shadow-[0_12px_24px_rgba(0,0,0,0.45)]">
                        {["Increase", "Decrease"].map((option) => (
                          <button
                            key={option}
                            onClick={() => {
                              setSelectedRateDirection(option);
                              setShowRateDirectionDropdown(false);
                            }}
                            className="block w-full px-3 py-2 text-left text-[11px] text-[#D5DFE9] hover:bg-[#0E2338]"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="mb-2 font-['SF_Pro',-apple-system,BlinkMacSystemFont,sans-serif] text-[12px] text-white">
                      Percentage increase /Decrease
                    </p>
                    <div className="flex h-[38px] w-full items-center rounded-[8px] border border-[#1B2F42] bg-[#0C1A2A] px-3">
                      <input
                        value={ratePercentage}
                        onChange={(e) => setRatePercentage(e.target.value)}
                        placeholder="Type percentage increase or decrease"
                        className="h-full flex-1 bg-transparent text-[11px] text-white outline-none placeholder:text-[#6F8193]"
                      />
                      <span className="text-[#6F8193] text-[16px] leading-none">%</span>
                    </div>
                  </div>
                </div>

                <button className="mt-6 inline-flex h-[38px] min-w-[112px] items-center justify-center rounded-full bg-[#A9EF45] px-6 text-[12px] font-medium text-[#0C141C]">
                  Set Rate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSetFeesModal && (
        <div
          className="fixed inset-0 z-[175] flex items-start justify-end bg-[rgba(2,10,23,0.7)] backdrop-blur-[2px] p-3 md:p-4"
          onClick={() => setShowSetFeesModal(false)}
        >
          <div
            className="hide-scrollbar h-[calc(100vh-32px)] w-full max-w-[390px] overflow-y-auto rounded-2xl border border-[#132635] bg-[#020B16] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] px-4 py-3">
                <p className="text-[14px] text-white">Set Fees</p>
                <button
                  onClick={() => setShowSetFeesModal(false)}
                  className="text-[#D3DFEA] hover:text-white"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="px-4 py-6">
                <div className="mb-5 text-center">
                  <p className="text-[22px] leading-none text-white">Set Fees</p>
                  <p className="mt-3 text-[10px] text-[#6E7D8C]">Set fees for services</p>
                </div>

                <div className="space-y-3.5">
                  {[
                    "Select service category",
                    "Select service Type",
                    "Select service Sub Type",
                    "Select service Sub Type",
                  ].map((label, idx) => (
                    <div key={`${label}-${idx}`}>
                      <p className="mb-2 text-[12px] text-white">{label}</p>
                      <button className="flex h-[38px] w-full items-center justify-between rounded-[8px] bg-[#0F1825] px-3 text-[11px] text-[#6F8193]">
                        <span>{label}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                    </div>
                  ))}

                  <div>
                    <p className="mb-2 text-[12px] text-white">Fixed fee</p>
                    <div className="flex h-[38px] w-full items-center rounded-[8px] border border-[#1B2F42] bg-[#0C1A2A] px-3">
                      <input
                        placeholder="Type fixed fee"
                        className="h-full flex-1 bg-transparent text-[11px] text-white outline-none placeholder:text-[#6F8193]"
                      />
                      <span className="text-[#6F8193] text-[16px] leading-none">%</span>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-[12px] text-white">Commission</p>
                    <div className="flex h-[38px] w-full items-center rounded-[8px] border border-[#1B2F42] bg-[#0C1A2A] px-3">
                      <input
                        placeholder="Type commission"
                        className="h-full flex-1 bg-transparent text-[11px] text-white outline-none placeholder:text-[#6F8193]"
                      />
                      <span className="text-[#6F8193] text-[16px] leading-none">%</span>
                    </div>
                  </div>
                </div>

                <button className="mt-6 inline-flex h-[31px] w-[91px] items-center justify-center rounded-[100px] bg-[#A9EF45] text-[10px] text-[#0C141C]">
                  Set Fee
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rates;
