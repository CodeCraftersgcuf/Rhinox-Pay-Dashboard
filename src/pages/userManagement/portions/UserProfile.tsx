import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getUsers, User } from "../../../services/userService";
import images from "../../../constants/images";

const UserProfile: React.FC = () => {
  const { username } = useParams();
  const [selectedTimeRange, setSelectedTimeRange] = useState("All Time");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showKebabMenu, setShowKebabMenu] = useState(false);
  const [showBulkActionDropdown, setShowBulkActionDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activities, setActivities] = useState<Array<{ id: string; activity: string; date: string }>>([]);
  const [selectedActivities, setSelectedActivities] = useState<Set<string>>(new Set());
  const kebabMenuRef = useRef<HTMLDivElement | null>(null);
  const bulkActionDropdownRef = useRef<HTMLDivElement | null>(null);

  const timeRanges = ["All Time", "7 Days", "1 month", "1 Year", "Custom"];

  // Load activities from JSON
  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch('/data/activitiesData.json');
        if (!response.ok) {
          throw new Error('Failed to load activities data');
        }
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error('Error loading activities from JSON:', error);
        // Fallback to empty array if JSON file not found
        setActivities([]);
      }
    };

    loadActivities();
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const users = await getUsers(false);
        const foundUser = users.find(u => u.id === username || u.name.toLowerCase().includes(username?.toLowerCase() || ""));
        setUser(foundUser || users[0]); // Fallback to first user if not found
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [username]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showBulkActionDropdown && bulkActionDropdownRef.current && !bulkActionDropdownRef.current.contains(event.target as Node)) {
        setShowBulkActionDropdown(false);
      }
      if (showKebabMenu && kebabMenuRef.current && !kebabMenuRef.current.contains(event.target as Node)) {
        setShowKebabMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showBulkActionDropdown, showKebabMenu]);

  const handleSelectAll = () => {
    if (selectedActivities.size === activities.length && activities.length > 0) {
      setSelectedActivities(new Set());
    } else {
      setSelectedActivities(new Set(activities.map(a => a.id)));
    }
  };

  const handleSelectActivity = (activityId: string) => {
    setSelectedActivities(prev => {
      const newSet = new Set(prev);
      if (newSet.has(activityId)) {
        newSet.delete(activityId);
      } else {
        newSet.add(activityId);
      }
      return newSet;
    });
  };

  if (loading || !user) {
    return (
      <div className="text-white text-center">Loading user profile...</div>
    );
  }

  // Split name into first and last name
  const nameParts = user.name.split(" ");
  const firstName = nameParts.slice(0, -1).join(" ") || nameParts[0];
  const lastName = nameParts[nameParts.length - 1] || "";

  return (
    <div>
      {/* Top Navigation Bar Container */}
      <div
        className="md:mx-[-32px] mx-[-16px] md:mt-[-32px] mt-[-16px] mb-6 md:mb-6"
        style={{
          background: 'linear-gradient(to right, #0B1B20, #0A1320)',
          width: 'calc(100% + 32px)'
        }}
      >
        {/* Top Navigation Bar */}
        <div
          className="flex gap-2 md:gap-6 border-b border-gray-700 flex-wrap md:flex-nowrap overflow-x-auto"
          style={{
            width: '100%',
            height: '50px',
            paddingLeft: '16px',
            paddingRight: '16px',
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
            User Profile
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

      {/* User Information Section with Header */}
      <div
        style={{
          background: 'linear-gradient(to right, #0B1C20, #0A1520)',
          height: '505px',
          borderRadius: '15px',
          padding: '24px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1
              style={{
                fontFamily: 'Agbalumo',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '30px',
                lineHeight: '100%',
                letterSpacing: '0%',
              }}
              className="text-white mb-2"
            >
              User Profile
            </h1>
            <p
              className="text-gray-400"
              style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '0%',
              }}
            >
              View manage user details
            </p>
          </div>
          <div
            className="flex gap-[10px] flex-wrap md:flex-nowrap"
            style={{
              borderBottomWidth: '0.3px',
              borderBottomStyle: 'solid',
              borderBottomColor: 'rgba(156, 163, 175, 0.5)',
              paddingBottom: '16px',
              display: 'inline-flex'
            }}
          >
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
        </div>

        {/* User Information Content */}
        <div className="flex flex-col lg:flex-row gap-6 flex-1">
          {/* Left Column - User Profile Card */}
          <div
            className="rounded-lg p-4 md:p-6 relative overflow-hidden w-full lg:w-[354px]"
            style={{
              background: 'linear-gradient(to right, #4880C0, #1B589E)',
              borderRadius: '15px',
              height: '362px',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            {/* Background decorative circles */}
            <div
              className="absolute"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                bottom: '-30px',
                left: '-30px',
                position: 'absolute'
              }}
            ></div>
            <div
              className="absolute"
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                bottom: '-50px',
                right: '-50px',
                position: 'absolute'
              }}
            ></div>

            <div className="flex flex-col items-center relative z-10">
              {/* Avatar */}
              <div className="relative mb-6">
                <div
                  className="rounded-full flex items-center justify-center relative"
                  style={{
                    width: '140px',
                    height: '140px',
                    backgroundColor: '#2762A7',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={images.avater1}
                    alt={user.name}
                    className="rounded-full object-cover"
                    style={{
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </div>
                {/* Flag icon overlapping bottom right */}
                <div
                  className="absolute rounded-full flex items-center justify-center"
                  style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: 'white',
                    border: '2px solid #2762A7',
                    bottom: '0',
                    right: '0',
                    zIndex: 10,
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={images.flag}
                    alt="Flag"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </div>

              {/* Name */}
              <h2
                className="text-white text-center mb-3"
                style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '20px',
                  lineHeight: '100%',
                  letterSpacing: '0%'
                }}
              >
                {user.name}
              </h2>

              {/* Phone Number */}
              <p
                className="text-center mb-8"
                style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  color: '#ACC3DD'
                }}
              >
                {user.phone}
              </p>

              {/* Status Indicator at bottom center */}
              <div
                className="flex items-center justify-center rounded-lg"
                style={{
                  width: '118px',
                  height: '27px',
                  backgroundColor: 'transparent',
                  borderWidth: '0.3px',
                  borderStyle: 'solid',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '100px',
                  paddingTop: '4px',
                  paddingRight: '8px',
                  paddingBottom: '4px',
                  paddingLeft: '8px',
                  gap: '10px',
                  boxSizing: 'border-box'
                }}
              >
                <div
                  className="rounded-full"
                  style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#FF0000'
                  }}
                ></div>
                <span
                  style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: 274,
                    fontStyle: 'normal',
                    fontSize: '16px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    color: '#FF0000',
                    textTransform: 'capitalize'
                  }}
                >
                  {user.kycStatus === "verified" ? "Verified" : "Unverified"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-4">
            {/* User Details Card */}
            <div
              className="rounded-lg"
              style={{
                backgroundColor: '#0A1520',
                borderRadius: '15px',
                height: '180px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="grid grid-cols-3" style={{ height: '100%', gridTemplateRows: '1fr 1fr' }}>
                {/* Row 1 - Column 1 */}
                <div
                  style={{
                    padding: '16px',
                    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <p
                    className="text-gray-400 mb-1"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '12px',
                      fontWeight: 274,
                      paddingTop: '4px'
                    }}
                  >
                    Country:
                  </p>
                  <p
                    className="text-white"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400
                    }}
                  >
                    Nigeria
                  </p>
                </div>
                {/* Row 1 - Column 2 */}
                <div
                  style={{
                    padding: '16px',
                    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <p
                    className="text-gray-400 mb-1"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '12px',
                      fontWeight: 274,
                      paddingTop: '4px'
                    }}
                  >
                    First Name:
                  </p>
                  <p
                    className="text-white"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400
                    }}
                  >
                    {firstName}
                  </p>
                </div>
                {/* Row 1 - Column 3 */}
                <div
                  style={{
                    padding: '16px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <p
                    className="text-gray-400 mb-1"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '12px',
                      fontWeight: 274,
                      paddingTop: '4px'
                    }}
                  >
                    Last Name:
                  </p>
                  <p
                    className="text-white"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400
                    }}
                  >
                    {lastName}
                  </p>
                </div>
                {/* Row 2 - Column 1 */}
                <div
                  style={{
                    padding: '16px',
                    borderRight: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <p
                    className="text-gray-400 mb-1"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '12px',
                      fontWeight: 274,
                      paddingTop: '4px'
                    }}
                  >
                    Email:
                  </p>
                  <p
                    className="text-white"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400
                    }}
                  >
                    {user.email}
                  </p>
                </div>
                {/* Row 2 - Column 2 */}
                <div
                  style={{
                    padding: '16px',
                    borderRight: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <p
                    className="text-gray-400 mb-1"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '12px',
                      fontWeight: 274,
                      paddingTop: '4px'
                    }}
                  >
                    Phone Number:
                  </p>
                  <p
                    className="text-white"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400
                    }}
                  >
                    {user.phone}
                  </p>
                </div>
                {/* Row 2 - Column 3 */}
                <div
                  style={{
                    padding: '16px'
                  }}
                >
                  <p
                    className="text-gray-400 mb-1"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '12px',
                      fontWeight: 274
                    }}
                  >
                    Last Login:
                  </p>
                  <p
                    className="text-white"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400
                    }}
                  >
                    Today
                  </p>
                </div>
              </div>
            </div>

            {/* Registration Cards */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* General Registration Card (Left) */}
              <div
                className="rounded-lg p-4 relative"
                style={{
                  backgroundColor: '#121B27',
                  width: '354px',
                  height: '162px',
                  borderRadius: '20px',
                  borderWidth: '0.31px',
                  borderStyle: 'solid',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  boxSizing: 'border-box'
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3
                    className="text-white"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontWeight: 510,
                      fontSize: '16px'
                    }}
                  >
                    General Registration
                  </h3>
                  <button
                    className="text-black"
                    style={{
                      width: '80px',
                      height: '28px',
                      borderRadius: '100px',
                      backgroundColor: '#A9EF45',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '11px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '6px 8px'
                    }}
                  >
                    Edit Profile
                  </button>
                </div>
                <button
                  className="flex items-center gap-2"
                  style={{
                    borderRadius: '100px',
                    border: '1px solid #065E0E',
                    backgroundColor: '#102623',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '8px',
                    marginTop: '-6px'
                  }}
                >
                  <div
                    className="rounded-full flex items-center justify-center"
                    style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: '#065E0E'
                    }}
                  >
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.33333 2.5L3.75 7.08333L1.66667 5"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '12px',
                      fontWeight: 400,
                      color: '#065E0E'
                    }}
                  >
                    Completed
                  </span>
                </button>
                <div
                  className="w-full mb-2"
                  style={{
                    backgroundColor: '#2B363E',
                    height: '18.8px',
                    borderRadius: '4px',
                    display: 'flex',
                    gap: '2px',
                    padding: '1px',
                    alignItems: 'center'
                  }}
                >
                  {Array.from({ length: 50 }).map((_, index) => (
                    <div
                      key={index}
                      style={{
                        flex: 1,
                        height: '100%',
                        backgroundColor: '#A9EF45',
                        borderRadius: '2px',
                        minWidth: '2px',
                        marginTop: '2px'
                      }}
                    ></div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="rounded-full flex items-center justify-center"
                    style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: '#008000'
                    }}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.33333 2.5L3.75 7.08333L1.66667 5"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span
                    className="text-gray-300"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '12px',
                      fontWeight: 400
                    }}
                  >
                    Primary registration completed
                  </span>
                  <div ref={kebabMenuRef} style={{ position: 'relative', marginLeft: 'auto' }}>
                    <button
                      onClick={() => setShowKebabMenu(!showKebabMenu)}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: '#19232E',
                        borderRadius: '8px',
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        border: 'none'
                      }}
                    >
                      <svg className="w-5 h-5" fill="white" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    {showKebabMenu && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '40px',
                          right: '0',
                          backgroundColor: '#040F1B',
                          borderRadius: '10px',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          padding: '0',
                          width: '135px',
                          height: '36px',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                          zIndex: 1000,
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <button
                          onClick={() => {
                            setShowKebabMenu(false);
                            // Handle block user action
                          }}
                          style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '0 16px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '14px',
                            fontWeight: 400
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 1L1 14H15L8 1Z"
                              stroke="white"
                              strokeWidth="1.5"
                              fill="none"
                            />
                            <path
                              d="M8 6V9M8 11H8.01"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                          <span>Block User</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* KYC Registration Card (Right) */}
              <div
                className="rounded-lg p-4 relative"
                style={{
                  backgroundColor: '#121B27',
                  width: '354px',
                  height: '162px',
                  borderRadius: '20px',
                  borderWidth: '0.31px',
                  borderStyle: 'solid',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  boxSizing: 'border-box'
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3
                    className="text-white"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontWeight: 510,
                      fontSize: '16px'
                    }}
                  >
                    General Registration
                  </h3>
                  <button
                    className="text-black"
                    style={{
                      width: '80px',
                      height: '28px',
                      borderRadius: '100px',
                      backgroundColor: '#A9EF45',
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '11px',
                      fontWeight: 400,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '6px 8px'
                    }}
                  >
                    KYC Profile
                  </button>
                </div>
                <div className="flex items-center gap-2 mb-2" style={{ marginTop: '-8px' }}>
                  <div
                    style={{
                      borderRadius: '100px',
                      border: '1px solid #FFA500',
                      backgroundColor: '#292A23',
                      padding: '4px 10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <img
                      src={images.vector5}
                      alt="pending"
                      style={{
                        width: '10px',
                        height: '10px'
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '12px',
                        fontWeight: 400,
                        color: '#FFA500'
                      }}
                    >
                      Pending
                    </span>
                  </div>
                </div>
                <div
                  className="w-full mb-4"
                  style={{
                    backgroundColor: '#1A1F2E',
                    height: '18.8px',
                    borderRadius: '4px',
                    display: 'flex',
                    gap: '2px',
                    padding: '1px',
                    alignItems: 'center',
                    overflow: 'hidden'
                  }}
                >
                  {Array.from({ length: 50 }).map((_, index) => (
                    <div
                      key={index}
                      style={{
                        flex: 1,
                        height: '100%',
                        backgroundColor: '#1E3A5F',
                        borderRadius: '2px',
                        marginTop: '2px',
                        minWidth: '2px'
                      }}
                    ></div>
                  ))}
                </div>
                <div className="space-y-0" style={{ marginTop: '-5px' }}>
                  <div className="flex items-center gap-2">
                    <div
                      className="rounded-full flex items-center justify-center"
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: 'transparent'
                      }}
                    >
                      <img
                        src={images.SpinnerGap}
                        alt="spinner"
                        style={{
                          width: '16px',
                          height: '16px'
                        }}
                      />
                    </div>
                    <span
                      className="text-white"
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontWeight: 274,
                        fontStyle: 'normal',
                        fontSize: '10px',
                        lineHeight: '100%',
                        letterSpacing: '0%'
                      }}
                    >
                      KYC Details
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="rounded-full flex items-center justify-center"
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: 'transparent'
                      }}
                    >
                      <img
                        src={images.SpinnerGap}
                        alt="spinner"
                        style={{
                          width: '16px',
                          height: '16px'
                        }}
                      />
                    </div>
                    <span
                      className="text-white"
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontWeight: 274,
                        fontStyle: 'normal',
                        fontSize: '10px',
                        lineHeight: '100%',
                        letterSpacing: '0%'
                      }}
                    >
                      Selfie Registration
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Action Button */}
      <div className="mb-4" style={{ marginTop: '20px' }}>
        <div className="relative inline-block" ref={bulkActionDropdownRef}>
          <button
            onClick={() => setShowBulkActionDropdown(!showBulkActionDropdown)}
            className="text-white flex items-center justify-center"
            style={{
              width: '97px',
              height: '35px',
              borderRadius: '100px',
              borderWidth: '0.3px',
              borderStyle: 'solid',
              borderColor: '#27353B',
              backgroundColor: '#101F26',
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '12px',
              fontWeight: 400,
              fontStyle: 'normal',
              lineHeight: '100%',
              letterSpacing: '0%',
              cursor: 'pointer',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
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
                onClick={() => setShowBulkActionDropdown(false)}
                className="w-full text-left text-sm text-white hover:bg-[#2B363E] transition-colors px-4"
                style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                Export as PDF
              </button>
              <button
                onClick={() => setShowBulkActionDropdown(false)}
                className="w-full text-left text-sm text-white hover:bg-[#2B363E] transition-colors px-4"
                style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                Export as CSV
              </button>
            </div>
          )}
        </div>
      </div>

      {/* User Activity Section - Following UserManagementTable pattern */}
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
            User Activity
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
                        checked={selectedActivities.size === activities.length && activities.length > 0}
                        onChange={handleSelectAll}
                        className="rounded appearance-none cursor-pointer"
                        style={{
                          width: '16px',
                          height: '16px',
                          backgroundColor: selectedActivities.size === activities.length && activities.length > 0 ? '#A9EF45' : 'transparent',
                          borderColor: 'white',
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          outline: 'none',
                          margin: 0,
                          padding: 0
                        }}
                      />
                      {selectedActivities.size === activities.length && activities.length > 0 && (
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
                {activities.map((activity) => (
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

    </div>
  );
};

export default UserProfile;
