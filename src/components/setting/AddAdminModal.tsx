import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Pencil, X } from "lucide-react";
import images from "../../constants/images";
import { createStaff } from "../../services/admin";
import { mapCountryCode } from "../../utils/adminFormatters";

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const inputClass =
  "h-10 w-full rounded-lg border border-transparent bg-[#0F1825] px-4 text-sm text-white outline-none placeholder:text-[#878C92] focus:border-[#2A3D4D]";

const AddAdminModal: React.FC<AddAdminModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const countryDropdownRef = useRef<HTMLDivElement | null>(null);
  const roleDropdownRef = useRef<HTMLDivElement | null>(null);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    role: "",
    email: "",
    password: "",
  });
  const countries = ["Nigeria", "Ghana", "Kenya", "South Africa", "Uganda"];
  const roles = ["Super Admin", "Admin", "Agent", "Support"];

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
        return;
      }

      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false);
      }

      if (
        roleDropdownRef.current &&
        !roleDropdownRef.current.contains(event.target as Node)
      ) {
        setShowRoleDropdown(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[101] flex items-start justify-end p-3 md:p-4"
      style={{
        backgroundColor: "#0C1D33CC",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
      role="dialog"
      aria-modal="true"
    >
      <style>
        {`
          .add-admin-modal-panel {
            scrollbar-width: none;
          }
          .add-admin-modal-panel::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <div
        ref={panelRef}
        className="add-admin-modal-panel h-[calc(100vh-24px)] w-full max-w-[430px] overflow-y-auto rounded-2xl border border-[#1B2A36] bg-[#020C19] shadow-2xl md:h-[calc(100vh-32px)]"
      >
        <div className="flex h-[70px] items-center justify-between border-b border-[rgba(255,255,255,0.1)] px-4">
          <h2 className="text-white text-sm font-medium">Add New Admin</h2>
          <button
            onClick={onClose}
            className="rounded-full border border-[#4C5560] p-0.5 text-[#AAB5BE] transition-colors hover:text-white"
            aria-label="Close modal"
          >
            <X size={14} />
          </button>
        </div>

        <form
          className="space-y-3 p-4"
          onSubmit={async (event) => {
            event.preventDefault();
            setSaving(true);
            setError("");
            try {
              const nameParts = formData.name.trim().split(/\s+/);
              const firstName = nameParts[0] || "";
              const lastName = nameParts.slice(1).join(" ") || firstName;
              await createStaff({
                email: formData.email,
                password: formData.password,
                firstName,
                lastName,
                role: formData.role,
                country: mapCountryCode(formData.country),
              });
              setFormData({
                name: "",
                country: "",
                role: "",
                email: "",
                password: "",
              });
              onSuccess?.();
              onClose();
            } catch (submitError) {
              console.error("Failed to create admin:", submitError);
              setError("Failed to create admin. Please check the form and try again.");
            } finally {
              setSaving(false);
            }
          }}
        >
          <div className="mb-4 flex justify-center">
            <div className="relative">
              <div className="h-[78px] w-[78px] overflow-hidden rounded-full bg-[#2762A7]">
                <img src={images.avater1} alt="Admin avatar" className="h-full w-full object-cover" />
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#D9D9D9] text-[#0C141C]"
              >
                <Pencil size={10} />
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-white">Name</label>
            <input
              className={inputClass}
              placeholder="Input name"
              value={formData.name}
              onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white">Country</label>
            <div className="relative" ref={countryDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setShowCountryDropdown((prev) => !prev);
                  setShowRoleDropdown(false);
                }}
                className={`${inputClass} flex items-center justify-between text-left`}
              >
                <span className={formData.country ? "text-white" : "text-[#7D8792]"}>
                  {formData.country || "Select country"}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-[#9CA9B4] transition-transform ${showCountryDropdown ? "rotate-180" : ""}`}
                />
              </button>
              {showCountryDropdown && (
                <div
                  className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-[#1F2E3A]"
                  style={{
                    backgroundColor: "rgba(26, 38, 47, 0.2)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    boxShadow: "5px 5px 15px 0px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  {countries.map((country) => (
                    <button
                      key={country}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, country }));
                        setShowCountryDropdown(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-white transition-colors hover:bg-[#132232]"
                    >
                      {country}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-white">Role</label>
            <div className="relative" ref={roleDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setShowRoleDropdown((prev) => !prev);
                  setShowCountryDropdown(false);
                }}
                className={`${inputClass} flex items-center justify-between text-left`}
              >
                <span className={formData.role ? "text-white" : "text-[#7D8792]"}>
                  {formData.role || "Select role"}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-[#9CA9B4] transition-transform ${showRoleDropdown ? "rotate-180" : ""}`}
                />
              </button>
              {showRoleDropdown && (
                <div
                  className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-[#1F2E3A]"
                  style={{
                    backgroundColor: "rgba(26, 38, 47, 0.2)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    boxShadow: "5px 5px 15px 0px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  {roles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, role }));
                        setShowRoleDropdown(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-white transition-colors hover:bg-[#132232]"
                    >
                      {role}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-white">Login Email</label>
            <input
              type="email"
              className={inputClass}
              placeholder="Input email"
              value={formData.email}
              onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white">Login Password</label>
            <input
              type="password"
              className={inputClass}
              placeholder="Input password"
              value={formData.password}
              onChange={(event) => setFormData((prev) => ({ ...prev, password: event.target.value }))}
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="mt-4 flex h-[40px] w-[110px] items-center justify-center rounded-full bg-[#A9EF45] text-sm font-semibold text-[#0C141C] disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdminModal;
