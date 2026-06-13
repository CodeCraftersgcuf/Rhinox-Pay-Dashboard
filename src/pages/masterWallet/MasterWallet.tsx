import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, Wallet } from "lucide-react";
import { createPortal } from "react-dom";
import images from "../../constants/images";
import TimeFilterTabs from "../../components/setting/TimeFilterTabs";
import { fetchMasterWalletActivity, fetchMasterWallets, fetchWalletOverview } from "../../services/admin";
import { formatDateTime, formatNumber } from "../../utils/adminFormatters";

interface WalletActivityRow {
  id: string;
  activity: string;
  date: string;
}

const timeRanges = ["All Time", "7 Days", "1 month", "1 Year", "Custom"];

const getCryptoIcon = (code: string) => {
  const icons: Record<string, string> = {
    BTC: images.logos_bitcoin,
    USDT: images.cryptocurrency_color_usdt,
    ETH: images.image_27,
    USDC: images.image_25,
  };
  return icons[code?.toUpperCase()] || images.logos_bitcoin;
};

const MasterWallet: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("All Time");
  const [activitySearch, setActivitySearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectedFiatCurrency, setSelectedFiatCurrency] = useState("NGN");
  const [showFiatCurrencyDropdown, setShowFiatCurrencyDropdown] = useState(false);
  const [selectedCryptoCurrency, setSelectedCryptoCurrency] = useState("BTC");
  const [showCryptoCurrencyDropdown, setShowCryptoCurrencyDropdown] = useState(false);
  const [selectedFiatUnit, setSelectedFiatUnit] = useState("USD");
  const [showFiatUnitDropdown, setShowFiatUnitDropdown] = useState(false);
  const [selectedFiatHeaderWallet, setSelectedFiatHeaderWallet] = useState("All Wallets");
  const [showFiatHeaderWalletDropdown, setShowFiatHeaderWalletDropdown] = useState(false);
  const [selectedCryptoHeaderWallet, setSelectedCryptoHeaderWallet] = useState("All Wallets");
  const [showCryptoHeaderWalletDropdown, setShowCryptoHeaderWalletDropdown] = useState(false);
  const [summaryCardCurrencies, setSummaryCardCurrencies] = useState(["NGN", "NGN", "NGN"]);
  const [openSummaryCurrencyIndex, setOpenSummaryCurrencyIndex] = useState<number | null>(null);
  const [selectedWalletTypeFilter, setSelectedWalletTypeFilter] = useState("Crypto Wallet");
  const [showWalletTypeFilterDropdown, setShowWalletTypeFilterDropdown] = useState(false);
  const [selectedProviderFilter, setSelectedProviderFilter] = useState("Tatum Wallet");
  const [showProviderFilterDropdown, setShowProviderFilterDropdown] = useState(false);
  const [showFiatWalletsPopup, setShowFiatWalletsPopup] = useState(false);
  const [showCryptoWalletsPopup, setShowCryptoWalletsPopup] = useState(false);
  const fiatCurrencyRef = useRef<HTMLDivElement | null>(null);
  const cryptoCurrencyRef = useRef<HTMLDivElement | null>(null);
  const fiatUnitRef = useRef<HTMLDivElement | null>(null);
  const fiatHeaderWalletRef = useRef<HTMLDivElement | null>(null);
  const cryptoHeaderWalletRef = useRef<HTMLDivElement | null>(null);
  const walletTypeFilterRef = useRef<HTMLDivElement | null>(null);
  const providerFilterRef = useRef<HTMLDivElement | null>(null);
  const [masterWallets, setMasterWallets] = useState<any[]>([]);
  const [walletOverview, setWalletOverview] = useState<any>(null);
  const [activityRows, setActivityRows] = useState<WalletActivityRow[]>([]);
  const [loadingWallets, setLoadingWallets] = useState(true);
  const [loadingActivity, setLoadingActivity] = useState(true);

  useEffect(() => {
    const loadWallets = async () => {
      setLoadingWallets(true);
      try {
        const [wallets, overview] = await Promise.all([
          fetchMasterWallets({ range: selectedTimeRange }),
          fetchWalletOverview({ range: selectedTimeRange }),
        ]);
        setMasterWallets(Array.isArray(wallets) ? wallets : []);
        setWalletOverview(overview || null);
      } catch (error) {
        console.error("Failed to load master wallets:", error);
        setMasterWallets([]);
        setWalletOverview(null);
      } finally {
        setLoadingWallets(false);
      }
    };
    loadWallets();
  }, [selectedTimeRange]);

  useEffect(() => {
    const loadActivity = async () => {
      setLoadingActivity(true);
      try {
        const data = await fetchMasterWalletActivity({
          range: selectedTimeRange,
          search: activitySearch.trim() || undefined,
          limit: 100,
        });
        setActivityRows(
          (data?.items || []).map((item: any) => ({
            id: String(item.id),
            activity: item.activity,
            date: formatDateTime(item.date),
          }))
        );
      } catch (error) {
        console.error("Failed to load wallet activity:", error);
        setActivityRows([]);
      } finally {
        setLoadingActivity(false);
      }
    };
    loadActivity();
  }, [selectedTimeRange, activitySearch]);

  const fiatCurrencyOptions = useMemo(() => {
    if (!walletOverview) {
      return [{ code: "FIAT", label: "Platform Fiat", balance: "Bal : —", icon: images.flag }];
    }
    return [
      {
        code: "FIAT",
        label: "All Fiat Wallets",
        balance: `Bal : ${formatNumber(walletOverview.totalFiatBalance ?? 0)}`,
        icon: images.flag,
      },
    ];
  }, [walletOverview]);
  const cryptoCurrencyOptions = useMemo(() => {
    if (!masterWallets.length) {
      return [
        { code: "BTC", label: "Bitcoin (BTC)", balance: "Bal : —", icon: images.logos_bitcoin },
      ];
    }
    return masterWallets.map((wallet) => ({
      code: wallet.currency || wallet.blockchain,
      label: `${wallet.blockchain} (${wallet.currency || wallet.blockchain})`,
      balance: `Bal : ${wallet.balance != null ? wallet.balance : "—"}`,
      icon: getCryptoIcon(wallet.blockchain || wallet.currency),
    }));
  }, [masterWallets]);
  const fiatUnitOptions = ["USD", "EUR", "GBP"];
  const fiatHeaderWalletOptions = ["All Wallets", "Yellow card wallet", "A2A Finance", "Paystack"];
  const cryptoHeaderWalletOptions = ["All Wallets", "Yellow card wallet", "A2A Finance", "Paystack"];
  const walletTypeFilterOptions = ["Crypto Wallet", "Fiat Wallet", "Escrow Wallet"];
  const providerFilterOptions = ["Tatum Wallet", "Binance Wallet", "Stripe Wallet"];
  const fiatWalletPopupRows = useMemo(() => {
    if (!walletOverview) return [];
    return [
      {
        name: "Platform Fiat Balance",
        amount: formatNumber(walletOverview.totalFiatBalance ?? 0),
        icon: images.flag,
      },
      {
        name: `Fiat Wallets (${walletOverview.fiatWalletCount ?? 0})`,
        amount: formatNumber(walletOverview.totalFiatBalance ?? 0),
        icon: images.flag3,
      },
    ];
  }, [walletOverview]);
  const cryptoWalletPopupRows = useMemo(
    () =>
      masterWallets.map((wallet) => ({
        name: `${wallet.blockchain} Wallet`,
        amount: wallet.balance != null ? String(wallet.balance) : "0.00",
        icon: getCryptoIcon(wallet.blockchain || wallet.currency),
      })),
    [masterWallets]
  );

  const tokenCards = useMemo(() => {
    const cards = masterWallets.slice(0, 6).map((wallet) => ({
      id: String(wallet.id),
      token: wallet.currency || wallet.blockchain,
      value: wallet.balance != null ? formatNumber(wallet.balance) : "—",
      icon: getCryptoIcon(wallet.blockchain || wallet.currency),
      cardClass: "bg-[#67DA39]",
      tokenClass: "text-[#13370B]",
      valueClass: "text-[#072E08]",
    }));
    if (cards.length === 0) return cards;
    if (cards.length <= 3) {
      return [...cards, { id: "view-1", isView: true as const }];
    }
    return [
      ...cards.slice(0, 3),
      { id: "view-1", isView: true as const },
      ...cards.slice(3, 6),
      { id: "view-2", isView: true as const },
    ];
  }, [masterWallets]);

  const selectedCryptoWallet = useMemo(
    () =>
      masterWallets.find(
        (wallet) => (wallet.currency || wallet.blockchain) === selectedCryptoCurrency
      ),
    [masterWallets, selectedCryptoCurrency]
  );

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (
        fiatCurrencyRef.current &&
        !fiatCurrencyRef.current.contains(event.target as Node)
      ) {
        setShowFiatCurrencyDropdown(false);
      }
      if (fiatUnitRef.current && !fiatUnitRef.current.contains(event.target as Node)) {
        setShowFiatUnitDropdown(false);
      }
      if (
        cryptoCurrencyRef.current &&
        !cryptoCurrencyRef.current.contains(event.target as Node)
      ) {
        setShowCryptoCurrencyDropdown(false);
      }
      if (
        fiatHeaderWalletRef.current &&
        !fiatHeaderWalletRef.current.contains(event.target as Node)
      ) {
        setShowFiatHeaderWalletDropdown(false);
      }
      if (
        cryptoHeaderWalletRef.current &&
        !cryptoHeaderWalletRef.current.contains(event.target as Node)
      ) {
        setShowCryptoHeaderWalletDropdown(false);
      }
      if (
        walletTypeFilterRef.current &&
        !walletTypeFilterRef.current.contains(event.target as Node)
      ) {
        setShowWalletTypeFilterDropdown(false);
      }
      if (providerFilterRef.current && !providerFilterRef.current.contains(event.target as Node)) {
        setShowProviderFilterDropdown(false);
      }
      if (!(event.target as HTMLElement)?.closest('[data-summary-currency-wrap="true"]')) {
        setOpenSummaryCurrencyIndex(null);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  const filteredRows = useMemo(
    () =>
      activityRows.filter((row) =>
        row.activity.toLowerCase().includes(activitySearch.toLowerCase().trim())
      ),
    [activitySearch]
  );

  const allSelected =
    filteredRows.length > 0 && filteredRows.every((row) => selectedIds.has(row.id));

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
    <div className="space-y-4">
      <style>
        {`
          .master-checkbox {
            appearance: none;
            width: 13px;
            height: 13px;
            border-radius: 3px;
            border: 1px solid #9CA8B3;
            background-color: transparent;
            cursor: pointer;
          }
          .master-checkbox:checked {
            border-color: #A9EF45;
            background-color: #A9EF45;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 13l4 4L19 7'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 9px 9px;
          }
          .hide-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      <section
        className="rounded-2xl p-4 md:p-5"
        style={{ background: "linear-gradient(90deg, #0A1920 0%, #0A1420 100%)" }}
      >
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1
              className="text-white"
              style={{
                fontFamily: "Agbalumo",
                fontWeight: 400,
                fontSize: "34px",
                lineHeight: "100%",
              }}
            >
              Master Wallet
            </h1>
            <p className="mt-2 text-xs text-[#7B8A96]">View and manage master wallet details</p>
          </div>
          <TimeFilterTabs
            options={timeRanges}
            value={selectedTimeRange}
            onChange={setSelectedTimeRange}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            "Total Amount in fiat wallet",
            "Total Amount in Crypto wallet",
            "Total Amount in escrow wallet",
          ].map((title, index) => (
            <div
              key={title}
              className="h-[82px] rounded-[10px] px-4 py-3"
              style={{ background: "linear-gradient(119.08deg, #4880C0 0%, #1B589E 96.9%)" }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#5E98DA]">
                    <img src={images.Wallet_icon} alt="Wallet icon" className="h-3 w-3 object-contain" />
                  </span>
                  <div>
                    <p className="text-[8px] text-[#D7E8FB]">{title}</p>
                    <p className="text-[34px] leading-none text-white">
                      {loadingWallets ? (
                        "..."
                      ) : (
                        <>
                          <span className="text-[10px]">n</span>
                          {formatNumber(0)}
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <div className="relative" data-summary-currency-wrap="true">
                  <button
                    onClick={() =>
                      setOpenSummaryCurrencyIndex((prev) => (prev === index ? null : index))
                    }
                    className="flex h-[24px] w-[66px] items-center justify-between rounded-full px-2 text-[10px] text-[#E6F0FF]"
                    style={{ backgroundColor: "rgba(114, 162, 216, 0.35)" }}
                  >
                    <span className="flex items-center gap-1">
                      <img
                        src={images.flag}
                        alt={`${summaryCardCurrencies[index]} flag`}
                        className="h-3.5 w-3.5 rounded-full object-cover"
                      />
                      {summaryCardCurrencies[index]}
                    </span>
                    <ChevronDown size={8} />
                  </button>
                  {openSummaryCurrencyIndex === index && (
                    <div
                      className="absolute right-0 z-20 mt-1 w-[72px] overflow-hidden rounded-lg border border-[#7FA6D1]"
                      style={{
                        backgroundColor: "rgba(32, 71, 117, 0.92)",
                        backdropFilter: "blur(4px)",
                        WebkitBackdropFilter: "blur(4px)",
                      }}
                    >
                      {["NGN", "USD", "EUR"].map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSummaryCardCurrencies((prev) => {
                              const next = [...prev];
                              next[index] = option;
                              return next;
                            });
                            setOpenSummaryCurrencyIndex(null);
                          }}
                          className="block w-full px-2 py-2 text-left text-[9px] text-white hover:bg-[rgba(255,255,255,0.12)]"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="rounded-2xl p-4 md:p-5"
        style={{ background: "linear-gradient(90deg, #0A1920 0%, #0A1420 100%)" }}
      >
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <div className="rounded-xl border border-[#1D3241] bg-[#0D1C28] p-3">
            <div
              className="-mx-3 -mt-3 mb-3 flex items-center justify-between rounded-t-[12px] border-b border-[rgba(154,171,190,0.2)] px-3"
              style={{ height: "50px", borderBottomWidth: "0.3px", backgroundColor: "#19252E" }}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#2E6AAE]">
                  <img
                    src={images.analytics_up}
                    alt="Fiat Wallet icon"
                    className="h-6 w-6 object-contain"
                    style={{ filter: "brightness(0)" }}
                  />
                </span>
                <div>
                  <h3 className="text-[12px] text-white">Fiat Wallets</h3>
                  <p className="mt-1 text-[8px] text-[#7B8A96]">View all fiat wallets balances including</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative" ref={fiatHeaderWalletRef}>
                  <button
                    onClick={() => {
                      setShowFiatHeaderWalletDropdown((prev) => !prev);
                      setShowCryptoHeaderWalletDropdown(false);
                    }}
                    className="flex h-[34px] items-center gap-2 rounded-full border border-[#27353B] bg-[#242D38] px-4 text-[10px] text-white"
                  >
                    {selectedFiatHeaderWallet}
                    <ChevronDown size={12} />
                  </button>
                  {showFiatHeaderWalletDropdown && (
                    <div
                      className="absolute right-0 z-[500] mt-1 w-[132px] overflow-hidden rounded-lg border border-[#27353B]"
                      style={{
                        backgroundColor: "#020C19B2",
                        backdropFilter: "blur(4px)",
                        WebkitBackdropFilter: "blur(4px)",
                        boxShadow: "5px 5px 15px 0px #00000040",
                      }}
                    >
                      {fiatHeaderWalletOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSelectedFiatHeaderWallet(option);
                            setShowFiatHeaderWalletDropdown(false);
                          }}
                          className="block w-full px-3 py-2 text-left text-[10px] text-white hover:bg-[#1B2D36]"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setShowFiatWalletsPopup(true)}
                  className="inline-flex h-[34px] w-[44px] items-center justify-center gap-2 rounded-full bg-[#101F26] text-white"
                  style={{ border: "0.3px solid #FFFFFF33", padding: "10px 15px" }}
                >
                  <Search size={14} />
                </button>
              </div>
            </div>

            <div
              className="relative rounded-lg p-6"
              style={{
                background: "linear-gradient(135deg, #3E77B9 0%, #2A5A8F 100%)",
                borderRadius: "15px",
                marginTop: "6px",
                marginBottom: "0px",
                height: "188px",
                overflow: "visible",
              }}
            >
              <img
                src={images.Rectangle_36}
                alt="Wallet background"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                style={{
                  opacity: 1.2,
                  mixBlendMode: "screen",
                  filter: "brightness(0) invert(1)",
                  zIndex: 1,
                }}
              />
              <img
                src={images.Rectangle_36}
                alt="Wallet background overlay"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                style={{
                  opacity: 0.9,
                  mixBlendMode: "overlay",
                  marginTop: "9px",
                  filter: "brightness(0) invert(1)",
                  zIndex: 2,
                }}
              />
              <div className="relative z-[350] flex items-center justify-between text-[8px] text-[#D7E8FB]">
                <span />
                <span>NGN Balance</span>
                <div className="relative" ref={fiatCurrencyRef}>
                  <button
                    onClick={() => setShowFiatCurrencyDropdown((prev) => !prev)}
                    className="flex items-center gap-1 rounded-full bg-[rgba(255,255,255,0.15)] px-2 py-1 text-[8px] text-white"
                  >
                    <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-[#0A9E58] via-white to-[#0A9E58]" />
                    {selectedFiatCurrency}
                    <ChevronDown size={8} />
                  </button>
                  {showFiatCurrencyDropdown && (
                    <div
                      className="absolute right-0 z-[320] mt-2 w-[286px] overflow-hidden rounded-2xl border border-[#1B2A36] p-3"
                      style={{
                        backgroundColor: "#020C19",
                        boxShadow: "5.91px 5.91px 17.72px 0px #00000080",
                        backdropFilter: "blur(4px)",
                        WebkitBackdropFilter: "blur(4px)",
                      }}
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-[#41586D]">
                            <Wallet size={10} className="text-[#D7E8FB]" />
                          </span>
                          <div>
                            <p className="text-[12px] text-[#D7E8FB]">All Wallets balance</p>
                            <p className="text-[9px] text-[#6E8295]">Bal : N200,000</p>
                          </div>
                        </div>
                        <span className="h-3 w-3 rounded-full border border-[#8EA7BD]" />
                      </div>
                      <div className="space-y-2">
                        {fiatCurrencyOptions.map((option) => (
                          <button
                            key={option.code}
                            onClick={() => {
                              setSelectedFiatCurrency(option.code);
                              setShowFiatCurrencyDropdown(false);
                            }}
                            className="flex w-full items-center justify-between rounded-lg px-1 py-1 text-left hover:bg-[rgba(255,255,255,0.06)]"
                          >
                            <span className="flex items-center gap-2">
                              <img src={option.icon} alt={option.code} className="h-4 w-4 rounded-sm object-cover" />
                              <span>
                                <p className="text-[11px] text-white">{option.label}</p>
                                <p className="text-[8px] text-[#6E8295]">{option.balance}</p>
                              </span>
                            </span>
                            <span
                              className={`h-3 w-3 rounded-full border ${selectedFiatCurrency === option.code ? "border-[#A9EF45]" : "border-[#8EA7BD]"}`}
                            >
                              {selectedFiatCurrency === option.code && (
                                <span className="m-[2px] block h-1.5 w-1.5 rounded-full bg-[#A9EF45]" />
                              )}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="relative z-[130] mt-2 flex items-center justify-center gap-2 text-white">
                <span
                  style={{
                    fontFamily: "Agbalumo",
                    fontWeight: 400,
                    fontSize: "34px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}
                >
                  <span className="text-[16px]">$</span>150,000.00
                </span>
                <span className="relative z-[130] inline-block" ref={fiatUnitRef}>
                  <button
                    onClick={() => setShowFiatUnitDropdown((prev) => !prev)}
                    className="inline-flex items-center gap-1 text-[10px] text-[#D7E8FB]"
                    style={{ fontFamily: "SF Pro" }}
                  >
                    {selectedFiatUnit}
                    <ChevronDown size={8} />
                  </button>
                  {showFiatUnitDropdown && (
                    <div
                      className="absolute left-0 top-full z-[120] mt-1 w-[66px] overflow-hidden rounded-lg border border-[#7FA6D1]"
                      style={{ backgroundColor: "rgba(32, 71, 117, 0.92)" }}
                    >
                      {fiatUnitOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSelectedFiatUnit(option);
                            setShowFiatUnitDropdown(false);
                          }}
                          className="block w-full px-2 py-2 text-left text-[8px] text-white hover:bg-[rgba(255,255,255,0.12)]"
                          style={{ fontFamily: "SF Pro" }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </span>
              </div>
              <div className="relative z-10 mt-4 flex items-center justify-center gap-5">
                {[
                  { label: "Send", icon: images.send_square },
                  { label: "Fund", icon: images.send_2 },
                  { label: "Withdraw", icon: images.send_2 },
                  { label: "Convert", icon: images.arrow_swap },
                ].map((action) => (
                  <div key={action.label} className="text-center">
                    <button className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#F2F4F7]">
                      <img
                        src={action.icon}
                        alt={action.label}
                        className={`h-5 w-5 object-contain ${action.label === "Withdraw" ? "rotate-180" : ""}`}
                      />
                    </button>
                    <p className="mt-1 text-[9px] text-[#E9F2FD]">{action.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#1D3241] bg-[#0D1C28] p-3">
            <div
              className="-mx-3 -mt-3 mb-3 flex items-center justify-between rounded-t-[12px] border-b border-[rgba(154,171,190,0.2)] px-3"
              style={{ height: "50px", borderBottomWidth: "0.3px", backgroundColor: "#19252E" }}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#5BCF45]">
                  <img src={images.Wallet_icon} alt="Crypto Wallet icon" className="h-6 w-6 object-contain" />
                </span>
                <div>
                  <h3 className="text-[12px] text-white">Crypto Wallets</h3>
                  <p className="mt-1 text-[8px] text-[#7B8A96]">View all fiat wallets balances including</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative" ref={cryptoHeaderWalletRef}>
                  <button
                    onClick={() => {
                      setShowCryptoHeaderWalletDropdown((prev) => !prev);
                      setShowFiatHeaderWalletDropdown(false);
                    }}
                    className="flex h-[34px] items-center gap-2 rounded-full border border-[#27353B] bg-[#242D38] px-4 text-[10px] text-white"
                  >
                    {selectedCryptoHeaderWallet}
                    <ChevronDown size={12} />
                  </button>
                  {showCryptoHeaderWalletDropdown && (
                    <div
                      className="absolute right-0 z-[500] mt-1 w-[132px] overflow-hidden rounded-lg border border-[#27353B]"
                      style={{
                        backgroundColor: "#020C19B2",
                        backdropFilter: "blur(4px)",
                        WebkitBackdropFilter: "blur(4px)",
                        boxShadow: "5px 5px 15px 0px #00000040",
                      }}
                    >
                      {cryptoHeaderWalletOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSelectedCryptoHeaderWallet(option);
                            setShowCryptoHeaderWalletDropdown(false);
                          }}
                          className="block w-full px-3 py-2 text-left text-[10px] text-white hover:bg-[#1B2D36]"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setShowCryptoWalletsPopup(true)}
                  className="inline-flex h-[34px] w-[44px] items-center justify-center gap-2 rounded-full bg-[#101F26] text-white"
                  style={{ border: "0.3px solid #FFFFFF33", padding: "10px 15px" }}
                >
                  <Search size={14} />
                </button>
              </div>
            </div>

            <div
              className="relative rounded-lg p-6"
              style={{
                background: "linear-gradient(135deg, #9BEA3B 0%, #2CCB63 100%)",
                borderRadius: "15px",
                marginTop: "6px",
                marginBottom: "0px",
                height: "188px",
                overflow: "visible",
              }}
            >
              <img
                src={images.Rectangle_36}
                alt="Wallet background"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                style={{
                  opacity: 1.2,
                  mixBlendMode: "screen",
                  filter: "brightness(0) invert(1)",
                  zIndex: 1,
                }}
              />
              <img
                src={images.Rectangle_36}
                alt="Wallet background overlay"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                style={{
                  opacity: 0.9,
                  mixBlendMode: "overlay",
                  marginTop: "9px",
                  filter: "brightness(0) invert(1)",
                  zIndex: 2,
                }}
              />
              <div className="relative z-[350] flex items-center justify-between text-[8px] text-[#1D3A1A]">
                <span />
                <span>{selectedCryptoCurrency} Balance</span>
                <div className="relative" ref={cryptoCurrencyRef}>
                  <button
                    onClick={() => setShowCryptoCurrencyDropdown((prev) => !prev)}
                    className="flex items-center gap-1 rounded-full bg-[rgba(0,0,0,0.15)] px-2 py-0.5 text-[8px] text-[#041A08]"
                  >
                    {selectedCryptoCurrency}
                    <ChevronDown size={8} />
                  </button>
                  {showCryptoCurrencyDropdown && (
                    <div
                      className="absolute right-0 z-[320] mt-2 w-[270px] overflow-hidden rounded-2xl border border-[#1B2A36] p-3"
                      style={{
                        backgroundColor: "#020C19",
                        boxShadow: "5.91px 5.91px 17.72px 0px #00000080",
                        backdropFilter: "blur(4px)",
                        WebkitBackdropFilter: "blur(4px)",
                      }}
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-[#41586D]">
                            <Wallet size={10} className="text-[#D7E8FB]" />
                          </span>
                          <div>
                            <p className="text-[12px] text-[#D7E8FB]">All Wallets balance</p>
                            <p className="text-[9px] text-[#6E8295]">Bal : N200,000</p>
                          </div>
                        </div>
                        <span className="h-3 w-3 rounded-full border border-[#8EA7BD]" />
                      </div>
                      <div className="space-y-2">
                        {cryptoCurrencyOptions.map((option) => (
                          <button
                            key={option.code}
                            onClick={() => {
                              setSelectedCryptoCurrency(option.code);
                              setShowCryptoCurrencyDropdown(false);
                            }}
                            className="flex w-full items-center justify-between rounded-lg px-1 py-1 text-left hover:bg-[rgba(255,255,255,0.06)]"
                          >
                            <span className="flex items-center gap-2">
                              <img src={option.icon} alt={option.code} className="h-4 w-4 rounded-full object-contain" />
                              <span>
                                <p className="text-[11px] text-white">{option.label}</p>
                                <p className="text-[8px] text-[#6E8295]">{option.balance}</p>
                              </span>
                            </span>
                            <span
                              className={`h-3 w-3 rounded-full border ${selectedCryptoCurrency === option.code ? "border-[#A9EF45]" : "border-[#8EA7BD]"}`}
                            >
                              {selectedCryptoCurrency === option.code && (
                                <span className="m-[2px] block h-1.5 w-1.5 rounded-full bg-[#A9EF45]" />
                              )}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <p
                className="relative z-10 mt-2 text-center text-[#021B07]"
                style={{
                  fontFamily: "Agbalumo",
                  fontWeight: 400,
                  fontSize: "34px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
              >
                {loadingWallets
                  ? "..."
                  : selectedCryptoWallet?.balance != null
                    ? formatNumber(selectedCryptoWallet.balance)
                    : "0.00"}
              </p>
              <div className="relative z-10 mt-4 flex items-center justify-center gap-5">
                {[
                  { label: "Send", icon: images.send_2_green, iconClass: "" },
                  { label: "Receive", icon: images.send_2_green, iconClass: "rotate-190" },
                  { label: "P2P", icon: images.arrow_swap_green, iconClass: "" },
                ].map((action) => (
                  <div key={action.label} className="text-center">
                    <button className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#00180B]">
                      <img
                        src={action.icon}
                        alt={action.label}
                        className={`h-5 w-5 object-contain ${action.iconClass}`}
                      />
                    </button>
                    <p className="mt-1 text-[9px] text-[#0A2A12]">{action.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-8">
          {(tokenCards.length ? tokenCards : [{ id: "view-1", isView: true as const }]).map((item) => (
            <div
              key={item.id}
              className={`h-[62px] rounded-[10px] px-3 py-2 ${"isView" in item && item.isView ? "bg-[#F2F4F7]" : (item as { cardClass: string }).cardClass}`}
            >
              {"isView" in item && item.isView ? (
                <button className="h-full w-full text-[14px] text-[#1A2129]">View All</button>
              ) : (
                <div>
                  <div className="flex items-center gap-1.5">
                    <img src={(item as { icon: string }).icon} alt={`${(item as { token: string }).token} icon`} className="h-[14px] w-[14px] object-contain" />
                    <p className={`text-[8px] ${(item as { tokenClass: string }).tokenClass}`}>{(item as { token: string }).token}</p>
                  </div>
                  <p className={`pt-1 pl-1 text-[18px] leading-none ${(item as { valueClass: string }).valueClass}`}>{(item as { value: string }).value}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {showFiatWalletsPopup &&
        typeof document !== "undefined" &&
        createPortal(
        <div
          className="fixed inset-0 z-[600] flex items-start justify-end bg-[rgba(12,29,51,0.7)] p-3 md:p-4"
          style={{ backdropFilter: "blur(5px)", WebkitBackdropFilter: "blur(5px)" }}
          onClick={() => setShowFiatWalletsPopup(false)}
        >
          <div
            className="h-[calc(100vh-24px)] w-full max-w-[380px] overflow-hidden rounded-2xl border border-[#1B2A36] bg-[#020C19] shadow-2xl md:h-[calc(100vh-32px)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-[50px] items-center justify-between border-b border-[rgba(255,255,255,0.1)] px-4">
              <p
                className="text-white"
                style={{ fontWeight: 590, fontSize: "16px", lineHeight: "100%" }}
              >
                Fiat Wallets - Master Wallets
              </p>
              <button
                onClick={() => setShowFiatWalletsPopup(false)}
                className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#41586D] text-[10px] text-white"
              >
                ×
              </button>
            </div>
            <div className="hide-scrollbar h-[calc(100%-50px)] space-y-2 overflow-y-auto p-3">
              {fiatWalletPopupRows.map((wallet) => (
                <div key={wallet.name} className="rounded-lg border border-[#1E2F40] bg-[#0D1928] p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1E2F40]">
                        <img src={wallet.icon} alt={wallet.name} className="h-4 w-4 rounded-full object-cover" />
                      </span>
                      <p className="text-[9px] text-[#D7E8FB]">{wallet.name}</p>
                    </div>
                    <div className="flex gap-1">
                      {[
                        { label: "Send", icon: images.send_square },
                        { label: "Fund", icon: images.send_2 },
                        { label: "Withdraw", icon: images.send_2, rotate: "rotate-180" },
                        { label: "Convert", icon: images.arrow_swap },
                      ].map((action) => (
                        <div key={`${wallet.name}-${action.label}`} className="text-center">
                          <button className="inline-flex h-[36.12px] w-[36.12px] items-center justify-center rounded-[8.67px] bg-[#F2F4F7]">
                            <img
                              src={action.icon}
                              alt={action.label}
                              className={`h-[17.34px] w-[17.34px] object-contain ${action.rotate ?? ""}`}
                            />
                          </button>
                          <p className="mt-0.5 text-[6px] text-[#7B8A96]">{action.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-[42px] leading-none">
                    {wallet.amount.includes(".") ? (
                      <>
                        <span className="text-white">{wallet.amount.slice(0, wallet.amount.lastIndexOf("."))}</span>
                        <span className="text-[#8A96A3]">{wallet.amount.slice(wallet.amount.lastIndexOf("."))}</span>
                      </>
                    ) : (
                      <span className="text-white">{wallet.amount}</span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      , document.body)}

      {showCryptoWalletsPopup &&
        typeof document !== "undefined" &&
        createPortal(
        <div
          className="fixed inset-0 z-[600] flex items-start justify-end bg-[rgba(12,29,51,0.7)] p-3 md:p-4"
          style={{ backdropFilter: "blur(5px)", WebkitBackdropFilter: "blur(5px)" }}
          onClick={() => setShowCryptoWalletsPopup(false)}
        >
          <div
            className="h-[calc(100vh-24px)] w-full max-w-[380px] overflow-hidden rounded-2xl border border-[#1B2A36] bg-[#020C19] shadow-2xl md:h-[calc(100vh-32px)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-[50px] items-center justify-between border-b border-[rgba(255,255,255,0.1)] px-4">
              <p
                className="text-white"
                style={{ fontWeight: 590, fontSize: "16px", lineHeight: "100%" }}
              >
                Crypto Wallets - Master Wallets
              </p>
              <button
                onClick={() => setShowCryptoWalletsPopup(false)}
                className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#41586D] text-[10px] text-white"
              >
                ×
              </button>
            </div>
            <div className="hide-scrollbar h-[calc(100%-50px)] space-y-2 overflow-y-auto p-3">
              {cryptoWalletPopupRows.map((wallet) => (
                <div key={wallet.name} className="rounded-lg border border-[#1E2F40] bg-[#0D1928] p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1E2F40]">
                        <img src={wallet.icon} alt={wallet.name} className="h-4 w-4 rounded-full object-cover" />
                      </span>
                      <p className="text-[9px] text-[#D7E8FB]">{wallet.name}</p>
                    </div>
                    <div className="flex gap-1">
                      {[
                        { label: "Send", icon: images.send_2 },
                        { label: "Receive", icon: images.send_2, rotate: "rotate-180" },
                        { label: "P2P", icon: images.arrow_swap },
                      ].map((action) => (
                        <div key={`${wallet.name}-${action.label}`} className="text-center">
                          <button className="inline-flex h-[36.12px] w-[36.12px] items-center justify-center rounded-[8.67px] bg-[#F2F4F7]">
                            <img
                              src={action.icon}
                              alt={action.label}
                              className={`h-[17.34px] w-[17.34px] object-contain ${action.rotate ?? ""}`}
                            />
                          </button>
                          <p className="mt-0.5 text-[6px] text-[#7B8A96]">{action.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-[42px] leading-none">
                    {wallet.amount.includes(".") ? (
                      <>
                        <span className="text-white">{wallet.amount.slice(0, wallet.amount.lastIndexOf("."))}</span>
                        <span className="text-[#8A96A3]">{wallet.amount.slice(wallet.amount.lastIndexOf("."))}</span>
                      </>
                    ) : (
                      <span className="text-white">{wallet.amount}</span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      , document.body)}

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <button className="h-[30px] rounded-full border border-[#27353B] bg-[#101F26] px-4 text-[10px] text-white">Bulk Action</button>
        <div className="relative" ref={walletTypeFilterRef}>
          <button
            onClick={() => setShowWalletTypeFilterDropdown((prev) => !prev)}
            className="flex h-[30px] items-center gap-1 rounded-full border border-[#27353B] bg-[#101F26] px-4 text-[10px] text-white"
          >
            {selectedWalletTypeFilter}
            <ChevronDown size={10} />
          </button>
          {showWalletTypeFilterDropdown && (
            <div
              className="absolute left-0 z-20 mt-1 w-[118px] overflow-hidden rounded-lg border border-[#27353B]"
              style={{
                backgroundColor: "rgba(16, 31, 38, 0.25)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                boxShadow: "5px 5px 15px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              {walletTypeFilterOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedWalletTypeFilter(option);
                    setShowWalletTypeFilterDropdown(false);
                  }}
                  className="block w-full px-3 py-2 text-left text-[10px] text-white hover:bg-[#1B2D36]"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="relative" ref={providerFilterRef}>
          <button
            onClick={() => setShowProviderFilterDropdown((prev) => !prev)}
            className="flex h-[30px] items-center gap-1 rounded-full border border-[#27353B] bg-[#101F26] px-4 text-[10px] text-white"
          >
            {selectedProviderFilter}
            <ChevronDown size={10} />
          </button>
          {showProviderFilterDropdown && (
            <div
              className="absolute left-0 z-20 mt-1 w-[122px] overflow-hidden rounded-lg border border-[#27353B]"
              style={{
                backgroundColor: "rgba(16, 31, 38, 0.25)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                boxShadow: "5px 5px 15px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              {providerFilterOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedProviderFilter(option);
                    setShowProviderFilterDropdown(false);
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

      <section className="w-full overflow-hidden rounded-[14px]" style={{ backgroundColor: "#0B1820" }}>
        <div
          className="flex flex-col gap-3 px-4 py-3 md:h-[60px] md:flex-row md:items-center md:justify-between"
          style={{ backgroundColor: "#020B16" }}
        >
          <h3 className="text-[20px] text-white">Wallet Activity</h3>
          <div className="flex h-[30px] w-full max-w-[210px] items-center rounded-full bg-[#0F1722] px-3">
            <Search size={12} className="mr-2 text-[#7B8A96]" />
            <input
              value={activitySearch}
              onChange={(event) => setActivitySearch(event.target.value)}
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
                    className="master-checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-3 py-3">Activity</th>
                <th className="px-3 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {loadingActivity ? (
                <tr className="border-b border-[#2B363E] text-[11px] text-[#CFD7DD]">
                  <td colSpan={3} className="px-3 py-6 text-center">Loading activity...</td>
                </tr>
              ) : filteredRows.length === 0 ? (
                <tr className="border-b border-[#2B363E] text-[11px] text-[#CFD7DD]">
                  <td colSpan={3} className="px-3 py-6 text-center">No wallet activity found</td>
                </tr>
              ) : (
                filteredRows.map((row) => (
                <tr key={row.id} className="border-b border-[#2B363E] text-[11px] text-white">
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      className="master-checkbox"
                      checked={selectedIds.has(row.id)}
                      onChange={() => toggleRowSelection(row.id)}
                    />
                  </td>
                  <td className="px-3 py-3 text-[#CFD7DD]">{row.activity}</td>
                  <td className="px-3 py-3 text-[#CFD7DD]">{row.date}</td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default MasterWallet;
