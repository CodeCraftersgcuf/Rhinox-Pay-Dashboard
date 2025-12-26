import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import images from "../../constants/images";

interface WalletsProps {
  selectedTimeRange?: string;
}

const Wallets: React.FC<WalletsProps> = ({ selectedTimeRange = "All Time" }) => {
  const [activeTab, setActiveTab] = useState("User Wallets");
  const [selectedFilter, setSelectedFilter] = useState("Fiat");
  const [selectedCurrency, setSelectedCurrency] = useState("NGN");
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const currencies = ["NGN", "USD", "EUR", "GBP", "BTC", "ETH"];
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });

  // Mock balance data based on currency, filter, and tab
  const balanceData: Record<string, Record<string, Record<string, string>>> = {
    "User Wallets": {
      "Fiat": {
        "NGN": "150,000.00",
        "USD": "1,200.00",
        "EUR": "1,100.00",
        "GBP": "950.00",
        "BTC": "0.025",
        "ETH": "0.45"
      },
      "Crypto": {
        "NGN": "2,500,000.00",
        "USD": "18,500.00",
        "EUR": "17,200.00",
        "GBP": "14,800.00",
        "BTC": "0.38",
        "ETH": "6.75"
      }
    },
    "Master Wallets": {
      "Fiat": {
        "NGN": "5,000,000.00",
        "USD": "40,000.00",
        "EUR": "37,000.00",
        "GBP": "32,000.00",
        "BTC": "0.85",
        "ETH": "15.20"
      },
      "Crypto": {
        "NGN": "15,000,000.00",
        "USD": "120,000.00",
        "EUR": "111,000.00",
        "GBP": "96,000.00",
        "BTC": "2.50",
        "ETH": "45.00"
      }
    }
  };

  // Get current balance based on selections
  const currentBalance = balanceData[activeTab]?.[selectedFilter]?.[selectedCurrency] || "0.00";

  // Currency symbols
  const currencySymbols: Record<string, string> = {
    "NGN": "₦",
    "USD": "$",
    "EUR": "€",
    "GBP": "£",
    "BTC": "₿",
    "ETH": "Ξ"
  };

  const currencySymbol = currencySymbols[selectedCurrency] || "$";

  // Function to calculate dropdown position
  const calculateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsCurrencyDropdownOpen(false);
      }
    };

    const handleScroll = () => {
      if (isCurrencyDropdownOpen) {
        calculateDropdownPosition();
      }
    };

    if (isCurrencyDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleScroll);
      calculateDropdownPosition();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isCurrencyDropdownOpen]);

  return (
    <div className="w-[469px] h-[258px] rounded-[20px] border bg-[#0C1C21] flex flex-col overflow-hidden" style={{ borderColor: '#2A62A3' }}>
      {/* Section 1: Header Section */}
      <div className="h-[50px] border-b border-gray-700 bg-[#19252E] flex items-center justify-between px-5">
        {/* Left: Icon and Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1F2933] flex items-center justify-center">
            <img src={images.analytics_up_green} alt="Wallet" className="w-5 h-5" />
          </div>
          <div>
            <h2
              className="text-white"
              style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: 274,
                fontStyle: 'normal',
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '0%'
              }}
            >
              Wallets
            </h2>
            <p
              className="text-gray-400 mt-1"
              style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: 274,
                fontStyle: 'normal',
                fontSize: '9px',
                lineHeight: '100%',
                letterSpacing: '0%'
              }}
            >
              View all wallets balances including master wallets
            </p>
          </div>
        </div>

        {/* Right: Filter Buttons and Search */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedFilter("Fiat")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${selectedFilter === "Fiat"
              ? "bg-white text-gray-900"
              : "bg-[#1A262F] text-white border-[#2B363E]"
              }`}
          >
            Fiat
          </button>
          <button
            onClick={() => setSelectedFilter("Crypto")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${selectedFilter === "Crypto"
              ? "bg-white text-gray-900"
              : "bg-[#1A262F] text-white border-[#2B363E]"
              }`}
          >
            Crypto
          </button>
          <button className="w-8 h-8 bg-[#1A262F] border border-[#2B363E] rounded-full flex items-center justify-center hover:bg-[#1A262F] transition-colors">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Section 2: Tabs Section */}
      <div className="h-[30px] border-b border-gray-700 bg-[#19252E] flex items-center px-5">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("User Wallets")}
            className={`pt-2 pb-2 transition-colors ${activeTab === "User Wallets"
              ? "text-white border-b-2"
              : "text-gray-400"
              }`}
            style={{
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 274,
              fontStyle: 'normal',
              fontSize: '12px',
              lineHeight: '100%',
              letterSpacing: '0%',
              ...(activeTab === "User Wallets" && { borderBottomColor: '#96D542' })
            }}
          >
            User Wallets
          </button>
          <button
            onClick={() => setActiveTab("Master Wallets")}
            className={`pt-2 pb-2 transition-colors ${activeTab === "Master Wallets"
              ? "text-white border-b-2"
              : "text-gray-400"
              }`}
            style={{
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 274,
              fontStyle: 'normal',
              fontSize: '12px',
              lineHeight: '100%',
              letterSpacing: '0%',
              ...(activeTab === "Master Wallets" && { borderBottomColor: '#96D542' })
            }}
          >
            Master Wallets
          </button>
        </div>
      </div>

      {/* Section 3: Total Balance Card */}
      <div className="flex-1 bg-[#3E77B9] rounded-lg p-4 m-5 relative overflow-hidden">
        {/* Background Pattern Image - Curve (First Layer) */}
        <div className="absolute bottom-0 left-0 right-0 w-full pointer-events-none overflow-hidden rounded-lg" style={{ zIndex: 0, height: '70%' }}>
          <img
            src={images.Rectangle_36}
            alt="Background pattern"
            className="w-full h-full object-cover object-bottom"
            style={{
              opacity: 0.7,
              filter: 'brightness(0) invert(1)'
            }}
          />
        </div>

        {/* Background Pattern Image - Curve (Second Layer) */}
        <div className="absolute bottom-0 left-0 right-0 w-full pointer-events-none overflow-hidden rounded-lg" style={{ zIndex: 0, height: '50%' }}>
          <img
            src={images.Rectangle_36}
            alt="Background pattern"
            className="w-full h-full object-cover object-bottom"
            style={{
              opacity: 0.5,
              filter: 'brightness(0) invert(1)'
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex items-center justify-center mb-4 relative">
            <p className="text-white text-sm font-medium text-center">Total Balance</p>
            <div className="absolute right-0">
              <button
                ref={buttonRef}
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="px-3 py-1 bg-white/10 border border-white/30 rounded-full text-white text-xs font-medium flex items-center gap-1 hover:bg-white/20 transition-colors"
              >
                {selectedCurrency}
                <svg
                  className={`w-3 h-3 transition-transform ${isCurrencyDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu - Rendered via Portal */}
              {isCurrencyDropdownOpen && createPortal(
                <div
                  ref={dropdownRef}
                  className="fixed w-32 bg-[#1A262F] border border-[#2B363E] rounded-lg shadow-lg overflow-hidden"
                  style={{
                    top: `${dropdownPosition.top}px`,
                    right: `${dropdownPosition.right}px`,
                    zIndex: 9999
                  }}
                >
                  {currencies.map((currency) => (
                    <button
                      key={currency}
                      onClick={() => {
                        setSelectedCurrency(currency);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-sm text-white hover:bg-[#2B363E] transition-colors ${selectedCurrency === currency ? 'bg-[#2B363E]' : ''
                        }`}
                    >
                      {currency}
                    </button>
                  ))}
                </div>,
                document.body
              )}
            </div>
          </div>
          <div className="flex-1 flex items-start justify-center pt-[-20px]">
            <h3 className="text-white">
              <span
                style={{
                  fontFamily: 'Agbalumo',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '10px',
                  lineHeight: '100%',
                  letterSpacing: '0%'
                }}
              >
                {currencySymbol}
              </span>
              <span
                style={{
                  fontFamily: 'Agbalumo',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '30px',
                  lineHeight: '100%',
                  letterSpacing: '0%'
                }}
              >
                {currentBalance}
              </span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallets;

