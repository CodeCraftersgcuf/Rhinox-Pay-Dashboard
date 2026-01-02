import React, { useState, useRef, useEffect } from "react";
import images from "../../constants/images";

interface KYCDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const KYCDetailsModal: React.FC<KYCDetailsModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    country: "",
    firstName: "",
    lastName: "",
    middleName: "",
    dateOfBirth: "",
    idType: "",
    idNumber: "",
    changeStatus: ""
  });
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showIdTypeDropdown, setShowIdTypeDropdown] = useState(false);
  const [showChangeStatusDropdown, setShowChangeStatusDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showIdNumberDropdown, setShowIdNumberDropdown] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const idTypeDropdownRef = useRef<HTMLDivElement>(null);
  const changeStatusDropdownRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const idNumberDropdownRef = useRef<HTMLDivElement>(null);

  const countries = [
    { value: "nigeria", name: "Nigeria", code: "NGN", flag: images.flag },
    { value: "botswana", name: "Botswana", code: "BWP", flag: images.flag2 },
    { value: "ghana", name: "Ghana", code: "GHC", flag: images.flag3 },
    { value: "kenya", name: "Kenya", code: "KES", flag: images.flag4 },
    { value: "south-africa", name: "South Africa", code: "ZAR", flag: images.flag5 },
    { value: "tanzania", name: "Tanzania", code: "TZS", flag: images.flag6 },
    { value: "uganda", name: "Uganda", code: "UGX", flag: images.flag7 }
  ];

  const idTypes = [
    { value: "passport", name: "Passport" },
    { value: "national-id", name: "National ID" },
    { value: "drivers-license", name: "Driver's License" },
    { value: "voters-card", name: "Voter's Card" }
  ];

  const changeStatuses = [
    { value: "pending", name: "Pending" },
    { value: "approved", name: "Approved" },
    { value: "rejected", name: "Rejected" },
    { value: "under-review", name: "Under Review" }
  ];

  const selectedCountry = countries.find(c => c.value === formData.country);
  const selectedIdType = idTypes.find(t => t.value === formData.idType);
  const selectedChangeStatus = changeStatuses.find(s => s.value === formData.changeStatus);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
      if (idTypeDropdownRef.current && !idTypeDropdownRef.current.contains(event.target as Node)) {
        setShowIdTypeDropdown(false);
      }
      if (changeStatusDropdownRef.current && !changeStatusDropdownRef.current.contains(event.target as Node)) {
        setShowChangeStatusDropdown(false);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
      if (idNumberDropdownRef.current && !idNumberDropdownRef.current.contains(event.target as Node)) {
        setShowIdNumberDropdown(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCountrySelect = (countryValue: string) => {
    setFormData(prev => ({
      ...prev,
      country: countryValue
    }));
    setShowCountryDropdown(false);
  };

  const handleIdTypeSelect = (idTypeValue: string) => {
    setFormData(prev => ({
      ...prev,
      idType: idTypeValue
    }));
    setShowIdTypeDropdown(false);
  };

  const handleChangeStatusSelect = (statusValue: string) => {
    setFormData(prev => ({
      ...prev,
      changeStatus: statusValue
    }));
    setShowChangeStatusDropdown(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("KYC Details submitted:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-start justify-end"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        zIndex: 101
      }}
    >
      <div
        ref={modalRef}
        className="h-full overflow-y-auto flex flex-col"
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#020C19",
          boxShadow: "-4px 0 20px rgba(0, 0, 0, 0.3)"
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6"
          style={{
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            height: "70px"
          }}
        >
          <h2
            className="text-white"
            style={{
              fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "100%",
              letterSpacing: "0%"
            }}
          >
            KYC Details
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
            style={{
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "none",
              background: "transparent"
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <style>
          {`
            input::placeholder,
            input::-webkit-input-placeholder,
            input::-moz-placeholder,
            input:-ms-input-placeholder {
              color: #878C92 !important;
            }
          `}
        </style>
        <form onSubmit={handleSubmit} className="p-6 flex-1">
          {/* Form Fields */}
          <div className="space-y-4">
            {/* Country */}
            <div>
              <label
                className="block text-white mb-2"
                style={{
                  fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400
                }}
              >
                Country
              </label>
              <div className="relative" ref={countryDropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="w-full flex items-center justify-between"
                  style={{
                    height: "48px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#0F1825",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "14px",
                    fontWeight: 400,
                    outline: "none",
                    cursor: "pointer",
                    color: selectedCountry ? "#FFFFFF" : "#878C92",
                    textAlign: "left"
                  }}
                >
                  <div className="flex items-center gap-3">
                    {selectedCountry ? (
                      <>
                        <img
                          src={selectedCountry.flag}
                          alt={selectedCountry.name}
                          style={{
                            width: "24px",
                            height: "18px",
                            objectFit: "cover",
                            borderRadius: "2px"
                          }}
                        />
                        <span>
                          {selectedCountry.name} ({selectedCountry.code})
                        </span>
                      </>
                    ) : (
                      <span>Select country</span>
                    )}
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: showCountryDropdown ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                      color: "white"
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                {showCountryDropdown && (
                  <div
                    className="absolute z-50 mt-1 overflow-hidden"
                    style={{
                      width: "100%",
                      height: "350px",
                      backgroundColor: "#020C19",
                      borderRadius: "20px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                      overflowY: "auto",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      paddingTop: "16px",
                      paddingBottom: "16px"
                    }}
                  >
                    {countries.map((country) => (
                      <button
                        key={country.value}
                        type="button"
                        onClick={() => handleCountrySelect(country.value)}
                        className="flex items-center gap-3 transition-colors"
                        style={{
                          fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                          fontSize: "14px",
                          fontWeight: 400,
                          color: "#FFFFFF",
                          textAlign: "left",
                          backgroundColor: formData.country === country.value ? "rgba(255, 255, 255, 0.1)" : "transparent",
                          paddingTop: "12px",
                          paddingLeft: "16px",
                          paddingBottom: "12px",
                          paddingRight: "16px",
                          marginLeft: "12px",
                          marginRight: "12px",
                          borderRadius: "11.81px",
                          border: "none",
                          cursor: "pointer",
                          width: "calc(100% - 24px)"
                        }}
                        onMouseEnter={(e) => {
                          if (formData.country !== country.value) {
                            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (formData.country !== country.value) {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }
                        }}
                      >
                        <img
                          src={country.flag}
                          alt={country.name}
                          style={{
                            width: "24px",
                            height: "18px",
                            objectFit: "cover",
                            borderRadius: "2px"
                          }}
                        />
                        <span>
                          {country.name} ({country.code})
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* First Name */}
            <div>
              <label
                className="block text-white mb-2"
                style={{
                  fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400
                }}
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
                className="w-full text-white"
                style={{
                  height: "48px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#0F1825",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  outline: "none"
                }}
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                className="block text-white mb-2"
                style={{
                  fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400
                }}
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                className="w-full text-white"
                style={{
                  height: "48px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#0F1825",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  outline: "none"
                }}
              />
            </div>

            {/* Middle Name */}
            <div>
              <label
                className="block text-white mb-2"
                style={{
                  fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400
                }}
              >
                Middle Name
              </label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                placeholder="Enter your middle name"
                className="w-full text-white"
                style={{
                  height: "48px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#0F1825",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  outline: "none"
                }}
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label
                className="block text-white mb-2"
                style={{
                  fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400
                }}
              >
                Date of birth
              </label>
              <div className="relative" ref={datePickerRef}>
                <input
                  type="text"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  placeholder="Enter date of birth"
                  className="w-full text-white"
                  style={{
                    height: "48px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#0F1825",
                    paddingLeft: "16px",
                    paddingRight: "40px",
                    fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "14px",
                    fontWeight: 400,
                    outline: "none"
                  }}
                />
                <input
                  type="date"
                  ref={dateInputRef}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      dateOfBirth: e.target.value
                    }));
                  }}
                  style={{
                    position: "absolute",
                    right: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "16px",
                    height: "16px",
                    opacity: 0,
                    cursor: "pointer",
                    zIndex: 10,
                    pointerEvents: "auto"
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (dateInputRef.current) {
                      if (dateInputRef.current.showPicker) {
                        dateInputRef.current.showPicker();
                      } else {
                        dateInputRef.current.click();
                      }
                    }
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  style={{
                    color: "white",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "auto",
                    zIndex: 5
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>
            </div>

            {/* ID Type */}
            <div>
              <label
                className="block text-white mb-2"
                style={{
                  fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400
                }}
              >
                ID Type
              </label>
              <div className="relative" ref={idTypeDropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowIdTypeDropdown(!showIdTypeDropdown)}
                  className="w-full flex items-center justify-between"
                  style={{
                    height: "48px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#0F1825",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "14px",
                    fontWeight: 400,
                    outline: "none",
                    cursor: "pointer",
                    color: selectedIdType ? "#FFFFFF" : "#878C92",
                    textAlign: "left"
                  }}
                >
                  <span>{selectedIdType ? selectedIdType.name : "Select ID Type"}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: showIdTypeDropdown ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                      color: "white"
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                {showIdTypeDropdown && (
                  <div
                    className="absolute z-50 mt-1 overflow-hidden"
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      backgroundColor: "#020C19",
                      borderRadius: "20px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                      overflowY: "auto"
                    }}
                  >
                    {idTypes.map((idType) => (
                      <button
                        key={idType.value}
                        type="button"
                        onClick={() => handleIdTypeSelect(idType.value)}
                        className="w-full flex items-center transition-colors"
                        style={{
                          fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                          fontSize: "14px",
                          fontWeight: 400,
                          color: "#FFFFFF",
                          textAlign: "left",
                          backgroundColor: formData.idType === idType.value ? "rgba(255, 255, 255, 0.1)" : "transparent",
                          paddingTop: "12px",
                          paddingLeft: "16px",
                          paddingBottom: "12px",
                          paddingRight: "16px",
                          border: "none",
                          cursor: "pointer"
                        }}
                        onMouseEnter={(e) => {
                          if (formData.idType !== idType.value) {
                            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (formData.idType !== idType.value) {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }
                        }}
                      >
                        {idType.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ID Number */}
            <div>
              <label
                className="block text-white mb-2"
                style={{
                  fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400
                }}
              >
                ID Number
              </label>
              <div className="relative" ref={idNumberDropdownRef}>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  placeholder="Input id number"
                  className="w-full text-white"
                  style={{
                    height: "48px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#0F1825",
                    paddingLeft: "16px",
                    paddingRight: "40px",
                    fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "14px",
                    fontWeight: 400,
                    outline: "none"
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowIdNumberDropdown(!showIdNumberDropdown)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  style={{
                    color: "white",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "auto"
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: showIdNumberDropdown ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s"
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                {showIdNumberDropdown && (
                  <div
                    className="absolute z-50 mt-1 overflow-hidden"
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      backgroundColor: "#020C19",
                      borderRadius: "20px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                      overflowY: "auto",
                      top: "100%",
                      marginTop: "4px"
                    }}
                  >
                    <div
                      className="p-3 text-white"
                      style={{
                        fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "12px",
                        fontWeight: 400,
                        color: "#878C92"
                      }}
                    >
                      Enter your ID number as shown on your identification document
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Change Status */}
            <div>
              <label
                className="block text-white mb-2"
                style={{
                  fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400
                }}
              >
                Change Status
              </label>
              <div className="relative" ref={changeStatusDropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowChangeStatusDropdown(!showChangeStatusDropdown)}
                  className="w-full flex items-center justify-between"
                  style={{
                    height: "48px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#0F1825",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "14px",
                    fontWeight: 400,
                    outline: "none",
                    cursor: "pointer",
                    color: selectedChangeStatus ? "#FFFFFF" : "#878C92",
                    textAlign: "left"
                  }}
                >
                  <span>{selectedChangeStatus ? selectedChangeStatus.name : "Change status"}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: showChangeStatusDropdown ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                      color: "white"
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                {showChangeStatusDropdown && (
                  <div
                    className="absolute z-50 mt-1 overflow-hidden"
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      backgroundColor: "#020C19",
                      borderRadius: "20px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                      overflowY: "auto"
                    }}
                  >
                    {changeStatuses.map((status) => (
                      <button
                        key={status.value}
                        type="button"
                        onClick={() => handleChangeStatusSelect(status.value)}
                        className="w-full flex items-center transition-colors"
                        style={{
                          fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                          fontSize: "14px",
                          fontWeight: 400,
                          color: "#FFFFFF",
                          textAlign: "left",
                          backgroundColor: formData.changeStatus === status.value ? "rgba(255, 255, 255, 0.1)" : "transparent",
                          paddingTop: "12px",
                          paddingLeft: "16px",
                          paddingBottom: "12px",
                          paddingRight: "16px",
                          border: "none",
                          cursor: "pointer"
                        }}
                        onMouseEnter={(e) => {
                          if (formData.changeStatus !== status.value) {
                            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (formData.changeStatus !== status.value) {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }
                        }}
                      >
                        {status.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Selfie Image Section */}
            <div>
              <label
                className="block text-white mb-2"
                style={{
                  fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400
                }}
              >
                Selfie Image
              </label>
              <div
                className="flex flex-col items-center"
                style={{
                  backgroundColor: "#0F1825",
                  borderRadius: "8px",
                  padding: "24px",
                  minHeight: "200px",
                  justifyContent: "center"
                }}
              >
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: "120px",
                    height: "120px",
                    marginBottom: "16px",
                    backgroundColor: "#2762A7",
                    overflow: "hidden"
                  }}
                >
                  <img
                    src={images.avater1}
                    alt="Selfie"
                    className="rounded-full object-cover"
                    style={{
                      width: "100%",
                      height: "100%"
                    }}
                  />
                </div>
                <button
                  type="button"
                  className="text-white"
                  style={{
                    fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#A9EF45",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "none"
                  }}
                >
                  Change
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="text-black flex items-center justify-center mt-8"
            style={{
              width: "174px",
              height: "60px",
              borderRadius: "100px",
              backgroundColor: "#A9EF45",
              fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              border: "none",
              cursor: "pointer"
            }}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default KYCDetailsModal;

