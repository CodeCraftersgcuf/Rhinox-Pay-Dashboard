import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUsers, User } from "../../../../services/userService";
import images from "../../../../constants/images";

interface P2PAd {
  id: string;
  adType: string;
  token: string;
  country: string;
  qty: string;
  amount: string;
  noOfOrders: string;
  status: "success" | "pending" | "failed";
  date: string;
}

interface Order {
  id: string;
  orderType: string;
  token: string;
  country: string;
  qty: string;
  amount: string;
  vendor: string;
  status: "Completed" | "Awaiting Release" | "Order placed" | "Awaiting Payment";
  date: string;
}

const P2PProfile: React.FC = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState("All Time");
  const [selectedTab, setSelectedTab] = useState("Ads");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showBuyDropdown, setShowBuyDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Country");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedBuy, setSelectedBuy] = useState("All Ad type");
  const [selectedAds, setSelectedAds] = useState<Set<string>>(new Set());
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [showAdModal, setShowAdModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [showOpenAdModal, setShowOpenAdModal] = useState(false);
  const [openAdType, setOpenAdType] = useState<'USDT' | 'ETH'>('USDT');
  const [showChatModal, setShowChatModal] = useState(false);
  const [showPendingDropdown, setShowPendingDropdown] = useState(false);
  const [showWinnerDropdown, setShowWinnerDropdown] = useState(false);
  const [isChatJoined, setIsChatJoined] = useState(false);
  const [selectedOrderTab, setSelectedOrderTab] = useState('Received');
  const [showPaymentAccountsModal, setShowPaymentAccountsModal] = useState(false);
  const [showAccountTypeDropdown, setShowAccountTypeDropdown] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState('All');
  const [showAccountNumber, setShowAccountNumber] = useState<{ [key: number]: boolean }>({});
  const [showAddNewAccountModal, setShowAddNewAccountModal] = useState(false);
  const [showAddAccountTypeDropdown, setShowAddAccountTypeDropdown] = useState(false);
  const [selectedAddAccountType, setSelectedAddAccountType] = useState('Select Account type');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [showOrdersBuyDropdown, setShowOrdersBuyDropdown] = useState(false);
  const [showOrdersStatusDropdown, setShowOrdersStatusDropdown] = useState(false);
  const [selectedOrdersBuy, setSelectedOrdersBuy] = useState("All Ad type");
  const [selectedOrdersStatus, setSelectedOrdersStatus] = useState("All Status");
  const [showOrderPlacedModal, setShowOrderPlacedModal] = useState(false);
  const [showAwaitingReleaseModal, setShowAwaitingReleaseModal] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const buyDropdownRef = useRef<HTMLDivElement>(null);
  const pendingDropdownRef = useRef<HTMLDivElement>(null);
  const winnerDropdownRef = useRef<HTMLDivElement>(null);
  const ordersBuyDropdownRef = useRef<HTMLDivElement>(null);
  const ordersStatusDropdownRef = useRef<HTMLDivElement>(null);

  const timeRanges = ["All Time", "7 Days", "1 month", "1 Year", "Custom"];
  const tabs = ["Ads", "Orders"];
  const countryOptions = ["All Countries", "Nigeria", "Ghana", "Kenya", "South Africa"];
  const statusOptions = ["All Status", "Running", "Closed"];
  const statusOptionsOrders = ["All Status", "Order Placed", "Awaiting Payment", "Awaiting Release", "Completed"];
  const buyOptions = ["All Ad type", "Buy ad", "Sell Ads"];

  // Sample P2P Ads data
  const p2pAds: P2PAd[] = [
    {
      id: "1",
      adType: "Buy - USDT",
      token: "USDT",
      country: "Nigeria",
      qty: "100",
      amount: "$100",
      noOfOrders: "500",
      status: "success",
      date: "22/10/25 - 07:22 AM"
    },
    {
      id: "2",
      adType: "Buy - USDT",
      token: "USDT",
      country: "Nigeria",
      qty: "100",
      amount: "$100",
      noOfOrders: "500",
      status: "success",
      date: "22/10/25 - 07:22 AM"
    },
    {
      id: "3",
      adType: "Buy - USDT",
      token: "USDT",
      country: "Nigeria",
      qty: "100",
      amount: "$100",
      noOfOrders: "500",
      status: "success",
      date: "22/10/25 - 07:22 AM"
    },
    {
      id: "4",
      adType: "Buy - USDT",
      token: "USDT",
      country: "Nigeria",
      qty: "100",
      amount: "$100",
      noOfOrders: "500",
      status: "success",
      date: "22/10/25 - 07:22 AM"
    },
    {
      id: "5",
      adType: "Buy - USDT",
      token: "USDT",
      country: "Nigeria",
      qty: "100",
      amount: "$100",
      noOfOrders: "500",
      status: "success",
      date: "22/10/25 - 07:22 AM"
    }
  ];

  // Sample Orders data
  const orders: Order[] = [
    {
      id: "1",
      orderType: "Buy - USDT",
      token: "USDT",
      country: "Nigeria",
      qty: "100",
      amount: "$100",
      vendor: "Chris Shawn",
      status: "Completed",
      date: "22/10/25 - 07:22 AM"
    },
    {
      id: "2",
      orderType: "Buy - USDT",
      token: "USDT",
      country: "Nigeria",
      qty: "100",
      amount: "$100",
      vendor: "Chris Shawn",
      status: "Completed",
      date: "22/10/25 - 07:22 AM"
    },
    {
      id: "3",
      orderType: "Buy - USDT",
      token: "USDT",
      country: "Nigeria",
      qty: "100",
      amount: "$100",
      vendor: "Chris Shawn",
      status: "Awaiting Release",
      date: "22/10/25 - 07:22 AM"
    },
    {
      id: "4",
      orderType: "Buy - USDT",
      token: "USDT",
      country: "Nigeria",
      qty: "100",
      amount: "$100",
      vendor: "Chris Shawn",
      status: "Order placed",
      date: "22/10/25 - 07:22 AM"
    },
    {
      id: "5",
      orderType: "Buy - USDT",
      token: "USDT",
      country: "Nigeria",
      qty: "100",
      amount: "$100",
      vendor: "Chris Shawn",
      status: "Awaiting Payment",
      date: "22/10/25 - 07:22 AM"
    }
  ];

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const users = await getUsers(false);
        const foundUser = users.find(u => u.id === username || u.name.toLowerCase().includes(username?.toLowerCase() || ""));
        setUser(foundUser || users[0]);
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [username]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCountryDropdown && countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
      if (showStatusDropdown && statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setShowStatusDropdown(false);
      }
      if (showBuyDropdown && buyDropdownRef.current && !buyDropdownRef.current.contains(event.target as Node)) {
        setShowBuyDropdown(false);
      }
      if (showPendingDropdown && pendingDropdownRef.current && !pendingDropdownRef.current.contains(event.target as Node)) {
        setShowPendingDropdown(false);
      }
      if (showWinnerDropdown && winnerDropdownRef.current && !winnerDropdownRef.current.contains(event.target as Node)) {
        setShowWinnerDropdown(false);
      }
      if (showOrdersBuyDropdown && ordersBuyDropdownRef.current && !ordersBuyDropdownRef.current.contains(event.target as Node)) {
        setShowOrdersBuyDropdown(false);
      }
      if (showOrdersStatusDropdown && ordersStatusDropdownRef.current && !ordersStatusDropdownRef.current.contains(event.target as Node)) {
        setShowOrdersStatusDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCountryDropdown, showStatusDropdown, showBuyDropdown, showPendingDropdown, showWinnerDropdown, showOrdersBuyDropdown, showOrdersStatusDropdown]);

  const handleSelectAd = (index: number) => {
    setSelectedAds(prev => {
      const newSet = new Set(prev);
      const indexStr = index.toString();
      if (newSet.has(indexStr)) {
        newSet.delete(indexStr);
      } else {
        newSet.add(indexStr);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedAds.size === p2pAds.length && p2pAds.length > 0) {
      setSelectedAds(new Set());
    } else {
      setSelectedAds(new Set(p2pAds.map((_, index) => index.toString())));
    }
  };

  const handleSelectAllOrders = () => {
    if (selectedOrders.size === orders.length && orders.length > 0) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(orders.map((_, index) => index.toString())));
    }
  };

  if (loading || !user) {
    return (
      <div className="text-white text-center">Loading P2P profile...</div>
    );
  }

  return (
    <div>
      {/* Top Navigation Bar Container */}
      <div
        className="md:mx-[-32px] mx-[-16px] md:mt-[-32px] mt-[-16px] mb-6 md:mb-6"
        style={{
          background: 'linear-gradient(to right, #0B1B20, #0A1320)',
          width: 'calc(100% + 64px)'
        }}
      >
        {/* Top Navigation Bar */}
        <div
          className="flex gap-2 md:gap-6 border-b border-gray-700 flex-wrap md:flex-nowrap overflow-x-auto h-[50px]"
          style={{
            width: '100%',
            height: '50px',
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
              marginLeft: '32px'
            }}
          >
            User Profile
          </button>
          <button
            onClick={() => navigate(`/user/management/${username}/wallet`)}
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
            User Wallet
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
            P2P Profile
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
        </div>
      </div>

      {/* Profile Header Section */}
      <div
        className="px-8 mt-6 mb-6"
        style={{
          background: 'linear-gradient(90deg, #0B1A20 0%, #0B1420 100%)',
          height: '250px',
          borderRadius: '15px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-white mb-2 pt-10 font-normal not-italic text-[30px] leading-[100%] tracking-[0%]" style={{
              fontFamily: 'Agbalumo, sans-serif'
            }}>P2P Profile</h2>
            <p className="pt-2" style={{
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#757E81'
            }}>View and manage user p2p details</p>
          </div>

          {/* Time Range Filters */}
          <div className="flex items-center gap-2 border-b border-white/10 pb-4 mt-7 pt-5.5" style={{ borderBottomWidth: '0.3px' }}>
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => setSelectedTimeRange(range)}
                className={`px-4 py-2 rounded-full text-sm font-normal transition-colors ${selectedTimeRange === range
                  ? 'bg-white text-black'
                  : 'bg-transparent text-white border border-[#273B3F]'
                  }`}
                style={{
                  borderWidth: '0.3px',
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
                }}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Total Ads Card */}
          <div className="p-6 flex items-center gap-4" style={{ borderRadius: '10px', background: 'linear-gradient(90deg, #4880C0 0%, #1B589E 100%)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4887CF' }}>
              <img
                src={images.Vector3}
                alt="Folder"
                className="w-6 h-6"
                style={{ filter: 'brightness(0)' }}
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-normal mb-1" style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                color: '#CEDDED'
              }}>Total Ads</p>
              <p className="text-white text-3xl font-bold leading-none" style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
              }}>250</p>
            </div>
          </div>

          {/* Buy Orders Card */}
          <div className="p-6 flex items-center gap-4" style={{ borderRadius: '10px', background: 'linear-gradient(90deg, #4880C0 0%, #1B589E 100%)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4887CF' }}>
              <img
                src={images.Vector3}
                alt="Folder"
                className="w-6 h-6"
                style={{ filter: 'brightness(0)' }}
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-normal mb-1" style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                color: '#CEDDED'
              }}>Buy Orders</p>
              <p className="text-white text-3xl font-bold leading-none" style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
              }}>150</p>
            </div>
          </div>

          {/* Sell Orders Card */}
          <div className="p-6 flex items-center gap-4" style={{ borderRadius: '10px', background: 'linear-gradient(90deg, #4880C0 0%, #1B589E 100%)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4887CF' }}>
              <img
                src={images.Vector3}
                alt="Folder"
                className="w-6 h-6"
                style={{ filter: 'brightness(0)' }}
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-normal mb-1" style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                color: '#CEDDED'
              }}>Sell Orders</p>
              <p className="text-white text-3xl font-bold leading-none" style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
              }}>100</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation and Filter Bar */}
      <div className="mb-6 flex items-center flex-wrap" style={{ paddingRight: '32px' }}>
        {/* Tabs */}
        <div className="flex items-center" style={{
          width: 'auto',
          height: '34px',
          borderRadius: '100px',
          borderWidth: '0.3px',
          borderStyle: 'solid',
          borderColor: '#FFFFFF33',
          backgroundColor: '#FFFFFF0D',
          paddingTop: '2px',
          paddingBottom: '2px',
          paddingLeft: '0',
          paddingRight: '0',
          gap: '4px'
        }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`font-normal transition-colors whitespace-nowrap ${selectedTab === tab
                ? 'text-black'
                : 'text-white'
                }`}
              style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '10px',
                lineHeight: '100%',
                letterSpacing: '0%',
                height: '30px',
                borderRadius: '100px',
                padding: '0 12px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                ...(selectedTab === tab ? {
                  backgroundColor: '#A9EF45',
                  color: '#000000'
                } : {
                  backgroundColor: 'transparent',
                  color: '#FFFFFF'
                })
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Bulk Action Button */}
        <button
          className="text-white border border-[#273B3F] whitespace-nowrap flex items-center justify-center"
          style={{
            width: '97px',
            height: '34px',
            borderRadius: '100px',
            borderWidth: '0.3px',
            backgroundColor: '#111E26',
            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: '10px',
            lineHeight: '100%',
            letterSpacing: '0%',
            marginLeft: '15px'
          }}
        >
          Bulk Action
        </button>

        {/* Buy Dropdown */}
        <div className="relative" style={{ marginLeft: '15px' }}>
          <button
            onClick={() => {
              if (selectedTab === "Orders") {
                setShowOrdersBuyDropdown(!showOrdersBuyDropdown);
                setShowOrdersStatusDropdown(false);
              } else {
                setShowBuyDropdown(!showBuyDropdown);
                setShowCountryDropdown(false);
                setShowStatusDropdown(false);
              }
            }}
            className="flex items-center justify-center gap-1 text-white border border-[#273B3F] whitespace-nowrap"
            style={{
              width: '97px',
              height: '34px',
              borderRadius: '100px',
              borderWidth: '0.3px',
              backgroundColor: '#111E26',
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '10px',
              lineHeight: '100%',
              letterSpacing: '0%'
            }}
          >
            {selectedTab === "Orders" ? selectedOrdersBuy : selectedBuy}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          {selectedTab === "Orders" ? (
            showOrdersBuyDropdown && (
              <div ref={ordersBuyDropdownRef} className="absolute top-full left-0 mt-2 z-50" style={{
                width: '105px',
                borderRadius: '10px',
                backgroundColor: '#020C19B2',
                boxShadow: '5px 5px 15px 0px #00000040',
                backdropFilter: 'blur(4px)',
                padding: '4px 0',
                overflow: 'hidden'
              }}>
                {buyOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedOrdersBuy(option);
                      setShowOrdersBuyDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm font-normal transition-colors hover:bg-white/5 ${selectedOrdersBuy === option ? 'bg-white/10' : ''
                      }`}
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      color: 'white',
                      fontSize: '10px'
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )
          ) : (
            showBuyDropdown && (
              <div ref={buyDropdownRef} className="absolute top-full left-0 mt-2 z-50" style={{
                width: '105px',
                borderRadius: '10px',
                backgroundColor: '#020C19B2',
                boxShadow: '5px 5px 15px 0px #00000040',
                backdropFilter: 'blur(4px)',
                padding: '4px 0',
                overflow: 'hidden'
              }}>
                {buyOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedBuy(option);
                      setShowBuyDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm font-normal transition-colors hover:bg-white/5 ${selectedBuy === option ? 'bg-white/10' : ''
                      }`}
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      color: 'white',
                      fontSize: '10px'
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )
          )}
        </div>

        {/* Country Dropdown */}
        <div className="relative" style={{ marginLeft: '15px' }}>
          <button
            onClick={() => {
              setShowCountryDropdown(!showCountryDropdown);
              setShowBuyDropdown(false);
              setShowStatusDropdown(false);
            }}
            className="flex items-center justify-center gap-1 text-white border border-[#273B3F] whitespace-nowrap"
            style={{
              width: '97px',
              height: '34px',
              borderRadius: '100px',
              borderWidth: '0.3px',
              backgroundColor: '#111E26',
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '10px',
              lineHeight: '100%',
              letterSpacing: '0%'
            }}
          >
            {selectedCountry}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          {showCountryDropdown && (
            <div ref={countryDropdownRef} className="absolute top-full left-0 mt-2 z-50" style={{
              width: '150px',
              borderRadius: '10px',
              backgroundColor: '#020C19B2',
              boxShadow: '5px 5px 15px 0px #00000040',
              backdropFilter: 'blur(4px)',
              padding: '4px 0',
              overflow: 'hidden'
            }}>
              {countryOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedCountry(option);
                    setShowCountryDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm font-normal transition-colors hover:bg-white/5 ${selectedCountry === option ? 'bg-white/10' : ''
                    }`}
                  style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    color: 'white',
                    fontSize: '10px'
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status Dropdown */}
        <div className="relative" style={{ marginLeft: '15px' }}>
          <button
            onClick={() => {
              if (selectedTab === "Orders") {
                setShowOrdersStatusDropdown(!showOrdersStatusDropdown);
                setShowOrdersBuyDropdown(false);
              } else {
                setShowStatusDropdown(!showStatusDropdown);
                setShowBuyDropdown(false);
                setShowCountryDropdown(false);
              }
            }}
            className="flex items-center justify-center gap-1 text-white border border-[#273B3F] whitespace-nowrap"
            style={{
              width: '97px',
              height: '34px',
              borderRadius: '100px',
              borderWidth: '0.3px',
              backgroundColor: '#111E26',
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '10px',
              lineHeight: '100%',
              letterSpacing: '0%'
            }}
          >
            {selectedTab === "Orders" ? selectedOrdersStatus : selectedStatus}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          {selectedTab === "Orders" ? (
            showOrdersStatusDropdown && (
              <div ref={ordersStatusDropdownRef} className="absolute top-full left-0 mt-2 z-50" style={{
                width: '150px',
                borderRadius: '10px',
                backgroundColor: '#020C19B2',
                boxShadow: '5px 5px 15px 0px #00000040',
                backdropFilter: 'blur(4px)',
                padding: '4px 0',
                overflow: 'hidden'
              }}>
                {statusOptionsOrders.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedOrdersStatus(option);
                      setShowOrdersStatusDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm font-normal transition-colors hover:bg-white/5 ${selectedOrdersStatus === option ? 'bg-white/10' : ''
                      }`}
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      color: 'white',
                      fontSize: '10px'
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )
          ) : (
            showStatusDropdown && (
              <div ref={statusDropdownRef} className="absolute top-full left-0 mt-2 z-50" style={{
                width: '150px',
                borderRadius: '10px',
                backgroundColor: '#020C19B2',
                boxShadow: '5px 5px 15px 0px #00000040',
                backdropFilter: 'blur(4px)',
                padding: '4px 0',
                overflow: 'hidden'
              }}>
                {statusOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedStatus(option);
                      setShowStatusDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm font-normal transition-colors hover:bg-white/5 ${selectedStatus === option ? 'bg-white/10' : ''
                      }`}
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      color: 'white',
                      fontSize: '10px'
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            className="text-black font-normal rounded-full whitespace-nowrap flex items-center justify-center gap-1"
            style={{
              height: '34px',
              borderRadius: '100px',
              backgroundColor: '#A9EF45',
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '10px',
              lineHeight: '100%',
              letterSpacing: '0%',
              padding: '0 12px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <img
              src={images.pluscircle}
              alt="Create"
              style={{ width: '14px', height: '14px' }}
            />
            Create Ad
          </button>
          <button
            onClick={() => setShowPaymentAccountsModal(true)}
            className="text-black font-normal rounded-full whitespace-nowrap flex items-center justify-center"
            style={{
              height: '34px',
              borderRadius: '100px',
              backgroundColor: '#A9EF45',
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '10px',
              lineHeight: '100%',
              letterSpacing: '0%',
              padding: '0 12px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Payment Accounts
          </button>
        </div>
      </div>

      {/* P2P Ads Posted Section */}
      {selectedTab === "Ads" && (
        <div>
          {/* Table Header with Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" style={{ backgroundColor: '#020B16', padding: '24px 32px 16px', height: '60px', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
            <h3 className="text-white text-lg font-semibold" style={{
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
            }}>
              P2P Ads Posted
            </h3>
            <div className="relative" style={{ width: '300px' }}>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full text-white"
                style={{
                  backgroundColor: '#111E26',
                  border: '0.3px solid #273B3F',
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '12px'
                }}
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: '#9CA3AF' }}
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
          </div>

          {/* Table */}
          <div style={{ backgroundColor: '#0F1825', width: '100%', overflow: 'hidden' }}>
            {/* Table Header */}
            <div style={{ backgroundColor: '#1C2530', width: '100%' }}>
              <table className="w-full" style={{ width: '100%', tableLayout: 'auto' }}>
                <thead>
                  <tr>
                    <th
                      className="text-left py-3 text-white"
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '12px',
                        fontWeight: 400,
                        verticalAlign: 'middle',
                        backgroundColor: '#1C2530',
                        paddingLeft: '24px',
                        paddingRight: '12px'
                      }}
                    >
                      <div className="relative inline-block" style={{ width: '16px', height: '16px' }}>
                        <input
                          type="checkbox"
                          checked={selectedAds.size === p2pAds.length && p2pAds.length > 0}
                          onChange={handleSelectAll}
                          className="rounded cursor-pointer"
                          style={{
                            width: '16px',
                            height: '16px',
                            backgroundColor: selectedAds.size === p2pAds.length && p2pAds.length > 0 ? '#A9EF45' : 'transparent',
                            borderColor: 'white',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            outline: 'none',
                            margin: 0,
                            padding: 0,
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                            cursor: 'pointer',
                            position: 'relative',
                            zIndex: 1
                          }}
                        />
                        {selectedAds.size === p2pAds.length && p2pAds.length > 0 && (
                          <svg
                            className="absolute pointer-events-none"
                            style={{
                              width: '10px',
                              height: '10px',
                              top: '3px',
                              left: '3px',
                              marginTop: '2px',
                              zIndex: 2
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
                        paddingLeft: '10px',
                        paddingRight: '82px'
                      }}
                    >
                      Ad Type
                    </th>
                    <th
                      className="text-left py-3 text-white"
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '12px',
                        fontWeight: 400,
                        verticalAlign: 'middle',
                        backgroundColor: '#1C2530',
                        paddingLeft: '10px',
                        paddingRight: '82px'
                      }}
                    >
                      Token
                    </th>
                    <th
                      className="text-left py-3 text-white"
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '12px',
                        fontWeight: 400,
                        verticalAlign: 'middle',
                        backgroundColor: '#1C2530',
                        paddingLeft: '20px',
                        paddingRight: '82px'
                      }}
                    >
                      Country
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
                        paddingRight: '82px'
                      }}
                    >
                      Qty
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
                        paddingRight: '62px'
                      }}
                    >
                      Amount
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
                        paddingRight: '42px'
                      }}
                    >
                      No of orders
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
                        paddingRight: '42px'
                      }}
                    >
                      Status
                    </th>
                    <th
                      className="text-left py-3 text-white"
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '12px',
                        fontWeight: 400,
                        verticalAlign: 'middle',
                        backgroundColor: '#1C2530',
                        paddingLeft: '30px',
                        paddingRight: '62px'
                      }}
                    >
                      Date
                    </th>
                    <th
                      className="text-left py-3 text-white"
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '12px',
                        fontWeight: 400,
                        verticalAlign: 'middle',
                        backgroundColor: '#1C2530',
                        paddingLeft: '60px',
                        paddingRight: '92px'
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
              </table>
            </div>

            {/* Table Body */}
            <div style={{ backgroundColor: '#0F1825', width: '100%', paddingBottom: '0' }}>
              <table className="w-full" style={{ width: '100%', tableLayout: 'auto' }}>
                <tbody>
                  {p2pAds.map((ad, index) => (
                    <tr
                      key={index}
                      className="border-b border-[#2B363E] hover:bg-[#1A252F] transition-colors"
                      style={{
                        height: '60px',
                        backgroundColor: '#0F1825'
                      }}
                    >
                      <td className="py-3" style={{ verticalAlign: 'middle', paddingLeft: '24px', paddingRight: '12px' }}>
                        <div className="relative inline-block" style={{ width: '16px', height: '16px' }}>
                          <input
                            type="checkbox"
                            checked={selectedAds.has(index.toString())}
                            onChange={() => handleSelectAd(index)}
                            className="rounded cursor-pointer"
                            style={{
                              width: '16px',
                              height: '16px',
                              backgroundColor: selectedAds.has(index.toString()) ? '#A9EF45' : 'transparent',
                              borderColor: 'white',
                              borderWidth: '1px',
                              borderStyle: 'solid',
                              outline: 'none',
                              margin: 0,
                              padding: 0,
                              appearance: 'none',
                              WebkitAppearance: 'none',
                              MozAppearance: 'none',
                              cursor: 'pointer',
                              position: 'relative',
                              zIndex: 1
                            }}
                          />
                          {selectedAds.has(index.toString()) && (
                            <svg
                              className="absolute pointer-events-none"
                              style={{
                                width: '10px',
                                height: '10px',
                                top: '3px',
                                left: '3px',
                                marginTop: '2px',
                                zIndex: 2
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
                        className="text-left py-3"
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '12px',
                          fontWeight: 400,
                          color: '#D1D5DB',
                          verticalAlign: 'middle',
                          paddingLeft: '0px',
                          paddingRight: '42px'
                        }}
                      >
                        {ad.adType}
                      </td>
                      <td className="py-3" style={{ verticalAlign: 'middle', paddingLeft: '0px', paddingRight: '42px' }}>
                        <div className="flex items-center gap-2">
                          <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            overflow: 'hidden',
                            flexShrink: 0
                          }}>
                            <img
                              src={images.cryptocurrency_color_usdt}
                              alt={ad.token}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '50%'
                              }}
                            />
                          </div>
                          <span
                            style={{
                              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '12px',
                              fontWeight: 400,
                              color: '#D1D5DB'
                            }}
                          >
                            {ad.token}
                          </span>
                        </div>
                      </td>
                      <td className="py-3" style={{ verticalAlign: 'middle', paddingLeft: '0px', paddingRight: '42px' }}>
                        <div className="flex items-center gap-2">
                          <img
                            src={images.flag}
                            alt={ad.country || 'Country'}
                            className="w-5 h-3 object-cover rounded"
                          />
                          <span
                            style={{
                              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '12px',
                              fontWeight: 400,
                              color: '#D1D5DB'
                            }}
                          >
                            {ad.country}
                          </span>
                        </div>
                      </td>
                      <td
                        className="text-left py-3"
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '12px',
                          fontWeight: 400,
                          color: '#D1D5DB',
                          verticalAlign: 'middle',
                          paddingLeft: '0px',
                          paddingRight: '62px'
                        }}
                      >
                        {ad.qty}
                      </td>
                      <td
                        className="text-left py-3"
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '12px',
                          fontWeight: 400,
                          color: '#D1D5DB',
                          verticalAlign: 'middle',
                          paddingLeft: '0px',
                          paddingRight: '62px'
                        }}
                      >
                        {ad.amount}
                      </td>
                      <td
                        className="text-left py-3"
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '12px',
                          fontWeight: 400,
                          color: '#D1D5DB',
                          verticalAlign: 'middle',
                          paddingLeft: '0px',
                          paddingRight: '62px'
                        }}
                      >
                        {ad.noOfOrders}
                      </td>
                      <td className="py-3" style={{ verticalAlign: 'middle', paddingLeft: '0px', paddingRight: '42px' }}>
                        <div className="flex items-center">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ad.status === 'success' ? '#008000' : ad.status === 'failed' ? '#FF0000' : '#FFD700' }}></span>
                        </div>
                      </td>
                      <td
                        className="text-left py-3"
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '12px',
                          fontWeight: 400,
                          color: '#D1D5DB',
                          verticalAlign: 'middle',
                          paddingLeft: '0px',
                          paddingRight: '42px'
                        }}
                      >
                        {ad.date}
                      </td>
                      <td className="py-3" style={{ verticalAlign: 'middle', paddingLeft: '0px', paddingRight: '24px' }}>
                        <button
                          onClick={() => {
                            setSelectedAd(ad);
                            setShowAdModal(true);
                          }}
                          className="text-xs font-normal rounded whitespace-nowrap"
                          style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            backgroundColor: '#A9EF45',
                            color: '#000000',
                            padding: '6px 12px',
                            cursor: 'pointer',
                            border: 'none',
                            borderRadius: '8px'
                          }}
                        >
                          Full Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Orders Section */}
      {selectedTab === "Orders" && (
        <div>
          {/* Table Header with Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" style={{ backgroundColor: '#020B16', padding: '24px 32px 16px', height: '60px', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
            <h3 className="text-white text-lg font-semibold" style={{
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
            }}>
              P2P Ads Posted
            </h3>
            <div className="relative" style={{ width: '300px' }}>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full text-white"
                style={{
                  backgroundColor: '#111E26',
                  border: '0.3px solid #273B3F',
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '12px'
                }}
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: '#9CA3AF' }}
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
          </div>

          {/* Table */}
          <div style={{ backgroundColor: '#0F1825', width: '100%', overflow: 'hidden' }}>
            {/* Table Header */}
            <div style={{ backgroundColor: '#1C2530', width: '100%' }}>
              <table className="w-full" style={{ width: '100%', tableLayout: 'auto' }}>
                <thead>
                  <tr>
                    <th
                      className="text-left py-3 text-white"
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '12px',
                        fontWeight: 400,
                        verticalAlign: 'middle',
                        backgroundColor: '#1C2530',
                        paddingLeft: '24px',
                        paddingRight: '12px'
                      }}
                    >
                      <div className="relative inline-block" style={{ width: '16px', height: '16px' }}>
                        <input
                          type="checkbox"
                          checked={selectedOrders.size === orders.length && orders.length > 0}
                          onChange={handleSelectAllOrders}
                          className="rounded cursor-pointer"
                          style={{
                            width: '16px',
                            height: '16px',
                            backgroundColor: selectedOrders.size === orders.length && orders.length > 0 ? '#A9EF45' : 'transparent',
                            borderColor: 'white',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            outline: 'none',
                            margin: 0,
                            padding: 0,
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                            cursor: 'pointer',
                            position: 'relative',
                            zIndex: 1
                          }}
                        />
                        {selectedOrders.size === orders.length && orders.length > 0 && (
                          <svg
                            className="absolute pointer-events-none"
                            style={{
                              width: '10px',
                              height: '10px',
                              top: '3px',
                              left: '3px',
                              marginTop: '2px',
                              zIndex: 2
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
                        paddingLeft: '7px',
                        paddingRight: '82px'
                      }}
                    >
                      Order Type
                    </th>
                    <th
                      className="text-left py-3 text-white"
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '12px',
                        fontWeight: 400,
                        verticalAlign: 'middle',
                        backgroundColor: '#1C2530',
                        paddingLeft: '10px',
                        paddingRight: '82px'
                      }}
                    >
                      Token
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
                        paddingRight: '82px'
                      }}
                    >
                      Country
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
                        paddingRight: '82px'
                      }}
                    >
                      Qty
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
                        paddingRight: '62px'
                      }}
                    >
                      Amount
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
                        paddingRight: '62px'
                      }}
                    >
                      Vendor
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
                        paddingRight: '42px'
                      }}
                    >
                      Status
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
                        paddingRight: '42px'
                      }}
                    >
                      Date
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
                        paddingRight: '24px'
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order.id} style={{ background: 'linear-gradient(to right, #101F25, #0F1825)' }}>
                      <td className="py-3" style={{ verticalAlign: 'middle', paddingLeft: '24px', paddingRight: '12px' }}>
                        <div className="relative inline-block" style={{ width: '16px', height: '16px' }}>
                          <input
                            type="checkbox"
                            checked={selectedOrders.has(index.toString())}
                            onChange={() => {
                              const newSelected = new Set(selectedOrders);
                              if (newSelected.has(index.toString())) {
                                newSelected.delete(index.toString());
                              } else {
                                newSelected.add(index.toString());
                              }
                              setSelectedOrders(newSelected);
                            }}
                            className="rounded cursor-pointer"
                            style={{
                              width: '16px',
                              height: '16px',
                              backgroundColor: selectedOrders.has(index.toString()) ? '#A9EF45' : 'transparent',
                              borderColor: 'white',
                              borderWidth: '1px',
                              borderStyle: 'solid',
                              outline: 'none',
                              margin: 0,
                              padding: 0,
                              appearance: 'none',
                              WebkitAppearance: 'none',
                              MozAppearance: 'none',
                              cursor: 'pointer',
                              position: 'relative',
                              zIndex: 1
                            }}
                          />
                          {selectedOrders.has(index.toString()) && (
                            <svg
                              className="absolute pointer-events-none"
                              style={{
                                width: '10px',
                                height: '10px',
                                top: '3px',
                                left: '3px',
                                marginTop: '2px',
                                zIndex: 2
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
                        className="text-left py-3"
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '12px',
                          fontWeight: 400,
                          color: '#D1D5DB',
                          verticalAlign: 'middle',
                          paddingLeft: '10px',
                          paddingRight: '75px',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {order.orderType}
                      </td>
                      <td className="py-3" style={{ verticalAlign: 'middle', paddingLeft: '10px', paddingRight: '82px' }}>
                        <div className="flex items-center gap-2">
                          <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: '#00D9A5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <span style={{
                              color: 'white',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
                            }}>T</span>
                          </div>
                          <span style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '12px',
                            color: '#D1D5DB'
                          }}>{order.token}</span>
                        </div>
                      </td>
                      <td className="py-3" style={{ verticalAlign: 'middle', paddingLeft: '0px', paddingRight: '82px' }}>
                        <div className="flex items-center gap-2">
                          <img
                            src={images.flag3}
                            alt={order.country}
                            style={{ width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0 }}
                          />
                          <span style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '12px',
                            color: '#D1D5DB'
                          }}>{order.country}</span>
                        </div>
                      </td>
                      <td
                        className="text-left py-3"
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '12px',
                          fontWeight: 400,
                          color: '#D1D5DB',
                          verticalAlign: 'middle',
                          paddingLeft: '0px',
                          paddingRight: '82px'
                        }}
                      >
                        {order.qty}
                      </td>
                      <td
                        className="text-left py-3"
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '12px',
                          fontWeight: 400,
                          color: '#D1D5DB',
                          verticalAlign: 'middle',
                          paddingLeft: '0px',
                          paddingRight: '22px'
                        }}
                      >
                        {order.amount}
                      </td>
                      <td
                        className="text-left py-3"
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '12px',
                          fontWeight: 400,
                          color: '#D1D5DB',
                          verticalAlign: 'middle',
                          paddingLeft: '0px',
                          paddingRight: '52px'
                        }}
                      >
                        {order.vendor}
                      </td>
                      <td className="py-3" style={{ verticalAlign: 'middle', paddingLeft: '0px', paddingRight: '42px' }}>
                        <span
                          style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '12px',
                            color: order.status === 'Completed' ? '#008000' : order.status === 'Awaiting Release' ? '#FFA500' : order.status === 'Awaiting Payment' ? '#3B82F6' : '#FFFFFF',
                            whiteSpace: 'normal',
                            wordBreak: 'break-word'
                          }}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td
                        className="text-left py-3"
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '12px',
                          fontWeight: 400,
                          color: '#D1D5DB',
                          verticalAlign: 'middle',
                          paddingLeft: '0px',
                          paddingRight: '42px'
                        }}
                      >
                        {order.date}
                      </td>
                      <td className="py-3" style={{ verticalAlign: 'middle', paddingLeft: '0px', paddingRight: '24px' }}>
                        <button
                          className="text-xs font-normal rounded whitespace-nowrap"
                          style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            backgroundColor: '#A9EF45',
                            color: '#000000',
                            padding: '6px 12px',
                            cursor: 'pointer',
                            border: 'none',
                            borderRadius: '8px'
                          }}
                          onClick={() => {
                            if (order.status === 'Order placed') {
                              setSelectedOrderDetails(order);
                              setShowOrderPlacedModal(true);
                            } else if (order.status === 'Awaiting Release') {
                              setSelectedOrderDetails(order);
                              setShowAwaitingReleaseModal(true);
                            } else if (order.status === 'Completed') {
                              setSelectedOrderDetails(order);
                              setShowCompletedModal(true);
                            }
                          }}
                        >
                          Full Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Ads Details Sidebar Modal */}
      {showAdModal && (
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
          onClick={() => setShowAdModal(false)}
        >
          <div
            className="transaction-modal"
            style={{
              backgroundColor: '#020B16',
              borderRadius: '20px',
              width: '500px',
              maxHeight: 'calc(90vh + 30px)',
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
              .transaction-modal::-webkit-scrollbar {
                display: none;
              }
              .transaction-modal {
                scrollbarWidth: none;
                msOverflowStyle: none;
              }
            `}</style>

            {/* Header */}
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
                color: '#FFFFFF'
              }}>
                Ads details
              </h3>
              <button
                onClick={() => setShowAdModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: 0,
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>

            {/* Buy/Sell Toggle */}
            <div
              className="flex items-center mb-6 w-full rounded-full border-[0.3px] border-solid border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.05)] p-[2px] gap-1"
              style={{ height: '48px', minHeight: '48px' }}
            >
              <button
                className="font-normal transition-colors whitespace-nowrap flex-1 rounded-full border-none cursor-pointer bg-transparent text-gray-400 text-xs flex items-center justify-center"
                style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  height: 'calc(48px - 4px)',
                  minHeight: 'calc(48px - 4px)'
                }}
              >
                Buy
              </button>
              <button
                className="font-normal transition-colors whitespace-nowrap flex-1 rounded-full border-none cursor-pointer bg-[#A9EF45] text-black text-xs flex items-center justify-center"
                style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  height: 'calc(48px - 4px)',
                  minHeight: 'calc(48px - 4px)'
                }}
              >
                Sell
              </button>
            </div>

            {/* My Ads Section */}
            <div style={{ backgroundColor: '#0A1420', borderRadius: '12px', padding: '16px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <h3 className="text-white text-lg font-semibold" style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
                }}>
                  My Ads
                </h3>
                <button
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#A9EF45',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0
                  }}
                >
                  <img
                    src={images.pluscircle}
                    alt="Add"
                    style={{ width: '20px', height: '20px' }}
                  />
                </button>
              </div>

              {/* Ad Cards */}
              <div className="space-y-4">
                {/* USDT Sell AD Card */}
                <div style={{
                  background: 'linear-gradient(to right, #111E26, #0F1A20, #0D1820) padding-box, linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(169, 239, 69, 0.3)) border-box',
                  borderRadius: '12px',
                  paddingTop: '16px',
                  paddingLeft: '16px',
                  paddingRight: '16px',
                  paddingBottom: '16px',
                  border: '1px solid transparent'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                    marginTop: '0'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#1C2530',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        overflow: 'hidden'
                      }}>
                        <img
                          src={images.profile_image}
                          alt="Profile"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div>
                        <h4 className="text-white mb-1 text-[16px] leading-[100%] font-[274]" style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
                        }}>
                          USDT Sell AD
                        </h4>
                        <p style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '12px',
                          color: '#95D440'
                        }}>
                          Online
                        </p>
                      </div>
                    </div>
                    <span style={{
                      backgroundColor: '#2E2D28',
                      color: '#FFA500',
                      border: '1px solid #FFA500',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <img
                        src={images.vector5}
                        alt="Running"
                        style={{ width: '12px', height: '12px', filter: 'brightness(0) saturate(100%) invert(65%) sepia(100%) saturate(2000%) hue-rotate(0deg) brightness(1) contrast(1)' }}
                      />
                      Running
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-4 flex-nowrap gap-4">
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <img src={images.Vector3} alt="Document" style={{ width: '11px', height: '13px', filter: 'brightness(0) invert(1)', opacity: 1, position: 'relative', top: '1.22px', left: '2.04px' }} />
                      <p className="text-gray-400 whitespace-nowrap text-[10.42px] leading-[100%] font-[274]" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Orders Received : <span className="text-white text-[10.42px] leading-[100%] font-[274]" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>1,200</span></p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <svg style={{ width: '11px', height: '13px', filter: 'brightness(0) invert(1)', opacity: 1, position: 'relative', top: '1.22px', left: '2.04px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <p className="text-gray-400 whitespace-nowrap text-[10.42px] leading-[100%] font-[274]" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Response Time : <span className="text-white text-[10.42px] leading-[100%] font-[274]" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>15min</span></p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <img src={images.user_icon} alt="Person" style={{ width: '11px', height: '13px', filter: 'brightness(0) invert(1)', opacity: 1, position: 'relative', top: '1.22px', left: '2.04px' }} />
                      <p className="text-gray-400 whitespace-nowrap text-[10.42px] leading-[100%] font-[274]" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Score : <span className="text-white text-[10.42px] leading-[100%] font-[274]" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>98%</span></p>
                    </div>
                  </div>

                  <div className="mb-3 rounded-lg overflow-hidden" style={{ borderRadius: '9.12px', border: '1px solid #2B3745' }}>
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr>
                          <td className="text-gray-400 text-xs align-top pl-3" style={{ backgroundColor: '#1E2833', borderLeft: '1px solid #2B3745', borderTop: '1px solid #2B3745', paddingTop: '16px', paddingBottom: '16px' }}>Available Quantity</td>
                          <td className="align-top pr-3 text-right text-[13.02px] leading-[100%] font-[274] text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', backgroundColor: '#1E2833', borderRight: '1px solid #2B3745', borderTop: '1px solid #2B3745', paddingTop: '16px', paddingBottom: '16px' }}>50 USDT</td>
                        </tr>
                        <tr>
                          <td className="text-gray-400 text-xs align-top pl-3" style={{ backgroundColor: '#1E2833', borderLeft: '1px solid #2B3745', borderTop: '1px solid #2B3745', paddingTop: '16px', paddingBottom: '16px' }}>Limits</td>
                          <td className="align-top pr-3 text-right text-[13.02px] leading-[100%] font-[274] text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', backgroundColor: '#1E2833', borderRight: '1px solid #2B3745', borderTop: '1px solid #2B3745', paddingTop: '16px', paddingBottom: '16px' }}>1,600 - 75,000 NGN</td>
                        </tr>
                        <tr>
                          <td className="text-gray-400 text-xs align-top pl-3" style={{ backgroundColor: '#1E2833', borderLeft: '1px solid #2B3745', borderTop: '1px solid #2B3745', borderBottom: '1px solid #2B3745', paddingTop: '16px', paddingBottom: '16px' }}>Payment Methods</td>
                          <td className="align-top pr-3 text-right text-[13.02px] leading-[100%] font-[274] text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', backgroundColor: '#1E2833', borderRight: '1px solid #2B3745', borderTop: '1px solid #2B3745', borderBottom: '1px solid #2B3745', paddingTop: '16px', paddingBottom: '16px' }}>
                            <div className="flex flex-col items-end" style={{ lineHeight: '1.3' }}>
                              <span>Opay , Palmpay , Moniepoint ,Kudabank ,</span>
                              <span>Chipper Cash</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div style={{
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <p className="text-gray-400 text-xs mb-2">Price / 1 USDT</p>
                      <p className="text-2xl font-bold" style={{ color: '#A9EF45' }}>1,550.70 NGN</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: '1px solid #A9EF45',
                        backgroundColor: 'transparent',
                        color: '#A9EF45',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        height: '42px'
                      }}>
                        New Order
                      </button>
                      <button
                        onClick={() => {
                          setOpenAdType('USDT');
                          setShowOpenAdModal(true);
                        }}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '20px',
                          border: 'none',
                          backgroundColor: '#A9EF45',
                          color: '#000000',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontWeight: 'semibold',
                          height: '42px'
                        }}
                      >
                        Open AD
                      </button>
                    </div>
                  </div>
                </div>

                {/* ETH Sell AD Card */}
                <div style={{
                  background: 'linear-gradient(to right, #111E26, #0F1A20, #0D1820) padding-box, linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(169, 239, 69, 0.3)) border-box',
                  borderRadius: '12px',
                  paddingTop: '16px',
                  paddingLeft: '16px',
                  paddingRight: '16px',
                  paddingBottom: '16px',
                  border: '1px solid transparent'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                    marginTop: '0'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#1C2530',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        overflow: 'hidden'
                      }}>
                        <img
                          src={images.profile_image}
                          alt="Profile"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div>
                        <h4 className="text-white mb-1 text-[16px] leading-[100%] font-[274]" style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
                        }}>
                          ETH Sell AD
                        </h4>
                        <p style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '12px',
                          color: '#95D440'
                        }}>
                          Online
                        </p>
                      </div>
                    </div>
                    <span style={{
                      backgroundColor: '#2E2D28',
                      color: '#FFA500',
                      border: '1px solid #FFA500',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <img
                        src={images.vector5}
                        alt="Running"
                        style={{ width: '12px', height: '12px', filter: 'brightness(0) saturate(100%) invert(65%) sepia(100%) saturate(2000%) hue-rotate(0deg) brightness(1) contrast(1)' }}
                      />
                      Running
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-4 flex-nowrap gap-4">
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <img src={images.Vector3} alt="Document" style={{ width: '11px', height: '13px', filter: 'brightness(0) invert(1)', opacity: 1, position: 'relative', top: '1.22px', left: '2.04px' }} />
                      <p className="text-gray-400 whitespace-nowrap text-[10.42px] leading-[100%] font-[274]" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Orders Received : <span className="text-white text-[10.42px] leading-[100%] font-[274]" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>1,200</span></p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <svg style={{ width: '11px', height: '13px', filter: 'brightness(0) invert(1)', opacity: 1, position: 'relative', top: '1.22px', left: '2.04px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <p className="text-gray-400 whitespace-nowrap text-[10.42px] leading-[100%] font-[274]" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Response Time : <span className="text-white text-[10.42px] leading-[100%] font-[274]" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>15min</span></p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <img src={images.user_icon} alt="Person" style={{ width: '11px', height: '13px', filter: 'brightness(0) invert(1)', opacity: 1, position: 'relative', top: '1.22px', left: '2.04px' }} />
                      <p className="text-gray-400 whitespace-nowrap text-[10.42px] leading-[100%] font-[274]" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Score : <span className="text-white text-[10.42px] leading-[100%] font-[274]" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>98%</span></p>
                    </div>
                  </div>

                  <div className="mb-3 rounded-lg overflow-hidden" style={{ borderRadius: '9.12px', border: '1px solid #2B3745' }}>
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr>
                          <td className="text-gray-400 text-xs align-top pl-3" style={{ backgroundColor: '#1E2833', borderLeft: '1px solid #2B3745', borderTop: '1px solid #2B3745', paddingTop: '16px', paddingBottom: '16px' }}>Available Quantity</td>
                          <td className="align-top pr-3 text-right text-[13.02px] leading-[100%] font-[274] text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', backgroundColor: '#1E2833', borderRight: '1px solid #2B3745', borderTop: '1px solid #2B3745', paddingTop: '16px', paddingBottom: '16px' }}>50 ETH</td>
                        </tr>
                        <tr>
                          <td className="text-gray-400 text-xs align-top pl-3" style={{ backgroundColor: '#1E2833', borderLeft: '1px solid #2B3745', borderTop: '1px solid #2B3745', paddingTop: '16px', paddingBottom: '16px' }}>Limits</td>
                          <td className="align-top pr-3 text-right text-[13.02px] leading-[100%] font-[274] text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', backgroundColor: '#1E2833', borderRight: '1px solid #2B3745', borderTop: '1px solid #2B3745', paddingTop: '16px', paddingBottom: '16px' }}>1,600 - 75,000 NGN</td>
                        </tr>
                        <tr>
                          <td className="text-gray-400 text-xs align-top pl-3" style={{ backgroundColor: '#1E2833', borderLeft: '1px solid #2B3745', borderTop: '1px solid #2B3745', borderBottom: '1px solid #2B3745', paddingTop: '16px', paddingBottom: '16px' }}>Payment Methods</td>
                          <td className="align-top pr-3 text-right text-[13.02px] leading-[100%] font-[274] text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', backgroundColor: '#1E2833', borderRight: '1px solid #2B3745', borderTop: '1px solid #2B3745', borderBottom: '1px solid #2B3745', paddingTop: '16px', paddingBottom: '16px' }}>
                            <div className="flex flex-col items-end" style={{ lineHeight: '1.3' }}>
                              <span>Opay , Palmpay , Moniepoint ,Kudabank ,</span>
                              <span>Chipper Cash</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div style={{
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <p className="text-gray-400 text-xs mb-2">Price / 1 ETH</p>
                      <p className="text-2xl font-bold" style={{ color: '#A9EF45' }}>1,550.70 NGN</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: '1px solid #A9EF45',
                        backgroundColor: 'transparent',
                        color: '#A9EF45',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        height: '42px'
                      }}>
                        New Order
                      </button>
                      <button
                        onClick={() => {
                          setOpenAdType('USDT');
                          setShowOpenAdModal(true);
                        }}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '20px',
                          border: 'none',
                          backgroundColor: '#A9EF45',
                          color: '#000000',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontWeight: 'semibold',
                          height: '42px'
                        }}
                      >
                        Open AD
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Open AD Modal */}
      {showOpenAdModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(12, 29, 51, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            zIndex: 1001,
            padding: '20px'
          }}
          onClick={() => setShowOpenAdModal(false)}
        >
          <div
            className="open-ad-modal"
            style={{
              backgroundColor: '#020B16',
              borderRadius: '20px',
              width: '500px',
              maxHeight: 'calc(30px + 90vh)',
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
              .open-ad-modal::-webkit-scrollbar {
                display: none;
              }
              .open-ad-modal {
                scrollbarWidth: none;
                msOverflowStyle: none;
              }
            `}</style>

            {/* Header */}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => setShowOpenAdModal(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <h3 style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#FFFFFF'
                }}>
                  {openAdType} Sell AD
                </h3>
              </div>
              <button
                onClick={() => setShowOpenAdModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: 0,
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>

            {/* Ad Summary Card */}
            <div style={{
              background: 'linear-gradient(to right, #111E26, #0F1A20, #0D1820) padding-box, linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(169, 239, 69, 0.3)) border-box',
              borderRadius: '12px',
              paddingTop: '16px',
              paddingLeft: '16px',
              paddingRight: '16px',
              paddingBottom: '16px',
              border: '1px solid transparent',
              marginBottom: '24px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px',
                marginTop: '0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#1C2530',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    overflow: 'hidden'
                  }}>
                    <img
                      src={images.profile_image}
                      alt="Profile"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <h4 className="text-white mb-1 text-[16px] leading-[100%] font-[274]" style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                      {openAdType} Sell AD
                    </h4>
                    <p style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '12px',
                      color: '#95D440'
                    }}>
                      Online
                    </p>
                  </div>
                </div>
                <span style={{
                  backgroundColor: '#2E2D28',
                  color: '#FFA500',
                  border: '1px solid #FFA500',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <img
                    src={images.vector5}
                    alt="Running"
                    style={{ width: '12px', height: '12px', filter: 'brightness(0) saturate(100%) invert(65%) sepia(100%) saturate(2000%) hue-rotate(0deg) brightness(1) contrast(1)' }}
                  />
                  Running
                </span>
              </div>

              {/* Metrics */}
              <div className="flex justify-between items-center mb-4 flex-nowrap gap-4">
                <div className="flex items-center gap-2 flex-shrink-0">
                  <img src={images.Vector3} alt="Document" style={{ width: '11px', height: '13px', filter: 'brightness(0) invert(1)', opacity: 1, position: 'relative', top: '1.22px', left: '2.04px' }} />
                  <p className="text-gray-400 whitespace-nowrap text-[10.42px] leading-[100%] font-[274]" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Orders Received : <span className="text-white text-[10.42px] leading-[100%] font-[274]" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>1,200</span></p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <svg style={{ width: '11px', height: '13px', filter: 'brightness(0) invert(1)', opacity: 1, position: 'relative', top: '1.22px', left: '2.04px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <p className="text-gray-400 whitespace-nowrap text-[10.42px] leading-[100%] font-[274]" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Response Time : <span className="text-white text-[10.42px] leading-[100%] font-[274]" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>15min</span></p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <img src={images.user_icon} alt="Person" style={{ width: '11px', height: '13px', filter: 'brightness(0) invert(1)', opacity: 1, position: 'relative', top: '1.22px', left: '2.04px' }} />
                  <p className="text-gray-400 whitespace-nowrap text-[10.42px] leading-[100%] font-[274]" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Score : <span className="text-white text-[10.42px] leading-[100%] font-[274]" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>98%</span></p>
                </div>
              </div>

              {/* Additional Details Table */}
              <div className="mb-3 rounded-lg overflow-hidden" style={{ borderRadius: '9.12px', border: '1px solid #2B3745' }}>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr>
                      <td className="text-gray-400 text-xs align-top pl-3" style={{ backgroundColor: '#1E2833', borderLeft: '1px solid #2B3745', borderTop: '1px solid #2B3745', paddingTop: '16px', paddingBottom: '16px' }}>Completed Orders</td>
                      <td className="align-top pr-3 text-right text-[13.02px] leading-[100%] font-[274] text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', backgroundColor: '#1E2833', borderRight: '1px solid #2B3745', borderTop: '1px solid #2B3745', paddingTop: '16px', paddingBottom: '16px' }}>200</td>
                    </tr>
                    <tr>
                      <td className="text-gray-400 text-xs align-top pl-3" style={{ backgroundColor: '#1E2833', borderLeft: '1px solid #2B3745', borderTop: '1px solid #2B3745', paddingTop: '16px', paddingBottom: '16px' }}>Cancelled Orders</td>
                      <td className="align-top pr-3 text-right text-[13.02px] leading-[100%] font-[274] text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', backgroundColor: '#1E2833', borderRight: '1px solid #2B3745', borderTop: '1px solid #2B3745', paddingTop: '16px', paddingBottom: '16px' }}>200</td>
                    </tr>
                    <tr>
                      <td className="text-gray-400 text-xs align-top pl-3" style={{ backgroundColor: '#1E2833', borderLeft: '1px solid #2B3745', borderTop: '1px solid #2B3745', paddingTop: '16px', paddingBottom: '16px' }}>Available Quantity</td>
                      <td className="align-top pr-3 text-right text-[13.02px] leading-[100%] font-[274] text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', backgroundColor: '#1E2833', borderRight: '1px solid #2B3745', borderTop: '1px solid #2B3745', paddingTop: '16px', paddingBottom: '16px' }}>50 {openAdType}</td>
                    </tr>
                    <tr>
                      <td className="text-gray-400 text-xs align-top pl-3" style={{ backgroundColor: '#1E2833', borderLeft: '1px solid #2B3745', borderTop: '1px solid #2B3745', paddingTop: '16px', paddingBottom: '16px' }}>Limits</td>
                      <td className="align-top pr-3 text-right text-[13.02px] leading-[100%] font-[274] text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', backgroundColor: '#1E2833', borderRight: '1px solid #2B3745', borderTop: '1px solid #2B3745', paddingTop: '16px', paddingBottom: '16px' }}>1,600 - 75,000 NGN</td>
                    </tr>
                    <tr>
                      <td className="text-gray-400 text-xs align-top pl-3" style={{ backgroundColor: '#1E2833', borderLeft: '1px solid #2B3745', borderTop: '1px solid #2B3745', borderBottom: '1px solid #2B3745', paddingTop: '16px', paddingBottom: '16px' }}>Payment Methods</td>
                      <td className="align-top pr-3 text-right text-[13.02px] leading-[100%] font-[274] text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', backgroundColor: '#1E2833', borderRight: '1px solid #2B3745', borderTop: '1px solid #2B3745', borderBottom: '1px solid #2B3745', paddingTop: '16px', paddingBottom: '16px' }}>
                        <div className="flex flex-col items-end" style={{ lineHeight: '1.3' }}>
                          <span>Opay , Palmpay , Moniepoint ,Kudabank ,</span>
                          <span>Chipper Cash</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Price and Action Buttons */}
              <div style={{
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <p className="text-gray-400 text-xs mb-2">Price / 1 {openAdType}</p>
                  <p className="text-2xl font-bold" style={{ color: '#A9EF45' }}>1,550.70 NGN</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => {
                      // Handle delete ad functionality
                      if (window.confirm('Are you sure you want to delete this ad?')) {
                        // Add delete logic here
                        console.log('Delete ad');
                      }
                    }}
                    style={{
                      padding: '8px 20px',
                      borderRadius: '20px',
                      border: '1px solid #86BE40',
                      backgroundColor: 'transparent',
                      color: '#86BE40',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      height: '42px'
                    }}
                  >
                    Delete Ad
                  </button>
                  <button
                    onClick={() => {
                      // Handle edit ad functionality
                      console.log('Edit ad');
                      // Add edit logic here
                    }}
                    style={{
                      padding: '8px 20px',
                      borderRadius: '20px',
                      border: 'none',
                      backgroundColor: '#A9EF45',
                      color: '#000000',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontWeight: 'semibold',
                      height: '42px'
                    }}
                  >
                    Edit AD
                  </button>
                </div>
              </div>
            </div>

            {/* Order Status Tabs */}
            <div className="flex items-center mb-6 w-full rounded-full border-[0.3px] border-solid border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.05)] p-[2px] gap-1" style={{ height: '48px', minHeight: '48px' }}>
              {['Received', 'Unpaid', 'Paid', 'Appeal'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedOrderTab(tab)}
                  className={`font-normal transition-colors whitespace-nowrap flex-1 rounded-full border-none cursor-pointer text-xs flex items-center justify-center ${tab === selectedOrderTab
                    ? 'bg-[#A9EF45] text-black'
                    : 'bg-transparent text-gray-400'
                    }`}
                  style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    height: 'calc(100% - 4px)',
                    minHeight: 'calc(100% - 4px)'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Received Orders Section */}
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <h3 className="text-white text-lg font-semibold" style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
                }}>
                  Received Orders
                </h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => {
                      // Handle accept all orders
                      console.log('Accept all orders');
                      // Add accept all logic here
                    }}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: '1px solid #273B3F',
                      backgroundColor: 'transparent',
                      color: '#9CA3AF',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
                    }}
                  >
                    Accept All
                  </button>
                  <button
                    onClick={() => {
                      // Handle decline all orders
                      console.log('Decline all orders');
                      // Add decline all logic here
                    }}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: '1px solid #273B3F',
                      backgroundColor: 'transparent',
                      color: '#9CA3AF',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
                    }}
                  >
                    Decline All
                  </button>
                </div>
              </div>

              {/* Order Cards */}
              <div className="space-y-3">
                {[1, 2, 3].map((order) => (
                  <div
                    key={order}
                    style={{
                      backgroundColor: '#222A36',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      width: '100%',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Top Portion */}
                    <div style={{
                      backgroundColor: '#17202C',
                      padding: '12px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, backgroundColor: '#17202C', padding: '6px 10px', borderRadius: '8px', minWidth: 0 }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: '#1C2530',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            overflow: 'hidden',
                            flexShrink: 0
                          }}>
                            <img
                              src={images.profile_image}
                              alt="Profile"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p className="text-white text-sm font-semibold mb-0.5" style={{
                              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
                            }}>
                              Qamar Malik
                            </p>
                            <p className="text-gray-400 text-xs mb-0.5" style={{
                              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                              display: 'inline'
                            }}>
                              Sell {openAdType}{' '}
                            </p>
                            <span style={{
                              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '12px',
                              color: '#A9EF45'
                            }}>
                              Active
                            </span>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <p className="text-sm font-semibold mb-0.5" style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            color: '#A9EF45'
                          }}>
                            N20,000{' '}
                            <span style={{
                              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '12px',
                              color: '#9CA3AF',
                              fontWeight: 'normal'
                            }}>
                              (15 {openAdType})
                            </span>
                          </p>
                          <p className="text-gray-400 text-xs" style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
                          }}>
                            Oct 15, 2025
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Portion */}
                    <div style={{
                      backgroundColor: '#222A36',
                      padding: '12px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button
                          onClick={() => {
                            setShowChatModal(true);
                          }}
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: '#1C2530',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <img
                            src={images.ChatCircle}
                            alt="Chat"
                            style={{ width: '20px', height: '20px' }}
                          />
                        </button>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              // Handle cancel order
                              console.log('Cancel order', order);
                              alert(`Cancel order ${order}`);
                              // Add cancel logic here
                            }}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '8px',
                              border: '1px solid #86BE40',
                              backgroundColor: 'transparent',
                              color: '#86BE40',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                              pointerEvents: 'auto',
                              zIndex: 10,
                              position: 'relative'
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (order === 2) {
                                setShowChatModal(true);
                              } else {
                                // Handle accept order
                                console.log('Accept order', order);
                                alert(`Accept order ${order}`);
                                // Add accept logic here
                              }
                            }}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '8px',
                              border: 'none',
                              backgroundColor: '#A9EF45',
                              color: '#000000',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontWeight: 'semibold',
                              pointerEvents: 'auto',
                              zIndex: 10,
                              position: 'relative'
                            }}
                          >
                            {order === 2 ? 'View' : 'Accept'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChatModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            zIndex: 1002,
            padding: '20px'
          }}
          onClick={() => setShowChatModal(false)}
        >
          <div
            className="chat-modal"
            style={{
              backgroundColor: '#020B16',
              borderRadius: '20px',
              width: '500px',
              height: '95vh',
              maxHeight: '95vh',
              overflowY: 'auto',
              padding: '24px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <style>{`
              .chat-modal::-webkit-scrollbar {
                width: 8px;
              }
              .chat-modal::-webkit-scrollbar-track {
                background: #020B16;
              }
              .chat-modal::-webkit-scrollbar-thumb {
                background: #020B16;
                border-radius: 4px;
              }
              .chat-modal::-webkit-scrollbar-thumb:hover {
                background: #020B16;
              }
            `}</style>

            {/* Header */}
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
                color: '#FFFFFF'
              }}>
                Chat
              </h3>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  onClick={() => setIsChatJoined(true)}
                  style={{
                    width: '85px',
                    height: '34px',
                    borderRadius: '100px',
                    border: 'none',
                    backgroundColor: isChatJoined ? '#A9EF45' : '#A9EF45',
                    color: '#000000',
                    cursor: 'pointer',
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: 274,
                    fontStyle: 'normal',
                    fontSize: '10px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {isChatJoined ? 'Joined' : 'Join Chat'}
                </button>
                <div ref={pendingDropdownRef} style={{ position: 'relative' }}>
                  <button
                    onClick={() => setShowPendingDropdown(!showPendingDropdown)}
                    style={{
                      width: '128px',
                      height: '34px',
                      paddingTop: '11px',
                      paddingRight: '15px',
                      paddingBottom: '11px',
                      paddingLeft: '15px',
                      borderRadius: '100px',
                      border: '0.3px solid rgba(255, 255, 255, 0.2)',
                      backgroundColor: '#020C19',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontWeight: 'normal',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <span style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontWeight: 274,
                      fontStyle: 'normal',
                      fontSize: '10px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      whiteSpace: 'nowrap'
                    }}>Mark as pending 8</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  {showPendingDropdown && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '4px',
                      width: '180px',
                      borderRadius: '8px',
                      backgroundColor: '#020C19',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                      padding: '4px 0',
                      zIndex: 1000,
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <button
                        onClick={() => {
                          setShowPendingDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm font-normal transition-colors hover:bg-white/5"
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          color: 'white',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          width: '100%',
                          textAlign: 'left'
                        }}
                      >
                        Mark as pending
                      </button>
                    </div>
                  )}
                </div>
                <div ref={winnerDropdownRef} style={{ position: 'relative' }}>
                  <button
                    onClick={() => setShowWinnerDropdown(!showWinnerDropdown)}
                    style={{
                      width: '115px',
                      height: '34px',
                      paddingTop: '11px',
                      paddingRight: '15px',
                      paddingBottom: '11px',
                      paddingLeft: '15px',
                      borderRadius: '100px',
                      border: '0.3px solid rgba(255, 255, 255, 0.2)',
                      backgroundColor: '#020C19',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontWeight: 'normal',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <span style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontWeight: 274,
                      fontStyle: 'normal',
                      fontSize: '10px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      whiteSpace: 'nowrap'
                    }}>Choose Winner</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  {showWinnerDropdown && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '4px',
                      width: '200px',
                      borderRadius: '8px',
                      backgroundColor: '#020C19',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                      padding: '4px 0',
                      zIndex: 1000,
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <button
                        onClick={() => {
                          setShowWinnerDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm font-normal transition-colors hover:bg-white/5"
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          color: 'white',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          width: '100%',
                          textAlign: 'left'
                        }}
                      >
                        Buyer - Qamrdeen Malik
                      </button>
                      <button
                        onClick={() => {
                          setShowWinnerDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm font-normal transition-colors hover:bg-white/5"
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          color: 'white',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          width: '100%',
                          textAlign: 'left'
                        }}
                      >
                        Vendor - Lawla Afeez
                      </button>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setShowChatModal(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#FFFFFF',
                    fontSize: '24px',
                    cursor: 'pointer',
                    padding: 0,
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginLeft: '8px'
                  }}
                >
                  ×
                </button>
              </div>
            </div>

            {/* User Profile Card */}
            <div style={{
              marginBottom: '20px',
              padding: '16px',
              backgroundColor: '#1E2833',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#1C2530',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  overflow: 'hidden'
                }}>
                  <img
                    src={images.profile_image}
                    alt="Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '16px',
                    color: '#FFFFFF',
                    fontWeight: 'semibold',
                    marginBottom: '4px'
                  }}>
                    Qamar Malik
                  </p>
                  <p style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '12px',
                    color: '#FFFFFF',
                    display: 'inline'
                  }}>
                    Sell USDT{' '}
                  </p>
                  <span style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '12px',
                    color: '#A9EF45'
                  }}>
                    Awaiting Payment
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '15.63px',
                  color: '#FFFFFF',
                  fontWeight: 510,
                  fontStyle: 'normal',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  textAlign: 'right',
                  marginBottom: '4px'
                }}>
                  N20,000{' '}
                  <span style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '15.63px',
                    color: '#767B81',
                    fontWeight: 510,
                    fontStyle: 'normal',
                    lineHeight: '100%',
                    letterSpacing: '0%'
                  }}>
                    (15 USDT)
                  </span>
                </p>
              </div>
            </div>

            {/* Warnings */}
            <div style={{
              marginBottom: '20px',
              padding: '12px',
              backgroundColor: '#2D1B1B',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#FF4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{
                    color: '#000000',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    lineHeight: '1'
                  }}>!</span>
                </div>
                <p style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '12px',
                  color: '#8B898B',
                  margin: 0
                }}>
                  Warning 1
                </p>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#FF4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{
                    color: '#000000',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    lineHeight: '1'
                  }}>!</span>
                </div>
                <p style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '12px',
                  color: '#8B898B',
                  margin: 0
                }}>
                  warning 2
                </p>
              </div>
            </div>

            {/* Chat Messages */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Buyer Message */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '12px',
                  maxWidth: '70%',
                  marginBottom: '4px'
                }}>
                  <p style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '14px',
                    color: '#000000'
                  }}>
                    I have made payment
                  </p>
                </div>
                <p style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '10px',
                  color: '#9CA3AF',
                  margin: 0
                }}>
                  Now - Buyer
                </p>
              </div>

              {/* Seller Message */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <div style={{
                  backgroundColor: '#A9EF45',
                  borderRadius: '12px',
                  padding: '12px',
                  maxWidth: '70%',
                  marginBottom: '4px'
                }}>
                  <p style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '14px',
                    color: '#000000'
                  }}>
                    Coin will be released soon
                  </p>
                </div>
                <p style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '10px',
                  color: '#9CA3AF',
                  margin: 0
                }}>
                  Seller - 2 min ago
                </p>
              </div>

              {/* Appeal Alert */}
              {isChatJoined && (
                <div style={{
                  width: '100%',
                  margin: '16px 0'
                }}>
                  <div style={{
                    backgroundColor: '#FFA5001A',
                    borderRadius: '13.02px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    height: '28.65px',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#FFA500',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <span style={{
                        color: '#000000',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        lineHeight: '1'
                      }}>!</span>
                    </div>
                    <p style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '12px',
                      color: '#FFA500',
                      margin: 0,
                      textAlign: 'center'
                    }}>
                      This chat is under appeal
                    </p>
                  </div>
                </div>
              )}

              {/* Admin Message */}
              {isChatJoined && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <div style={{
                    backgroundColor: '#A9EF45',
                    borderRadius: '12px',
                    padding: '12px',
                    maxWidth: '70%',
                    marginBottom: '4px'
                  }}>
                    <p style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      color: '#000000'
                    }}>
                      You have 5 hours to pay the other person
                    </p>
                  </div>
                  <p style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '10px',
                    color: '#9CA3AF',
                    margin: 0
                  }}>
                    Rhinox Admin 2 min ago
                  </p>
                </div>
              )}
            </div>

            {/* Message Input Field */}
            {isChatJoined && (
              <div style={{
                marginTop: '20px',
                paddingTop: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  position: 'relative',
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#1A202C',
                  borderRadius: '13.02px',
                  border: '0.39px solid rgba(255, 255, 255, 0.2)',
                  padding: '12px 16px',
                  gap: '12px',
                  boxSizing: 'border-box'
                }}>
                  {/* Paperclip Icon */}
                  <button style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    flexShrink: 0
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#FFFFFF' }}>
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                    </svg>
                  </button>
                  {/* Input Field */}
                  <input
                    type="text"
                    placeholder="Type message"
                    style={{
                      flex: 1,
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#FFFFFF',
                      fontSize: '14px',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      outline: 'none',
                      padding: '0'
                    }}
                  />
                  {/* Send Icon */}
                  <button style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    flexShrink: 0
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#FFFFFF' }}>
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Payment Accounts Modal */}
      {showPaymentAccountsModal && (
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
            zIndex: 1001,
            padding: '20px'
          }}
          onClick={() => setShowPaymentAccountsModal(false)}
        >
          <div
            className="payment-accounts-modal"
            style={{
              backgroundColor: '#020B16',
              borderRadius: '20px',
              width: '500px',
              maxHeight: 'calc(90vh + 30px)',
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
              .payment-accounts-modal::-webkit-scrollbar {
                display: none;
              }
              .payment-accounts-modal {
                scrollbarWidth: none;
                msOverflowStyle: none;
              }
            `}</style>
            {/* Header */}
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
                fontWeight: '600',
                color: '#FFFFFF',
                margin: 0
              }}>
                Payment Accounts
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => setShowAddNewAccountModal(true)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '100px',
                    border: 'none',
                    backgroundColor: '#A9EF45',
                    color: '#000000',
                    cursor: 'pointer',
                    fontSize: '10px',
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: 400,
                    height: '34px'
                  }}
                >
                  Add New
                </button>
                <button
                  onClick={() => setShowPaymentAccountsModal(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#FFFFFF',
                    fontSize: '24px',
                    cursor: 'pointer',
                    padding: 0,
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Account Type Dropdown */}
            <div style={{ marginBottom: '24px', position: 'relative' }}>
              <button
                onClick={() => setShowAccountTypeDropdown(!showAccountTypeDropdown)}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  backgroundColor: '#1E2833',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '130.23px',
                  height: '50.79px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxSizing: 'border-box',
                  textAlign: 'left'
                }}
              >
                <span>{selectedAccountType}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {showAccountTypeDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  marginTop: '4px',
                  backgroundColor: '#1E2833',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  zIndex: 1000,
                  overflow: 'hidden'
                }}>
                  {['All', 'Bank Transfer', 'Mobile Money', 'Crypto'].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedAccountType(type);
                        setShowAccountTypeDropdown(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 16px',
                        backgroundColor: type === selectedAccountType ? '#2B3745' : 'transparent',
                        border: 'none',
                        color: '#FFFFFF',
                        fontSize: '14px',
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bank Accounts List */}
            <div style={{ backgroundColor: '#0A1420', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { id: 1, bankName: 'Opay', accountNumber: '1234567890', accountName: 'Qamardeen Abdul Malik', selected: true },
                  { id: 2, bankName: 'Opay', accountNumber: '1234567890', accountName: 'Qamardeen Abdul Malik', selected: false }
                ].map((account) => (
                  <div key={account.id}>
                    {/* Bank Transfer Label and Selected Badge */}
                    {account.selected && (
                      <div style={{ marginBottom: '0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '14px',
                          color: '#9CA3AF'
                        }}>
                          Bank Transfer
                        </span>
                        <div style={{
                          padding: '4px 12px',
                          backgroundColor: '#A9EF45',
                          borderTopLeftRadius: '6px',
                          borderTopRightRadius: '6px',
                          borderBottomLeftRadius: '0',
                          borderBottomRightRadius: '0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          alignSelf: 'flex-start',
                          marginTop: '8px',
                          marginLeft: '0',
                          marginBottom: '-1px',
                          position: 'relative',
                          zIndex: 1
                        }}>
                          <span style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '12px',
                            color: '#000000',
                            fontWeight: '500',
                            whiteSpace: 'nowrap'
                          }}>
                            Selected
                          </span>
                        </div>
                      </div>
                    )}
                    <div
                      style={{
                        backgroundColor: '#1E2833',
                        borderRadius: '12px',
                        padding: '16px',
                        border: account.selected ? '2px solid #A9EF45' : '1px solid rgba(255, 255, 255, 0.1)',
                        position: 'relative',
                        borderTopLeftRadius: account.selected ? '0' : '12px'
                      }}
                    >

                      {/* Bank Name Row */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: '12px',
                        marginBottom: '12px',
                        marginLeft: '-16px',
                        marginRight: '-16px',
                        paddingLeft: '16px',
                        paddingRight: '16px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>
                        <span style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '12px',
                          color: '#9CA3AF'
                        }}>
                          Bank Name:
                        </span>
                        <span style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '14px',
                          color: '#FFFFFF'
                        }}>
                          {account.bankName}
                        </span>
                      </div>

                      {/* Account Number Row */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: '12px',
                        marginBottom: '12px',
                        marginLeft: '-16px',
                        marginRight: '-16px',
                        paddingLeft: '16px',
                        paddingRight: '16px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>
                        <span style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '12px',
                          color: '#9CA3AF'
                        }}>
                          Account Number:
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(account.accountNumber);
                              // You can add a toast notification here
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '0',
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
                          <span style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '14px',
                            color: '#FFFFFF'
                          }}>
                            {account.accountNumber}
                          </span>
                        </div>
                      </div>

                      {/* Account Name Row */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: '0',
                        marginBottom: '0'
                      }}>
                        <span style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '12px',
                          color: '#9CA3AF'
                        }}>
                          Account Name:
                        </span>
                        <span style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '14px',
                          color: '#FFFFFF'
                        }}>
                          {account.accountName}
                        </span>
                      </div>
                    </div>

                    {/* Edit and Delete Buttons - Outside the card */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      gap: '12px',
                      marginTop: '12px'
                    }}>
                      <button
                        onClick={() => {
                          console.log('Edit account', account.id);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          borderRadius: '4px'
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#FFFFFF' }}>
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this account?')) {
                            console.log('Delete account', account.id);
                          }
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          borderRadius: '4px'
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#FF4444' }}>
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
      )}

      {/* Add New Account Modal */}
      {showAddNewAccountModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#0C1D33CC',


            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            zIndex: 1002,
            padding: '20px',
            paddingTop: '30'
          }}
          onClick={() => setShowAddNewAccountModal(false)}
        >
          <div
            className="add-account-modal"
            style={{
              backgroundColor: '#020B16',
              borderRadius: '20px',
              width: '500px',
              height: '75vh',
              maxHeight: '75vh',
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
              .add-account-modal::-webkit-scrollbar {
                display: none;
              }
              .add-account-modal {
                scrollbarWidth: none;
                msOverflowStyle: none;
              }
            `}</style>

            {/* Header */}
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
                Add New Account
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => {
                    // Handle add new account submission
                    console.log('Add account:', { selectedAddAccountType, bankName, accountNumber, accountName });
                    setShowAddNewAccountModal(false);
                    // Reset form
                    setSelectedAddAccountType('Select Account type');
                    setBankName('');
                    setAccountNumber('');
                    setAccountName('');
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '100px',
                    border: 'none',
                    backgroundColor: '#A9EF45',
                    color: '#000000',
                    cursor: 'pointer',
                    fontSize: '10px',
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: 400,
                    height: '34px'
                  }}
                >
                  Add New
                </button>
                <button
                  onClick={() => {
                    setShowAddNewAccountModal(false);
                    // Reset form
                    setSelectedAddAccountType('Select Account type');
                    setBankName('');
                    setAccountNumber('');
                    setAccountName('');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#FFFFFF',
                    fontSize: '24px',
                    cursor: 'pointer',
                    padding: 0,
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div style={{ backgroundColor: '#0A1420', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Account Type Dropdown */}
                <div style={{ position: 'relative' }}>
                  <label style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '12px',
                    color: '#E0E2E3',
                    marginBottom: '8px',
                    display: 'block'
                  }}>
                    Account type:
                  </label>
                  <button
                    onClick={() => setShowAddAccountTypeDropdown(!showAddAccountTypeDropdown)}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      backgroundColor: '#1E2833',
                      border: '0.39px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '13.02px',
                      height: '50.13px',
                      color: selectedAddAccountType === 'Select Account type' ? '#9CA3AF' : '#FFFFFF',
                      fontSize: '14px',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxSizing: 'border-box',
                      textAlign: 'left'
                    }}
                  >
                    <span>{selectedAddAccountType}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginLeft: 'auto' }}>
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  {showAddAccountTypeDropdown && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      marginTop: '4px',
                      backgroundColor: '#020C19',
                      border: 'none',
                      borderRadius: '8px',
                      zIndex: 1000,
                      overflow: 'hidden'
                    }}>
                      {['All', 'RhinoxPay ID', 'Bank Transfer', 'Opay', 'Palmpay', 'Kuda Bank', 'Access Bank', 'Ec Bank'].map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            setSelectedAddAccountType(type);
                            setShowAddAccountTypeDropdown(false);
                          }}
                          style={{
                            width: '100%',
                            padding: '10px 16px',
                            backgroundColor: type === selectedAddAccountType ? '#2B3745' : 'transparent',
                            border: 'none',
                            color: '#FFFFFF',
                            fontSize: '14px',
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            if (type !== selectedAddAccountType) {
                              e.currentTarget.style.backgroundColor = '#2B3745';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (type !== selectedAddAccountType) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bank Name Input */}
                <div>
                  <label style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '12px',
                    color: '#E0E2E3',
                    marginBottom: '8px',
                    display: 'block'
                  }}>
                    Bank Name:
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Bank Name"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      backgroundColor: '#1E2833',
                      border: '0.39px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '13.02px',
                      height: '50.13px',
                      color: '#FFFFFF',
                      fontSize: '14px',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Account Number Input */}
                <div>
                  <label style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '12px',
                    color: '#E0E2E3',
                    marginBottom: '8px',
                    display: 'block'
                  }}>
                    Account Number:
                  </label>
                  <input
                    type="text"
                    placeholder="Type account number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      backgroundColor: '#1E2833',
                      border: '0.39px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '13.02px',
                      height: '50.13px',
                      color: '#FFFFFF',
                      fontSize: '14px',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Account Name Input */}
                <div>
                  <label style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '12px',
                    color: '#E0E2E3',
                    marginBottom: '8px',
                    display: 'block'
                  }}>
                    Account Name:
                  </label>
                  <input
                    type="text"
                    placeholder="Type account name"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      backgroundColor: '#1E2833',
                      border: '0.39px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '13.02px',
                      height: '50.13px',
                      color: '#FFFFFF',
                      fontSize: '14px',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Placed Modal */}
      {showOrderPlacedModal && selectedOrderDetails && (
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
            zIndex: 1001,
            padding: '20px'
          }}
          onClick={() => setShowOrderPlacedModal(false)}
        >
          <div
            className="order-placed-modal"
            style={{
              backgroundColor: '#020B16',
              borderRadius: '20px',
              width: '450px',
              maxHeight: 'calc(90vh + 30px)',
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
              .order-placed-modal::-webkit-scrollbar {
                display: none;
              }
              .order-placed-modal {
                scrollbarWidth: none;
                msOverflowStyle: none;
              }
            `}</style>

            {/* Header */}
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
                fontWeight: '600',
                color: '#FFFFFF',
                margin: 0
              }}>
                Transaction details
              </h3>
              <button
                onClick={() => setShowOrderPlacedModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: 0,
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
              {/* Checkmark Icon */}
              <div style={{
                width: '80px',
                height: '80px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img src={images.Seal2} alt="Order Placed" style={{ width: '100%', height: '100%' }} />
              </div>
              <h2 style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '20px',
                fontWeight: '600',
                color: '#FFFFFF',
                margin: 0
              }}>
                Order Placed
              </h2>
            </div>

            {/* Details List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Box 1: Merchant & Contact */}
              <div style={{
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                backgroundColor: '#0F1825'
              }}>
                {/* Merchant Name */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Merchant Name</span>
                  <span style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: '600' }}>{selectedOrderDetails.vendor}</span>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 'calc(100% + 32px)', marginLeft: '-16px' }}></div>

                {/* Contact */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Contact</span>
                  <button style={{
                    backgroundColor: '#A9EF45',
                    color: '#000000',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '6px 20px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: '500'
                  }}>Chat</button>
                </div>
              </div>

              {/* Box 2: Other Details */}
              <div style={{
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                backgroundColor: '#0F1825'
              }}>
                {/* P2P Type */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>P2P Type</span>
                  <span style={{ color: '#FFFFFF', fontSize: '15.63px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 274, lineHeight: '100%', letterSpacing: '0%', textAlign: 'right' }}>Crypto Sell</span>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 'calc(100% + 32px)', marginLeft: '-16px' }}></div>

                {/* Amount */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Amount</span>
                  <span style={{ color: '#FFFFFF', fontSize: '15.63px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 274, lineHeight: '100%', letterSpacing: '0%', textAlign: 'right' }}>{selectedOrderDetails.amount}</span>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 'calc(100% + 32px)', marginLeft: '-16px' }}></div>

                {/* Price */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Price</span>
                  <span style={{ color: '#FFFFFF', fontSize: '15.63px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 274, lineHeight: '100%', letterSpacing: '0%', textAlign: 'right' }}>1,500 NGN</span>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 'calc(100% + 32px)', marginLeft: '-16px' }}></div>

                {/* Total Qty */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Total Qty</span>
                  <span style={{ color: '#FFFFFF', fontSize: '15.63px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 274, lineHeight: '100%', letterSpacing: '0%', textAlign: 'right' }}>{selectedOrderDetails.qty} {selectedOrderDetails.token}</span>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 'calc(100% + 32px)', marginLeft: '-16px' }}></div>

                {/* Tx Fee */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Tx Fee</span>
                  <span style={{ color: '#FFFFFF', fontSize: '15.63px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 274, lineHeight: '100%', letterSpacing: '0%', textAlign: 'right' }}>0</span>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 'calc(100% + 32px)', marginLeft: '-16px' }}></div>

                {/* Tx Id */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Tx id</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }}>
                      <path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ color: '#FFFFFF', fontSize: '15.63px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 274, lineHeight: '100%', letterSpacing: '0%', textAlign: 'right' }}>128DJ2I3I1DJKQKCM</span>
                  </div>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 'calc(100% + 32px)', marginLeft: '-16px' }}></div>

                {/* Payment Method */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Payment method</span>
                  <span style={{ color: '#FFFFFF', fontSize: '15.63px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 274, lineHeight: '100%', letterSpacing: '0%', textAlign: 'right' }}>
                    Bank Transfer <span style={{ color: '#A9EF45', cursor: 'pointer', marginLeft: '4px' }}>View Account</span>
                  </span>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 'calc(100% + 32px)', marginLeft: '-16px' }}></div>

                {/* Order Time */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Order time</span>
                  <span style={{ color: '#FFFFFF', fontSize: '15.63px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 274, lineHeight: '100%', letterSpacing: '0%', textAlign: 'right' }}>{selectedOrderDetails.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      }
      {/* Awaiting Release Modal */}
      {showAwaitingReleaseModal && selectedOrderDetails && (
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
            zIndex: 1001,
            padding: '20px'
          }}
          onClick={() => setShowAwaitingReleaseModal(false)}
        >
          <div
            className="awaiting-release-modal"
            style={{
              backgroundColor: '#020B16',
              borderRadius: '20px',
              width: '450px',
              maxHeight: 'calc(90vh + 30px)',
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
              .awaiting-release-modal::-webkit-scrollbar {
                display: none;
              }
              .awaiting-release-modal {
                scrollbarWidth: none;
                msOverflowStyle: none;
              }
            `}</style>

            {/* Header */}
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
                fontWeight: '600',
                color: '#FFFFFF',
                margin: 0
              }}>
                Transaction details
              </h3>
              <button
                onClick={() => setShowAwaitingReleaseModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: 0,
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
              {/* Yellow Seal Icon */}
              <div style={{
                width: '80px',
                height: '80px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img src={images.Seal3} alt="Payment Made" style={{ width: '100%', height: '100%' }} />
              </div>
              <h2 style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '20px',
                fontWeight: '600',
                color: '#FFC107',
                margin: 0
              }}>
                Payment Made
              </h2>
            </div>

            {/* Details List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Box 1: Merchant & Contact */}
              <div style={{
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                backgroundColor: '#0F1825'
              }}>
                {/* Merchant Name */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Merchant Name</span>
                  <span style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: '600' }}>{selectedOrderDetails.vendor}</span>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 'calc(100% + 32px)', marginLeft: '-16px' }}></div>

                {/* Contact */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Contact</span>
                  <button style={{
                    backgroundColor: '#A9EF45',
                    color: '#000000',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '6px 20px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: '500'
                  }}>Chat</button>
                </div>
              </div>

              {/* Box 2: Other Details */}
              <div style={{
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                backgroundColor: '#0F1825'
              }}>
                {/* P2P Type */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>P2P Type</span>
                  <span style={{ color: '#FFFFFF', fontSize: '15.63px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 274, lineHeight: '100%', letterSpacing: '0%', textAlign: 'right' }}>Crypto Sell</span>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 'calc(100% + 32px)', marginLeft: '-16px' }}></div>

                {/* Amount */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Amount</span>
                  <span style={{ color: '#FFFFFF', fontSize: '15.63px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 274, lineHeight: '100%', letterSpacing: '0%', textAlign: 'right' }}>{selectedOrderDetails.amount}</span>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 'calc(100% + 32px)', marginLeft: '-16px' }}></div>

                {/* Price */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Price</span>
                  <span style={{ color: '#FFFFFF', fontSize: '15.63px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 274, lineHeight: '100%', letterSpacing: '0%', textAlign: 'right' }}>1,500 NGN</span>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 'calc(100% + 32px)', marginLeft: '-16px' }}></div>

                {/* Total Qty */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Total Qty</span>
                  <span style={{ color: '#FFFFFF', fontSize: '15.63px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 274, lineHeight: '100%', letterSpacing: '0%', textAlign: 'right' }}>{selectedOrderDetails.qty} {selectedOrderDetails.token}</span>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 'calc(100% + 32px)', marginLeft: '-16px' }}></div>

                {/* Tx Fee */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Tx Fee</span>
                  <span style={{ color: '#FFFFFF', fontSize: '15.63px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 274, lineHeight: '100%', letterSpacing: '0%', textAlign: 'right' }}>0</span>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 'calc(100% + 32px)', marginLeft: '-16px' }}></div>

                {/* Tx Id */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Tx id</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }}>
                      <path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ color: '#FFFFFF', fontSize: '15.63px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 274, lineHeight: '100%', letterSpacing: '0%', textAlign: 'right' }}>128DJ2I3I1DJKQKCM</span>
                  </div>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 'calc(100% + 32px)', marginLeft: '-16px' }}></div>

                {/* Payment Method */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Payment method</span>
                  <span style={{ color: '#FFFFFF', fontSize: '15.63px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 274, lineHeight: '100%', letterSpacing: '0%', textAlign: 'right' }}>
                    Bank Transfer <span style={{ color: '#A9EF45', cursor: 'pointer', marginLeft: '4px' }}>View Account</span>
                  </span>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 'calc(100% + 32px)', marginLeft: '-16px' }}></div>

                {/* Order Time */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Order time</span>
                  <span style={{ color: '#FFFFFF', fontSize: '15.63px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 274, lineHeight: '100%', letterSpacing: '0%', textAlign: 'right' }}>{selectedOrderDetails.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Completed Modal */}
      {showCompletedModal && selectedOrderDetails && (
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
            zIndex: 1001,
            padding: '20px'
          }}
          onClick={() => setShowCompletedModal(false)}
        >
          <div
            className="completed-modal"
            style={{
              backgroundColor: '#020B16',
              borderRadius: '20px',
              width: '450px',
              maxHeight: 'calc(90vh + 30px)',
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
              .completed-modal::-webkit-scrollbar {
                display: none;
              }
              .completed-modal {
                scrollbarWidth: none;
                msOverflowStyle: none;
              }
            `}</style>

            {/* Header */}
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
                fontWeight: '600',
                color: '#FFFFFF',
                margin: 0
              }}>
                Transaction details
              </h3>
              <button
                onClick={() => setShowCompletedModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: 0,
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
              {/* Green Seal Icon */}
              <div style={{
                width: '80px',
                height: '80px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img src={images.seal} alt="Completed" style={{ width: '100%', height: '100%' }} />
              </div>
              <h2 style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '20px',
                fontWeight: '600',
                color: '#00C000',
                margin: 0
              }}>
                Completed
              </h2>
            </div>

            {/* Details List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Box 1: Merchant & Contact */}
              <div style={{
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                backgroundColor: '#0F1825'
              }}>
                {/* Merchant Name */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Merchant Name</span>
                  <span style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: '600' }}>{selectedOrderDetails.vendor}</span>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 'calc(100% + 32px)', marginLeft: '-16px' }}></div>

                {/* Contact */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Contact</span>
                  <button style={{
                    backgroundColor: '#A9EF45',
                    color: '#000000',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '6px 20px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: '500'
                  }}>Chat</button>
                </div>
              </div>

              {/* Box 2: Other Details */}
              <div style={{
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                backgroundColor: '#0F1825'
              }}>
                {/* P2P Type */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>P2P Type</span>
                  <span style={{ color: '#FFFFFF', fontSize: '15.63px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 274, lineHeight: '100%', letterSpacing: '0%', textAlign: 'right' }}>Crypto Sell</span>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 'calc(100% + 32px)', marginLeft: '-16px' }}></div>

                {/* Amount */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Amount</span>
                  <span style={{ color: '#FFFFFF', fontSize: '15.63px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 274, lineHeight: '100%', letterSpacing: '0%', textAlign: 'right' }}>{selectedOrderDetails.amount}</span>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 'calc(100% + 32px)', marginLeft: '-16px' }}></div>

                {/* Price */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Price</span>
                  <span style={{ color: '#FFFFFF', fontSize: '15.63px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 274, lineHeight: '100%', letterSpacing: '0%', textAlign: 'right' }}>1,500 NGN</span>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 'calc(100% + 32px)', marginLeft: '-16px' }}></div>

                {/* Total Qty */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Total Qty</span>
                  <span style={{ color: '#FFFFFF', fontSize: '15.63px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 274, lineHeight: '100%', letterSpacing: '0%', textAlign: 'right' }}>{selectedOrderDetails.qty} {selectedOrderDetails.token}</span>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 'calc(100% + 32px)', marginLeft: '-16px' }}></div>

                {/* Tx Fee */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Tx Fee</span>
                  <span style={{ color: '#FFFFFF', fontSize: '15.63px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 274, lineHeight: '100%', letterSpacing: '0%', textAlign: 'right' }}>0</span>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 'calc(100% + 32px)', marginLeft: '-16px' }}></div>

                {/* Tx Id */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Tx id</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }}>
                      <path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ color: '#FFFFFF', fontSize: '15.63px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 274, lineHeight: '100%', letterSpacing: '0%', textAlign: 'right' }}>128DJ2I3I1DJKQKCM</span>
                  </div>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 'calc(100% + 32px)', marginLeft: '-16px' }}></div>

                {/* Payment Method */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Payment method</span>
                  <span style={{ color: '#FFFFFF', fontSize: '15.63px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 274, lineHeight: '100%', letterSpacing: '0%', textAlign: 'right' }}>
                    Bank Transfer <span style={{ color: '#A9EF45', cursor: 'pointer', marginLeft: '4px' }}>View Account</span>
                  </span>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 'calc(100% + 32px)', marginLeft: '-16px' }}></div>

                {/* Order Time */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}>Order time</span>
                  <span style={{ color: '#FFFFFF', fontSize: '15.63px', fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 274, lineHeight: '100%', letterSpacing: '0%', textAlign: 'right' }}>{selectedOrderDetails.date}</span>
                </div>
              </div>

              {/* Box 3: My Review */}
              <div style={{
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                backgroundColor: '#0F1825'
              }}>
                <h4 style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#FFFFFF',
                  margin: 0
                }}>My Review</h4>

                {/* Like Status */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '20px',
                  border: '1px solid #00C000',
                  width: '60%'
                }}>
                  <img src={images.Group_41} alt="like" width="24" height="24" />
                  <span style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '12px',
                    color: '#FFFFFF'
                  }}>You gave this order a like</span>
                </div>

                {/* Comment Box */}
                <div style={{
                  backgroundColor: '#1A2332',
                  borderRadius: '12px',
                  padding: '16px',
                  color: '#FFFFFF',
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px'
                }}>
                  He is fast and reliable
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }}>
                    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }}>
                    <path d="M3 6H5H21" stroke="#FF4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#FF4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div >
  );
};

export default P2PProfile;
