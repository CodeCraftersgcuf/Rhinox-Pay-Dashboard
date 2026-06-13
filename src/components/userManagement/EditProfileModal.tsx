import React, { useState, useRef, useEffect } from "react";
import images from "../../constants/images";
import { User } from "../../services/userService";
import { updateUser } from "../../services/admin";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSuccess?: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, user, onSuccess }) => {
  const [formData, setFormData] = useState({
    country: "nigeria",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  // Pre-fill form when user data is available
  useEffect(() => {
    if (user && isOpen) {
      const nameParts = user.name.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      
      setFormData({
        country: "nigeria", // Default to Nigeria, can be extracted from user data if available
        firstName: firstName,
        lastName: lastName,
        email: user.email || "",
        phoneNumber: user.phone || "",
        password: "" // Leave password empty for edit
      });
    }
  }, [user, isOpen]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    setSubmitting(true);
    setError(null);
    try {
      const payload: Record<string, string> = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phoneNumber,
      };
      if (formData.password.trim()) {
        (payload as any).password = formData.password;
      }
      await updateUser(user.id, payload);
      onSuccess?.();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-start justify-end p-3 md:p-4"
      style={{
        backgroundColor: "rgba(12, 29, 51, 0.7)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
      }}
    >
      <div
        ref={modalRef}
        className="h-[calc(100vh-24px)] w-full max-w-[390px] overflow-hidden rounded-2xl border border-[#132635] bg-[#020B16] shadow-2xl md:h-[calc(100vh-32px)]"
        style={{
          boxShadow: "-4px 0 20px rgba(0, 0, 0, 0.3)"
        }}
      >
        <div className="flex h-full flex-col">
        {/* Header */}
        <div
          className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] px-4"
          style={{
            height: "54px"
          }}
        >
          <h2
            className="text-white"
            style={{
              fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: "14px",
              fontWeight: 400,
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
        <form onSubmit={handleSubmit} className="hide-scrollbar flex-1 overflow-y-auto p-4">
          {/* Avatar Section */}
          <div className="flex justify-center mb-5">
            <div className="relative">
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: "96px",
                  height: "96px",
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
                  width: "20px",
                  height: "20px",
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
                    width: "14px",
                    height: "14px"
                  }}
                />
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-3.5">
            {/* Country */}
            <div>
              <label
                className="block text-white mb-2"
                style={{
                  fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "12px",
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
                    height: "38px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#0F1825",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "11px",
                    fontWeight: 400,
                    outline: "none",
                    cursor: "pointer",
                    color: selectedCountry ? "#FFFFFF" : "#878C92",
                    textAlign: "left"
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    {selectedCountry ? (
                      <>
                        <img
                          src={selectedCountry.flag}
                          alt={selectedCountry.name}
                          style={{ width: "18px", height: "14px", objectFit: "cover", borderRadius: "2px" }}
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
                      height: "280px",
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
                          fontSize: "11px",
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
                            width: "18px",
                            height: "14px",
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
                  fontSize: "12px",
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
                  height: "38px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#0F1825",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "11px",
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
                  fontSize: "12px",
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
                  height: "38px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#0F1825",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "11px",
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
                  fontSize: "12px",
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
                  height: "38px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#0F1825",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "11px",
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
                  fontSize: "12px",
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
                  height: "38px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#0F1825",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "11px",
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
                  fontSize: "12px",
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
                    height: "38px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#0F1825",
                    paddingLeft: "16px",
                    paddingRight: "48px",
                    fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "11px",
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
                    width="16"
                    height="16"
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
          {error && <p className="text-sm text-red-400 mb-2">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="text-black flex items-center justify-center mt-4 disabled:opacity-50"
            style={{
              width: "93px",
              height: "34px",
              borderRadius: "100px",
              backgroundColor: "#A9EF45",
              fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              border: "none",
              cursor: "pointer"
            }}
          >
            Add User
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;

