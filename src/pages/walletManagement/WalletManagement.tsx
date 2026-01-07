import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import images from "../../constants/images";
import { getUsers, User } from "../../services/userService";

interface WalletUser extends User {
  fiatWalletBalance: string;
  cryptoWalletBalance: string;
  primaryFiatWallet: string;
  txFiat: number;
  txCrypto: number;
}

const WalletManagement: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTimeRange, setSelectedTimeRange] = useState("All Time");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [usersData, setUsersData] = useState<WalletUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBulkActionDropdown, setShowBulkActionDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD Dollar");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  
  const bulkActionDropdownRef = useRef<HTMLDivElement | null>(null);
  const currencyDropdownRef = useRef<HTMLDivElement | null>(null);
  const countryDropdownRef = useRef<HTMLDivElement | null>(null);

  const timeRanges = ["All Time", "7 Days", "1 month", "1 Year", "Custom"];
  const itemsPerPage = 5;

  // Mock wallet data based on time range
  const walletData: Record<string, {
    totalWallets: string;
    cryptoWalletBalance: string;
    fiatWalletBalance: string;
  }> = {
    "All Time": {
      totalWallets: "500",
      cryptoWalletBalance: "$200",
      fiatWalletBalance: "$5,000"
    },
    "7 Days": {
      totalWallets: "125",
      cryptoWalletBalance: "$50",
      fiatWalletBalance: "$1,250"
    },
    "1 month": {
      totalWallets: "350",
      cryptoWalletBalance: "$140",
      fiatWalletBalance: "$3,500"
    },
    "1 Year": {
      totalWallets: "1,500",
      cryptoWalletBalance: "$600",
      fiatWalletBalance: "$15,000"
    },
    "Custom": {
      totalWallets: "500",
      cryptoWalletBalance: "$200",
      fiatWalletBalance: "$5,000"
    }
  };

  const currentWalletData = walletData[selectedTimeRange] || walletData["All Time"];

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const users = await getUsers(false);
        // Transform users to include wallet data
        const walletUsers: WalletUser[] = users.map((user, index) => ({
          ...user,
          fiatWalletBalance: "$20,000",
          cryptoWalletBalance: "$10,000",
          primaryFiatWallet: "NGN Wallet",
          txFiat: 100,
          txCrypto: 20
        }));
        setUsersData(walletUsers);
      } catch (error) {
        console.error('Failed to load users:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showBulkActionDropdown && bulkActionDropdownRef.current && !bulkActionDropdownRef.current.contains(event.target as Node)) {
        setShowBulkActionDropdown(false);
      }
      if (showCurrencyDropdown && currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
        setShowCurrencyDropdown(false);
      }
      if (showCountryDropdown && countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showBulkActionDropdown, showCurrencyDropdown, showCountryDropdown]);

  // Filter users based on search query
  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    return matchesSearch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

  // Handle checkbox selection
  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedUsers.size === displayedUsers.length && displayedUsers.length > 0) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(displayedUsers.map(u => u.id)));
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-white text-center">Loading wallet data...</div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ backgroundColor: '#0B1B20' }} className="rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
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
              Wallet Management
            </h1>
            <p className="mt-[20px]" style={{
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#757E81'
            }}>View and manage user wallet details</p>
          </div>
          <div className="flex flex-col mt-4 md:mt-0">
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
                    fontSize: '12px',
                    fontWeight: 400,
                    backgroundColor: selectedTimeRange === range ? '#FFFFFF' : '#101F26',
                    color: selectedTimeRange === range ? '#000000' : '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Wallets Card */}
            <div
              className="rounded-lg overflow-hidden"
              style={{
                width: '354px',
                height: '90px',
                borderRadius: '10px',
                background: 'linear-gradient(to right, #4880C0, #1B589E)'
              }}
            >
              <div className="p-4 h-full flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#4887CF' }}
                >
                  <img src={images.UsersThree} alt="Wallet" className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white mb-1" style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '10px',
                    fontWeight: 274,
                    fontStyle: 'normal',
                    lineHeight: '100%',
                    letterSpacing: '0%'
                  }}>Total Wallets</p>
                  <h2 className="text-white" style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '24px',
                    fontWeight: 600,
                    fontStyle: 'normal',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    paddingTop: '4px'
                  }}>{currentWalletData.totalWallets}</h2>
                </div>
              </div>
            </div>

            {/* Crypto Wallet Balance Card */}
            <div
              className="rounded-lg overflow-hidden"
              style={{
                width: '354px',
                height: '90px',
                borderRadius: '10px',
                background: 'linear-gradient(to right, #4880C0, #1B589E)'
              }}
            >
              <div className="p-4 h-full flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#4887CF' }}
                >
                  <img src={images.UsersThree} alt="Crypto Wallet" className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white mb-1" style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '10px',
                    fontWeight: 274,
                    fontStyle: 'normal',
                    lineHeight: '100%',
                    letterSpacing: '0%'
                  }}>Crypto Wallet Balance</p>
                  <h2 className="text-white" style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '24px',
                    fontWeight: 600,
                    fontStyle: 'normal',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    paddingTop: '4px'
                  }}>{currentWalletData.cryptoWalletBalance}</h2>
                </div>
              </div>
            </div>

            {/* Fiat Wallet Balance Card */}
            <div
              className="rounded-lg overflow-hidden"
              style={{
                width: '354px',
                height: '90px',
                borderRadius: '10px',
                background: 'linear-gradient(to right, #4880C0, #1B589E)'
              }}
            >
              <div className="p-4 h-full flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#4887CF' }}
                >
                  <img src={images.UsersThree} alt="Fiat Wallet" className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white mb-1" style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '10px',
                    fontWeight: 274,
                    fontStyle: 'normal',
                    lineHeight: '100%',
                    letterSpacing: '0%'
                  }}>Fiat Wallet Balance</p>
                  <h2 className="text-white" style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '24px',
                    fontWeight: 600,
                    fontStyle: 'normal',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    paddingTop: '4px'
                  }}>{currentWalletData.fiatWalletBalance}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action and Filter Bar */}
      <div className="mt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div className="flex gap-3 flex-wrap">
            {/* Bulk Action Dropdown */}
            <div className="relative" ref={bulkActionDropdownRef}>
              <button
                onClick={() => setShowBulkActionDropdown(!showBulkActionDropdown)}
                className="text-white flex items-center justify-center gap-2"
                style={{
                  width: '135px',
                  height: '45px',
                  borderRadius: '100px',
                  borderWidth: '0.3px',
                  borderStyle: 'solid',
                  borderColor: '#27353B',
                  backgroundColor: '#101F26',
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  cursor: 'pointer'
                }}
              >
                Bulk Action
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {showBulkActionDropdown && (
                <div
                  className="absolute top-full left-0 mt-2 rounded-lg overflow-hidden z-50"
                  style={{
                    backgroundColor: '#1C2630',
                    minWidth: '135px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <button
                    onClick={() => { setShowBulkActionDropdown(false); }}
                    className="w-full text-left hover:bg-[#2B363E] transition-colors px-4 py-2 text-white"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px'
                    }}
                  >
                    Export
                  </button>
                  <button
                    onClick={() => { setShowBulkActionDropdown(false); }}
                    className="w-full text-left hover:bg-[#2B363E] transition-colors px-4 py-2 text-white"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px'
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            {/* USD Dollar Dropdown */}
            <div className="relative" ref={currencyDropdownRef}>
              <button
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                className="text-white flex items-center justify-center gap-2"
                style={{
                  width: '135px',
                  height: '45px',
                  borderRadius: '100px',
                  borderWidth: '0.3px',
                  borderStyle: 'solid',
                  borderColor: '#27353B',
                  backgroundColor: '#101F26',
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  cursor: 'pointer'
                }}
              >
                {selectedCurrency}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {showCurrencyDropdown && (
                <div
                  className="absolute top-full left-0 mt-2 rounded-lg overflow-hidden z-50"
                  style={{
                    backgroundColor: '#1C2630',
                    minWidth: '135px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {["USD Dollar", "EUR", "GBP", "NGN"].map((currency) => (
                    <button
                      key={currency}
                      onClick={() => { setSelectedCurrency(currency); setShowCurrencyDropdown(false); }}
                      className="w-full text-left hover:bg-[#2B363E] transition-colors px-4 py-2 text-white"
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '14px'
                      }}
                    >
                      {currency}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Country Dropdown */}
            <div className="relative" ref={countryDropdownRef}>
              <button
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="text-white flex items-center justify-center gap-2"
                style={{
                  width: '135px',
                  height: '45px',
                  borderRadius: '100px',
                  borderWidth: '0.3px',
                  borderStyle: 'solid',
                  borderColor: '#27353B',
                  backgroundColor: '#101F26',
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  cursor: 'pointer'
                }}
              >
                {selectedCountry}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {showCountryDropdown && (
                <div
                  className="absolute top-full left-0 mt-2 rounded-lg overflow-hidden z-50"
                  style={{
                    backgroundColor: '#1C2630',
                    minWidth: '135px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {["All Countries", "Nigeria", "Ghana", "Kenya", "South Africa"].map((country) => (
                    <button
                      key={country}
                      onClick={() => { setSelectedCountry(country); setShowCountryDropdown(false); }}
                      className="w-full text-left hover:bg-[#2B363E] transition-colors px-4 py-2 text-white"
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '14px'
                      }}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-auto">
            <div
              className="flex items-center px-3 py-2"
              style={{
                width: '267px',
                height: '35px',
                borderRadius: '100px',
                backgroundColor: '#0F1722'
              }}
            >
              <svg
                className="w-4 h-4 text-gray-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="bg-transparent text-white outline-none flex-1 placeholder-[#878B90]"
                style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div
        className="rounded-lg w-full"
        style={{
          backgroundColor: '#0B1820',
          borderRadius: '20px',
          marginTop: '9.6px'
        }}
      >
        {/* Header Section */}
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
            Users wallet Details
          </h2>
        </div>

        {/* Table */}
        <div style={{ width: '100%' }}>
          {/* Table Header */}
          <div style={{ backgroundColor: '#1C2530', width: '100%' }}>
            <table className="w-full" style={{ height: '60px', width: '100%', tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '50px' }} />
                <col style={{ width: '200px' }} />
                <col style={{ width: '150px' }} />
                <col style={{ width: '150px' }} />
                <col style={{ width: '150px' }} />
                <col style={{ width: '100px' }} />
                <col style={{ width: '100px' }} />
                <col style={{ width: '150px' }} />
              </colgroup>
              <thead>
                <tr style={{ height: '100%', width: '100%' }}>
                  <th className="text-left py-3" style={{ verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '24px', paddingRight: '12px' }}>
                    <div className="relative inline-block" style={{ width: '16px', height: '16px' }}>
                      <input
                        type="checkbox"
                        checked={selectedUsers.size === displayedUsers.length && displayedUsers.length > 0}
                        onChange={handleSelectAll}
                        className="rounded appearance-none cursor-pointer"
                        style={{
                          width: '16px',
                          height: '16px',
                          backgroundColor: selectedUsers.size === displayedUsers.length && displayedUsers.length > 0 ? '#A9EF45' : '#1C2830',
                          borderColor: 'white',
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          outline: 'none',
                          margin: 0,
                          padding: 0
                        }}
                      />
                      {selectedUsers.size === displayedUsers.length && displayedUsers.length > 0 && (
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
                    User Name
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
                    Fiat Wallet Balance
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
                    Crypto Wallet balance
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
                    Primary Fiat wallet
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
                    Tx(Fiat)
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
                    Tx(Crypto)
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
            <table className="w-full" style={{ width: '100%', tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '50px' }} />
                <col style={{ width: '200px' }} />
                <col style={{ width: '150px' }} />
                <col style={{ width: '150px' }} />
                <col style={{ width: '150px' }} />
                <col style={{ width: '100px' }} />
                <col style={{ width: '100px' }} />
                <col style={{ width: '150px' }} />
              </colgroup>
              <tbody>
                {displayedUsers.length > 0 ? (
                  displayedUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-[#2B363E] hover:bg-[#1A252F] transition-colors"
                      style={{ width: '100%', display: 'table-row' }}
                    >
                      <td className="py-3" style={{ paddingLeft: '24px', paddingRight: '12px', verticalAlign: 'middle' }}>
                        <div className="relative inline-block" style={{ width: '16px', height: '16px' }}>
                          <input
                            type="checkbox"
                            checked={selectedUsers.has(user.id)}
                            onChange={() => handleSelectUser(user.id)}
                            className="rounded appearance-none cursor-pointer"
                            style={{
                              width: '16px',
                              height: '16px',
                              backgroundColor: selectedUsers.has(user.id) ? '#A9EF45' : '#1C2830',
                              borderColor: 'white',
                              borderWidth: '1px',
                              borderStyle: 'solid',
                              outline: 'none',
                              margin: 0,
                              padding: 0
                            }}
                          />
                          {selectedUsers.has(user.id) && (
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
                      <td className="py-3" style={{ paddingLeft: '0px', paddingRight: '24px', verticalAlign: 'middle' }}>
                        <div className="flex items-center gap-3">
                          <img
                            src={images.avater1}
                            alt={user.name}
                            className="object-cover"
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '200px',
                              backgroundColor: '#A9EF45',
                              opacity: 1
                            }}
                          />
                          <span
                            className="text-white"
                            style={{
                              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontWeight: 274,
                              fontStyle: 'normal',
                              fontSize: '12px',
                              lineHeight: '100%',
                              letterSpacing: '0%'
                            }}
                          >
                            {user.name || 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3" style={{ paddingLeft: '24px', paddingRight: '24px', verticalAlign: 'middle' }}>
                        <span
                          className="text-white"
                          style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontWeight: 274,
                            fontStyle: 'normal',
                            fontSize: '12px',
                            lineHeight: '100%',
                            letterSpacing: '0%'
                          }}
                        >
                          {user.fiatWalletBalance}
                        </span>
                      </td>
                      <td className="py-3" style={{ paddingLeft: '24px', paddingRight: '24px', verticalAlign: 'middle' }}>
                        <span
                          className="text-white"
                          style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontWeight: 274,
                            fontStyle: 'normal',
                            fontSize: '12px',
                            lineHeight: '100%',
                            letterSpacing: '0%'
                          }}
                        >
                          {user.cryptoWalletBalance}
                        </span>
                      </td>
                      <td className="py-3" style={{ paddingLeft: '24px', paddingRight: '24px', verticalAlign: 'middle' }}>
                        <div className="flex items-center gap-2">
                          <img
                            src={images.flag}
                            alt="Flag"
                            style={{
                              width: '20px',
                              height: '20px',
                              objectFit: 'cover'
                            }}
                          />
                          <span
                            className="text-white"
                            style={{
                              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontWeight: 274,
                              fontStyle: 'normal',
                              fontSize: '12px',
                              lineHeight: '100%',
                              letterSpacing: '0%'
                            }}
                          >
                            {user.primaryFiatWallet}
                          </span>
                        </div>
                      </td>
                      <td className="py-3" style={{ paddingLeft: '24px', paddingRight: '24px', verticalAlign: 'middle' }}>
                        <span
                          className="text-white"
                          style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontWeight: 274,
                            fontStyle: 'normal',
                            fontSize: '12px',
                            lineHeight: '100%',
                            letterSpacing: '0%'
                          }}
                        >
                          {user.txFiat}
                        </span>
                      </td>
                      <td className="py-3" style={{ paddingLeft: '24px', paddingRight: '24px', verticalAlign: 'middle' }}>
                        <span
                          className="text-white"
                          style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontWeight: 274,
                            fontStyle: 'normal',
                            fontSize: '12px',
                            lineHeight: '100%',
                            letterSpacing: '0%'
                          }}
                        >
                          {user.txCrypto}
                        </span>
                      </td>
                      <td className="py-3" style={{ paddingLeft: '24px', paddingRight: '24px', verticalAlign: 'middle' }}>
                        <button
                          onClick={() => navigate(`/user/management/${encodeURIComponent(user.name || user.email)}/wallet`)}
                          style={{
                            width: '97px',
                            height: '35px',
                            borderRadius: '100px',
                            backgroundColor: '#A9EF45',
                            color: '#000000',
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '12px',
                            fontWeight: 400,
                            cursor: 'pointer',
                            border: 'none'
                          }}
                        >
                          View Wallet
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-400" style={{ paddingLeft: '24px' }}>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center p-6 pt-4 gap-4" style={{ backgroundColor: '#0B1820', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
          <div className="text-white" style={{
            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '14px',
            fontWeight: 400
          }}>
            Showing {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} Users
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
    </div>
  );
};

export default WalletManagement;
