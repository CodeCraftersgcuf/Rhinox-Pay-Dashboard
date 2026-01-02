import React, { useState } from "react";
import UserMetricCards from "../../components/userManagement/UserMetricCards";
import UserManagementTopBar from "../../components/userManagement/UserManagementTopBar";
import UserManagementTable from "../../components/userManagement/UserManagementTable";
import AddNewUserModal from "../../components/userManagement/AddNewUserModal";

const UserManagement: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("All Time");
  const [searchQuery, setSearchQuery] = useState("");
  const [kycFilter, setKycFilter] = useState<string>("All");
  const [showKycDropdown, setShowKycDropdown] = useState(false);
  const [showBulkActionDropdown, setShowBulkActionDropdown] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const timeRanges = ["All Time", "7 Days", "1 month", "1 Year", "Custom"];

  // Mock data based on time range
  const userData: Record<string, {
    totalUsers: string;
    newUsers: string;
    activeUsers: string;
  }> = {
    "All Time": {
      totalUsers: "50,000",
      newUsers: "200",
      activeUsers: "120"
    },
    "7 Days": {
      totalUsers: "12,500",
      newUsers: "50",
      activeUsers: "30"
    },
    "1 month": {
      totalUsers: "35,000",
      newUsers: "140",
      activeUsers: "85"
    },
    "1 Year": {
      totalUsers: "150,000",
      newUsers: "600",
      activeUsers: "360"
    },
    "Custom": {
      totalUsers: "25,000",
      newUsers: "100",
      activeUsers: "60"
    }
  };

  const currentData = userData[selectedTimeRange] || userData["All Time"];

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
              User Management
            </h1>
            <p className="mt-[20px]" style={{
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#757E81'
            }}>View manage user details</p>
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
                    fontWeight: 274,
                    fontStyle: 'normal',
                    fontSize: '13px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
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

        {/* Cards Section */}
        <UserMetricCards
          totalUsers={currentData.totalUsers}
          newUsers={currentData.newUsers}
          activeUsers={currentData.activeUsers}
        />
      </div>

      {/* Top Bar Section - Buttons */}
      <UserManagementTopBar
        kycFilter={kycFilter}
        setKycFilter={setKycFilter}
        showKycDropdown={showKycDropdown}
        setShowKycDropdown={setShowKycDropdown}
        showBulkActionDropdown={showBulkActionDropdown}
        setShowBulkActionDropdown={setShowBulkActionDropdown}
        onAddUserClick={() => setShowAddUserModal(true)}
      />

      {/* Latest Users Table Section */}
      <UserManagementTable
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        kycFilter={kycFilter}
      />

      {/* Add New User Modal */}
      <AddNewUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
      />
    </div>
  );
};

export default UserManagement;
