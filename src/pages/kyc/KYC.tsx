import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import images from "../../constants/images";
import { getUsers, User } from "../../services/userService";
import KYCDetailsModal from "../../components/userManagement/KYCDetailsModal";

const KYC: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("All Time");
  const [searchQuery, setSearchQuery] = useState("");
  const [kycFilter, setKycFilter] = useState<string>("All");
  const [showKycDropdown, setShowKycDropdown] = useState(false);
  const [showBulkActionDropdown, setShowBulkActionDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [usersData, setUsersData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showKYCDetailsModal, setShowKYCDetailsModal] = useState(false);
  const [selectedUserForKYC, setSelectedUserForKYC] = useState<User | null>(null);
  const kycDropdownRef = useRef<HTMLDivElement | null>(null);
  const bulkActionDropdownRef = useRef<HTMLDivElement | null>(null);

  const timeRanges = ["All Time", "7 Days", "1 Month", "1 Year", "Custom"];

  // Mock data based on time range
  const kycData: Record<string, {
    totalUsers: string;
    completedKYC: string;
    uncompletedKYC: string;
  }> = {
    "All Time": {
      totalUsers: "50,000",
      completedKYC: "200",
      uncompletedKYC: "120"
    },
    "7 Days": {
      totalUsers: "12,500",
      completedKYC: "50",
      uncompletedKYC: "30"
    },
    "1 Month": {
      totalUsers: "35,000",
      completedKYC: "140",
      uncompletedKYC: "85"
    },
    "1 Year": {
      totalUsers: "150,000",
      completedKYC: "600",
      uncompletedKYC: "360"
    },
    "Custom": {
      totalUsers: "25,000",
      completedKYC: "100",
      uncompletedKYC: "60"
    }
  };

  const currentData = kycData[selectedTimeRange] || kycData["All Time"];

  // Load users data
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const users = await getUsers(false);
        setUsersData(users);
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
      if (showKycDropdown && kycDropdownRef.current && !kycDropdownRef.current.contains(event.target as Node)) {
        setShowKycDropdown(false);
      }
      if (showBulkActionDropdown && bulkActionDropdownRef.current && !bulkActionDropdownRef.current.contains(event.target as Node)) {
        setShowBulkActionDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showKycDropdown, showBulkActionDropdown]);

  const itemsPerPage = 5;
  const totalUsers = 200;

  // Filter users based on search query and KYC status
  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    
    let matchesKyc = true;
    if (kycFilter !== "All") {
      switch (kycFilter.toLowerCase()) {
        case 'approved':
          matchesKyc = user.kycStatus === 'verified';
          break;
        case 'pending':
          matchesKyc = user.kycStatus === 'unverified';
          break;
        case 'rejected':
          matchesKyc = user.kycStatus === 'rejected';
          break;
        default:
          matchesKyc = user.kycStatus === kycFilter.toLowerCase();
      }
    }
    return matchesSearch && matchesKyc;
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

  const getKYCStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'verified':
      case 'approved':
        return '#008000'; // Green
      case 'pending':
        return '#FFA500'; // Orange
      case 'unverified':
        return '#FFA500'; // Orange
      case 'rejected':
        return '#FF0000'; // Red
      default:
        return '#808080'; // Gray
    }
  };

  const getKYCStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'verified':
        return 'KYC Verified';
      case 'approved':
        return 'KYC Approved';
      case 'pending':
        return 'KYC Pending';
      case 'unverified':
        return 'KYC Details';
      default:
        return 'KYC Details';
    }
  };

  const getKYCButtonStyle = (status: string) => {
    const isVerified = status.toLowerCase() === 'verified' || status.toLowerCase() === 'approved';
    return {
      width: '97px',
      height: '35px',
      borderRadius: '100px',
      backgroundColor: isVerified ? '#008000' : '#A9EF45',
      color: isVerified ? '#FFFFFF' : '#000000',
      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
      fontSize: '12px',
      fontWeight: 400,
      cursor: 'pointer',
      border: 'none'
    };
  };

  const handleKYCDetailsClick = (user: User) => {
    setSelectedUserForKYC(user);
    setShowKYCDetailsModal(true);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-white text-center">Loading KYC data...</div>
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
              User KYC Management
            </h1>
            <p className="mt-[20px]" style={{
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#757E81'
            }}>View and manage user kyc details</p>
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
            {/* Total Users Card */}
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
                  <img src={images.UsersThree} alt="Users" className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white mb-1" style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '10px',
                    fontWeight: 274,
                    fontStyle: 'normal',
                    lineHeight: '100%',
                    letterSpacing: '0%'
                  }}>Total Users</p>
                  <h2 className="text-white" style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: 510,
                    fontStyle: 'normal',
                    fontSize: '30px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    paddingTop: '4px'
                  }}>{currentData.totalUsers}</h2>
                </div>
              </div>
            </div>

            {/* Completed KYC Card */}
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
                  <img src={images.UsersThree} alt="Users" className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white mb-1" style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '10px',
                    fontWeight: 274,
                    fontStyle: 'normal',
                    lineHeight: '100%',
                    letterSpacing: '0%'
                  }}>Completed KYC</p>
                  <h2 className="text-white" style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: 510,
                    fontStyle: 'normal',
                    fontSize: '30px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    paddingTop: '4px'
                  }}>{currentData.completedKYC}</h2>
                </div>
              </div>
            </div>

            {/* Uncompleted KYC Card */}
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
                  <img src={images.UsersThree} alt="Users" className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white mb-1" style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '10px',
                    fontWeight: 274,
                    fontStyle: 'normal',
                    lineHeight: '100%',
                    letterSpacing: '0%'
                  }}>Uncompleted KYC</p>
                  <h2 className="text-white" style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: 510,
                    fontStyle: 'normal',
                    fontSize: '30px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    paddingTop: '4px'
                  }}>{currentData.uncompletedKYC}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div className="flex gap-3 flex-wrap">
            <div className="relative" ref={bulkActionDropdownRef}>
              <button
                onClick={() => setShowBulkActionDropdown(!showBulkActionDropdown)}
                className="text-white flex items-center justify-center"
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
                  fontStyle: 'normal',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  cursor: 'pointer'
                }}
              >
                Bulk Action
              </button>
              {showBulkActionDropdown && (
                <div
                  className="absolute top-full left-0 mt-2 rounded-lg overflow-hidden z-50"
                  style={{
                    width: '135px',
                    height: '80px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(26, 38, 47, 0.2)',
                    boxShadow: '5px 5px 15px 0px rgba(0, 0, 0, 0.25)',
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  <button
                    onClick={() => {
                      setShowBulkActionDropdown(false);
                    }}
                    className="w-full text-left text-sm text-white hover:bg-[#2B363E] transition-colors px-4"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      height: '45px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    Export as PDF
                  </button>
                  <button
                    onClick={() => {
                      setShowBulkActionDropdown(false);
                    }}
                    className="w-full text-left text-sm text-white hover:bg-[#2B363E] transition-colors px-4"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      height: '45px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    Export as CSV
                  </button>
                </div>
              )}
            </div>
            <div className="relative" ref={kycDropdownRef}>
              <button
                onClick={() => setShowKycDropdown(!showKycDropdown)}
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
                  fontStyle: 'normal',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  cursor: 'pointer'
                }}
              >
                KYC Status
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showKycDropdown && (
                <div
                  className="absolute top-full left-0 mt-2 rounded-lg overflow-hidden z-50"
                  style={{
                    width: '135px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(26, 38, 47, 0.2)',
                    boxShadow: '5px 5px 15px 0px rgba(0, 0, 0, 0.25)',
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  <button
                    onClick={() => { setKycFilter("All"); setCurrentPage(1); setShowKycDropdown(false); }}
                    className="w-full text-left hover:bg-[#2B363E] transition-colors px-4"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      height: '45px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#FFFFFF',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'left'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L4 6V11C4 16.55 7.16 21.74 12 23C16.84 21.74 20 16.55 20 11V6L12 2Z" fill="#808080"/>
                      <path d="M9 12L11 14L15 10" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ color: '#FFFFFF' }}>All</span>
                  </button>
                  <button
                    onClick={() => { setKycFilter("Pending"); setCurrentPage(1); setShowKycDropdown(false); }}
                    className="w-full text-left hover:bg-[#2B363E] transition-colors px-4"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      height: '45px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#FFFFFF',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'left'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L4 6V11C4 16.55 7.16 21.74 12 23C16.84 21.74 20 16.55 20 11V6L12 2Z" fill="#FFA500"/>
                      <path d="M9 12L11 14L15 10" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ color: '#FFA500' }}>Pending</span>
                  </button>
                  <button
                    onClick={() => { setKycFilter("Approved"); setCurrentPage(1); setShowKycDropdown(false); }}
                    className="w-full text-left hover:bg-[#2B363E] transition-colors px-4"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      height: '45px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#FFFFFF',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'left'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L4 6V11C4 16.55 7.16 21.74 12 23C16.84 21.74 20 16.55 20 11V6L12 2Z" fill="#008000"/>
                      <path d="M9 12L11 14L15 10" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ color: '#008000' }}>Approved</span>
                  </button>
                  <button
                    onClick={() => { setKycFilter("Rejected"); setCurrentPage(1); setShowKycDropdown(false); }}
                    className="w-full text-left hover:bg-[#2B363E] transition-colors px-4"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      height: '45px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#FFFFFF',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'left'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L4 6V11C4 16.55 7.16 21.74 12 23C16.84 21.74 20 16.55 20 11V6L12 2Z" fill="#FF0000"/>
                      <path d="M9 12L11 14L15 10" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ color: '#FF0000' }}>Rejected</span>
                  </button>
                </div>
              )}
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
            Users KYC Details
          </h2>
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
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-white outline-none flex-1 placeholder-[#878B90]"
                style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={{ width: '100%' }}>
          {/* Table Header */}
          <div style={{ backgroundColor: '#1C2530', width: '100%' }}>
            <table className="w-full" style={{ height: '60px', width: '100%', tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '50px' }} />
                <col style={{ width: '200px' }} />
                <col style={{ width: '250px' }} />
                <col style={{ width: '150px' }} />
                <col style={{ width: '150px' }} />
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
                          className="absolute pointer-events-none mt-1"
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
                    User Name
                  </th>
                  <th
                    className="text-left py-3 text-white"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '12px',
                      fontWeight: 400,
                      verticalAlign: 'middle',
                      backgroundColor: '#1C2530',
                      paddingLeft: '24px',
                      paddingRight: '24px'
                    }}
                  >
                    Email
                  </th>
                  <th
                    className="text-left py-3 text-white"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '12px',
                      fontWeight: 400,
                      verticalAlign: 'middle',
                      backgroundColor: '#1C2530',
                      paddingLeft: '24px',
                      paddingRight: '24px'
                    }}
                  >
                    Phone No
                  </th>
                  <th
                    className="text-left py-3 text-white"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '12px',
                      fontWeight: 400,
                      verticalAlign: 'middle',
                      backgroundColor: '#1C2530',
                      paddingLeft: '24px',
                      paddingRight: '24px'
                    }}
                  >
                    Wallet Balance
                  </th>
                  <th
                    className="text-left py-3 text-white"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '12px',
                      fontWeight: 400,
                      verticalAlign: 'middle',
                      backgroundColor: '#1C2530',
                      paddingLeft: '24px',
                      paddingRight: '24px'
                    }}
                  >
                    KYC Status
                  </th>
                  <th
                    className="text-left py-3 text-white"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '12px',
                      fontWeight: 400,
                      verticalAlign: 'middle',
                      backgroundColor: '#1C2530',
                      paddingLeft: '24px',
                      paddingRight: '24px'
                    }}
                  >
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
                <col style={{ width: '250px' }} />
                <col style={{ width: '150px' }} />
                <col style={{ width: '150px' }} />
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
                              className="absolute pointer-events-none mt-1"
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
                            className="rounded-full object-cover"
                            style={{
                              width: '40px',
                              height: '40px',
                              backgroundColor: '#A9EF45'
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
                          className="text-gray-300"
                          style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontWeight: 274,
                            fontStyle: 'normal',
                            fontSize: '12px',
                            lineHeight: '100%',
                            letterSpacing: '0%'
                          }}
                        >
                          {user.email || 'N/A'}
                        </span>
                      </td>
                      <td className="py-3" style={{ paddingLeft: '24px', paddingRight: '24px', verticalAlign: 'middle' }}>
                        <span
                          className="text-gray-300"
                          style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontWeight: 274,
                            fontStyle: 'normal',
                            fontSize: '12px',
                            lineHeight: '100%',
                            letterSpacing: '0%'
                          }}
                        >
                          {user.phone || 'N/A'}
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
                          {user.walletBalance || 'N0'}
                        </span>
                      </td>
                      <td className="py-3" style={{ paddingLeft: '24px', paddingRight: '24px', verticalAlign: 'middle' }}>
                        <div className="rounded-full" style={{
                          width: '17px',
                          height: '17px',
                          backgroundColor: getKYCStatusColor(user.kycStatus)
                        }}></div>
                      </td>
                      <td className="py-3" style={{ paddingLeft: '24px', paddingRight: '24px', verticalAlign: 'middle' }}>
                        <button
                          onClick={() => handleKYCDetailsClick(user)}
                          className="text-xs font-medium"
                          style={getKYCButtonStyle(user.kycStatus)}
                        >
                          {getKYCStatusText(user.kycStatus)}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-400" style={{ paddingLeft: '24px' }}>
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
            Showing {startIndex + 1}-{Math.min(endIndex, totalUsers)} of {totalUsers} Users
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
                backgroundColor: currentPage === 1 ? '#1C2530' : '#1C2530',
                border: 'none',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {(() => {
              const pages: (number | string)[] = [];
              
              if (totalPages <= 11) {
                // Show all pages if 11 or fewer
                for (let i = 1; i <= totalPages; i++) {
                  pages.push(i);
                }
              } else {
                // Always show first page
                pages.push(1);
                
                if (currentPage <= 5) {
                  // Near the beginning: show 1, 2, 3, 4, 5, 6, 7, ..., last
                  for (let i = 2; i <= 7; i++) {
                    pages.push(i);
                  }
                  pages.push('...');
                  pages.push(totalPages);
                } else if (currentPage >= totalPages - 4) {
                  // Near the end: show 1, ..., last-6, last-5, last-4, last-3, last-2, last-1, last
                  pages.push('...');
                  for (let i = totalPages - 6; i <= totalPages; i++) {
                    pages.push(i);
                  }
                } else {
                  // In the middle: show 1, ..., current-2, current-1, current, current+1, current+2, ..., last
                  pages.push('...');
                  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pages.push(i);
                  }
                  pages.push('...');
                  pages.push(totalPages);
                }
              }
              
              return pages.map((page, index) => (
                <button
                  key={`${page}-${index}`}
                  onClick={() => typeof page === 'number' && setCurrentPage(page)}
                  disabled={page === '...'}
                  className="text-white disabled:cursor-default"
                  style={{
                    minWidth: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: page === currentPage ? '#1C2630' : 'transparent',
                    color: '#FFFFFF',
                    border: 'none',
                    cursor: page === '...' ? 'default' : 'pointer',
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400
                  }}
                >
                  {page}
                </button>
              ));
            })()}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="text-white disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#1C2530',
                border: 'none',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* KYC Details Modal */}
      {showKYCDetailsModal && (
        <KYCDetailsModal
          isOpen={showKYCDetailsModal}
          onClose={() => {
            setShowKYCDetailsModal(false);
            setSelectedUserForKYC(null);
          }}
        />
      )}
    </div>
  );
};

export default KYC;
