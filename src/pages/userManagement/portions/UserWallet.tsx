import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useParams, useNavigate } from "react-router-dom";
import images from "../../../constants/images";

const UserWallet: React.FC = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [selectedTimeRange, setSelectedTimeRange] = useState("All Time");
  const [selectedFiatCurrency, setSelectedFiatCurrency] = useState("NGN");
  const [selectedCryptoCurrency, setSelectedCryptoCurrency] = useState("BTC");
  const [selectedDisplayCurrency, setSelectedDisplayCurrency] = useState("USD");
  const [showFiatCurrencyDropdown, setShowFiatCurrencyDropdown] = useState(false);
  const [showCryptoCurrencyDropdown, setShowCryptoCurrencyDropdown] = useState(false);
  const [showDisplayCurrencyDropdown, setShowDisplayCurrencyDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCryptoWalletDropdown, setShowCryptoWalletDropdown] = useState(false);
  const [showFiatWalletsModal, setShowFiatWalletsModal] = useState(false);
  const [showCryptoWalletsModal, setShowCryptoWalletsModal] = useState(false);
  const [showSendFundsModal, setShowSendFundsModal] = useState(false);
  const [showFundWalletModal, setShowFundWalletModal] = useState(false);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [showFundCryptoWalletModal, setShowFundCryptoWalletModal] = useState(false);
  const [showReceiveCryptoModal, setShowReceiveCryptoModal] = useState(false);
  const [showReceiveTokenDropdown, setShowReceiveTokenDropdown] = useState(false);
  const [selectedReceiveToken, setSelectedReceiveToken] = useState("Ethereum");
  const [showReceiveNetworkDropdown, setShowReceiveNetworkDropdown] = useState(false);
  const [selectedReceiveNetwork, setSelectedReceiveNetwork] = useState("Ethereum");
  const [showPaymentRouteDropdown, setShowPaymentRouteDropdown] = useState(false);
  const [selectedPaymentRoute, setSelectedPaymentRoute] = useState("");
  const [showFundingRouteDropdown, setShowFundingRouteDropdown] = useState(false);
  const [selectedFundingRoute, setSelectedFundingRoute] = useState("Bank Transfer");
  const [showSelectWalletDropdown, setShowSelectWalletDropdown] = useState(false);
  const [selectedFundWallet, setSelectedFundWallet] = useState("");
  const [showSelectTokenDropdown, setShowSelectTokenDropdown] = useState(false);
  const [selectedToken, setSelectedToken] = useState("");
  const [showSelectNetworkDropdown, setShowSelectNetworkDropdown] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [showFundCryptoTokenDropdown, setShowFundCryptoTokenDropdown] = useState(false);
  const [selectedFundCryptoToken, setSelectedFundCryptoToken] = useState("");
  const [showFundCryptoNetworkDropdown, setShowFundCryptoNetworkDropdown] = useState(false);
  const [selectedFundCryptoNetwork, setSelectedFundCryptoNetwork] = useState("");
  const [showSendFromWalletDropdown, setShowSendFromWalletDropdown] = useState(false);
  const [selectedSendFromWallet, setSelectedSendFromWallet] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<Set<string>>(new Set());
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [cryptoDropdownPosition, setCryptoDropdownPosition] = useState({ top: 0, left: 0 });

  const fiatCurrencyButtonRef = useRef<HTMLButtonElement>(null);
  const fiatCurrencyDropdownRef = useRef<HTMLDivElement>(null);
  const cryptoCurrencyButtonRef = useRef<HTMLButtonElement>(null);
  const cryptoCurrencyDropdownRef = useRef<HTMLDivElement>(null);
  const paymentRouteDropdownRef = useRef<HTMLDivElement>(null);
  const fundingRouteDropdownRef = useRef<HTMLDivElement>(null);
  const selectWalletDropdownRef = useRef<HTMLDivElement>(null);
  const sendFromWalletDropdownRef = useRef<HTMLDivElement>(null);
  const selectTokenDropdownRef = useRef<HTMLDivElement>(null);
  const selectNetworkDropdownRef = useRef<HTMLDivElement>(null);
  const fundCryptoTokenDropdownRef = useRef<HTMLDivElement>(null);
  const fundCryptoNetworkDropdownRef = useRef<HTMLDivElement>(null);
  const receiveTokenDropdownRef = useRef<HTMLDivElement>(null);
  const receiveNetworkDropdownRef = useRef<HTMLDivElement>(null);

  const timeRanges = ["All Time", "7 Days", "1 month", "1 Year", "Custom"];

  const fiatCurrencies = [
    { value: "NGN", name: "NGN", flag: images.flag },
    { value: "USD", name: "USD", flag: images.flag2 },
    { value: "GHC", name: "GHC", flag: images.flag3 }
  ];

  const walletOptions = [
    {
      id: "all",
      name: "All Wallets balance",
      country: "",
      currency: "",
      balance: "N200,000",
      icon: images.analytics_up,
      isAllWallets: true
    },
    {
      id: "NGN",
      name: "Nigeria (NGN)",
      country: "Nigeria",
      currency: "NGN",
      balance: "N200,000",
      flag: images.flag
    },
    {
      id: "BWP",
      name: "Botswana (BWP)",
      country: "Botswana",
      currency: "BWP",
      balance: "P200,000",
      flag: images.flag2
    },
    {
      id: "GHC",
      name: "Ghana (GHC)",
      country: "Ghana",
      currency: "GHC",
      balance: "C200,000",
      flag: images.flag3
    },
    {
      id: "KES",
      name: "Kenya (KES)",
      country: "Kenya",
      currency: "KES",
      balance: "Ksh200,000",
      flag: images.flag4
    },
    {
      id: "ZAR",
      name: "South Africa (ZAR)",
      country: "South Africa",
      currency: "ZAR",
      balance: "R200,000",
      flag: images.flag5
    },
    {
      id: "TZS",
      name: "Tanzania (TZS)",
      country: "Tanzania",
      currency: "TZS",
      balance: "Tsh200,000",
      flag: images.flag6
    },
    {
      id: "UGX",
      name: "Uganda (UGX)",
      country: "Uganda",
      currency: "UGX",
      balance: "Ush200,000",
      flag: images.flag7
    }
  ];

  const [selectedWallet, setSelectedWallet] = useState("NGN");
  const [selectedCryptoWallet, setSelectedCryptoWallet] = useState("BTC");

  const cryptoCurrencies = [
    { value: "BTC", name: "BTC" },
    { value: "ETH", name: "ETH" },
    { value: "USDT", name: "USDT" },
    { value: "USDC", name: "USDC" }
  ];

  const cryptoWalletOptions = [
    {
      id: "all",
      name: "All Wallets balance",
      currency: "",
      balance: "0.0003 BTC",
      icon: images.analytics_up,
      isAllWallets: true
    },
    {
      id: "BTC",
      name: "Bitcoin (BTC)",
      currency: "BTC",
      balance: "0.0003 BTC",
      icon: images.logos_bitcoin
    },
    {
      id: "ETH",
      name: "Ethereum (ETH)",
      currency: "ETH",
      balance: "0.0123 ETH",
      icon: images.Group2
    },
    {
      id: "USDT",
      name: "Tether (USDT)",
      currency: "USDT",
      balance: "1,000 USDT",
      icon: images.cryptocurrency_color_usdt
    },
    {
      id: "USDC",
      name: "USD Coin (USDC)",
      currency: "USDC",
      balance: "1,000 USDC",
      icon: images.Group
    }
  ];

  const displayCurrencies = [
    { value: "USD", name: "USD" },
    { value: "NGN", name: "NGN" },
    { value: "EUR", name: "EUR" }
  ];

  const quickFiatWallets = [
    { currency: "NGN", balance: "N20,000" },
    { currency: "NGN", balance: "N20,000" },
    { currency: "NGN", balance: "N20,000" }
  ];

  const quickCryptoWallets = [
    { currency: "USDT", balance: "1,000" },
    { currency: "USDC", balance: "1,000" },
    { currency: "ETH", balance: "0.0123" }
  ];

  const walletActivities = [
    { id: "1", activity: "BTC Wallet funded", date: "22/10/25 - 07:22 AM" },
    { id: "2", activity: "NGN to GHC Conversion completed", date: "22/10/25 - 07:22 AM" }
  ];

  // Calculate dropdown position
  const calculateFiatDropdownPosition = () => {
    if (fiatCurrencyButtonRef.current) {
      const rect = fiatCurrencyButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.right - 490 // Position dropdown so its right edge aligns with button's right edge
      });
    }
  };

  // Calculate crypto dropdown position
  const calculateCryptoDropdownPosition = () => {
    if (cryptoCurrencyButtonRef.current) {
      const rect = cryptoCurrencyButtonRef.current.getBoundingClientRect();
      setCryptoDropdownPosition({
        top: rect.bottom + 8,
        left: rect.right - 490 + 30 // Position dropdown so its right edge aligns with button's right edge + 30px margin
      });
    }
  };

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fiatCurrencyDropdownRef.current &&
        !fiatCurrencyDropdownRef.current.contains(event.target as Node) &&
        fiatCurrencyButtonRef.current &&
        !fiatCurrencyButtonRef.current.contains(event.target as Node)
      ) {
        setShowFiatCurrencyDropdown(false);
      }
    };

    const handleScroll = () => {
      if (showFiatCurrencyDropdown) {
        calculateFiatDropdownPosition();
      }
    };

    if (showFiatCurrencyDropdown) {
      calculateFiatDropdownPosition();
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", calculateFiatDropdownPosition);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", calculateFiatDropdownPosition);
    };
  }, [showFiatCurrencyDropdown]);

  // Handle click outside crypto dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cryptoCurrencyDropdownRef.current &&
        !cryptoCurrencyDropdownRef.current.contains(event.target as Node) &&
        cryptoCurrencyButtonRef.current &&
        !cryptoCurrencyButtonRef.current.contains(event.target as Node)
      ) {
        setShowCryptoCurrencyDropdown(false);
      }
    };

    const handleScroll = () => {
      if (showCryptoCurrencyDropdown) {
        calculateCryptoDropdownPosition();
      }
    };

    if (showCryptoCurrencyDropdown) {
      calculateCryptoDropdownPosition();
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", calculateCryptoDropdownPosition);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", calculateCryptoDropdownPosition);
    };
  }, [showCryptoCurrencyDropdown]);

  // Handle click outside payment route dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        paymentRouteDropdownRef.current &&
        !paymentRouteDropdownRef.current.contains(event.target as Node)
      ) {
        setShowPaymentRouteDropdown(false);
      }
    };

    if (showPaymentRouteDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPaymentRouteDropdown]);

  // Handle click outside funding route dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const dropdown = document.querySelector('[data-funding-route-dropdown]');
      if (dropdown && !dropdown.contains(target)) {
        setShowFundingRouteDropdown(false);
      }
    };

    if (showFundingRouteDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFundingRouteDropdown]);

  // Handle click outside select wallet dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectWalletDropdownRef.current &&
        !selectWalletDropdownRef.current.contains(event.target as Node)
      ) {
        setShowSelectWalletDropdown(false);
      }
    };

    if (showSelectWalletDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSelectWalletDropdown]);

  // Handle click outside send from wallet dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sendFromWalletDropdownRef.current &&
        !sendFromWalletDropdownRef.current.contains(event.target as Node)
      ) {
        setShowSendFromWalletDropdown(false);
      }
    };

    if (showSendFromWalletDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSendFromWalletDropdown]);

  // Handle click outside select token dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectTokenDropdownRef.current &&
        !selectTokenDropdownRef.current.contains(event.target as Node)
      ) {
        setShowSelectTokenDropdown(false);
      }
    };

    if (showSelectTokenDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSelectTokenDropdown]);

  // Handle click outside select network dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectNetworkDropdownRef.current &&
        !selectNetworkDropdownRef.current.contains(event.target as Node)
      ) {
        setShowSelectNetworkDropdown(false);
      }
    };

    if (showSelectNetworkDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSelectNetworkDropdown]);

  // Handle click outside fund crypto token dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fundCryptoTokenDropdownRef.current &&
        !fundCryptoTokenDropdownRef.current.contains(event.target as Node)
      ) {
        setShowFundCryptoTokenDropdown(false);
      }
    };

    if (showFundCryptoTokenDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFundCryptoTokenDropdown]);

  // Handle click outside fund crypto network dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fundCryptoNetworkDropdownRef.current &&
        !fundCryptoNetworkDropdownRef.current.contains(event.target as Node)
      ) {
        setShowFundCryptoNetworkDropdown(false);
      }
    };

    if (showFundCryptoNetworkDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFundCryptoNetworkDropdown]);

  // Handle click outside receive token dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        receiveTokenDropdownRef.current &&
        !receiveTokenDropdownRef.current.contains(event.target as Node)
      ) {
        setShowReceiveTokenDropdown(false);
      }
    };

    if (showReceiveTokenDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showReceiveTokenDropdown]);

  // Handle click outside receive network dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        receiveNetworkDropdownRef.current &&
        !receiveNetworkDropdownRef.current.contains(event.target as Node)
      ) {
        setShowReceiveNetworkDropdown(false);
      }
    };

    if (showReceiveNetworkDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showReceiveNetworkDropdown]);

  const handleSelectAll = () => {
    if (selectedActivities.size === walletActivities.length && walletActivities.length > 0) {
      setSelectedActivities(new Set());
    } else {
      setSelectedActivities(new Set(walletActivities.map(a => a.id)));
    }
  };

  const handleSelectActivity = (activityId: string) => {
    setSelectedActivities((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(activityId)) {
        newSet.delete(activityId);
      } else {
        newSet.add(activityId);
      }
      return newSet;
    });
  };

  return (
    <div>
      {/* Top Navigation Bar */}
      <div
        className="md:mx-[-32px] mx-[-16px] md:mt-[-32px] mt-[-16px] mb-6 md:mb-6"
        style={{
          background: 'linear-gradient(to right, #0B1B20, #0A1320)',
          width: 'calc(100% + 64px)'
        }}
      >
        <div
          className="flex gap-2 md:gap-6 border-b border-gray-700 flex-wrap md:flex-nowrap overflow-x-auto"
          style={{
            width: '100%',
            height: '50px',
            paddingLeft: '16px',
            paddingRight: '0px',
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
            borderBottomWidth: '0.3px',
            borderBottomStyle: 'solid',
            borderBottomColor: 'rgba(156, 163, 175, 0.5)',
            position: 'relative'
          }}
        >
          <button
            onClick={() => navigate(`/user/management/profile/${username}`)}
            className="text-gray-400 hover:text-white transition-colors"
            style={{
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              marginLeft: '16px'
            }}
          >
            User Profile
          </button>
          <button
            className="relative"
            style={{
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              color: '#95D440',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            User Wallet
            <span
              style={{
                position: 'absolute',
                bottom: '-0.3px',
                left: 0,
                right: 0,
                height: '2px',
                backgroundColor: '#95D440'
              }}
            ></span>
          </button>
          <button
            onClick={() => navigate(`/user/management/${username}/transactions`)}
            className="text-gray-400 hover:text-white transition-colors"
            style={{
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            Transactions
          </button>
          <button
            onClick={() => navigate(`/user/management/${username}/p2p`)}
            className="text-gray-400 hover:text-white transition-colors"
            style={{
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            P2P Profile
          </button>
        </div>
      </div>

      {/* User Wallet Section with Gradient Background */}
      <div
        className="rounded-lg p-6 mb-6"
        style={{
          background: 'linear-gradient(to right, #0B1B20, #0A1420)',
          borderRadius: '15px'
        }}
      >
        {/* Page Title and Time Filter */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1
              style={{
                fontFamily: 'Agbalumo',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '30px',
                lineHeight: '100%',
                letterSpacing: '0%'
              }}
              className="text-white mb-2"
            >
              User Wallet - {username ? decodeURIComponent(username) : 'User'}
            </h1>
            <p className="mt-[20px]" style={{
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#757E81'
            }}>View manage my user wallet details</p>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-[10px] mb-[15px] mt-2 flex-wrap md:flex-nowrap">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedTimeRange(range)}
                  style={{
                    minWidth: '68px',
                    height: '34px',
                    borderRadius: '100px',
                    borderWidth: selectedTimeRange === range ? '0px' : '0.3px',
                    borderStyle: selectedTimeRange === range ? 'none' : 'solid',
                    borderColor: selectedTimeRange === range ? 'transparent' : '#383F49',
                    paddingTop: '11px',
                    paddingRight: '18px',
                    paddingBottom: '11px',
                    paddingLeft: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: 274,
                    fontStyle: 'normal',
                    fontSize: '13px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    cursor: 'pointer'
                  }}
                  className={`transition-colors whitespace-nowrap ${selectedTimeRange === range
                    ? "bg-white text-gray-900"
                    : "bg-transparent text-white"
                    }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <div
              style={{
                width: '100%',
                height: '0.3px',
                backgroundColor: 'rgba(156, 163, 175, 0.5)',
              }}
            ></div>
          </div>
        </div>

        {/* Transaction Summary Cards */}
        <div className="flex flex-col md:flex-row gap-4">
          <div
            className="flex-1 rounded-lg p-4 flex items-center gap-4"
            style={{
              background: 'linear-gradient(135deg, #3E77B9 0%, #2A5A8F 100%)',
              borderRadius: '15px',
              height: '90px'
            }}
          >
            <div
              className="rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#4A8BC5'
              }}
            >
              <img src={images.Vector3} alt="Wallet" style={{ width: '24px', height: '24px' }} />
            </div>
            <div className="flex flex-col">
              <span
                style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  marginBottom: '4px',
                  color: '#E6EEF6'
                }}
              >
                Total Transactions
              </span>
              <p
                className="text-white font-bold"
                style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '28px',
                  fontWeight: 700,
                  lineHeight: '1'
                }}
              >
                250
              </p>
            </div>
          </div>
          <div
            className="flex-1 rounded-lg p-4 flex items-center gap-4"
            style={{
              background: 'linear-gradient(135deg, #3E77B9 0%, #2A5A8F 100%)',
              borderRadius: '15px',
              height: '90px'
            }}
          >
            <div
              className="rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#4A8BC5'
              }}
            >
              <img src={images.Vector3} alt="Wallet" style={{ width: '24px', height: '24px' }} />
            </div>
            <div className="flex flex-col">
              <span
                style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  marginBottom: '4px',
                  color: '#E6EEF6'
                }}
              >
                Fiat Transactions
              </span>
              <p
                className="text-white font-bold"
                style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '28px',
                  fontWeight: 700,
                  lineHeight: '1'
                }}
              >
                150
              </p>
            </div>
          </div>
          <div
            className="flex-1 rounded-lg p-4 flex items-center gap-4"
            style={{
              background: 'linear-gradient(135deg, #3E77B9 0%, #2A5A8F 100%)',
              borderRadius: '15px',
              height: '90px'
            }}
          >
            <div
              className="rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#4A8BC5'
              }}
            >
              <img src={images.Vector3} alt="Wallet" style={{ width: '24px', height: '24px' }} />
            </div>
            <div className="flex flex-col">
              <span
                style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  marginBottom: '4px',
                  color: '#E6EEF6'
                }}
              >
                Crypto Transactions
              </span>
              <p
                className="text-white font-bold"
                style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '28px',
                  fontWeight: 700,
                  lineHeight: '1'
                }}
              >
                100
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fiat and Crypto Wallets Section */}
      <div
        className="rounded-lg p-6 mb-6"
        style={{
          background: 'linear-gradient(to right, #0B1B20, #0A1420)',
          borderRadius: '15px'
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fiat Wallets */}
          <div
            className="rounded-lg"
            style={{
              backgroundColor: '#0A1520',
              borderRadius: '15px',
              border: '1px solid #21436B',
              height: '326px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header Section */}
            <div
              style={{
                backgroundColor: '#19242E',
                borderBottom: '1px solid #3B434E',
                height: '55px',
                minHeight: '55px',
                maxHeight: '55px',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '24px',
                paddingRight: '24px',
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <div className="flex items-center justify-between" style={{ width: '100%' }}>
                {/* Left Icon */}
                <div
                  className="rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    width: '38px',
                    height: '38px',
                    backgroundColor: '#3E77B9'
                  }}
                >
                  <img
                    src={images.analytics_up}
                    alt="Analytics"
                    style={{
                      width: '20px',
                      height: '20px',
                      filter: 'brightness(0) saturate(100%)',
                      opacity: 1
                    }}
                  />
                </div>

                {/* Center Text Content */}
                <div className="flex-1" style={{ marginLeft: '16px' }}>
                  <h3
                    className="text-white"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      fontWeight: 274,
                      fontStyle: 'normal',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      margin: 0
                    }}
                  >
                    Fiat Wallets
                  </h3>
                  <p
                    className="text-gray-400"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '10px',
                      paddingTop: '5px',
                      fontWeight: 274,
                      fontStyle: 'normal',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      margin: 0,
                      marginTop: '4px'
                    }}
                  >
                    View all fiat wallets balances including
                  </p>
                </div>

                {/* Right Search Icon */}
                <button
                  onClick={() => setShowFiatWalletsModal(true)}
                  className="text-white transition-colors rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: '#1A222F',
                    border: '0.3px solid #2B333E',
                    borderRadius: '100px',
                    cursor: 'pointer',
                    width: '48px',
                    height: '38px',
                    paddingTop: '10px',
                    paddingRight: '15px',
                    paddingBottom: '10px',
                    paddingLeft: '15px',
                    gap: '8px'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Main Content Section */}
            <div
              className="relative"
              style={{
                flex: 1,
                paddingLeft: '24px',
                paddingRight: '24px',
                paddingTop: '12px',
                paddingBottom: '16px',
                overflow: 'visible'
              }}
            >
              <img
                src={images.Rectangle_36}
                alt="Background pattern"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  opacity: 0.5,
                  mixBlendMode: 'overlay',
                  filter: 'brightness(0) invert(1)',
                  pointerEvents: 'none'
                }}
              />
              <div className="relative z-10">
                {/* Main Fiat Wallet Card */}
                <div
                  className="rounded-lg p-6 relative"
                  style={{
                    background: 'linear-gradient(135deg, #3E77B9 0%, #2A5A8F 100%)',
                    borderRadius: '15px',
                    marginTop: '6px',
                    marginBottom: '24px',
                    height: '237px',
                    overflow: 'visible'
                  }}
                >
                  <img
                    src={images.Rectangle_36}
                    alt="Background pattern"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      opacity: 1.2,
                      mixBlendMode: 'screen',
                      filter: 'brightness(0) invert(1)',
                      pointerEvents: 'none',
                      zIndex: 1
                    }}
                  />
                  <img
                    src={images.Rectangle_36}
                    alt="Background pattern overlay"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      opacity: 0.9,
                      mixBlendMode: 'overlay',
                      marginTop: '9px',
                      filter: 'brightness(0) invert(1)',
                      pointerEvents: 'none',
                      zIndex: 2
                    }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-4 relative">
                      <span
                        className="text-white"
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '10px',
                          fontWeight: 274,
                          fontStyle: 'normal',
                          lineHeight: '100%',
                          letterSpacing: '0%',
                          textAlign: 'center',
                          paddingTop: '28px'
                        }}
                      >
                        NGN Balance
                      </span>
                      <div className="absolute right-0 top-0" style={{ zIndex: 20 }}>
                        <button
                          ref={fiatCurrencyButtonRef}
                          onClick={() => {
                            setShowFiatCurrencyDropdown(!showFiatCurrencyDropdown);
                            if (!showFiatCurrencyDropdown) {
                              setTimeout(() => calculateFiatDropdownPosition(), 0);
                            }
                          }}
                          className="flex items-center gap-2 text-white"
                          style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '100px',
                            padding: '6px 12px',
                            cursor: 'pointer',
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '12px',
                            fontWeight: 400,
                            position: 'relative',
                            zIndex: 20
                          }}
                        >
                          {(() => {
                            const selectedWalletOption = walletOptions.find(w => w.id === selectedWallet);
                            if (selectedWalletOption && !selectedWalletOption.isAllWallets) {
                              return (
                                <>
                                  <img
                                    src={selectedWalletOption.flag}
                                    alt={selectedWalletOption.country}
                                    style={{
                                      width: '16px',
                                      height: '16px',
                                      borderRadius: '50%',
                                      objectFit: 'cover'
                                    }}
                                  />
                                  <span>{selectedWalletOption.currency}</span>
                                </>
                              );
                            }
                            return (
                              <>
                                <img
                                  src={images.flag}
                                  alt="Flag"
                                  style={{
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                  }}
                                />
                                <span>{selectedFiatCurrency}</span>
                              </>
                            );
                          })()}
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </button>
                        {showFiatCurrencyDropdown && createPortal(
                          <>
                            <style>{`
                              .fiat-currency-dropdown::-webkit-scrollbar {
                                display: none;
                              }
                            `}</style>
                            <div
                              ref={fiatCurrencyDropdownRef}
                              className="fixed rounded-[20px] bg-[#020C19] w-[490px] py-2 overflow-y-auto overflow-x-hidden shadow-lg fiat-currency-dropdown"
                              style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                top: `${dropdownPosition.top}px`,
                                left: `${dropdownPosition.left}px`,
                                zIndex: 9999
                              }}
                            >
                              {walletOptions.map((wallet) => (
                                <button
                                  key={wallet.id}
                                  onClick={() => {
                                    setSelectedWallet(wallet.id);
                                    if (!wallet.isAllWallets) {
                                      setSelectedFiatCurrency(wallet.currency);
                                    }
                                    setShowFiatCurrencyDropdown(false);
                                  }}
                                  className="w-full text-left px-4 py-3 text-white hover:bg-white/5 transition-colors flex items-center justify-between text-sm font-normal border-b-0"
                                >
                                  <div className="flex items-center gap-3 flex-1">
                                    {wallet.isAllWallets ? (
                                      <img
                                        src={wallet.icon}
                                        alt="All Wallets"
                                        className="w-5 h-5 object-contain"
                                      />
                                    ) : (
                                      <img
                                        src={wallet.flag}
                                        alt={wallet.country}
                                        className="w-5 h-5 rounded-full object-cover"
                                      />
                                    )}
                                    <div className="flex flex-col">
                                      <span className="text-sm font-normal">
                                        {wallet.name}
                                      </span>
                                      {wallet.balance && (
                                        <span className="text-xs font-normal text-white/60 mt-0.5">
                                          Bal : {wallet.balance}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    className={`w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0 ${selectedWallet === wallet.id
                                      ? 'border-2 border-[#A9EF45] bg-[#A9EF45]'
                                      : 'border-2 border-white bg-transparent'
                                      }`}
                                  >
                                    {selectedWallet === wallet.id && (
                                      <div className="w-2 h-2 rounded-full bg-black" />
                                    )}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </>,
                          document.body
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-center mb-6" style={{ position: 'relative' }}>
                      <div className="flex items-baseline gap-1">
                        <span
                          className="text-white"
                          style={{
                            fontFamily: 'Agbalumo, sans-serif',
                            fontSize: '40px',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            lineHeight: '100%',
                            letterSpacing: '0%'
                          }}
                        >
                          $150,000
                        </span>
                        <span
                          className="text-gray-300"
                          style={{
                            fontFamily: 'Agbalumo, sans-serif',
                            fontSize: '40px',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            lineHeight: '100%',
                            letterSpacing: '0%'
                          }}
                        >
                          .00
                        </span>
                        <div className="relative" style={{ marginLeft: '8px' }}>
                          <button
                            onClick={() => setShowDisplayCurrencyDropdown(!showDisplayCurrencyDropdown)}
                            className="flex items-center gap-1 text-white"
                            style={{
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '12px',
                              fontWeight: 400,
                              display: 'flex',
                              alignItems: 'center',
                              padding: '0'
                            }}
                          >
                            <span>{selectedDisplayCurrency}</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ flexShrink: 0 }}>
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </button>
                          {showDisplayCurrencyDropdown && (
                            <div
                              className="absolute right-0 mt-2 z-10 rounded-lg overflow-hidden"
                              style={{
                                backgroundColor: '#020C19',
                                minWidth: '100px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                              }}
                            >
                              {displayCurrencies.map((currency) => (
                                <button
                                  key={currency.value}
                                  onClick={() => {
                                    setSelectedDisplayCurrency(currency.value);
                                    setShowDisplayCurrencyDropdown(false);
                                  }}
                                  className="w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors"
                                  style={{
                                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                                    fontSize: '12px'
                                  }}
                                >
                                  {currency.name}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                      </div>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <div className="flex flex-col items-center gap-1">
                        <button
                          onClick={() => setShowSendFundsModal(true)}
                          className="flex items-center justify-center text-white"
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '12px',
                            background: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                          }}
                        >
                          <img
                            src={images.send_square}
                            alt="Send"
                            style={{ width: '24px', height: '24px' }}
                          />
                        </button>
                        <span
                          className="text-white"
                          style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '10px',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            lineHeight: '100%',
                            letterSpacing: '1px',
                            paddingTop: '4px'
                          }}
                        >
                          Send
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <button
                          onClick={() => setShowFundWalletModal(true)}
                          className="flex items-center justify-center text-white"
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '12px',
                            background: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                          }}
                        >
                          <img
                            src={images.send_2}
                            alt="Fund"
                            style={{ width: '24px', height: '24px', transform: 'rotate(-20deg)' }}
                          />
                        </button>
                        <span
                          className="text-white"
                          style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '10px',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            lineHeight: '100%',
                            letterSpacing: '0.5px',
                            paddingTop: '4px'
                          }}
                        >
                          Fund
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <button
                          className="flex items-center justify-center text-white"
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '12px',
                            background: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                          }}
                        >
                          <img
                            src={images.send_2}
                            alt="Withdraw"
                            style={{ width: '24px', height: '24px', transform: 'rotate(-190deg)' }}
                          />
                        </button>
                        <span
                          className="text-white"
                          style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '10px',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            lineHeight: '100%',
                            letterSpacing: '0.5px',
                            paddingTop: '4px'
                          }}
                        >
                          Withdraw
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <button
                          onClick={() => setShowConvertModal(true)}
                          className="flex items-center justify-center text-white"
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '12px',
                            background: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                          }}
                        >
                          <img
                            src={images.arrow_swap}
                            alt="Convert"
                            style={{ width: '24px', height: '24px' }}
                          />
                        </button>
                        <span
                          className="text-white"
                          style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '10px',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            lineHeight: '100%',
                            letterSpacing: '0.5px',
                            paddingTop: '4px'
                          }}
                        >
                          Convert
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Crypto Wallets */}
          <div
            className="rounded-lg"
            style={{
              backgroundColor: '#0A1520',
              borderRadius: '15px',
              border: '1px solid #21436B',
              height: '326px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header Section */}
            <div
              style={{
                backgroundColor: '#19242E',
                borderBottom: '1px solid #3B434E',
                height: '55px',
                minHeight: '55px',
                maxHeight: '55px',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '24px',
                paddingRight: '24px',
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <div className="flex items-center justify-between" style={{ width: '100%' }}>
                {/* Left Icon */}
                <div
                  className="rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    width: '38px',
                    height: '38px',
                    background: 'linear-gradient(to bottom, #94E643, #22B73D)'
                  }}
                >
                  <img
                    src={images.CurrencyBtc}
                    alt="BTC"
                    style={{
                      width: '20px',
                      height: '20px',
                      filter: 'brightness(0) saturate(100%)',
                      opacity: 1
                    }}
                  />
                </div>

                {/* Center Text Content */}
                <div className="flex-1" style={{ marginLeft: '16px' }}>
                  <h3
                    className="text-white"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      fontWeight: 274,
                      fontStyle: 'normal',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      margin: 0
                    }}
                  >
                    Crypto Wallets
                  </h3>
                  <p
                    className="text-gray-400"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '10px',
                      paddingTop: '5px',
                      fontWeight: 274,
                      fontStyle: 'normal',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      margin: 0,
                      marginTop: '4px'
                    }}
                  >
                    View all your crypto wallets and balances including
                  </p>
                </div>

                {/* Right Search Icon */}
                <button
                  onClick={() => setShowCryptoWalletsModal(true)}
                  className="text-white transition-colors rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: '#1A222F',
                    border: '0.3px solid #2B333E',
                    borderRadius: '100px',
                    cursor: 'pointer',
                    width: '48px',
                    height: '38px',
                    paddingTop: '10px',
                    paddingRight: '15px',
                    paddingBottom: '10px',
                    paddingLeft: '15px',
                    gap: '8px'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Main Content Section */}
            <div
              className="relative overflow-hidden"
              style={{
                flex: 1,
                paddingLeft: '24px',
                paddingRight: '24px',
                paddingTop: '12px',
                paddingBottom: '16px',
                borderTop: '1px solid #3B434E',
                borderLeft: '1px solid #21436B',
                borderRight: '1px solid #21436B',
                borderBottom: '1px solid #21436B'
              }}
            >
              <img
                src={images.Rectangle_36}
                alt="Background pattern"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  opacity: 0.5,
                  mixBlendMode: 'overlay',
                  filter: 'brightness(0) invert(1)',
                  pointerEvents: 'none'
                }}
              />
              <div className="relative z-10">
                {/* Main Crypto Wallet Card */}
                <div
                  className="rounded-lg p-6 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(to bottom, #94E643, #22B73D)',
                    borderRadius: '15px',
                    marginTop: '6px',
                    marginBottom: '24px',
                    height: '237px'
                  }}
                >
                  <img
                    src={images.Rectangle_36}
                    alt="Background pattern"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      opacity: 1.2,
                      mixBlendMode: 'screen',
                      filter: 'brightness(0) invert(1)',
                      pointerEvents: 'none',
                      zIndex: 1
                    }}
                  />
                  <img
                    src={images.Rectangle_36}
                    alt="Background pattern overlay"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      opacity: 0.9,
                      mixBlendMode: 'overlay',
                      marginTop: '9px',
                      filter: 'brightness(0) invert(1)',
                      pointerEvents: 'none',
                      zIndex: 2
                    }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-4 relative">
                      <span
                        className="text-black"
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '10px',
                          fontWeight: 274,
                          fontStyle: 'normal',
                          lineHeight: '100%',
                          letterSpacing: '0%',
                          textAlign: 'center',
                          paddingTop: '28px',
                          color: 'black'
                        }}
                      >
                        BTC Balance
                      </span>
                      <div className="absolute right-0 top-0" style={{ zIndex: 20 }}>
                        <button
                          ref={cryptoCurrencyButtonRef}
                          onClick={() => {
                            setShowCryptoCurrencyDropdown(!showCryptoCurrencyDropdown);
                            if (!showCryptoCurrencyDropdown) {
                              setTimeout(() => calculateCryptoDropdownPosition(), 0);
                            }
                          }}
                          className="flex items-center gap-2 text-black"
                          style={{
                            background: 'rgba(0, 0, 0, 0.15)',
                            border: '1px solid rgba(0, 0, 0, 0.3)',
                            borderRadius: '100px',
                            padding: '6px 12px',
                            cursor: 'pointer',
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '12px',
                            fontWeight: 400,
                            position: 'relative',
                            zIndex: 20,
                            color: 'black'
                          }}
                        >
                          {(() => {
                            const selectedCryptoWalletOption = cryptoWalletOptions.find(w => w.id === selectedCryptoWallet);
                            if (selectedCryptoWalletOption && !selectedCryptoWalletOption.isAllWallets) {
                              return (
                                <>
                                  <img
                                    src={selectedCryptoWalletOption.icon}
                                    alt={selectedCryptoWalletOption.name}
                                    style={{
                                      width: '16px',
                                      height: '16px',
                                      borderRadius: '50%',
                                      objectFit: 'cover'
                                    }}
                                  />
                                  <span style={{ color: 'black' }}>{selectedCryptoWalletOption.currency}</span>
                                </>
                              );
                            }
                            return (
                              <>
                                <img
                                  src={images.logos_bitcoin}
                                  alt="Bitcoin"
                                  style={{
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                  }}
                                />
                                <span style={{ color: 'black' }}>{selectedCryptoCurrency}</span>
                              </>
                            );
                          })()}
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </button>
                        {showCryptoCurrencyDropdown && createPortal(
                          <>
                            <style>{`
                              .crypto-currency-dropdown::-webkit-scrollbar {
                                display: none;
                              }
                            `}</style>
                            <div
                              ref={cryptoCurrencyDropdownRef}
                              className="fixed rounded-[20px] bg-[#020C19] w-[490px] py-2 overflow-y-auto overflow-x-hidden shadow-lg crypto-currency-dropdown"
                              style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                top: `${cryptoDropdownPosition.top}px`,
                                left: `${cryptoDropdownPosition.left}px`,
                                zIndex: 9999
                              }}
                            >
                              {cryptoWalletOptions.map((wallet) => (
                                <button
                                  key={wallet.id}
                                  onClick={() => {
                                    setSelectedCryptoWallet(wallet.id);
                                    if (!wallet.isAllWallets) {
                                      setSelectedCryptoCurrency(wallet.currency);
                                    }
                                    setShowCryptoCurrencyDropdown(false);
                                  }}
                                  className="w-full text-left px-4 py-3 text-white hover:bg-white/5 transition-colors flex items-center justify-between text-sm font-normal border-b-0"
                                >
                                  <div className="flex items-center gap-3 flex-1">
                                    <img
                                      src={wallet.icon}
                                      alt={wallet.name}
                                      className={`w-5 h-5 ${wallet.isAllWallets ? 'rounded-none' : 'rounded-full'} object-contain`}
                                    />
                                    <div className="flex flex-col">
                                      <span className="text-sm font-normal">
                                        {wallet.name}
                                      </span>
                                      {wallet.balance && (
                                        <span className="text-xs font-normal text-white/60 mt-0.5">
                                          Bal : {wallet.balance}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    className={`w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0 ${selectedCryptoWallet === wallet.id
                                      ? 'border-2 border-[#A9EF45] bg-[#A9EF45]'
                                      : 'border-2 border-white bg-transparent'
                                      }`}
                                  >
                                    {selectedCryptoWallet === wallet.id && (
                                      <div className="w-2 h-2 rounded-full bg-black" />
                                    )}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </>,
                          document.body
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-center mb-6" style={{ position: 'relative' }}>
                      <div className="flex items-baseline gap-1">
                        <span
                          className="text-black"
                          style={{
                            fontFamily: 'Agbalumo, sans-serif',
                            fontSize: '40px',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            lineHeight: '100%',
                            letterSpacing: '0%',
                            color: 'black'
                          }}
                        >
                          0.0003
                        </span>
                        <span
                          className="text-black"
                          style={{
                            fontFamily: 'Agbalumo, sans-serif',
                            fontSize: '40px',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            lineHeight: '100%',
                            letterSpacing: '0%',
                            color: 'rgba(0, 0, 0, 0.6)'
                          }}
                        >
                          .00
                        </span>
                        <div className="relative" style={{ marginLeft: '8px' }}>
                          <button
                            className="flex items-center gap-1 text-black"
                            style={{
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '12px',
                              fontWeight: 400,
                              display: 'flex',
                              alignItems: 'center',
                              padding: '0',
                              color: 'black'
                            }}
                          >
                            <span style={{ color: 'black' }}>BTC</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" style={{ flexShrink: 0 }}>
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-center">
                      {['Send', 'Receive', 'P2P'].map((action) => (
                        <div key={action} className="flex flex-col items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (action === 'Send') {
                                setShowFundCryptoWalletModal(true);
                              } else if (action === 'Receive') {
                                setShowReceiveCryptoModal(true);
                              }
                            }}
                            className="flex items-center justify-center text-white"
                            style={{
                              width: '50px',
                              height: '50px',
                              borderRadius: '12px',
                              background: 'black',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '0',
                              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                            }}
                          >
                            <img
                              src={action === 'P2P' ? images.arrow_swap_green : images.send_2_green}
                              alt={action}
                              style={{
                                width: '24px',
                                height: '24px',
                                transform: action === 'Receive' ? 'rotate(180deg)' : 'none'
                              }}
                            />
                          </button>
                          <span
                            className="text-black"
                            style={{
                              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '10px',
                              fontWeight: 400,
                              fontStyle: 'normal',
                              lineHeight: '100%',
                              letterSpacing: '1px',
                              paddingTop: '4px',
                              color: 'black'
                            }}
                          >
                            {action}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Small Cards Section - Outside the main cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Quick Access Fiat Cards */}
          <div className="flex items-center gap-4">
            {quickFiatWallets.map((wallet, index) => (
              <div
                key={index}
                className="rounded-lg p-3"
                style={{
                  width: '128px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #3E77B9 0%, #2A5A8F 100%)',
                  borderRadius: '10px',
                  borderWidth: '0.3px',
                  borderStyle: 'solid',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div className="flex items-start gap-2">
                  <div
                    className="rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      width: '24px',
                      height: '24px',
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      src={images.flag}
                      alt={wallet.currency}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <p
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '10px',
                      fontWeight: 274,
                      fontStyle: 'normal',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      color: '#9CB8DA',
                      margin: 0
                    }}
                  >
                    {wallet.currency}
                  </p>
                </div>
                <p
                  className="text-white"
                  style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '14px',
                    fontWeight: 274,
                    fontStyle: 'normal',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    margin: 0,
                    textAlign: 'center',
                    width: '100%',
                    paddingLeft: '15px'
                  }}
                >
                  {wallet.balance}
                </p>
              </div>
            ))}
            <button
              className="rounded-lg px-4 py-2 text-sm"
              style={{
                background: 'white',
                border: '0.3px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                cursor: 'pointer',
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '14px',
                color: 'black',
                fontWeight: 400,
                width: '128px',
                height: '60px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              View All
            </button>
          </div>

          {/* Quick Access Crypto Cards */}
          <div className="flex items-center gap-4">
            {quickCryptoWallets.map((wallet, index) => (
              <div
                key={index}
                className="rounded-lg p-3"
                style={{
                  width: '128px',
                  height: '60px',
                  background: 'linear-gradient(to bottom, #94E643, #22B73D)',
                  borderRadius: '10px',
                  borderWidth: '0.3px',
                  borderStyle: 'solid',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div className="flex items-start gap-2">
                  <div
                    className="rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      width: '24px',
                      height: '24px',
                      backgroundColor: wallet.currency === 'USDT' ? '#26A17B' : wallet.currency === 'USDC' ? '#2775CA' : '#627EEA',
                      overflow: 'hidden'
                    }}
                  >
                    {wallet.currency === 'USDT' ? (
                      <img
                        src={images.cryptocurrency_color_usdt}
                        alt={wallet.currency}
                        style={{
                          width: '24px',
                          height: '24px',
                          objectFit: 'cover'
                        }}
                      />
                    ) : wallet.currency === 'USDC' ? (
                      <img
                        src={images.Group}
                        alt={wallet.currency}
                        style={{
                          width: '24px',
                          height: '24px',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <img
                        src={images.Group2}
                        alt={wallet.currency}
                        style={{
                          width: '24px',
                          height: '24px',
                          objectFit: 'cover'
                        }}
                      />
                    )}
                  </div>
                  <p
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '10px',
                      fontWeight: 274,
                      fontStyle: 'normal',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      color: '#406F21',
                      margin: 0
                    }}
                  >
                    {wallet.currency}
                  </p>
                </div>
                <p
                  style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '14px',
                    fontWeight: 274,
                    fontStyle: 'normal',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    margin: 0,
                    textAlign: 'center',
                    width: '100%',
                    color: 'black'
                  }}
                >
                  {wallet.balance}
                </p>
              </div>
            ))}
            <button
              className="rounded-lg px-4 py-2 text-sm"
              style={{
                background: 'white',
                border: '0.3px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                cursor: 'pointer',
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '14px',
                color: 'black',
                fontWeight: 400,
                width: '128px',
                height: '60px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              View All
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Action and Crypto Wallet Buttons */}
      <div className="flex items-center gap-2 mb-6">
        <div className="relative">
          <button
            className="text-white flex items-center justify-center rounded-full border border-[#273B3F] bg-[#101F26] text-xs font-normal cursor-pointer px-4 h-[35px]"
            style={{
              borderWidth: '0.3px'
            }}
          >
            Bulk Action
          </button>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowCryptoWalletDropdown(!showCryptoWalletDropdown)}
            className="text-white flex items-center justify-center rounded-full border border-[#273B3F] bg-[#101F26] text-xs font-normal cursor-pointer px-4 h-[35px]"
            style={{
              borderWidth: '0.3px'
            }}
          >
            Crypto Wallet
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          {showCryptoWalletDropdown && (
            <div
              className="absolute top-full left-0 mt-2 rounded-[10px] overflow-hidden z-50 backdrop-blur-sm"
              style={{
                width: '135px',
                height: '96px',
                backgroundColor: 'rgba(26, 38, 47, 0.2)',
                boxShadow: '5px 5px 15px 0px rgba(0, 0, 0, 0.25)',
                backdropFilter: 'blur(4px)'
              }}
            >
              {['All', 'Fiat Wallet', 'Crypto Wallet'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setShowCryptoWalletDropdown(false);
                    // Handle option selection if needed
                  }}
                  className={`w-full text-left px-4 text-white hover:bg-[#2B363E] transition-colors text-sm h-[32px] flex items-center ${option === 'Crypto Wallet' ? 'bg-[#2B363E]' : ''
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Wallet Activity Section */}
      <div
        style={{
          backgroundColor: '#020B16',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          borderBottomLeftRadius: '15px',
          borderBottomRightRadius: '15px'
        }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 pb-4 gap-4">
          <h3
            className="text-white"
            style={{
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '18px',
              fontWeight: 600
            }}
          >
            Wallet Activity
          </h3>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-white"
              style={{
                width: '200px',
                height: '35px',
                borderRadius: '100px',
                borderWidth: '0.3px',
                borderStyle: 'solid',
                borderColor: '#273B3F',
                backgroundColor: '#101F26',
                paddingLeft: '40px',
                paddingRight: '16px',
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '12px',
                outline: 'none'
              }}
            />
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{
                position: 'absolute',
                left: '16px',
                color: '#9CA3AF'
              }}
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
        </div>

        {/* Table Section */}
        <div style={{ width: '100%', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px', overflow: 'hidden' }}>
          {/* Table Header */}
          <div style={{ backgroundColor: '#1C2530', width: '100%' }}>
            <table className="w-full" style={{ height: '60px', width: '100%', tableLayout: 'auto' }}>
              <thead>
                <tr style={{ height: '100%', width: '100%' }}>
                  <th className="text-left py-3" style={{ verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '24px', paddingRight: '12px' }}>
                    <div className="relative inline-block" style={{ width: '16px', height: '16px' }}>
                      <input
                        type="checkbox"
                        checked={selectedActivities.size === walletActivities.length && walletActivities.length > 0}
                        onChange={handleSelectAll}
                        className="rounded appearance-none cursor-pointer"
                        style={{
                          width: '16px',
                          height: '16px',
                          backgroundColor: selectedActivities.size === walletActivities.length && walletActivities.length > 0 ? '#A9EF45' : 'transparent',
                          borderColor: 'white',
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          outline: 'none',
                          margin: 0,
                          padding: 0
                        }}
                      />
                      {selectedActivities.size === walletActivities.length && walletActivities.length > 0 && (
                        <svg
                          className="absolute pointer-events-none"
                          style={{
                            width: '10px',
                            height: '10px',
                            top: '3px',
                            left: '3px',
                            marginTop: '2px'
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
                  <th
                    className="text-left py-3 text-white"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '12px',
                      fontWeight: 400,
                      verticalAlign: 'middle',
                      backgroundColor: '#1C2530',
                      paddingLeft: '0px',
                      paddingRight: '500px',
                    }}
                  >
                    Activity
                  </th>
                  <th
                    className="text-right py-3 text-white"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '12px',
                      fontWeight: 400,
                      verticalAlign: 'middle',
                      backgroundColor: '#1C2530',
                      paddingRight: '350px',
                      whiteSpace: 'nowrap',
                      width: '1%'
                    }}
                  >
                    Date
                  </th>
                </tr>
              </thead>
            </table>
          </div>

          {/* Table Body */}
          <div style={{ backgroundColor: '#0F1825', width: '100%', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
            <table className="w-full" style={{ width: '100%', tableLayout: 'auto' }}>
              <tbody>
                {walletActivities.map((activity) => (
                  <tr
                    key={activity.id}
                    className="border-b border-[#2B363E] hover:bg-[#1A252F] transition-colors"
                    style={{ width: '100%', display: 'table-row' }}
                  >
                    <td className="py-3" style={{ paddingLeft: '24px', paddingRight: '12px' }}>
                      <div className="relative inline-block" style={{ width: '16px', height: '16px' }}>
                        <input
                          type="checkbox"
                          checked={selectedActivities.has(activity.id)}
                          onChange={() => handleSelectActivity(activity.id)}
                          className="rounded appearance-none cursor-pointer"
                          style={{
                            width: '16px',
                            height: '16px',
                            backgroundColor: selectedActivities.has(activity.id) ? '#A9EF45' : 'transparent',
                            borderColor: 'white',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            outline: 'none',
                            margin: 0,
                            padding: 0
                          }}
                        />
                        {selectedActivities.has(activity.id) && (
                          <svg
                            className="absolute pointer-events-none"
                            style={{
                              width: '10px',
                              height: '10px',
                              top: '3px',
                              left: '3px',
                              marginTop: '2px'
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
                    <td
                      className="py-3 text-white"
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        paddingLeft: '0px',
                        paddingRight: '370px'
                      }}
                    >
                      {activity.activity}
                    </td>
                    <td
                      className="py-3 text-gray-300 text-right"
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        paddingRight: '250px',
                        color: '#9CA3AF',
                        whiteSpace: 'nowrap',
                        width: '1%'
                      }}
                    >
                      {activity.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Fiat Wallets Modal */}
      {showFiatWalletsModal && createPortal(
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#0C1D33CC',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setShowFiatWalletsModal(false)}
        >
          <div
            className="fiat-wallets-modal"
            style={{
              backgroundColor: '#020B16',
              borderRadius: '20px',
              width: '490px',
              height: '800px',
              maxHeight: '95vh',
              overflowY: 'auto',
              padding: '24px',
              position: 'relative',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <style>{`
              .fiat-wallets-modal::-webkit-scrollbar {
                display: none;
              }
              .fiat-wallets-modal {
                scrollbarWidth: none;
                msOverflowStyle: none;
              }
            `}</style>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              width: 'calc(100% + 48px)',
              marginLeft: '-24px',
              marginRight: '-24px',
              paddingLeft: '24px',
              paddingRight: '24px',
              boxSizing: 'border-box'
            }}>
              <h3 style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '18px',
                fontWeight: 600,
                color: '#FFFFFF',
                margin: 0
              }}>
                Fiat Wallets - {username ? decodeURIComponent(username) : 'User'}
              </h3>
              <button
                onClick={() => setShowFiatWalletsModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '0',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: '1'
                }}
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div>
              {/* Nigerian (NGN) Wallet */}
              <div
                style={{
                  backgroundColor: '#0F1825',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '16px',
                  border: '1px solid #21436B',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  height: '130px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#1B2430',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      padding: '4px'
                    }}
                  >
                    <img
                      src={images.flag}
                      alt="Nigeria"
                      style={{
                        width: '30.7px',
                        height: '30.7px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        opacity: 1
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '14px',
                        fontWeight: 274,
                        fontStyle: 'normal',
                        color: '#FFFFFF',
                        margin: 0,
                        marginBottom: '8px',
                        paddingTop: '8px'
                      }}
                    >
                      Nigerian [NGN] Wallet
                    </h3>
                    <p
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '25px',
                        fontWeight: 600,
                        fontStyle: 'normal',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        color: '#FFFFFF',
                        margin: 0,
                        paddingTop: '30px',
                        marginLeft: '-60px'
                      }}
                    >
                      N200,000.00
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginLeft: '16px', marginTop: '40px', marginBottom: '0', alignItems: 'flex-start' }}>
                  {[
                    { action: 'Send', icon: images.send_square },
                    { action: 'Fund', icon: images.pluscircle },
                    { action: 'Withdraw', icon: images.send_2 },
                    { action: 'Convert', icon: images.arrow_swap }
                  ].map(({ action, icon }) => (
                    <div key={action} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <button
                        style={{
                          width: '35.12px',
                          height: '35.12px',
                          borderRadius: '8.67px',
                          backgroundColor: '#FFFFFF',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          opacity: 1
                        }}
                      >
                        <img
                          src={icon}
                          alt={action}
                          style={{
                            width: '20px',
                            height: '20px'
                          }}
                        />
                      </button>
                      <span
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '10px',
                          fontWeight: 400,
                          color: '#FFFFFF',
                          textAlign: 'center'
                        }}
                      >
                        {action}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ghanaian (GHS) Wallet */}
              <div
                style={{
                  backgroundColor: '#0F1825',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '16px',
                  border: '1px solid #21436B',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  height: '130px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#1B2430',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      padding: '4px'
                    }}
                  >
                    <img
                      src={images.flag3}
                      alt="Ghana"
                      style={{
                        width: '30.7px',
                        height: '30.7px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        opacity: 1
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '14px',
                        fontWeight: 274,
                        fontStyle: 'normal',
                        color: '#FFFFFF',
                        margin: 0,
                        marginBottom: '8px',
                        paddingTop: '8px'
                      }}
                    >
                      Ghanaian [GHS] Wallet
                    </h3>
                    <p
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '25px',
                        fontWeight: 600,
                        fontStyle: 'normal',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        color: '#FFFFFF',
                        margin: 0,
                        paddingTop: '12px',
                        marginLeft: '-60px'
                      }}
                    >
                      GHS0.00
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginLeft: '16px', marginTop: '40px', marginBottom: '0', alignItems: 'flex-start' }}>
                  {[
                    { action: 'Send', icon: images.send_square },
                    { action: 'Fund', icon: images.pluscircle },
                    { action: 'Withdraw', icon: images.send_2 },
                    { action: 'Convert', icon: images.arrow_swap }
                  ].map(({ action, icon }) => (
                    <div key={action} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <button
                        style={{
                          width: '35.12px',
                          height: '35.12px',
                          borderRadius: '8.67px',
                          backgroundColor: '#FFFFFF',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          opacity: 1
                        }}
                      >
                        <img
                          src={icon}
                          alt={action}
                          style={{
                            width: '20px',
                            height: '20px'
                          }}
                        />
                      </button>
                      <span
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '10px',
                          fontWeight: 400,
                          color: '#FFFFFF',
                          textAlign: 'center'
                        }}
                      >
                        {action}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kenyan (KSH) Wallet */}
              <div
                style={{
                  backgroundColor: '#0F1825',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '16px',
                  border: '1px solid #21436B',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  height: '130px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#1B2430',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      padding: '4px'
                    }}
                  >
                    <img
                      src={images.flag4}
                      alt="Kenya"
                      style={{
                        width: '30.7px',
                        height: '30.7px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        opacity: 1
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '14px',
                        fontWeight: 274,
                        fontStyle: 'normal',
                        color: '#FFFFFF',
                        margin: 0,
                        marginBottom: '8px',
                        paddingTop: '8px'
                      }}
                    >
                      Kenyan [KSH] Wallet
                    </h3>
                    <p
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '25px',
                        fontWeight: 600,
                        fontStyle: 'normal',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        color: '#FFFFFF',
                        margin: 0,
                        paddingTop: '30px',
                        marginLeft: '-60px'
                      }}
                    >
                      Ksh20.00
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginLeft: '16px', marginTop: '40px', marginBottom: '0', alignItems: 'flex-start' }}>
                  {[
                    { action: 'Send', icon: images.send_square },
                    { action: 'Fund', icon: images.pluscircle },
                    { action: 'Withdraw', icon: images.send_2 },
                    { action: 'Convert', icon: images.arrow_swap }
                  ].map(({ action, icon }) => (
                    <div key={action} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <button
                        style={{
                          width: '35.12px',
                          height: '35.12px',
                          borderRadius: '8.67px',
                          backgroundColor: '#FFFFFF',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          opacity: 1
                        }}
                      >
                        <img
                          src={icon}
                          alt={action}
                          style={{
                            width: '20px',
                            height: '20px'
                          }}
                        />
                      </button>
                      <span
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '10px',
                          fontWeight: 400,
                          color: '#FFFFFF',
                          textAlign: 'center'
                        }}
                      >
                        {action}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* South African (ZAR) Wallet */}
              <div
                style={{
                  backgroundColor: '#0F1825',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '16px',
                  border: '1px solid #21436B',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  height: '130px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#1B2430',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      padding: '4px'
                    }}
                  >
                    <img
                      src={images.flag5}
                      alt="South Africa"
                      style={{
                        width: '30.7px',
                        height: '30.7px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        opacity: 1
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '14px',
                        fontWeight: 274,
                        fontStyle: 'normal',
                        color: '#FFFFFF',
                        margin: 0,
                        marginBottom: '8px',
                        paddingTop: '8px'
                      }}
                    >
                      South African [ZAR] Wallet
                    </h3>
                    <p
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '25px',
                        fontWeight: 600,
                        fontStyle: 'normal',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        color: '#FFFFFF',
                        margin: 0,
                        paddingTop: '12px',
                        marginLeft: '-60px'
                      }}
                    >
                      R200.00
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginLeft: '16px', marginTop: '40px', marginBottom: '0', alignItems: 'flex-start' }}>
                  {[
                    { action: 'Send', icon: images.send_square },
                    { action: 'Fund', icon: images.pluscircle },
                    { action: 'Withdraw', icon: images.send_2 },
                    { action: 'Convert', icon: images.arrow_swap }
                  ].map(({ action, icon }) => (
                    <div key={action} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <button
                        style={{
                          width: '35.12px',
                          height: '35.12px',
                          borderRadius: '8.67px',
                          backgroundColor: '#FFFFFF',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          opacity: 1
                        }}
                      >
                        <img
                          src={icon}
                          alt={action}
                          style={{
                            width: '20px',
                            height: '20px'
                          }}
                        />
                      </button>
                      <span
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '10px',
                          fontWeight: 400,
                          color: '#FFFFFF',
                          textAlign: 'center'
                        }}
                      >
                        {action}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Crypto Wallets Modal */}
      {showCryptoWalletsModal && createPortal(
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#0C1D33CC',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setShowCryptoWalletsModal(false)}
        >
          <div
            className="crypto-wallets-modal"
            style={{
              backgroundColor: '#020B16',
              borderRadius: '20px',
              width: '490px',
              height: '800px',
              maxHeight: '95vh',
              overflowY: 'auto',
              padding: '24px',
              position: 'relative',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <style>{`
              .crypto-wallets-modal::-webkit-scrollbar {
                display: none;
              }
              .crypto-wallets-modal {
                scrollbarWidth: none;
                msOverflowStyle: none;
              }
            `}</style>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              width: 'calc(100% + 48px)',
              marginLeft: '-24px',
              marginRight: '-24px',
              paddingLeft: '24px',
              paddingRight: '24px',
              boxSizing: 'border-box'
            }}>
              <h3 style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '18px',
                fontWeight: 600,
                color: '#FFFFFF',
                margin: 0
              }}>
                Crypto Wallets - {username ? decodeURIComponent(username) : 'User'}
              </h3>
              <button
                onClick={() => setShowCryptoWalletsModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '0',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: '1'
                }}
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div>
              {/* Bitcoin (BTC) Wallet */}
              <div
                style={{
                  backgroundColor: '#0F1825',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '16px',
                  border: '1px solid #21436B',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  height: '130px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#1B2430',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      padding: '4px'
                    }}
                  >
                    <div
                      style={{
                        width: '30.7px',
                        height: '30.7px',
                        borderRadius: '8px',
                        backgroundColor: '#F7931A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <span style={{
                        color: '#FFFFFF',
                        fontSize: '16px',
                        fontWeight: 600,
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
                      }}>B</span>
                    </div>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '14px',
                        fontWeight: 274,
                        fontStyle: 'normal',
                        color: '#FFFFFF',
                        margin: 0,
                        marginBottom: '8px',
                        paddingTop: '8px'
                      }}
                    >
                      Bitcoin [BTC] Wallet
                    </h3>
                    <p
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '25px',
                        fontWeight: 600,
                        fontStyle: 'normal',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        color: '#FFFFFF',
                        margin: 0,
                        paddingTop: '30px',
                        marginLeft: '-60px'
                      }}
                    >
                      0.00123
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginLeft: '16px', marginTop: '40px', marginBottom: '0', alignItems: 'flex-start' }}>
                  {[
                    { action: 'Send', icon: images.send_2_green, rotation: 0 },
                    { action: 'Receive', icon: images.send_2_green, rotation: 180 },
                    { action: 'P2P', icon: images.arrow_swap_green, rotation: 0 }
                  ].map(({ action, icon, rotation }) => (
                    <div key={action} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <button
                        onClick={() => action === 'Send' && setShowSendFundsModal(true)}
                        style={{
                          width: '35.12px',
                          height: '35.12px',
                          borderRadius: '8.67px',
                          backgroundColor: '#FFFFFF',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          opacity: 1
                        }}
                      >
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: '#2662A6',
                            maskImage: `url(${icon})`,
                            maskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskImage: `url(${icon})`,
                            WebkitMaskSize: 'contain',
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center',
                            transform: rotation ? `rotate(${rotation}deg)` : 'none'
                          }}
                        />
                      </button>
                      <span
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '10px',
                          fontWeight: 400,
                          color: '#FFFFFF',
                          textAlign: 'center'
                        }}
                      >
                        {action}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tether (USDT) Wallet */}
              <div
                style={{
                  backgroundColor: '#0F1825',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '16px',
                  border: '1px solid #21436B',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  height: '130px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#1B2430',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      padding: '4px'
                    }}
                  >
                    <div
                      style={{
                        width: '30.7px',
                        height: '30.7px',
                        borderRadius: '8px',
                        backgroundColor: '#26A17B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <span style={{
                        color: '#FFFFFF',
                        fontSize: '16px',
                        fontWeight: 600,
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
                      }}>T</span>
                    </div>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '14px',
                        fontWeight: 274,
                        fontStyle: 'normal',
                        color: '#FFFFFF',
                        margin: 0,
                        marginBottom: '8px',
                        paddingTop: '8px'
                      }}
                    >
                      Tether [USDT] Wallet
                    </h3>
                    <p
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '25px',
                        fontWeight: 600,
                        fontStyle: 'normal',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        color: '#FFFFFF',
                        margin: 0,
                        paddingTop: '30px',
                        marginLeft: '-60px'
                      }}
                    >
                      100,000
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginLeft: '16px', marginTop: '40px', marginBottom: '0', alignItems: 'flex-start' }}>
                  {[
                    { action: 'Send', icon: images.send_2_green, rotation: 0 },
                    { action: 'Receive', icon: images.send_2_green, rotation: 180 },
                    { action: 'P2P', icon: images.arrow_swap_green, rotation: 0 }
                  ].map(({ action, icon, rotation }) => (
                    <div key={action} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <button
                        onClick={() => action === 'Send' && setShowSendFundsModal(true)}
                        style={{
                          width: '35.12px',
                          height: '35.12px',
                          borderRadius: '8.67px',
                          backgroundColor: '#FFFFFF',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          opacity: 1
                        }}
                      >
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: '#2662A6',
                            maskImage: `url(${icon})`,
                            maskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskImage: `url(${icon})`,
                            WebkitMaskSize: 'contain',
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center',
                            transform: rotation ? `rotate(${rotation}deg)` : 'none'
                          }}
                        />
                      </button>
                      <span
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '10px',
                          fontWeight: 400,
                          color: '#FFFFFF',
                          textAlign: 'center'
                        }}
                      >
                        {action}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ethereum (ETH) Wallet */}
              <div
                style={{
                  backgroundColor: '#0F1825',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '16px',
                  border: '1px solid #21436B',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  height: '130px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#1B2430',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      padding: '4px'
                    }}
                  >
                    <div
                      style={{
                        width: '30.7px',
                        height: '30.7px',
                        borderRadius: '8px',
                        backgroundColor: '#627EEA',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white"/>
                        <path d="M2 17L12 22L22 17V12L12 17L2 12V17Z" fill="white"/>
                      </svg>
                    </div>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '14px',
                        fontWeight: 274,
                        fontStyle: 'normal',
                        color: '#FFFFFF',
                        margin: 0,
                        marginBottom: '8px',
                        paddingTop: '8px'
                      }}
                    >
                      Ethereum [ETH] Wallet
                    </h3>
                    <p
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '25px',
                        fontWeight: 600,
                        fontStyle: 'normal',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        color: '#FFFFFF',
                        margin: 0,
                        paddingTop: '30px',
                        marginLeft: '-60px'
                      }}
                    >
                      0.00123
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginLeft: '16px', marginTop: '40px', marginBottom: '0', alignItems: 'flex-start' }}>
                  {[
                    { action: 'Send', icon: images.send_2_green, rotation: 0 },
                    { action: 'Receive', icon: images.send_2_green, rotation: 180 },
                    { action: 'P2P', icon: images.arrow_swap_green, rotation: 0 }
                  ].map(({ action, icon, rotation }) => (
                    <div key={action} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <button
                        onClick={() => action === 'Send' && setShowSendFundsModal(true)}
                        style={{
                          width: '35.12px',
                          height: '35.12px',
                          borderRadius: '8.67px',
                          backgroundColor: '#FFFFFF',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          opacity: 1
                        }}
                      >
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: '#2662A6',
                            maskImage: `url(${icon})`,
                            maskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskImage: `url(${icon})`,
                            WebkitMaskSize: 'contain',
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center',
                            transform: rotation ? `rotate(${rotation}deg)` : 'none'
                          }}
                        />
                      </button>
                      <span
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '10px',
                          fontWeight: 400,
                          color: '#FFFFFF',
                          textAlign: 'center'
                        }}
                      >
                        {action}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Circle (USDC) Wallet */}
              <div
                style={{
                  backgroundColor: '#0F1825',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '16px',
                  border: '1px solid #21436B',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  height: '130px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#1B2430',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      padding: '4px'
                    }}
                  >
                    <div
                      style={{
                        width: '30.7px',
                        height: '30.7px',
                        borderRadius: '8px',
                        backgroundColor: '#2775CA',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                      }}
                    >
                      <span style={{
                        color: '#FFFFFF',
                        fontSize: '16px',
                        fontWeight: 600,
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
                      }}>
                        C
                      </span>
                      <span style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF'
                      }}></span>
                    </div>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '14px',
                        fontWeight: 274,
                        fontStyle: 'normal',
                        color: '#FFFFFF',
                        margin: 0,
                        marginBottom: '8px',
                        paddingTop: '8px'
                      }}
                    >
                      Circle [USDC] Wallet
                    </h3>
                    <p
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '25px',
                        fontWeight: 600,
                        fontStyle: 'normal',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        color: '#FFFFFF',
                        margin: 0,
                        paddingTop: '30px',
                        marginLeft: '-60px'
                      }}
                    >
                      0.00123
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginLeft: '16px', marginTop: '40px', marginBottom: '0', alignItems: 'flex-start' }}>
                  {[
                    { action: 'Send', icon: images.send_2_green, rotation: 0 },
                    { action: 'Receive', icon: images.send_2_green, rotation: 180 },
                    { action: 'P2P', icon: images.arrow_swap_green, rotation: 0 }
                  ].map(({ action, icon, rotation }) => (
                    <div key={action} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <button
                        onClick={() => action === 'Send' && setShowSendFundsModal(true)}
                        style={{
                          width: '35.12px',
                          height: '35.12px',
                          borderRadius: '8.67px',
                          backgroundColor: '#FFFFFF',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          opacity: 1
                        }}
                      >
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: '#2662A6',
                            maskImage: `url(${icon})`,
                            maskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskImage: `url(${icon})`,
                            WebkitMaskSize: 'contain',
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center',
                            transform: rotation ? `rotate(${rotation}deg)` : 'none'
                          }}
                        />
                      </button>
                      <span
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '10px',
                          fontWeight: 400,
                          color: '#FFFFFF',
                          textAlign: 'center'
                        }}
                      >
                        {action}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Send Funds Modal */}
      {showSendFundsModal && createPortal(
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#0C1D33CC',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setShowSendFundsModal(false)}
        >
          <div
            className="send-funds-modal"
            style={{
              backgroundColor: '#020B16',
              borderRadius: '20px',
              width: '490px',
              height: '800px',
              maxHeight: '95vh',
              overflowY: 'auto',
              padding: '24px',
              position: 'relative',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <style>{`
              .send-funds-modal::-webkit-scrollbar {
                display: none;
              }
              .send-funds-modal {
                scrollbarWidth: none;
                msOverflowStyle: none;
              }
            `}</style>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              width: 'calc(100% + 48px)',
              marginLeft: '-24px',
              marginRight: '-24px',
              paddingLeft: '24px',
              paddingRight: '24px',
              boxSizing: 'border-box'
            }}>
              <h3 style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '18px',
                fontWeight: 600,
                color: '#FFFFFF',
                margin: 0
              }}>
                Send Funds
              </h3>
              <button
                onClick={() => setShowSendFundsModal(false)}
                style={{
                  background: '#1A222F',
                  border: '0.3px solid #2B333E',
                  borderRadius: '50%',
                  color: '#FFFFFF',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '0',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: '1'
                }}
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* From Wallet */}
              <div>
                <label style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  From Wallet
                </label>
                <div ref={sendFromWalletDropdownRef} style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Select wallet sending from"
                    value={selectedSendFromWallet}
                    readOnly
                    onClick={() => setShowSendFromWalletDropdown(!showSendFromWalletDropdown)}
                    style={{
                      width: '100%',
                      height: '45px',
                      borderRadius: '8px',
                      backgroundColor: '#0F1825',
                      border: 'none',
                      color: '#FFFFFF',
                      paddingLeft: '16px',
                      paddingRight: '40px',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  />
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: showSendFromWalletDropdown ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)',
                      color: '#9CA3AF',
                      pointerEvents: 'none',
                      transition: 'transform 0.2s'
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                  {showSendFromWalletDropdown && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        marginTop: '4px',
                        backgroundColor: 'rgba(26, 38, 47, 0.2)',
                        borderRadius: '8px',
                        border: '0.3px solid rgba(255, 255, 255, 0.1)',
                        zIndex: 1000,
                        overflow: 'hidden',
                        boxShadow: '5px 5px 15px 0px rgba(0, 0, 0, 0.25)',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)'
                      }}
                    >
                      {['Bitcoin (BTC)', 'Tether (USDT)', 'Ethereum (ETH)', 'Circle (USDC)', 'Nigerian (NGN)', 'Ghanaian (GHS)'].map((wallet) => (
                        <div
                          key={wallet}
                          onClick={() => {
                            setSelectedSendFromWallet(wallet);
                            setShowSendFromWalletDropdown(false);
                          }}
                          style={{
                            padding: '12px 16px',
                            color: '#FFFFFF',
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '14px',
                            cursor: 'pointer',
                            backgroundColor: selectedSendFromWallet === wallet ? 'rgba(169, 239, 69, 0.1)' : 'transparent',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            if (selectedSendFromWallet !== wallet) {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedSendFromWallet !== wallet) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          {wallet}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Route */}
              <div>
                <label style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  Payment Route
                </label>
                <div ref={paymentRouteDropdownRef} style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Select Route"
                    value={selectedPaymentRoute}
                    readOnly
                    onClick={() => setShowPaymentRouteDropdown(!showPaymentRouteDropdown)}
                    style={{
                      width: '100%',
                      height: '45px',
                      borderRadius: '8px',
                      backgroundColor: '#0F1825',
                      border: 'none',
                      color: '#FFFFFF',
                      paddingLeft: '16px',
                      paddingRight: '40px',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  />
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: showPaymentRouteDropdown ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)',
                      color: '#9CA3AF',
                      pointerEvents: 'none',
                      transition: 'transform 0.2s'
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                  {showPaymentRouteDropdown && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        marginTop: '4px',
                        backgroundColor: 'rgba(26, 38, 47, 0.2)',
                        borderRadius: '8px',
                        border: '0.3px solid rgba(255, 255, 255, 0.1)',
                        zIndex: 1000,
                        overflow: 'hidden',
                        boxShadow: '5px 5px 15px 0px rgba(0, 0, 0, 0.25)',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)'
                      }}
                    >
                      {['Rhinox ID', 'Bank Account', 'Mobile Money'].map((route) => (
                        <div
                          key={route}
                          onClick={() => {
                            setSelectedPaymentRoute(route);
                            setShowPaymentRouteDropdown(false);
                          }}
                          style={{
                            padding: '12px 16px',
                            color: '#FFFFFF',
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '14px',
                            cursor: 'pointer',
                            backgroundColor: selectedPaymentRoute === route ? 'rgba(169, 239, 69, 0.1)' : 'transparent',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            if (selectedPaymentRoute !== route) {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedPaymentRoute !== route) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          {route}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Recipient Account Details Separator */}
              <div style={{ position: 'relative', margin: '20px 0' }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: 0,
                  height: '1px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }}></div>
                <div style={{
                  position: 'relative',
                  textAlign: 'center',
                  backgroundColor: '#020B16',
                  padding: '0 16px',
                  display: 'inline-block',
                  marginLeft: '50%',
                  transform: 'translateX(-50%)'
                }}>
                  <span style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#FFFFFF'
                  }}>
                    Recipient Account Details
                  </span>
                </div>
              </div>

              {/* Bank Name */}
              <div>
                <label style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  Bank Name
                </label>
                <input
                  type="text"
                  placeholder="Input bank name"
                  style={{
                    width: '100%',
                    height: '45px',
                    borderRadius: '8px',
                    backgroundColor: '#0F1825',
                    border: '1px solid #A9EF45',
                    color: '#FFFFFF',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Account Number */}
              <div>
                <label style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  Account Number
                </label>
                <input
                  type="text"
                  placeholder="Input account number"
                  style={{
                    width: '100%',
                    height: '45px',
                    borderRadius: '8px',
                    backgroundColor: '#0F1825',
                    border: 'none',
                    color: '#FFFFFF',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Bank Name (Second) */}
              <div>
                <label style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  Bank Name
                </label>
                <input
                  type="text"
                  placeholder="Input bank name"
                  style={{
                    width: '100%',
                    height: '45px',
                    borderRadius: '8px',
                    backgroundColor: '#0F1825',
                    border: 'none',
                    color: '#FFFFFF',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Proceed Button */}
            <div style={{ marginTop: 'auto', paddingTop: '24px', display: 'flex', justifyContent: 'flex-start' }}>
              <button
                onClick={() => {
                  // Handle proceed action
                  setShowSendFundsModal(false);
                }}
                style={{
                  width: '174px',
                  height: '60px',
                  borderRadius: '100px',
                  backgroundColor: '#A9EF45',
                  border: 'none',
                  color: '#000000',
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 1
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#94E643';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#A9EF45';
                }}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Fund Wallet Modal */}
      {showFundWalletModal && createPortal(
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#0C1D33CC',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            zIndex: 1000,
            padding: '20px',
            paddingTop: '20px'
          }}
          onClick={() => setShowFundWalletModal(false)}
        >
          <div
            className="fund-wallet-modal"
            style={{
              backgroundColor: '#020B16',
              borderRadius: '20px',
              width: '490px',
              height: selectedFundingRoute === 'Crypto' ? '95vh' : '530px',
              maxHeight: '95vh',
              overflowY: 'auto',
              padding: '24px',
              position: 'relative',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <style>{`
              .fund-wallet-modal::-webkit-scrollbar {
                display: none;
              }
              .fund-wallet-modal {
                scrollbarWidth: none;
                msOverflowStyle: none;
              }
            `}</style>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              width: 'calc(100% + 48px)',
              marginLeft: '-24px',
              marginRight: '-24px',
              paddingLeft: '24px',
              paddingRight: '24px',
              boxSizing: 'border-box'
            }}>
              <h3 style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '18px',
                fontWeight: 600,
                color: '#FFFFFF',
                margin: 0
              }}>
                Fund Wallet
              </h3>
              <button
                onClick={() => setShowFundWalletModal(false)}
                style={{
                  background: '#1A222F',
                  border: '0.3px solid #2B333E',
                  borderRadius: '50%',
                  color: '#FFFFFF',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '0',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: '1'
                }}
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Select Wallet */}
              <div>
                <label style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  Select Wallet
                </label>
                <div ref={selectWalletDropdownRef} style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Select wallet sending from"
                    value={selectedFundWallet}
                    readOnly
                    onClick={() => setShowSelectWalletDropdown(!showSelectWalletDropdown)}
                    style={{
                      width: '100%',
                      height: '45px',
                      borderRadius: '8px',
                      backgroundColor: '#0F1825',
                      border: 'none',
                      color: '#FFFFFF',
                      paddingLeft: '16px',
                      paddingRight: '40px',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  />
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: showSelectWalletDropdown ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)',
                      color: '#9CA3AF',
                      pointerEvents: 'none',
                      transition: 'transform 0.2s'
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                  {showSelectWalletDropdown && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        marginTop: '4px',
                        backgroundColor: 'rgba(26, 38, 47, 0.2)',
                        borderRadius: '8px',
                        border: '0.3px solid rgba(255, 255, 255, 0.1)',
                        zIndex: 1000,
                        overflow: 'hidden',
                        boxShadow: '5px 5px 15px 0px rgba(0, 0, 0, 0.25)',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)'
                      }}
                    >
                      {['Bitcoin (BTC)', 'Tether (USDT)', 'Ethereum (ETH)', 'Circle (USDC)', 'Nigerian (NGN)', 'Ghanaian (GHS)'].map((wallet) => (
                        <div
                          key={wallet}
                          onClick={() => {
                            setSelectedFundWallet(wallet);
                            setShowSelectWalletDropdown(false);
                          }}
                          style={{
                            padding: '12px 16px',
                            color: '#FFFFFF',
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '14px',
                            cursor: 'pointer',
                            backgroundColor: selectedFundWallet === wallet ? 'rgba(169, 239, 69, 0.1)' : 'transparent',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            if (selectedFundWallet !== wallet) {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedFundWallet !== wallet) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          {wallet}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Funding Route */}
              <div>
                <label style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  Funding Route
                </label>
                <div ref={fundingRouteDropdownRef} style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Select Route"
                    value={selectedFundingRoute}
                    readOnly
                    onClick={() => setShowFundingRouteDropdown(!showFundingRouteDropdown)}
                    style={{
                      width: '100%',
                      height: '45px',
                      borderRadius: '8px',
                      backgroundColor: '#0F1825',
                      border: 'none',
                      color: '#FFFFFF',
                      paddingLeft: '16px',
                      paddingRight: '40px',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  />
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: showFundingRouteDropdown ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)',
                      color: '#9CA3AF',
                      pointerEvents: 'none',
                      transition: 'transform 0.2s'
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                  {showFundingRouteDropdown && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        marginTop: '4px',
                        backgroundColor: 'rgba(26, 38, 47, 0.2)',
                        borderRadius: '8px',
                        border: '0.3px solid rgba(255, 255, 255, 0.1)',
                        zIndex: 1000,
                        overflow: 'hidden',
                        boxShadow: '5px 5px 15px 0px rgba(0, 0, 0, 0.25)',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)'
                      }}
                    >
                      {['Bank Transfer', 'Mobile Money', 'Crypto', 'Conversion'].map((route) => (
                        <div
                          key={route}
                          onClick={() => {
                            setSelectedFundingRoute(route);
                            setShowFundingRouteDropdown(false);
                          }}
                          style={{
                            padding: '12px 16px',
                            color: '#FFFFFF',
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '14px',
                            cursor: 'pointer',
                            backgroundColor: selectedFundingRoute === route ? 'rgba(169, 239, 69, 0.1)' : 'transparent',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            if (selectedFundingRoute !== route) {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedFundingRoute !== route) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          {route}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Other details */}
              <div>
                <span style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '12px',
                  fontWeight: 400,
                  color: '#9CA3AF'
                }}>
                  Other details
                </span>
              </div>

              {/* Amount to fund */}
              <div>
                <label style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  Amount to fund
                </label>
                <input
                  type="text"
                  placeholder="Input amount"
                  style={{
                    width: '100%',
                    height: '45px',
                    borderRadius: '8px',
                    backgroundColor: '#0F1825',
                    border: 'none',
                    color: '#FFFFFF',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Crypto-specific fields - shown when Crypto is selected */}
              {selectedFundingRoute === 'Crypto' && (
                <>
                  {/* Select token */}
                  <div>
                    <label style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#FFFFFF',
                      marginBottom: '8px',
                      display: 'block'
                    }}>
                      Select token
                    </label>
                    <div ref={selectTokenDropdownRef} style={{ position: 'relative' }}>
                      <input
                        type="text"
                        placeholder="Select token"
                        value={selectedToken}
                        readOnly
                        onClick={() => setShowSelectTokenDropdown(!showSelectTokenDropdown)}
                        style={{
                          width: '100%',
                          height: '45px',
                          borderRadius: '8px',
                          backgroundColor: '#0F1825',
                          border: 'none',
                          color: '#FFFFFF',
                          paddingLeft: '16px',
                          paddingRight: '40px',
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '14px',
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                      />
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: showSelectTokenDropdown ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)',
                          color: '#9CA3AF',
                          pointerEvents: 'none',
                          transition: 'transform 0.2s'
                        }}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                      {showSelectTokenDropdown && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            marginTop: '4px',
                            backgroundColor: 'rgba(26, 38, 47, 0.2)',
                            borderRadius: '8px',
                            border: '0.3px solid rgba(255, 255, 255, 0.1)',
                            zIndex: 1000,
                            overflow: 'hidden',
                            boxShadow: '5px 5px 15px 0px rgba(0, 0, 0, 0.25)',
                            backdropFilter: 'blur(4px)',
                            WebkitBackdropFilter: 'blur(4px)'
                          }}
                        >
                          {['Bitcoin', 'Ethereum', 'Tether', 'USDC'].map((token) => (
                            <div
                              key={token}
                              onClick={() => {
                                setSelectedToken(token);
                                setShowSelectTokenDropdown(false);
                              }}
                              style={{
                                padding: '12px 16px',
                                color: '#FFFFFF',
                                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                                fontSize: '14px',
                                cursor: 'pointer',
                                backgroundColor: selectedToken === token ? 'rgba(169, 239, 69, 0.1)' : 'transparent',
                                transition: 'background-color 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                if (selectedToken !== token) {
                                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (selectedToken !== token) {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              {token}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Select Network */}
                  <div>
                    <label style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#FFFFFF',
                      marginBottom: '8px',
                      display: 'block'
                    }}>
                      Select Network
                    </label>
                    <div ref={selectNetworkDropdownRef} style={{ position: 'relative' }}>
                      <input
                        type="text"
                        placeholder="Select Network"
                        value={selectedNetwork}
                        readOnly
                        onClick={() => setShowSelectNetworkDropdown(!showSelectNetworkDropdown)}
                        style={{
                          width: '100%',
                          height: '45px',
                          borderRadius: '8px',
                          backgroundColor: '#0F1825',
                          border: 'none',
                          color: '#FFFFFF',
                          paddingLeft: '16px',
                          paddingRight: '40px',
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '14px',
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                      />
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: showSelectNetworkDropdown ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)',
                          color: '#9CA3AF',
                          pointerEvents: 'none',
                          transition: 'transform 0.2s'
                        }}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                      {showSelectNetworkDropdown && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            marginTop: '4px',
                            backgroundColor: 'rgba(26, 38, 47, 0.2)',
                            borderRadius: '8px',
                            border: '0.3px solid rgba(255, 255, 255, 0.1)',
                            zIndex: 1000,
                            overflow: 'hidden',
                            boxShadow: '5px 5px 15px 0px rgba(0, 0, 0, 0.25)',
                            backdropFilter: 'blur(4px)',
                            WebkitBackdropFilter: 'blur(4px)'
                          }}
                        >
                          {['Ethereum', 'Bitcoin', 'Polygon', 'BSC'].map((network) => (
                            <div
                              key={network}
                              onClick={() => {
                                setSelectedNetwork(network);
                                setShowSelectNetworkDropdown(false);
                              }}
                              style={{
                                padding: '12px 16px',
                                color: '#FFFFFF',
                                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                                fontSize: '14px',
                                cursor: 'pointer',
                                backgroundColor: selectedNetwork === network ? 'rgba(169, 239, 69, 0.1)' : 'transparent',
                                transition: 'background-color 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                if (selectedNetwork !== network) {
                                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (selectedNetwork !== network) {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              {network}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pay to Section */}
                  <div style={{
                    backgroundColor: '#A9EF45',
                    borderRadius: '12px',
                    padding: '20px',
                    marginTop: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#4A5568',
                      marginBottom: '12px',
                      textAlign: 'center'
                    }}>
                      You are to send
                    </div>
                    <div style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '32px',
                      fontWeight: 700,
                      color: '#2D3748',
                      marginBottom: '20px',
                      textAlign: 'center'
                    }}>
                      0.123 ETH
                    </div>
                    <div style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid #718096',
                      backgroundColor: 'transparent',
                      marginBottom: '20px',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        color: '#4A5568',
                        wordBreak: 'break-all'
                      }}>
                        0x123ddffge22335kd23kfmdk24kf
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      backgroundColor: '#ADF04E',
                      borderRadius: '8px',
                      border: '1px solid #94E643',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 16px',
                        borderBottom: '1px solid #94E643'
                      }}>
                        <span style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '14px',
                          fontWeight: 400,
                          color: '#2D5016'
                        }}>
                          Amount in NGN
                        </span>
                        <span style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: '#2D5016'
                        }}>
                          ₦20,000
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 16px',
                        borderBottom: '1px solid #94E643'
                      }}>
                        <span style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '14px',
                          fontWeight: 400,
                          color: '#2D5016'
                        }}>
                          Token
                        </span>
                        <span style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: '#2D5016'
                        }}>
                          {selectedToken || 'Ethereum'}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 16px'
                      }}>
                        <span style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '14px',
                          fontWeight: 400,
                          color: '#2D5016'
                        }}>
                          Network
                        </span>
                        <span style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: '#2D5016'
                        }}>
                          {selectedNetwork || 'Ethereum'}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Proceed Button */}
            <div style={{ marginTop: 'auto', paddingTop: '24px', display: 'flex', justifyContent: 'flex-start' }}>
              <button
                onClick={() => {
                  // Handle proceed action
                  setShowFundWalletModal(false);
                }}
                style={{
                  width: '174px',
                  height: '60px',
                  borderRadius: '100px',
                  backgroundColor: '#A9EF45',
                  border: 'none',
                  color: '#000000',
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 1
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#94E643';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#A9EF45';
                }}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Convert Modal */}
      {showConvertModal && createPortal(
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#0C1D33CC',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setShowConvertModal(false)}
        >
          <div
            className="convert-modal"
            style={{
              backgroundColor: '#020B16',
              borderRadius: '20px',
              width: '490px',
              height: '800px',
              maxHeight: '95vh',
              overflowY: 'auto',
              padding: '24px',
              position: 'relative',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <style>{`
              .convert-modal::-webkit-scrollbar {
                display: none;
              }
              .convert-modal {
                scrollbarWidth: none;
                msOverflowStyle: none;
              }
            `}</style>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              width: 'calc(100% + 48px)',
              marginLeft: '-24px',
              marginRight: '-24px',
              paddingLeft: '24px',
              paddingRight: '24px',
              boxSizing: 'border-box'
            }}>
              <h3 style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '18px',
                fontWeight: 600,
                color: '#FFFFFF',
                margin: 0
              }}>
                Fund Wallet
              </h3>
              <button
                onClick={() => setShowConvertModal(false)}
                style={{
                  background: '#1A222F',
                  border: '0.3px solid #2B333E',
                  borderRadius: '50%',
                  color: '#FFFFFF',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '0',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: '1'
                }}
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
              {/* Exchange Rate */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  Exchange Rate
                </label>
                <div>
                  <span style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '45px',
                    fontWeight: 400,
                    color: '#FFFFFF'
                  }}>
                    N1 = ksh0.05
                  </span>
                </div>
              </div>

              {/* You send Section */}
              <div style={{
                backgroundColor: '#1E3A5F',
                borderRadius: '12px 12px 0 0',
                padding: '20px',
                border: '1px solid #21436B',
                borderBottom: 'none',
                marginBottom: '0'
              }}>
                <div style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  marginBottom: '12px'
                }}>
                  You send
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#FFFFFF',
                    border: 'none',
                    borderRadius: '100px',
                    padding: '8px 16px',
                    cursor: 'pointer'
                  }}>
                    <img
                      src={images.flag}
                      alt="Nigeria"
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px'
                      }}
                    />
                    <span style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#000000'
                    }}>
                      Nigeria
                    </span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#000000' }}>
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '28px',
                      fontWeight: 600,
                      color: '#FFFFFF'
                    }}>
                      N200,000.00
                    </div>
                  </div>
                </div>
                <div style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#9CA3AF',
                  marginLeft: '8px'
                }}>
                  N200,000
                </div>
              </div>

              {/* Swap Icon */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                margin: '-17px 0',
                position: 'relative',
                zIndex: 10
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #1E3A5F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img
                    src={images.arrow_swap_3}
                    alt="Swap"
                    style={{
                      width: '20px',
                      height: '20px'
                    }}
                  />
                </div>
              </div>

              {/* You Receive Section */}
              <div style={{
                backgroundColor: '#A9EF45',
                borderRadius: '0 0 12px 12px',
                padding: '20px',
                border: '1px solid #94E643',
                borderTop: 'none',
                marginTop: '0'
              }}>
                <div style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#2D5016',
                  marginBottom: '12px'
                }}>
                  You Receive
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#FFFFFF',
                    border: 'none',
                    borderRadius: '100px',
                    padding: '8px 16px',
                    cursor: 'pointer'
                  }}>
                    <img
                      src={images.flag4}
                      alt="Kenya"
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px'
                      }}
                    />
                    <span style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#000000'
                    }}>
                      Kenya
                    </span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#000000' }}>
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '28px',
                      fontWeight: 600,
                      color: '#2D5016'
                    }}>
                      KSh200,000.00
                    </div>
                  </div>
                </div>
                <div style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#2D5016',
                  marginLeft: '8px'
                }}>
                  KSh0
                </div>
              </div>
            </div>

            {/* Proceed Button */}
            <div style={{ marginTop: 'auto', paddingTop: '24px', display: 'flex', justifyContent: 'flex-start' }}>
              <button
                onClick={() => {
                  // Handle proceed action
                  setShowConvertModal(false);
                }}
                style={{
                  width: '174px',
                  height: '60px',
                  borderRadius: '100px',
                  backgroundColor: '#A9EF45',
                  border: 'none',
                  color: '#000000',
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 1
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#94E643';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#A9EF45';
                }}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Fund Crypto Wallet Modal */}
      {showFundCryptoWalletModal && createPortal(
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#0C1D33CC',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            zIndex: 1000,
            padding: '20px',
            paddingTop: '20px'
          }}
          onClick={() => setShowFundCryptoWalletModal(false)}
        >
          <div
            className="fund-crypto-wallet-modal"
            style={{
              backgroundColor: '#020B16',
              borderRadius: '20px',
              width: '490px',
              height: '480px',
              maxHeight: '95vh',
              overflowY: 'auto',
              padding: '24px',
              position: 'relative',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <style>{`
              .fund-crypto-wallet-modal::-webkit-scrollbar {
                display: none;
              }
              .fund-crypto-wallet-modal {
                scrollbarWidth: none;
                msOverflowStyle: none;
              }
            `}</style>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              width: 'calc(100% + 48px)',
              marginLeft: '-24px',
              marginRight: '-24px',
              paddingLeft: '24px',
              paddingRight: '24px',
              boxSizing: 'border-box'
            }}>
              <h3 style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '18px',
                fontWeight: 600,
                color: '#FFFFFF',
                margin: 0
              }}>
                Fund Crypto Wallet
              </h3>
              <button
                onClick={() => setShowFundCryptoWalletModal(false)}
                style={{
                  background: '#1A222F',
                  border: '0.3px solid #2B333E',
                  borderRadius: '50%',
                  color: '#FFFFFF',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '0',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: '1'
                }}
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Token Dropdown */}
              <div>
                <label style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  Token
                </label>
                <div ref={fundCryptoTokenDropdownRef} style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Select crypto to receive"
                    value={selectedFundCryptoToken}
                    readOnly
                    onClick={() => setShowFundCryptoTokenDropdown(!showFundCryptoTokenDropdown)}
                    style={{
                      width: '100%',
                      height: '45px',
                      borderRadius: '8px',
                      backgroundColor: '#0F1825',
                      border: 'none',
                      color: '#FFFFFF',
                      paddingLeft: '16px',
                      paddingRight: '40px',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  />
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: showFundCryptoTokenDropdown ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)',
                      color: '#9CA3AF',
                      pointerEvents: 'none',
                      transition: 'transform 0.2s'
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                  {showFundCryptoTokenDropdown && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        marginTop: '4px',
                        backgroundColor: 'rgba(26, 38, 47, 0.2)',
                        borderRadius: '8px',
                        border: '0.3px solid rgba(255, 255, 255, 0.1)',
                        zIndex: 1000,
                        overflow: 'hidden',
                        boxShadow: '5px 5px 15px 0px rgba(0, 0, 0, 0.25)',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)'
                      }}
                    >
                      {['Bitcoin', 'Ethereum', 'Tether', 'USDC'].map((token) => (
                        <div
                          key={token}
                          onClick={() => {
                            setSelectedFundCryptoToken(token);
                            setShowFundCryptoTokenDropdown(false);
                          }}
                          style={{
                            padding: '12px 16px',
                            color: '#FFFFFF',
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '14px',
                            cursor: 'pointer',
                            backgroundColor: selectedFundCryptoToken === token ? 'rgba(169, 239, 69, 0.1)' : 'transparent',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            if (selectedFundCryptoToken !== token) {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedFundCryptoToken !== token) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          {token}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Network Dropdown */}
              <div>
                <label style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  Network
                </label>
                <div ref={fundCryptoNetworkDropdownRef} style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Select network"
                    value={selectedFundCryptoNetwork}
                    readOnly
                    onClick={() => setShowFundCryptoNetworkDropdown(!showFundCryptoNetworkDropdown)}
                    style={{
                      width: '100%',
                      height: '45px',
                      borderRadius: '8px',
                      backgroundColor: '#0F1825',
                      border: 'none',
                      color: '#FFFFFF',
                      paddingLeft: '16px',
                      paddingRight: '40px',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  />
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: showFundCryptoNetworkDropdown ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)',
                      color: '#9CA3AF',
                      pointerEvents: 'none',
                      transition: 'transform 0.2s'
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                  {showFundCryptoNetworkDropdown && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        marginTop: '4px',
                        backgroundColor: 'rgba(26, 38, 47, 0.2)',
                        borderRadius: '8px',
                        border: '0.3px solid rgba(255, 255, 255, 0.1)',
                        zIndex: 1000,
                        overflow: 'hidden',
                        boxShadow: '5px 5px 15px 0px rgba(0, 0, 0, 0.25)',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)'
                      }}
                    >
                      {['Ethereum', 'Bitcoin', 'Polygon', 'BSC'].map((network) => (
                        <div
                          key={network}
                          onClick={() => {
                            setSelectedFundCryptoNetwork(network);
                            setShowFundCryptoNetworkDropdown(false);
                          }}
                          style={{
                            padding: '12px 16px',
                            color: '#FFFFFF',
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '14px',
                            cursor: 'pointer',
                            backgroundColor: selectedFundCryptoNetwork === network ? 'rgba(169, 239, 69, 0.1)' : 'transparent',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            if (selectedFundCryptoNetwork !== network) {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedFundCryptoNetwork !== network) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          {network}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Wallet Address Input */}
              <div>
                <label style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  Wallet Address
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Paste wallet address"
                    style={{
                      width: '100%',
                      height: '45px',
                      borderRadius: '8px',
                      backgroundColor: '#0F1825',
                      border: 'none',
                      color: '#FFFFFF',
                      paddingLeft: '16px',
                      paddingRight: '50px',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                  <button
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#9CA3AF' }}>
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div style={{ marginTop: 'auto', paddingTop: '24px', display: 'flex', justifyContent: 'flex-start' }}>
              <button
                onClick={() => {
                  // Handle download action
                  setShowFundCryptoWalletModal(false);
                }}
                style={{
                  width: '174px',
                  height: '60px',
                  borderRadius: '100px',
                  backgroundColor: '#A9EF45',
                  border: 'none',
                  color: '#000000',
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 1
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#94E643';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#A9EF45';
                }}
              >
                Download
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Receive Crypto Modal */}
      {showReceiveCryptoModal && createPortal(
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#0C1D33CC',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            zIndex: 1000,
            padding: '20px',
            paddingTop: '20px'
          }}
          onClick={() => setShowReceiveCryptoModal(false)}
        >
          <div
            className="receive-crypto-modal"
            style={{
              backgroundColor: '#020B16',
              borderRadius: '20px',
              width: '490px',
              height: '680px',
              maxHeight: '95vh',
              overflowY: 'auto',
              padding: '24px',
              position: 'relative',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <style>{`
              .receive-crypto-modal::-webkit-scrollbar {
                display: none;
              }
              .receive-crypto-modal {
                scrollbarWidth: none;
                msOverflowStyle: none;
              }
            `}</style>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              width: 'calc(100% + 48px)',
              marginLeft: '-24px',
              marginRight: '-24px',
              paddingLeft: '24px',
              paddingRight: '24px',
              boxSizing: 'border-box'
            }}>
              <h3 style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '18px',
                fontWeight: 600,
                color: '#FFFFFF',
                margin: 0
              }}>
                Fund Crypto Wallet
              </h3>
              <button
                onClick={() => setShowReceiveCryptoModal(false)}
                style={{
                  background: '#1A222F',
                  border: '0.3px solid #2B333E',
                  borderRadius: '50%',
                  color: '#FFFFFF',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '0',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: '1'
                }}
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Token Dropdown */}
              <div>
                <label style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  Token
                </label>
                <div ref={receiveTokenDropdownRef} style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Select crypto to receive"
                    value={selectedReceiveToken}
                    readOnly
                    onClick={() => setShowReceiveTokenDropdown(!showReceiveTokenDropdown)}
                    style={{
                      width: '100%',
                      height: '45px',
                      borderRadius: '8px',
                      backgroundColor: '#0F1825',
                      border: 'none',
                      color: '#FFFFFF',
                      paddingLeft: '16px',
                      paddingRight: '40px',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  />
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: showReceiveTokenDropdown ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)',
                      color: '#9CA3AF',
                      pointerEvents: 'none',
                      transition: 'transform 0.2s'
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                  {showReceiveTokenDropdown && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        marginTop: '4px',
                        backgroundColor: 'rgba(26, 38, 47, 0.2)',
                        borderRadius: '8px',
                        border: '0.3px solid rgba(255, 255, 255, 0.1)',
                        zIndex: 1000,
                        overflow: 'hidden',
                        boxShadow: '5px 5px 15px 0px rgba(0, 0, 0, 0.25)',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)'
                      }}
                    >
                      {['Bitcoin', 'Ethereum', 'Tether', 'USDC'].map((token) => (
                        <div
                          key={token}
                          onClick={() => {
                            setSelectedReceiveToken(token);
                            setShowReceiveTokenDropdown(false);
                          }}
                          style={{
                            padding: '12px 16px',
                            color: '#FFFFFF',
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '14px',
                            cursor: 'pointer',
                            backgroundColor: selectedReceiveToken === token ? 'rgba(169, 239, 69, 0.1)' : 'transparent',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            if (selectedReceiveToken !== token) {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedReceiveToken !== token) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          {token}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Network Dropdown */}
              <div>
                <label style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  Network
                </label>
                <div ref={receiveNetworkDropdownRef} style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Select network"
                    value={selectedReceiveNetwork}
                    readOnly
                    onClick={() => setShowReceiveNetworkDropdown(!showReceiveNetworkDropdown)}
                    style={{
                      width: '100%',
                      height: '45px',
                      borderRadius: '8px',
                      backgroundColor: '#0F1825',
                      border: 'none',
                      color: '#FFFFFF',
                      paddingLeft: '16px',
                      paddingRight: '40px',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  />
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: showReceiveNetworkDropdown ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)',
                      color: '#9CA3AF',
                      pointerEvents: 'none',
                      transition: 'transform 0.2s'
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                  {showReceiveNetworkDropdown && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        marginTop: '4px',
                        backgroundColor: 'rgba(26, 38, 47, 0.2)',
                        borderRadius: '8px',
                        border: '0.3px solid rgba(255, 255, 255, 0.1)',
                        zIndex: 1000,
                        overflow: 'hidden',
                        boxShadow: '5px 5px 15px 0px rgba(0, 0, 0, 0.25)',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)'
                      }}
                    >
                      {['Ethereum', 'Bitcoin', 'Polygon', 'BSC'].map((network) => (
                        <div
                          key={network}
                          onClick={() => {
                            setSelectedReceiveNetwork(network);
                            setShowReceiveNetworkDropdown(false);
                          }}
                          style={{
                            padding: '12px 16px',
                            color: '#FFFFFF',
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '14px',
                            cursor: 'pointer',
                            backgroundColor: selectedReceiveNetwork === network ? 'rgba(169, 239, 69, 0.1)' : 'transparent',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            if (selectedReceiveNetwork !== network) {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedReceiveNetwork !== network) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          {network}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Other details */}
              <div style={{ textAlign: 'center' }}>
                <span style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '12px',
                  fontWeight: 400,
                  color: '#9CA3AF'
                }}>
                  Other details
                </span>
              </div>

              {/* Deposit Card */}
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '18px',
                  fontWeight: 400,
                  color: '#000000',
                  width: '100%',
                  textAlign: 'center'
                }}>
                  Deposit {selectedReceiveToken === 'Ethereum' ? 'ETH' : selectedReceiveToken === 'Bitcoin' ? 'BTC' : selectedReceiveToken === 'Tether' ? 'USDT' : selectedReceiveToken === 'USDC' ? 'USDC' : 'ETH'}
                </div>
                
                {/* QR Code */}
                <div style={{
                  width: '200px',
                  height: '200px',
                  backgroundColor: '#F5F5F5',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #E0E0E0',
                  overflow: 'hidden'
                }}>
                  <img
                    src={images.image34}
                    alt="QR Code"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </div>

                {/* Wallet Address */}
                <div style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px',
                  backgroundColor: '#F9F9F9',
                  borderRadius: '8px',
                  border: '1px solid #A9EF45'
                }}>
                  <span style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#000000',
                    flex: 1,
                    wordBreak: 'break-all'
                  }}>
                    0x123ddffge22335kd23kfmdk24kf
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('0x123ddffge22335kd23kfmdk24kf');
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#666666' }}>
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                </div>

                {/* Network Info */}
                <div style={{
                  width: '100%',
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '12px',
                  fontWeight: 400,
                  color: '#666666',
                  textAlign: 'left'
                }}>
                  Network: {selectedReceiveNetwork}
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div style={{ marginTop: 'auto', paddingTop: '24px', display: 'flex', justifyContent: 'flex-start' }}>
              <button
                onClick={() => {
                  // Handle download action
                  setShowReceiveCryptoModal(false);
                }}
                style={{
                  width: '174px',
                  height: '60px',
                  borderRadius: '100px',
                  backgroundColor: '#A9EF45',
                  border: 'none',
                  color: '#000000',
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 1
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#94E643';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#A9EF45';
                }}
              >
                Download
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
};

const UserWalletComponent = UserWallet;
export default UserWalletComponent;

