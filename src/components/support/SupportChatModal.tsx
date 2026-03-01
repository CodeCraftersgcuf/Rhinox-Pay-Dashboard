import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Hourglass, Paperclip, Send, X } from "lucide-react";
import images from "../../constants/images";

interface SupportChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

const SupportChatModal: React.FC<SupportChatModalProps> = ({
  isOpen,
  onClose,
  username,
}) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const winnerDropdownRef = useRef<HTMLDivElement | null>(null);
  const winnerConfirmRef = useRef<HTMLDivElement | null>(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  const [showWinnerDropdown, setShowWinnerDropdown] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState("Choose Winner");
  const [showWinnerConfirm, setShowWinnerConfirm] = useState(false);
  const [pendingWinner, setPendingWinner] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const handleOutside = (event: MouseEvent) => {
      if (
        winnerConfirmRef.current &&
        winnerConfirmRef.current.contains(event.target as Node)
      ) {
        return;
      }

      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
        return;
      }

      if (
        winnerDropdownRef.current &&
        !winnerDropdownRef.current.contains(event.target as Node)
      ) {
        setShowWinnerDropdown(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", handleOutside);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setIsJoined(false);
      setIsPending(false);
      setIsResolved(false);
      setShowWinnerDropdown(false);
      setSelectedWinner("Choose Winner");
      setShowWinnerConfirm(false);
      setPendingWinner("");
      setMessage("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[110] flex items-start justify-end"
      style={{
        backgroundColor: "#0C1D33CC",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Support chat panel"
    >
      <div
        ref={panelRef}
        className="m-3 h-[calc(100vh-24px)] w-full max-w-[420px] overflow-hidden rounded-2xl border border-[#132635] bg-[#030F1D] shadow-2xl md:m-4 md:h-[calc(100vh-32px)]"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-[54px] items-center justify-between border-b border-[rgba(255,255,255,0.08)] px-4">
            <h2 className="text-sm font-medium text-white">Chat</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (isResolved) {
                    setIsResolved(false);
                    setIsJoined(false);
                    setIsPending(false);
                    setSelectedWinner("Choose Winner");
                    return;
                  }
                  setIsJoined(true);
                  setIsPending(true);
                }}
                className={`h-[28px] rounded-full px-4 text-[9px] font-medium ${
                  isJoined ? "bg-[#8AD635] text-[#0C141C]" : "bg-[#A9EF45] text-[#0C141C]"
                }`}
              >
                {isResolved ? "Reset" : isJoined ? "Joined" : "Join Chat"}
              </button>
              {isResolved ? (
                <div className="flex h-[28px] items-center gap-1 rounded-full border border-[#184F2C] bg-[#0B2818] px-3 text-[9px] text-[#61D077]">
                  Chat Resolved
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#61D077]" />
                </div>
              ) : (
                <button
                  onClick={() => setIsPending((prev) => !prev)}
                  className={`flex h-[28px] items-center gap-1 rounded-full border px-3 text-[9px] ${
                    isPending || isJoined
                      ? "border-[#6E5624] bg-transparent text-[#F3B233]"
                      : "border-[#1E3244] bg-transparent text-[#D2D8DF]"
                  }`}
                >
                  {isPending || isJoined ? "Chat Pending" : "Mark as pending"}
                  <Hourglass
                    size={9}
                    className={isPending || isJoined ? "text-[#F3B233]" : "text-[#D2D8DF]"}
                  />
                </button>
              )}
              <div className="relative" ref={winnerDropdownRef}>
                <button
                  onClick={() => setShowWinnerDropdown((prev) => !prev)}
                  className={`flex h-[28px] items-center gap-1 rounded-full px-3 text-[9px] ${
                    selectedWinner === "Choose Winner"
                      ? "border border-[#1E3244] bg-transparent text-[#D2D8DF]"
                      : "border border-[#9AA3AE] bg-[#9AA3AE] text-[#1D2430]"
                  }`}
                >
                  {selectedWinner}
                  <ChevronDown
                    size={10}
                    className={
                      selectedWinner === "Choose Winner"
                        ? "text-[#D2D8DF]"
                        : "text-[#1D2430]"
                    }
                  />
                </button>
                {showWinnerDropdown && (
                  <div className="absolute right-0 top-[34px] z-[30] w-[220px] overflow-hidden rounded-xl border border-[#1D2E3B] bg-[#081629] shadow-[0_12px_30px_rgba(0,0,0,0.45)]">
                    {[
                      "Buyer - Qamrdeen Malik",
                      "Vendor - Lawla Afeez",
                    ].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setPendingWinner(option);
                          setShowWinnerConfirm(true);
                          setShowWinnerDropdown(false);
                        }}
                        className="block w-full px-4 py-3 text-left text-[11px] text-[#E4EBF3] hover:bg-[#0D2238]"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={onClose}
                className="rounded-full border border-[#4C5560] p-0.5 text-[#AAB5BE] transition-colors hover:text-white"
                aria-label="Close chat panel"
              >
                <X size={12} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4" style={{ scrollbarWidth: "none" }}>
            <div className="rounded-xl bg-[#111E2D] px-3 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <img
                  src={images.Ellipse_68}
                  alt={username}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs text-white">{username}</p>
                  <p className="text-[9px] text-[#B1BECA]">
                    <span>Sell USDT </span>
                    <span style={{ color: "#8CC73F" }}>Awaiting Payment</span>
                  </p>
                </div>
              </div>
              <p className="text-sm">
                <span className="text-white">N20,000</span>
                <span className="text-[#7F8A95]">(15 USDT)</span>
              </p>
            </div>

            <div className="mt-3 rounded-md bg-[#1A1418] px-3 py-2">
              <p className="flex h-[17.23px] items-center gap-2 text-[10px] leading-[17.23px] text-[#B7A9AD]">
                <span className="inline-flex h-[17.23px] w-[17.23px] items-center justify-center rounded-full bg-[#FF0000] text-[12px] font-semibold leading-none text-[#121212]">
                  !
                </span>
                Warning 1
              </p>
              <p className="mt-1 flex h-[17.23px] items-center gap-2 text-[10px] leading-[17.23px] text-[#B7A9AD]">
                <span className="inline-flex h-[17.23px] w-[17.23px] items-center justify-center rounded-full bg-[#FF0000] text-[12px] font-semibold leading-none text-[#121212]">
                  !
                </span>
                warning 2
              </p>
            </div>
          </div>

            <div className="mt-4">
              <div className="inline-block max-w-[190px] rounded-xl bg-white px-4 py-3">
                <p className="text-[12px] text-[#111827]">I have made payment</p>
              </div>
              <p className="mt-1 text-[10px] text-[#98A6B3]">Now- Buyer</p>
            </div>

            {isJoined && (
              <div className="mt-4 flex flex-col items-end">
                <div className="inline-block rounded-xl bg-[#4579BA] px-4 py-3">
                  <p className="text-[12px] text-white">Coin will be released soon</p>
                </div>
                <p className="mt-1 text-[10px] text-[#738292]">Seller - 2 min ago</p>
              </div>
            )}

            {isJoined && (
              <div className="mt-3 rounded-full bg-[#322A1C] px-3 py-1 text-center">
                <p className="text-[9px] text-[#F4B638]">This chat is under appeal</p>
              </div>
            )}

            {isJoined && (
              <div className="mt-3 flex flex-col items-end">
                <div className="inline-block rounded-xl bg-[#A9EF45] px-4 py-3">
                  <p className="text-[12px] text-[#11210C]">
                    You have 5 hours to pay the other person
                  </p>
                </div>
                <p className="mt-1 text-[10px] text-[#738292]">Rhinox Admin 2 min ago</p>
              </div>
            )}
          </div>

          {isJoined && (
            <div className="p-4 pt-0">
              <div className="flex h-[60px] items-center rounded-xl border border-[#1D3347] bg-[#071525] px-4">
                <Paperclip size={16} className="text-[#D6DEE6]" />
                <input
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Type message"
                  className="mx-3 flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-[#7F8A95]"
                />
                <button className="text-white" aria-label="Send message">
                  <Send size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {showWinnerConfirm && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center bg-[rgba(1,9,20,0.55)] backdrop-blur-[2px]">
          <div
            ref={winnerConfirmRef}
            className="w-full max-w-[300px] rounded-xl border border-[#1A2F41] bg-[#020C19] px-6 py-5 shadow-[0_18px_36px_rgba(0,0,0,0.55)]"
          >
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#F4B011]">
              <Hourglass size={18} className="text-white" />
            </div>
            <p className="mt-2 text-center text-[18px] font-semibold text-[#F4B011]">
              Warning
            </p>
            <p className="mt-2 text-center text-[11px] leading-5 text-[#E5EDF5]">
              Are you sure the {pendingWinner || "selected user"} is the winner of this dispute
            </p>
            <div className="mt-4 flex items-center justify-between text-[9px]">
              <button
                onClick={() => {
                  setSelectedWinner(pendingWinner || selectedWinner);
                  setIsResolved(true);
                  setIsJoined(true);
                  setIsPending(false);
                  setShowWinnerConfirm(false);
                }}
                className="text-[#F4B011]"
              >
                Yes, Mark as resolved
              </button>
              <button
                onClick={() => {
                  setShowWinnerConfirm(false);
                  setPendingWinner("");
                }}
                className="text-[#8FA2B6]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};

export default SupportChatModal;
