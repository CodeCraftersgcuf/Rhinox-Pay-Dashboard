import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import images from "../../constants/images";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  walletBalance: string;
  kycStatus: "verified" | "unverified";
}

const LatestUsers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [dropdownPositions, setDropdownPositions] = useState<Record<string, { top: number; right: number }>>({});

  // Mock JSON data
  const usersData: User[] = [
    {
      id: "1",
      name: "Qamardeen Malik",
      email: "qamardeenoladimeji@gmail.com",
      phone: "07033484845",
      walletBalance: "N25,000",
      kycStatus: "verified"
    },
    {
      id: "2",
      name: "Tunde Ajayi",
      email: "tunde.ajayi@sample.com",
      phone: "08123456789",
      walletBalance: "N30,000",
      kycStatus: "verified"
    },
    {
      id: "3",
      name: "Qamardeen Malik",
      email: "qamardeenoladimeji@gmail.com",
      phone: "07033484845",
      walletBalance: "N25,000",
      kycStatus: "unverified"
    },
    {
      id: "4",
      name: "Chinonso Okeke",
      email: "chinonso.okeke@mail.com",
      phone: "09098765432",
      walletBalance: "N20,000",
      kycStatus: "unverified"
    },
    {
      id: "5",
      name: "Amina Yusuf",
      email: "amina.yusuf@example.com",
      phone: "08012345678",
      walletBalance: "N15,000",
      kycStatus: "verified"
    }
  ];

  const itemsPerPage = 5;
  const totalUsers = 200;

  // Filter users based on search query
  const filteredUsers = usersData.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery)
  );

  // Calculate pagination
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = filteredUsers.slice(0, itemsPerPage);

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
    if (selectedUsers.size === displayedUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(displayedUsers.map(u => u.id)));
    }
  };

  // Calculate dropdown position
  const calculateDropdownPosition = (userId: string) => {
    const button = buttonRefs.current[userId];
    if (button) {
      const rect = button.getBoundingClientRect();
      setDropdownPositions(prev => ({
        ...prev,
        [userId]: {
          top: rect.bottom + 4,
          right: window.innerWidth - rect.right
        }
      }));
    }
  };

  // Handle dropdown toggle
  const handleDropdownToggle = (userId: string) => {
    if (openDropdown === userId) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(userId);
      calculateDropdownPosition(userId);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        const dropdown = dropdownRefs.current[openDropdown];
        const button = buttonRefs.current[openDropdown];
        if (dropdown && !dropdown.contains(event.target as Node) && button && !button.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  // Update dropdown position on scroll/resize
  useEffect(() => {
    const recalculatePosition = () => {
      if (openDropdown) {
        calculateDropdownPosition(openDropdown);
      }
    };

    window.addEventListener("scroll", recalculatePosition, true);
    window.addEventListener("resize", recalculatePosition);
    return () => {
      window.removeEventListener("scroll", recalculatePosition, true);
      window.removeEventListener("resize", recalculatePosition);
    };
  }, [openDropdown]);

  return (
    <div
      className="mt-8 rounded-lg w-full"
      style={{
        backgroundColor: '#0B1820',
        borderRadius: '20px'
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
          Latest Users
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
      <div style={{ width: '100%' }}>
        {/* Table Header */}
        <div style={{ backgroundColor: '#1C2530', width: '100%' }}>
          <table className="w-full" style={{ height: '60px', width: '100%', tableLayout: 'auto' }}>
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
                    paddingLeft: '65px',
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
                    paddingLeft: '130px',
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
                    paddingRight: '34px'
                  }}
                >
                  Kyc Status
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
                <th
                  className="text-left py-3 text-white"
                  style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '12px',
                    fontWeight: 400,
                    verticalAlign: 'middle',
                    backgroundColor: '#1C2530',
                    paddingLeft: '64px',
                  }}
                >
                  Other
                </th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Table Body */}
        <div style={{ backgroundColor: '#0F1825', width: '100%' }}>
          <table className="w-full" style={{ width: '100%', tableLayout: 'auto' }}>
            <tbody>
              {displayedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-[#2B363E] hover:bg-[#1A252F] transition-colors"
                  style={{ width: '100%', display: 'table-row' }}
                >
                  <td className="py-3" style={{ paddingLeft: '24px', paddingRight: '12px' }}>
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
                  <td className="py-3" style={{ paddingLeft: '0px', paddingRight: '24px' }}>
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
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
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
                      {user.email}
                    </span>
                  </td>
                  <td className="py-3" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
                    <span
                      className="text-gray-300"
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontWeight: 274,
                        fontStyle: 'normal',
                        fontSize: '12px',
                        lineHeight: '100%',
                        paddingRight: '60px',
                        letterSpacing: '0%'
                      }}
                    >
                      {user.phone}
                    </span>
                  </td>
                  <td className="py-3" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
                    <span
                      className="text-white"
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontWeight: 274,
                        fontStyle: 'normal',
                        fontSize: '12px',
                        lineHeight: '100%',
                        paddingRight: '44px',
                        letterSpacing: '0%'
                      }}
                    >
                      {user.walletBalance}
                    </span>
                  </td>
                  <td className="py-3" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
                    <div className="rounded-full" style={{
                      width: '17px',
                      height: '17px',
                      backgroundColor: user.kycStatus === "verified" ? "#008000" : "#FF0000"
                    }}></div>
                  </td>
                  <td className="py-3" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
                    <div className="flex items-center gap-2">
                      <button
                        className="text-xs font-medium"
                        style={{
                          width: '97px',
                          height: '35px',
                          borderRadius: '100px',
                          backgroundColor: "#A9EF45",
                          color: 'black',
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
                        }}
                      >
                        User Details
                      </button>
                      <button
                        className="text-white text-xs font-medium"
                        style={{
                          width: '97px',
                          height: '35px',
                          borderRadius: '100px',
                          backgroundColor: "#000000",
                          color: 'white',
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
                        }}
                      >
                        Transactions
                      </button>
                    </div>
                  </td>
                  <td className="py-3" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
                    <div className="relative">
                      <button
                        ref={(el) => { buttonRefs.current[user.id] = el; }}
                        onClick={() => handleDropdownToggle(user.id)}
                        className="text-gray-400 hover:text-white p-1"
                        style={{ paddingRight: '' }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>

                      {/* Dropdown Menu - Rendered via Portal */}
                      {openDropdown === user.id && createPortal(
                        <div
                          ref={(el) => { dropdownRefs.current[user.id] = el; }}
                          className="fixed bg-[#1A262F] shadow-xl overflow-hidden"
                          style={{
                            top: `${dropdownPositions[user.id]?.top || 0}px`,
                            right: `${dropdownPositions[user.id]?.right || 0}px`,
                            zIndex: 9999,
                            width: '135px',
                            borderRadius: '10px',
                            padding: '0px'
                          }}
                        >
                          <button
                            onClick={() => {
                              setOpenDropdown(null);
                              // Handle block user action
                            }}
                            className="w-full text-left text-sm text-white hover:bg-[#2B363E] transition-colors flex items-center gap-3"
                            style={{
                              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '14px',
                              fontWeight: 400,
                              backgroundColor: '#07121D',
                              width: '135px',
                              height: '36px',
                              borderRadius: '10px',
                              paddingLeft: '16px',
                              paddingRight: '16px'
                            }}
                          >
                            <svg
                              className="w-4 h-4 flex-shrink-0"
                              style={{ color: '#FFFFFF' }}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span>Block User</span>
                          </button>
                        </div>,
                        document.body
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Section */}
      <div
        className="flex flex-col md:flex-row justify-between items-center p-6 pt-4 gap-4 border-t border-[#2B363E]"
        style={{
          backgroundColor: '#0F1825',
          borderBottomLeftRadius: '20px',
          borderBottomRightRadius: '20px'
        }}
      >
        <div
          className="text-white"
          style={{
            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: '#FFFFFF'
          }}
        >
          Showing {startIndex + 1}-{Math.min(endIndex, totalUsers)} of {totalUsers} Users
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-md text-white hover:text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            style={{
              backgroundColor: '#1A252F',
              color: '#FFFFFF',
              width: '32px',
              height: '32px'
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {(() => {
            const pages: (number | 'ellipsis')[] = [];

            if (totalPages <= 7) {
              // Show all pages if 7 or fewer
              for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
              }
            } else {
              // Always show first page
              pages.push(1);

              if (currentPage <= 3) {
                // Show 1, 2, 3, ..., last-1, last
                for (let i = 2; i <= 3; i++) {
                  pages.push(i);
                }
                pages.push('ellipsis');
                pages.push(totalPages - 1);
                pages.push(totalPages);
              } else if (currentPage >= totalPages - 2) {
                // Show 1, 2, ..., last-2, last-1, last
                pages.push(2);
                pages.push('ellipsis');
                for (let i = totalPages - 2; i <= totalPages; i++) {
                  pages.push(i);
                }
              } else {
                // Show 1, 2, ..., current-1, current, current+1, ..., last-1, last
                pages.push(2);
                pages.push('ellipsis');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('ellipsis');
                pages.push(totalPages - 1);
                pages.push(totalPages);
              }
            }

            return pages.map((page, index) => {
              if (page === 'ellipsis') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="text-gray-400"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px'
                    }}
                  >
                    ...
                  </span>
                );
              }

              return (
                currentPage === page ? (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className="px-3 py-1 rounded-md text-sm text-white flex items-center justify-center"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontWeight: 400,
                      backgroundColor: '#1A252F',
                      color: '#FFFFFF',
                      minWidth: '32px',
                      height: '32px'
                    }}
                  >
                    {page}
                  </button>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className="text-white hover:text-white cursor-pointer"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#FFFFFF',
                      padding: '4px 8px'
                    }}
                  >
                    {page}
                  </button>
                )
              );
            });
          })()}
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md text-white hover:text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            style={{
              backgroundColor: '#1A252F',
              color: '#FFFFFF',
              width: '32px',
              height: '32px'
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LatestUsers;

