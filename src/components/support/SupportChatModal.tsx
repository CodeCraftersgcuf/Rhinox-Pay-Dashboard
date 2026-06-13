import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Hourglass, Paperclip, Send, X } from "lucide-react";
import images from "../../constants/images";
import {
  assignSupportChat,
  fetchSupportChat,
  resolveP2PAppeal,
  sendSupportMessage,
  updateSupportChatStatus,
} from "../../services/admin";
import { formatDateTime } from "../../utils/adminFormatters";

interface SupportChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  chatId?: string | number;
  orderId?: string | number;
  mode?: "support" | "appeal";
  onUpdated?: () => void;
}

interface ChatMessage {
  id: number | string;
  message: string;
  isFromSupport: boolean;
  createdAt: string;
  imageUrl?: string | null;
}

const SupportChatModal: React.FC<SupportChatModalProps> = ({
  isOpen,
  onClose,
  username,
  chatId,
  orderId,
  mode = "support",
  onUpdated,
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
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatStatus, setChatStatus] = useState("");
  const [chatCategory, setChatCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [buyerName, setBuyerName] = useState("");
  const [vendorName, setVendorName] = useState("");

  const loadChat = useCallback(async () => {
    if (!chatId || mode !== "support") return;
    setLoading(true);
    try {
      const chat = await fetchSupportChat(chatId);
      setMessages(
        (chat?.messages || []).map((msg: any) => ({
          id: msg.id,
          message: msg.message,
          isFromSupport: Boolean(msg.isFromSupport),
          createdAt: msg.createdAt,
          imageUrl: msg.imageUrl,
        }))
      );
      setChatStatus(chat?.status || "");
      setChatCategory(chat?.reason || chat?.category || "");
      setIsJoined(Boolean(chat?.assignedTo));
      setIsPending(chat?.status === "pending");
      setIsResolved(chat?.status === "resolved");
    } catch (error) {
      console.error("Failed to load support chat:", error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, [chatId, mode]);

  useEffect(() => {
    if (isOpen && chatId) {
      loadChat();
    }
  }, [isOpen, chatId, loadChat]);

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
      setMessages([]);
      setChatStatus("");
      setChatCategory("");
      setBuyerName("");
      setVendorName("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutside = (event: MouseEvent) => {
      if (winnerConfirmRef.current?.contains(event.target as Node)) return;
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
        return;
      }
      if (winnerDropdownRef.current && !winnerDropdownRef.current.contains(event.target as Node)) {
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

  const handleJoin = async () => {
    if (!chatId) {
      setIsJoined(true);
      setIsPending(true);
      return;
    }
    try {
      await assignSupportChat(chatId);
      await updateSupportChatStatus(chatId, "in_session");
      setIsJoined(true);
      setIsPending(true);
      setChatStatus("in_session");
      onUpdated?.();
      await loadChat();
    } catch (error) {
      console.error("Failed to join chat:", error);
      setIsJoined(true);
      setIsPending(true);
    }
  };

  const handleTogglePending = async () => {
    if (!chatId) {
      setIsPending((prev) => !prev);
      return;
    }
    const nextStatus = isPending ? "active" : "pending";
    try {
      await updateSupportChatStatus(chatId, nextStatus);
      setIsPending(!isPending);
      setChatStatus(nextStatus);
      onUpdated?.();
    } catch (error) {
      console.error("Failed to update chat status:", error);
    }
  };

  const handleResolve = async () => {
    if (!chatId) {
      setIsResolved(true);
      return;
    }
    try {
      await updateSupportChatStatus(chatId, "resolved");
      setIsResolved(true);
      setIsPending(false);
      setChatStatus("resolved");
      onUpdated?.();
    } catch (error) {
      console.error("Failed to resolve chat:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !chatId) return;
    setSending(true);
    try {
      await sendSupportMessage(chatId, message.trim());
      setMessage("");
      await loadChat();
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setSending(false);
    }
  };

  const handleConfirmWinner = async () => {
    if (orderId) {
      try {
        const winner = pendingWinner.toLowerCase().includes("vendor") ? "vendor" : "buyer";
        await resolveP2PAppeal(orderId, { winner });
        setSelectedWinner(pendingWinner);
        setIsResolved(true);
        setIsJoined(true);
        setIsPending(false);
        onUpdated?.();
      } catch (error) {
        console.error("Failed to resolve appeal:", error);
      }
    } else {
      setSelectedWinner(pendingWinner);
      setIsResolved(true);
    }
    setShowWinnerConfirm(false);
  };

  const winnerOptions =
    buyerName && vendorName
      ? [`Buyer - ${buyerName}`, `Vendor - ${vendorName}`]
      : [`Buyer - ${username}`, `Vendor - Agent`];

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
                  if (isJoined) return;
                  handleJoin();
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
                  onClick={handleTogglePending}
                  className={`flex h-[28px] items-center gap-1 rounded-full border px-3 text-[9px] ${
                    isPending || isJoined
                      ? "border-[#6E5624] bg-transparent text-[#F3B233]"
                      : "border-[#1E3244] bg-transparent text-[#D2D8DF]"
                  }`}
                >
                  {isPending || isJoined ? "Chat Pending" : "Mark as pending"}
                  <Hourglass size={9} className={isPending || isJoined ? "text-[#F3B233]" : "text-[#D2D8DF]"} />
                </button>
              )}
              {mode === "appeal" && (
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
                    <ChevronDown size={10} />
                  </button>
                  {showWinnerDropdown && (
                    <div className="absolute right-0 top-[34px] z-[30] w-[220px] overflow-hidden rounded-xl border border-[#1D2E3B] bg-[#081629] shadow-[0_12px_30px_rgba(0,0,0,0.45)]">
                      {winnerOptions.map((option) => (
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
              )}
              {mode === "support" && !isResolved && (
                <button
                  onClick={handleResolve}
                  className="h-[28px] rounded-full border border-[#184F2C] bg-[#0B2818] px-3 text-[9px] text-[#61D077]"
                >
                  Resolve
                </button>
              )}
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
                  <img src={images.Ellipse_68} alt={username} className="h-8 w-8 rounded-full object-cover" />
                  <div>
                    <p className="text-xs text-white">{username}</p>
                    <p className="text-[9px] text-[#B1BECA]">
                      {chatCategory || (mode === "appeal" ? "P2P Appeal" : "Support")}
                      {chatStatus ? ` · ${chatStatus}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <p className="mt-4 text-center text-xs text-[#7F8A95]">Loading messages...</p>
            ) : messages.length === 0 ? (
              <p className="mt-4 text-center text-xs text-[#7F8A95]">No messages yet</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mt-4 flex flex-col ${msg.isFromSupport ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`inline-block max-w-[85%] rounded-xl px-4 py-3 ${
                      msg.isFromSupport ? "bg-[#4579BA] text-white" : "bg-white text-[#111827]"
                    }`}
                  >
                    <p className="text-[12px]">{msg.message}</p>
                    {msg.imageUrl && (
                      <img src={msg.imageUrl} alt="attachment" className="mt-2 max-h-32 rounded-lg" />
                    )}
                  </div>
                  <p className="mt-1 text-[10px] text-[#738292]">
                    {msg.isFromSupport ? "Support" : username} · {formatDateTime(msg.createdAt)}
                  </p>
                </div>
              ))
            )}
          </div>

          {(isJoined || chatId) && (
            <div className="p-4 pt-0">
              <div className="flex h-[60px] items-center rounded-xl border border-[#1D3347] bg-[#071525] px-4">
                <Paperclip size={16} className="text-[#D6DEE6]" />
                <input
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type message"
                  className="mx-3 flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-[#7F8A95]"
                />
                <button
                  className="text-white disabled:opacity-50"
                  aria-label="Send message"
                  disabled={sending || !message.trim()}
                  onClick={handleSendMessage}
                >
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
            <p className="mt-2 text-center text-[18px] font-semibold text-[#F4B011]">Warning</p>
            <p className="mt-2 text-center text-[11px] leading-5 text-[#E5EDF5]">
              Are you sure {pendingWinner || "the selected user"} is the winner of this dispute?
            </p>
            <div className="mt-4 flex items-center justify-between text-[9px]">
              <button onClick={handleConfirmWinner} className="text-[#F4B011]">
                Yes, Mark as resolved
              </button>
              <button onClick={() => setShowWinnerConfirm(false)} className="text-[#9AA3AE]">
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
