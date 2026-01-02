import React, { useState, useRef, useEffect } from "react";
import images from "../../constants/images";

interface AddNewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewUserModal: React.FC<AddNewUserModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    country: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  const countries = [
    { value: "nigeria", name: "Nigeria", code: "NGN", flag: images.flag },
    { value: "botswana", name: "Botswana", code: "BWP", flag: images.flag2 },
    { value: "ghana", name: "Ghana", code: "GHC", flag: images.flag3 },
    { value: "kenya", name: "Kenya", code: "KES", flag: images.flag4 },
    { value: "south-africa", name: "South Africa", code: "ZAR", flag: images.flag5 },
    { value: "tanzania", name: "Tanzania", code: "TZS", flag: images.flag6 },
    { value: "uganda", name: "Uganda", code: "UGX", flag: images.flag7 }
  ];

  const selectedCountry = countries.find(c => c.value === formData.country);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
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
            Add New User
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
          {/* Avatar Section */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: "120px",
                  height: "120px",
                  backgroundColor: "#2762A7",
                  overflow: "hidden"
                }}
              >
                <img
                  src={images.avater1}
                  alt="Avatar"
                  className="rounded-full object-cover"
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                />
              </div>
              {/* Edit Icon */}
              <div
                className="absolute rounded-full flex items-center justify-center"
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#D9D9D9",
                  bottom: "0",
                  right: "0",
                  cursor: "pointer"
                }}
              >
                <img
                  src={images.edit_icon}
                  alt="Edit"
                  style={{
                    width: "30px",
                    height: "30px"
                  }}
                />
              </div>
            </div>
          </div>

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
                First name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
                className="w-full text-white"
                style={{
                  height: "48px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
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
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
                className="w-full text-white"
                style={{
                  height: "48px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  outline: "none"
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-white mb-2"
                style={{
                  fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400
                }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className="w-full text-white"
                style={{
                  height: "48px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  outline: "none"
                }}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                className="block text-white mb-2"
                style={{
                  fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400
                }}
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="w-full text-white"
                style={{
                  height: "48px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  outline: "none"
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-white mb-2"
                style={{
                  fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "14px",
                  fontWeight: 400
                }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  className="w-full text-white"
                  style={{
                    height: "48px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#0F1825",
                    paddingLeft: "16px",
                    paddingRight: "48px",
                    fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "14px",
                    fontWeight: 400,
                    outline: "none"
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {showPassword ? (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </>
                    ) : (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </>
                    )}
                  </svg>
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
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewUserModal;

