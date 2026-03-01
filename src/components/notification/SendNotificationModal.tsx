import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, X } from "lucide-react";

interface SendNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const inputClass =
  "h-10 w-full rounded-lg border border-transparent bg-[#0F1825] px-4 text-xs text-white outline-none placeholder:text-[#878C92] focus:border-[#2A3D4D]";

const SendNotificationModal: React.FC<SendNotificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [country, setCountry] = useState("Select country");
  const [users, setUsers] = useState("Select Users");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showUsersDropdown, setShowUsersDropdown] = useState(false);

  const countryOptions = ["Select country", "Nigeria", "Ghana", "Kenya", "South Africa"];
  const usersOptions = ["Select Users", "All Users", "Active Users", "Inactive Users"];

  useEffect(() => {
    if (!isOpen) return;

    const handleOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", handleOutside);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[101] flex items-start justify-end"
      style={{
        backgroundColor: "#0C1D33CC",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={panelRef}
        className="m-3 h-[calc(100vh-24px)] w-full max-w-[380px] overflow-y-auto rounded-2xl border border-[#1B2A36] bg-[#020C19] shadow-2xl md:m-4 md:h-[calc(100vh-32px)]"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex h-[40px] items-center justify-between border-b border-[rgba(255,255,255,0.1)] px-4">
          <h2 className="text-white text-xs font-medium">Send Notification</h2>
          <button
            onClick={onClose}
            className="rounded-full border border-[#4C5560] p-0.5 text-[#AAB5BE] transition-colors hover:text-white"
            aria-label="Close modal"
          >
            <X size={12} />
          </button>
        </div>

        <form
          className="space-y-3 p-4"
          onSubmit={(event) => {
            event.preventDefault();
            onClose();
          }}
        >
          <div>
            <label className="mb-2 block text-xs text-white">Country</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowCountryDropdown((prev) => !prev);
                  setShowUsersDropdown(false);
                }}
                className={`${inputClass} flex items-center justify-between text-left`}
              >
                <span className={country === "Select country" ? "text-[#7D8792]" : "text-white"}>
                  {country}
                </span>
                <ChevronDown
                  size={12}
                  className={showCountryDropdown ? "rotate-180 transition-transform" : "transition-transform"}
                />
              </button>
              {showCountryDropdown && (
                <div
                  className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-[#27353B]"
                  style={{
                    backgroundColor: "rgba(26, 38, 47, 0.2)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    boxShadow: "5px 5px 15px 0px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  {countryOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setCountry(option);
                        setShowCountryDropdown(false);
                      }}
                      className="block w-full px-3 py-2 text-left text-xs text-white hover:bg-[#1B2D36]"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs text-white">Users</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowUsersDropdown((prev) => !prev);
                  setShowCountryDropdown(false);
                }}
                className={`${inputClass} flex items-center justify-between text-left`}
              >
                <span className={users === "Select Users" ? "text-[#7D8792]" : "text-white"}>
                  {users}
                </span>
                <ChevronDown
                  size={12}
                  className={showUsersDropdown ? "rotate-180 transition-transform" : "transition-transform"}
                />
              </button>
              {showUsersDropdown && (
                <div
                  className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-[#27353B]"
                  style={{
                    backgroundColor: "rgba(26, 38, 47, 0.2)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    boxShadow: "5px 5px 15px 0px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  {usersOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setUsers(option);
                        setShowUsersDropdown(false);
                      }}
                      className="block w-full px-3 py-2 text-left text-xs text-white hover:bg-[#1B2D36]"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs text-white">Subject</label>
            <input className={inputClass} placeholder="Input Subject" />
          </div>

          <div>
            <label className="mb-2 block text-xs text-white">Message</label>
            <textarea
              className="h-[88px] w-full rounded-lg border border-transparent bg-[#0F1825] px-4 py-3 text-xs text-white outline-none placeholder:text-[#878C92] focus:border-[#2A3D4D]"
              placeholder="Type Message"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs text-white">Add Attachment</label>
            <div className="h-8 w-8 rounded-md bg-[#0F1825]" />
          </div>

          <button
            type="submit"
            className="mt-4 flex h-[38px] w-[110px] items-center justify-center rounded-full bg-[#A9EF45] text-xs font-medium text-[#0C141C]"
          >
            Proceed
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default SendNotificationModal;
