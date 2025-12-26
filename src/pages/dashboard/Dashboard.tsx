import React, { useState } from "react";
import images from "../../constants/images";
import Analytics from "../../components/dashboard/Analytics";
import Wallets from "../../components/dashboard/Wallets";
import LatestUsers from "../../components/dashboard/LatestUsers";

const Dashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("All Time");

  const timeRanges = ["All Time", "7 Days", "1 month", "1 Year", "Custom"];

  // Mock data based on time range
  const dashboardData: Record<string, {
    totalUsers: string;
    totalTransactions: string;
    totalRevenue: string;
    fiatRevenue: string;
    cryptoRevenue: string;
    userGrowth: string;
  }> = {
    "All Time": {
      totalUsers: "50,000",
      totalTransactions: "350",
      totalRevenue: "$30,050",
      fiatRevenue: "$30,000",
      cryptoRevenue: "$30,000",
      userGrowth: "+50K"
    },
    "7 Days": {
      totalUsers: "12,500",
      totalTransactions: "87",
      totalRevenue: "$7,512",
      fiatRevenue: "$7,500",
      cryptoRevenue: "$7,500",
      userGrowth: "+12K"
    },
    "1 month": {
      totalUsers: "35,000",
      totalTransactions: "245",
      totalRevenue: "$21,035",
      fiatRevenue: "$21,000",
      cryptoRevenue: "$21,000",
      userGrowth: "+35K"
    },
    "1 Year": {
      totalUsers: "150,000",
      totalTransactions: "1,050",
      totalRevenue: "$90,150",
      fiatRevenue: "$90,000",
      cryptoRevenue: "$90,000",
      userGrowth: "+150K"
    },
    "Custom": {
      totalUsers: "25,000",
      totalTransactions: "175",
      totalRevenue: "$15,025",
      fiatRevenue: "$15,000",
      cryptoRevenue: "$15,000",
      userGrowth: "+25K"
    }
  };

  const currentData = dashboardData[selectedTimeRange] || dashboardData["All Time"];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <h1
            style={{
              fontFamily: 'Agbalumo',
              fontWeight: 400,
              fontSize: '35px',
              lineHeight: '100%',
              letterSpacing: '0%'
            }}
            className="text-white mb-2"
          >
            Dashboard
          </h1>
          <p className="text-gray-400 text-base mt-[20px] md:text-lg">View your dashboard details</p>
        </div>
        <div className="flex flex-col mt-4 md:mt-0">
          <div className="flex gap-[10px] mb-[15px] flex-wrap md:flex-nowrap">
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => setSelectedTimeRange(range)}
                style={{
                  minWidth: '68px',
                  height: '34px',
                  borderRadius: '100px',
                  borderWidth: selectedTimeRange === range ? '0px' : '0.3px',
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
                }}
                className={`transition-colors whitespace-nowrap ${selectedTimeRange === range
                  ? "bg-white text-gray-900"
                  : "bg-transparent text-white border-gray-500 hover:border-gray-400"
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

      {/* Cards Section */}
      <div style={{ backgroundColor: '#0B1820' }} className="rounded-lg p-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Users Card */}
          <div className="rounded-lg overflow-hidden">
            {/* First Section */}
            <div
              className="p-6"
              style={{ background: 'linear-gradient(119.08deg, #4880C0 0%, #1B589E 96.9%)' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                    style={{ backgroundColor: '#4887CF' }}
                  >
                    <img src={images.UsersThree} alt="Users" className="w-6 h-6" />
                  </div>
                  <p className="text-white text-sm mb-1">Total Users</p>
                  <h2 className="text-white text-3xl font-bold pt-2 mb-0 pb-0 leading-tight">{currentData.totalUsers}</h2>
                </div>
                <div
                  className="rounded-lg p-2 mt-[50px]"
                  style={{
                    backgroundColor: '#2965A9',
                    border: '1px solid #3B71B0'

                  }}
                >
                  <div className="w-17 h-13  flex items-end gap-1">
                    <div className="w-3 bg-blue-300 h-8 rounded-full ms-1"></div>
                    <div className="w-3 bg-blue-300 h-12 rounded-full"></div>
                    <div className="w-3 bg-blue-300 h-7 rounded-full"></div>
                    <div className="w-3 bg-gray-900 h-8 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Second Section */}
            <div
              className="p-6 rounded-b-lg flex items-center"
              style={{ background: 'linear-gradient(135deg, #4D81BC 0%, #366CAA 100%)', height: '75px' }}
            >
              <div className="flex items-center">
                <img src={images.profile_image} alt="User" className="w-12 h-12 rounded-full border-2" style={{ borderColor: '#3C72AF' }} />
                <img src={images.Ellipse_67} alt="User" className="w-12 h-12 rounded-full border-2 -ml-2" style={{ borderColor: '#3C72AF' }} />
                <img src={images.Ellipse_68} alt="User" className="w-12 h-12 rounded-full border-2 -ml-2" style={{ borderColor: '#3C72AF' }} />
                <img src={images.Ellipse_69} alt="User" className="w-12 h-12 rounded-full border-2 -ml-2" style={{ borderColor: '#3C72AF' }} />
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold -ml-2"
                  style={{
                    backgroundColor: '#4887CF'
                  }}
                >
                  {currentData.userGrowth}
                </div>
              </div>
            </div>
          </div>

          {/* Total Transactions Card */}
          <div className="rounded-lg overflow-hidden">
            {/* First Section */}
            <div
              className="p-6"
              style={{ background: 'linear-gradient(119.08deg, #48C048 0%, #1B9E43 96.9%)' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                    style={{ backgroundColor: '#42CD57' }}
                  >
                    <img src={images.Vector2} alt="Transactions" className="w-6 h-6" />
                  </div>
                  <p className="text-white text-sm mb-1">Total Transactions</p>
                  <h2 className="text-white text-3xl font-bold pt-2 mb-0 pb-0 leading-tight">{currentData.totalTransactions}</h2>
                </div>
                <div
                  className="rounded-lg p-2 mt-[50px]"
                  style={{
                    backgroundColor: '#2BAA44',
                    border: '1px solid #51BB63'
                  }}
                >
                  <div className="w-17 h-13  flex items-end gap-1">
                    <div className="w-3 h-12 rounded-full ms-1" style={{ backgroundColor: '#42CD57' }}></div>
                    <div className="w-3 h-5 rounded-full" style={{ backgroundColor: '#42CD57' }}></div>
                    <div className="w-3 h-8 rounded-full" style={{ backgroundColor: '#42CD57' }}></div>
                    <div className="w-3 h-8 rounded-full" style={{ backgroundColor: 'black' }}></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Second Section */}
            <div
              className="p-6 rounded-b-lg flex items-center"
              style={{ background: 'linear-gradient(135deg, #4EBC58 0%, #35AA56 100%)', height: '75px' }}
            >
              <div className="flex items-center">
                <img src={images.profile_image} alt="User" className="w-12 h-12 rounded-full border-2" style={{ borderColor: '#42CD57' }} />
                <img src={images.Ellipse_67} alt="User" className="w-12 h-12 rounded-full border-2 -ml-2" style={{ borderColor: '#42CD57' }} />
                <img src={images.Ellipse_68} alt="User" className="w-12 h-12 rounded-full border-2 -ml-2" style={{ borderColor: '#42CD57' }} />
                <img src={images.Ellipse_69} alt="User" className="w-12 h-12 rounded-full border-2 -ml-2" style={{ borderColor: '#42CD57' }} />
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold -ml-2"
                  style={{
                    backgroundColor: '#42CD57'
                  }}
                >
                  {currentData.userGrowth}
                </div>
              </div>
            </div>
          </div>

          {/* Total Revenue Card */}
          <div className="rounded-lg overflow-hidden">
            {/* First Section */}
            <div className="bg-white p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                    style={{ backgroundColor: '#E5E5E5' }}
                  >
                    <img src={images.Vector3} alt="Revenue" className="w-6 h-6" />
                  </div>
                  <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
                  <div className="flex items-center gap-2 pt-2 mb-0 pb-0 leading-tight">
                    <h2 className="text-gray-900 text-3xl font-bold">{currentData.totalRevenue}</h2>
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      USD
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="rounded-lg p-2 mt-[50px]">
                  <div className="w-17 h-13  flex items-end gap-1">
                    <div className="w-3 h-12 rounded-full ms-1" style={{ backgroundColor: '#E5E5E5' }}></div>
                    <div className="w-3 h-5 rounded-full" style={{ backgroundColor: '#E5E5E5' }}></div>
                    <div className="w-3 h-8 rounded-full" style={{ backgroundColor: '#E5E5E5' }}></div>
                    <div className="w-3 bg-gray-900 h-8 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Second Section */}
            <div className="p-6 rounded-b-lg" style={{ height: '75px', backgroundColor: '#E5E5E5' }}>
              <div className="flex items-center h-full">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <img src={images.vector4} alt="Icon" className="w-4 h-4" />
                    <p className="text-gray-600 text-sm">Fiat Revenue</p>
                  </div>
                  <p className="text-gray-900 text-lg font-semibold">{currentData.fiatRevenue}</p>
                </div>
                <div className="w-[2px] h-full bg-gray-400 mx-6"></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <img src={images.vector4} alt="Icon" className="w-4 h-4" />
                    <p className="text-gray-600 text-sm">Crypto Revenue</p>
                  </div>
                  <p className="text-gray-900 text-lg font-semibold">{currentData.cryptoRevenue}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics and Wallets Section */}
      <div className="mt-8 flex gap-4 flex-wrap rounded-lg p-4" style={{ backgroundColor: '#0A1420' }}>
        <Analytics selectedTimeRange={selectedTimeRange} />
        <Wallets selectedTimeRange={selectedTimeRange} />
      </div>

      {/* Latest Users Section */}
      <LatestUsers />
    </div>
  );
};

export default Dashboard;


