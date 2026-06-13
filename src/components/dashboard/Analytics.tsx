import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import images from "../../constants/images";
import { fetchDashboardCharts } from "../../services/admin";
import { formatNumber } from "../../utils/adminFormatters";

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
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartValues, setChartValues] = useState<number[]>([]);

  useEffect(() => {
    const loadCharts = async () => {
      try {
        const metricMap: Record<string, string> = {
          Revenue: 'revenue',
          Transactions: 'transactions',
          Users: 'users',
          Volume: 'volume',
        };
        const data = await fetchDashboardCharts({
          range: selectedTimeRange,
          metric: metricMap[selectedRevenue] || 'revenue',
          walletType: selectedCrypto === 'Crypto' ? 'crypto' : 'fiat',
          currency: selectedFiat !== 'Fiat' ? selectedFiat : undefined,
        });
        setChartLabels(data?.labels || []);
        setChartValues(data?.values || []);
      } catch (error) {
        console.error('Failed to load dashboard charts:', error);
        setChartLabels([]);
        setChartValues([]);
      }
    };
    loadCharts();
  }, [selectedTimeRange, selectedRevenue, selectedCrypto, selectedFiat]);

  const maxChartValue = Math.max(...chartValues, 1);
  const yAxisMax = Math.ceil(maxChartValue / 100) * 100 || 600;
  const yAxisSteps = [yAxisMax, Math.round(yAxisMax * 0.66), Math.round(yAxisMax * 0.33), 0];

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
        className="w-full min-w-0 h-[258px]"
        style={{
          borderRadius: '20px',
          borderWidth: '0.3px',
          borderStyle: 'solid',
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
              {yAxisSteps.map((value) => (
                <span key={value} className="text-gray-500 text-xs">{formatNumber(value)}</span>
              ))}
            </div>

            {/* Chart area with bars */}
            <div className="flex-1 flex flex-col overflow-x-auto analytics-scrollbar">
              {/* Chart area */}
              <div className="flex-1 relative" style={{ height: '140px', minHeight: '140px', minWidth: '720px' }}>
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between" style={{ minWidth: '720px' }}>
                  {yAxisSteps.map((value) => (
                    <div key={value} className="border-t border-gray-700" style={{ opacity: 0.3 }}></div>
                  ))}
                </div>

                <div className="absolute inset-0 flex items-end justify-between" style={{ padding: '0 4px', paddingBottom: '0', height: '100%', minWidth: '720px' }}>
                  {(chartLabels.length ? chartLabels : ['No data']).map((label, index) => {
                    const value = chartValues[index] || 0;
                    const height = `${Math.max(4, (value / yAxisMax) * 100)}%`;
                    return (
                      <div key={`${label}-${index}`} className="flex items-end gap-1" style={{ width: `${100 / Math.max(chartLabels.length, 1)}%`, height: '100%' }}>
                        <div className="rounded-t rounded-b" style={{ width: '17px', height, background: 'repeating-linear-gradient(45deg, #A9EF45, #A9EF45 4px, #82BF29 4px, #82BF29 8px)' }}></div>
                        <div className="rounded-t rounded-b" style={{ width: '17px', height: `${Math.max(4, height === '4%' ? 4 : parseFloat(height) * 0.8)}%`, background: 'repeating-linear-gradient(45deg, #4880C0, #4880C0 4px, #3C70AD 4px, #3C70AD 8px)' }}></div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between mt-2" style={{ height: '20px', minWidth: '720px' }}>
                {(chartLabels.length ? chartLabels : ['-']).map((label, index) => (
                  <span key={`${label}-${index}`} className="text-gray-500 text-xs whitespace-nowrap truncate" style={{ width: `${100 / Math.max(chartLabels.length, 1)}%` }}>
                    {label.length > 10 ? label.slice(5, 10) : label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;

