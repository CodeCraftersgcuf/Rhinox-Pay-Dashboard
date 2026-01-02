import React, { useRef, useEffect } from "react";
import images from "../../constants/images";

interface UserManagementTopBarProps {
  kycFilter: string;
  setKycFilter: (filter: string) => void;
  showKycDropdown: boolean;
  setShowKycDropdown: (show: boolean) => void;
  showBulkActionDropdown: boolean;
  setShowBulkActionDropdown: (show: boolean) => void;
  onAddUserClick: () => void;
}

const UserManagementTopBar: React.FC<UserManagementTopBarProps> = ({
  kycFilter,
  setKycFilter,
  showKycDropdown,
  setShowKycDropdown,
  showBulkActionDropdown,
  setShowBulkActionDropdown,
  onAddUserClick
}) => {
  const kycDropdownRef = useRef<HTMLDivElement | null>(null);
  const bulkActionDropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
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
  }, [showKycDropdown, setShowKycDropdown, showBulkActionDropdown, setShowBulkActionDropdown]);

  return (
    <div className="mt-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        {/* Left Side - Bulk Action and KYC Status */}
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
                    // Handle Export as PDF action
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
                    // Handle Export as CSV action
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
                  height: '135px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(26, 38, 47, 0.2)',
                  boxShadow: '5px 5px 15px 0px rgba(0, 0, 0, 0.25)',
                  backdropFilter: 'blur(4px)'
                }}
              >
                <button
                  onClick={() => { setKycFilter("All"); setShowKycDropdown(false); }}
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
                  All
                </button>
                <button
                  onClick={() => { setKycFilter("Verified"); setShowKycDropdown(false); }}
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
                  Verified
                </button>
                <button
                  onClick={() => { setKycFilter("Unverified"); setShowKycDropdown(false); }}
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
                  Unverified
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Right Side - Add New User Button */}
        <button
          onClick={onAddUserClick}
          className="text-black flex items-center gap-2"
          style={{
            height: '42px',
            borderRadius: '100px',
            paddingTop: '11px',
            paddingRight: '22px',
            paddingBottom: '11px',
            paddingLeft: '22px',
            backgroundColor: '#A9EF45',
            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <img src={images.pluscircle} alt="Add" className="w-4 h-4" />
          Add New User
        </button>
      </div>
    </div>
  );
};

export default UserManagementTopBar;

