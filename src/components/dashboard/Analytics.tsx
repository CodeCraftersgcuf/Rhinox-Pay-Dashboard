import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import images from "../../constants/images";

interface AnalyticsProps {
  selectedTimeRange?: string;
}

const Analytics: React.FC<AnalyticsProps> = ({ selectedTimeRange = "All Time" }) => {
  const [selectedRevenue, setSelectedRevenue] = useState("Revenue");
  const [selectedCrypto, setSelectedCrypto] = useState("Crypto");
  const [selectedFiat, setSelectedFiat] = useState("Fiat");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const revenueOptions = ["Revenue", "Transactions", "Users", "Volume"];
  const cryptoOptions = ["Crypto", "BTC", "ETH", "USDT", "BNB"];
  const fiatOptions = ["Fiat", "USD", "EUR", "GBP", "NGN"];

  const revenueRef = useRef<HTMLDivElement>(null);
  const cryptoRef = useRef<HTMLDivElement>(null);
  const fiatRef = useRef<HTMLDivElement>(null);
  const revenueButtonRef = useRef<HTMLButtonElement>(null);
  const cryptoButtonRef = useRef<HTMLButtonElement>(null);
  const fiatButtonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPositions, setDropdownPositions] = useState({
    revenue: { top: 0, right: 0 },
    crypto: { top: 0, right: 0 },
    fiat: { top: 0, right: 0 }
  });

  // Function to calculate dropdown positions
  const calculatePositions = () => {
    if (openDropdown === "revenue" && revenueButtonRef.current) {
      const rect = revenueButtonRef.current.getBoundingClientRect();
      setDropdownPositions(prev => ({
        ...prev,
        revenue: {
          top: rect.bottom + 8,
          right: window.innerWidth - rect.right
        }
      }));
    } else if (openDropdown === "crypto" && cryptoButtonRef.current) {
      const rect = cryptoButtonRef.current.getBoundingClientRect();
      setDropdownPositions(prev => ({
        ...prev,
        crypto: {
          top: rect.bottom + 8,
          right: window.innerWidth - rect.right
        }
      }));
    } else if (openDropdown === "fiat" && fiatButtonRef.current) {
      const rect = fiatButtonRef.current.getBoundingClientRect();
      setDropdownPositions(prev => ({
        ...prev,
        fiat: {
          top: rect.bottom + 8,
          right: window.innerWidth - rect.right
        }
      }));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown === "revenue" && 
          revenueRef.current && !revenueRef.current.contains(event.target as Node) &&
          revenueButtonRef.current && !revenueButtonRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      } else if (openDropdown === "crypto" &&
          cryptoRef.current && !cryptoRef.current.contains(event.target as Node) &&
          cryptoButtonRef.current && !cryptoButtonRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      } else if (openDropdown === "fiat" &&
          fiatRef.current && !fiatRef.current.contains(event.target as Node) &&
          fiatButtonRef.current && !fiatButtonRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    const handleScroll = () => {
      if (openDropdown) {
        calculatePositions();
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleScroll);
      calculatePositions();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleScroll);
    };
  }, [openDropdown]);
  return (
    <>
      <style>
        {`
          .analytics-scrollbar::-webkit-scrollbar {
            height: 4px;
          }
          .analytics-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .analytics-scrollbar::-webkit-scrollbar-thumb {
            background: #585858;
            border-radius: 2px;
          }
          .analytics-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #585858;
          }
        `}
      </style>
      <div
        style={{
          width: '620px',
          height: '258px',
          borderRadius: '20px',
          borderWidth: '0.3px',
          borderStyle: 'solid',
          marginLeft: '10px',
          borderColor: '#A9EF45',
          backgroundColor: '#0C1C21',
          overflow: 'hidden'
        }}
      >
        {/* First Portion - Header */}
        <div
          className="flex items-center justify-between px-5"
          style={{ height: '60px', backgroundColor: '#1A252F' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#202F33' }}>
              <img src={images.analytics_up_green} alt="Analytics" className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-white text-lg mb-0 leading-tight" style={{ fontWeight: 300 }}>Analytics</h2>
              <p
                className="text-gray-400"
                style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 274,
                  fontStyle: 'normal',
                  fontSize: '10px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  paddingTop: '5px'
                }}
              >
                View chart analytics for your data
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            {/* Revenue Dropdown */}
            <div className="relative">
              <button
                ref={revenueButtonRef}
                onClick={() => setOpenDropdown(openDropdown === "revenue" ? null : "revenue")}
                className="bg-transparent text-white text-sm flex items-center justify-center"
                style={{
                  width: '110px',
                  height: '34px',
                  borderRadius: '100px',
                  borderWidth: '0.3px',
                  borderStyle: 'solid',
                  borderColor: 'rgba(156, 163, 175, 0.5)',
                  gap: '8px',
                  paddingTop: '11px',
                  paddingRight: '15px',
                  paddingBottom: '11px',
                  paddingLeft: '15px'
                }}
              >
                <span>{selectedRevenue}</span>
                <svg 
                  className={`w-4 h-4 text-white flex-shrink-0 transition-transform ${openDropdown === "revenue" ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Revenue Dropdown Menu */}
              {openDropdown === "revenue" && createPortal(
                <div
                  ref={revenueRef}
                  className="fixed w-32 bg-[#1A262F] border border-[#2B363E] rounded-lg shadow-lg"
                  style={{
                    top: `${dropdownPositions.revenue.top}px`,
                    right: `${dropdownPositions.revenue.right}px`,
                    zIndex: 9999
                  }}
                >
                  {revenueOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedRevenue(option);
                        setOpenDropdown(null);
                      }}
                      className={`w-full px-3 py-2 text-left text-sm text-white hover:bg-[#2B363E] transition-colors ${
                        selectedRevenue === option ? 'bg-[#2B363E]' : ''
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>,
                document.body
              )}
            </div>

            <div className="w-px h-6 bg-white mx-1"></div>

            {/* Crypto Dropdown */}
            <div className="relative">
              <button
                ref={cryptoButtonRef}
                onClick={() => setOpenDropdown(openDropdown === "crypto" ? null : "crypto")}
                className="bg-transparent text-white text-sm flex items-center justify-center"
                style={{
                  width: '91px',
                  height: '34px',
                  borderRadius: '100px',
                  borderWidth: '0.3px',
                  borderStyle: 'solid',
                  borderColor: 'rgba(156, 163, 175, 0.5)',
                  gap: '8px',
                  paddingTop: '11px',
                  paddingRight: '15px',
                  paddingBottom: '11px',
                  paddingLeft: '15px'
                }}
              >
                <span>{selectedCrypto}</span>
                <svg 
                  className={`w-4 h-4 text-white flex-shrink-0 transition-transform ${openDropdown === "crypto" ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Crypto Dropdown Menu */}
              {openDropdown === "crypto" && createPortal(
                <div
                  ref={cryptoRef}
                  className="fixed w-32 bg-[#1A262F] border border-[#2B363E] rounded-lg shadow-lg"
                  style={{
                    top: `${dropdownPositions.crypto.top}px`,
                    right: `${dropdownPositions.crypto.right}px`,
                    zIndex: 9999
                  }}
                >
                  {cryptoOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedCrypto(option);
                        setOpenDropdown(null);
                      }}
                      className={`w-full px-3 py-2 text-left text-sm text-white hover:bg-[#2B363E] transition-colors ${
                        selectedCrypto === option ? 'bg-[#2B363E]' : ''
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>,
                document.body
              )}
            </div>

            {/* Fiat Dropdown */}
            <div className="relative">
              <button
                ref={fiatButtonRef}
                onClick={() => setOpenDropdown(openDropdown === "fiat" ? null : "fiat")}
                className="bg-transparent text-white text-sm flex items-center justify-center"
                style={{
                  width: '91px',
                  height: '34px',
                  borderRadius: '100px',
                  borderWidth: '0.3px',
                  borderStyle: 'solid',
                  borderColor: 'rgba(156, 163, 175, 0.5)',
                  gap: '8px',
                  paddingTop: '11px',
                  paddingRight: '15px',
                  paddingBottom: '11px',
                  paddingLeft: '15px'
                }}
              >
                <span>{selectedFiat}</span>
                <svg 
                  className={`w-4 h-4 text-white flex-shrink-0 transition-transform ${openDropdown === "fiat" ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Fiat Dropdown Menu */}
              {openDropdown === "fiat" && createPortal(
                <div
                  ref={fiatRef}
                  className="fixed w-32 bg-[#1A262F] border border-[#2B363E] rounded-lg shadow-lg"
                  style={{
                    top: `${dropdownPositions.fiat.top}px`,
                    right: `${dropdownPositions.fiat.right}px`,
                    zIndex: 9999
                  }}
                >
                  {fiatOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedFiat(option);
                        setOpenDropdown(null);
                      }}
                      className={`w-full px-3 py-2 text-left text-sm text-white hover:bg-[#2B363E] transition-colors ${
                        selectedFiat === option ? 'bg-[#2B363E]' : ''
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>,
                document.body
              )}
            </div>
          </div>
        </div>

        {/* Second Portion - Chart */}
        <div className="px-5 py-4" style={{ height: 'calc(258px - 50px)', backgroundColor: '#121D27' }}>
          <div className="h-full flex">
            {/* Y-axis labels */}
            <div className="flex flex-col justify-between mr-2" style={{ width: '30px' }}>
              <span className="text-gray-500 text-xs">600</span>
              <span className="text-gray-500 text-xs">400</span>
              <span className="text-gray-500 text-xs">200</span>
              <span className="text-gray-500 text-xs">0</span>
            </div>

            {/* Chart area with bars */}
            <div className="flex-1 flex flex-col overflow-x-auto analytics-scrollbar">
              {/* Chart area */}
              <div className="flex-1 relative" style={{ height: '140px', minHeight: '140px', minWidth: '720px' }}>
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between" style={{ minWidth: '720px' }}>
                  {[0, 200, 400, 600].map((value) => (
                    <div key={value} className="border-t border-gray-700" style={{ opacity: 0.3 }}></div>
                  ))}
                </div>

                {/* Chart bars */}
                <div className="absolute inset-0 flex items-end justify-between" style={{ padding: '0 4px', paddingBottom: '0', height: '100%', minWidth: '720px' }}>
                  {/* Jan */}
                  <div className="flex items-end gap-1" style={{ width: '8.33%', height: '100%' }}>
                    <div className="rounded-t rounded-b" style={{ width: '17px', height: '100%', background: 'repeating-linear-gradient(45deg, #A9EF45, #A9EF45 4px, #82BF29 4px, #82BF29 8px)' }}></div>
                    <div className="rounded-t rounded-b" style={{ width: '17px', height: '67%', background: 'repeating-linear-gradient(45deg, #4880C0, #4880C0 4px, #3C70AD 4px, #3C70AD 8px)' }}></div>
                  </div>

                  {/* Feb */}
                  <div className="flex items-end gap-1" style={{ width: '8.33%', height: '100%' }}>
                    <div className="rounded-t rounded-b" style={{ width: '17px', height: '37%', background: 'repeating-linear-gradient(45deg, #A9EF45, #A9EF45 4px, #82BF29 4px, #82BF29 8px)' }}></div>
                    <div className="rounded-t rounded-b" style={{ width: '17px', height: '87%', background: 'repeating-linear-gradient(45deg, #4880C0, #4880C0 4px, #3C70AD 4px, #3C70AD 8px)' }}></div>
                  </div>

                  {/* Mar */}
                  <div className="flex items-end gap-1" style={{ width: '8.33%', height: '100%' }}>
                    <div className="rounded-t rounded-b" style={{ width: '17px', height: '70%', background: 'repeating-linear-gradient(45deg, #A9EF45, #A9EF45 4px, #82BF29 4px, #82BF29 8px)' }}></div>
                    <div className="rounded-t rounded-b" style={{ width: '17px', height: '50%', background: 'repeating-linear-gradient(45deg, #4880C0, #4880C0 4px, #3C70AD 4px, #3C70AD 8px)' }}></div>
                  </div>

                  {/* Apr */}
                  <div className="flex items-end gap-1" style={{ width: '8.33%', height: '100%' }}>
                    <div className="rounded-t rounded-b" style={{ width: '17px', height: '100%', background: 'repeating-linear-gradient(45deg, #A9EF45, #A9EF45 4px, #82BF29 4px, #82BF29 8px)' }}></div>
                    <div className="rounded-t rounded-b" style={{ width: '17px', height: '83%', background: 'repeating-linear-gradient(45deg, #4880C0, #4880C0 4px, #3C70AD 4px, #3C70AD 8px)' }}></div>
                  </div>

                  {/* May */}
                  <div className="flex items-end gap-1" style={{ width: '8.33%', height: '100%' }}>
                    <div className="rounded-t rounded-b" style={{ width: '17px', height: '20%', background: 'repeating-linear-gradient(45deg, #A9EF45, #A9EF45 4px, #82BF29 4px, #82BF29 8px)' }}></div>
                    <div className="rounded-t rounded-b" style={{ width: '17px', height: '37%', background: 'repeating-linear-gradient(45deg, #4880C0, #4880C0 4px, #3C70AD 4px, #3C70AD 8px)' }}></div>
                  </div>

                  {/* Jun */}
                  <div className="flex items-end gap-1" style={{ width: '8.33%', height: '100%' }}>
                    <div className="rounded-t rounded-b" style={{ width: '17px', height: '77%', background: 'repeating-linear-gradient(45deg, #A9EF45, #A9EF45 4px, #82BF29 4px, #82BF29 8px)' }}></div>
                    <div className="rounded-t rounded-b" style={{ width: '17px', height: '63%', background: 'repeating-linear-gradient(45deg, #4880C0, #4880C0 4px, #3C70AD 4px, #3C70AD 8px)' }}></div>
                  </div>

                  {/* Jul */}
                  <div className="flex items-end gap-1" style={{ width: '8.33%', height: '100%' }}>
                    <div className="rounded-t rounded-b" style={{ width: '17px', height: '100%', background: 'repeating-linear-gradient(45deg, #A9EF45, #A9EF45 4px, #82BF29 4px, #82BF29 8px)' }}></div>
                    <div className="rounded-t rounded-b" style={{ width: '17px', height: '63%', background: 'repeating-linear-gradient(45deg, #4880C0, #4880C0 4px, #3C70AD 4px, #3C70AD 8px)' }}></div>
                  </div>

                  {/* Aug */}
                  <div className="flex items-end gap-1" style={{ width: '8.33%', height: '100%' }}>
                    <div className="rounded-t rounded-b" style={{ width: '17px', height: '100%', background: 'repeating-linear-gradient(45deg, #A9EF45, #A9EF45 4px, #82BF29 4px, #82BF29 8px)' }}></div>
                    <div className="rounded-t rounded-b" style={{ width: '17px', height: '63%', background: 'repeating-linear-gradient(45deg, #4880C0, #4880C0 4px, #3C70AD 4px, #3C70AD 8px)' }}></div>
                  </div>

                  {/* Sep */}
                  <div className="flex items-end gap-1" style={{ width: '8.33%', height: '100%' }}>
                    <div className="rounded-t rounded-b" style={{ width: '17px', height: '100%', background: 'repeating-linear-gradient(45deg, #A9EF45, #A9EF45 4px, #82BF29 4px, #82BF29 8px)' }}></div>
                    <div className="rounded-t rounded-b" style={{ width: '17px', height: '63%', background: 'repeating-linear-gradient(45deg, #4880C0, #4880C0 4px, #3C70AD 4px, #3C70AD 8px)' }}></div>
                  </div>

                  {/* Oct */}
                  <div className="flex items-end gap-1" style={{ width: '8.33%', height: '100%' }}>
                    <div className="rounded-t rounded-b" style={{ width: '17px', height: '90%', background: 'repeating-linear-gradient(45deg, #A9EF45, #A9EF45 4px, #82BF29 4px, #82BF29 8px)' }}></div>
                    <div className="rounded-t rounded-b" style={{ width: '17px', height: '60%', background: 'repeating-linear-gradient(45deg, #4880C0, #4880C0 4px, #3C70AD 4px, #3C70AD 8px)' }}></div>
                  </div>

                  {/* Nov */}
                  <div className="flex items-end gap-1" style={{ width: '8.33%', height: '100%' }}>
                    <div className="rounded-t rounded-b" style={{ width: '17px', height: '85%', background: 'repeating-linear-gradient(45deg, #A9EF45, #A9EF45 4px, #82BF29 4px, #82BF29 8px)' }}></div>
                    <div className="rounded-t rounded-b" style={{ width: '17px', height: '55%', background: 'repeating-linear-gradient(45deg, #4880C0, #4880C0 4px, #3C70AD 4px, #3C70AD 8px)' }}></div>
                  </div>

                  {/* Dec */}
                  <div className="flex items-end gap-1" style={{ width: '8.33%', height: '100%' }}>
                    <div className="rounded-t rounded-b" style={{ width: '17px', height: '95%', background: 'repeating-linear-gradient(45deg, #A9EF45, #A9EF45 4px, #82BF29 4px, #82BF29 8px)' }}></div>
                    <div className="rounded-t rounded-b" style={{ width: '17px', height: '70%', background: 'repeating-linear-gradient(45deg, #4880C0, #4880C0 4px, #3C70AD 4px, #3C70AD 8px)' }}></div>
                  </div>
                </div>
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between mt-2" style={{ height: '20px', minWidth: '720px' }}>
                <span className="text-gray-500 text-xs whitespace-nowrap" style={{ width: '8.33%' }}>Jan</span>
                <span className="text-gray-500 text-xs whitespace-nowrap" style={{ width: '8.33%' }}>Feb</span>
                <span className="text-gray-500 text-xs whitespace-nowrap" style={{ width: '8.33%' }}>Mar</span>
                <span className="text-gray-500 text-xs whitespace-nowrap" style={{ width: '8.33%' }}>Apr</span>
                <span className="text-gray-500 text-xs whitespace-nowrap" style={{ width: '8.33%' }}>May</span>
                <span className="text-gray-500 text-xs whitespace-nowrap" style={{ width: '8.33%' }}>Jun</span>
                <span className="text-gray-500 text-xs whitespace-nowrap" style={{ width: '8.33%' }}>Jul</span>
                <span className="text-gray-500 text-xs whitespace-nowrap" style={{ width: '8.33%' }}>Aug</span>
                <span className="text-gray-500 text-xs whitespace-nowrap" style={{ width: '8.33%' }}>Sep</span>
                <span className="text-gray-500 text-xs whitespace-nowrap" style={{ width: '8.33%' }}>Oct</span>
                <span className="text-gray-500 text-xs whitespace-nowrap" style={{ width: '8.33%' }}>Nov</span>
                <span className="text-gray-500 text-xs whitespace-nowrap" style={{ width: '8.33%' }}>Dec</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;

