import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSupportChat, fetchSupportChats, fetchUserById } from "../../../../services/admin";
import { formatDateTime } from "../../../../utils/adminFormatters";

interface SupportChatSummary {
  id: number | string;
  username?: string;
  category?: string;
  country?: string | null;
  status?: string;
  agent?: string;
  date?: string;
}

const UserChat: React.FC = () => {
  const { username } = useParams();
  const [chats, setChats] = useState<SupportChatSummary[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number | string | null>(null);
  const [chatDetail, setChatDetail] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    if (!username) return;

    const loadChats = async () => {
      setLoading(true);
      try {
        let search = String(username);
        try {
          const user = await fetchUserById(username);
          search = user?.email || user?.phone || search;
        } catch {
          // Fall back to route param as search term
        }

        const data = await fetchSupportChats({ search, page: 1, limit: 20 });
        const items = (data?.items || []) as SupportChatSummary[];
        setChats(items);
        if (items.length > 0) {
          setSelectedChatId(items[0].id);
        }
      } catch (error) {
        console.error("Failed to load support chats:", error);
        setChats([]);
      } finally {
        setLoading(false);
      }
    };

    loadChats();
  }, [username]);

  useEffect(() => {
    if (!selectedChatId) {
      setChatDetail(null);
      return;
    }

    const loadChatDetail = async () => {
      setLoadingDetail(true);
      try {
        const data = await fetchSupportChat(selectedChatId);
        setChatDetail(data);
      } catch (error) {
        console.error("Failed to load support chat:", error);
        setChatDetail(null);
      } finally {
        setLoadingDetail(false);
      }
    };

    loadChatDetail();
  }, [selectedChatId]);

  if (loading) {
    return <div className="text-white text-center">Loading support chats...</div>;
  }

  return (
    <div className="text-white">
      <h1 className="text-2xl font-semibold mb-4">User Support Chats</h1>

      {chats.length === 0 ? (
        <p className="text-gray-400">No support chats found for this user.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 rounded-lg overflow-hidden" style={{ backgroundColor: "#0B1820" }}>
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                className={`w-full text-left px-4 py-3 border-b border-gray-800 hover:bg-[#101F26] ${
                  selectedChatId === chat.id ? "bg-[#101F26]" : ""
                }`}
              >
                <p className="font-medium">{chat.category || "Support"}</p>
                <p className="text-sm text-gray-400 capitalize">{chat.status || "pending"}</p>
                <p className="text-xs text-gray-500">{formatDateTime(chat.date)}</p>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2 rounded-lg p-4" style={{ backgroundColor: "#0B1820", minHeight: "320px" }}>
            {loadingDetail ? (
              <p className="text-gray-400">Loading conversation...</p>
            ) : chatDetail ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                  <div>
                    <p className="font-medium">{chatDetail.reason || "Support chat"}</p>
                    <p className="text-sm text-gray-400 capitalize">{chatDetail.status}</p>
                  </div>
                  <p className="text-xs text-gray-500">{formatDateTime(chatDetail.createdAt)}</p>
                </div>
                <div className="space-y-2 max-h-[420px] overflow-y-auto">
                  {(chatDetail.messages || []).map((message: Record<string, any>) => (
                    <div
                      key={message.id}
                      className={`rounded-lg px-3 py-2 text-sm ${
                        message.isFromSupport ? "bg-[#1C2530] ml-8" : "bg-[#102623] mr-8"
                      }`}
                    >
                      <p>{message.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatDateTime(message.createdAt)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-400">Select a chat to view messages.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserChat;
