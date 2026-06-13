import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { approveKyc, fetchUserKyc, rejectKyc } from "../../../../services/admin";
import { formatDateTime } from "../../../../utils/adminFormatters";

const UserVerification: React.FC = () => {
  const { username } = useParams();
  const [kyc, setKyc] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [error, setError] = useState<string | null>(null);

  const loadKyc = async () => {
    if (!username) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUserKyc(username);
      setKyc(data);
    } catch (err) {
      console.error("Failed to load user KYC:", err);
      setKyc(null);
      setError("KYC record not found for this user.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadKyc();
  }, [username]);

  const handleApprove = async () => {
    if (!username) return;
    setActionLoading(true);
    try {
      await approveKyc(username);
      await loadKyc();
    } catch (err) {
      console.error("Failed to approve KYC:", err);
      setError("Failed to approve KYC.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!username) return;
    setActionLoading(true);
    try {
      await rejectKyc(username, rejectReason || undefined);
      await loadKyc();
    } catch (err) {
      console.error("Failed to reject KYC:", err);
      setError("Failed to reject KYC.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white text-center">Loading verification details...</div>;
  }

  return (
    <div className="text-white">
      <h1 className="text-2xl font-semibold mb-4">User Verification</h1>
      {error && <p className="text-red-400 mb-4">{error}</p>}
      {kyc ? (
        <div className="rounded-lg p-6 space-y-4" style={{ backgroundColor: "#0B1820" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Status</p>
              <p className="capitalize">{kyc.status || "unverified"}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Submitted</p>
              <p>{formatDateTime(kyc.createdAt)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Updated</p>
              <p>{formatDateTime(kyc.updatedAt)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">ID Type</p>
              <p>{kyc.idType || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">ID Number</p>
              <p>{kyc.idNumber || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Country</p>
              <p>{kyc.user?.country?.name || kyc.user?.country?.code || "N/A"}</p>
            </div>
          </div>

          {kyc.status === "pending" && (
            <div className="flex flex-col md:flex-row gap-3 pt-4">
              <button
                onClick={handleApprove}
                disabled={actionLoading}
                className="px-4 py-2 rounded-full bg-[#A9EF45] text-black disabled:opacity-50"
              >
                Approve KYC
              </button>
              <input
                type="text"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Rejection reason (optional)"
                className="flex-1 px-4 py-2 rounded-full bg-[#0F1722] border border-gray-700 outline-none"
              />
              <button
                onClick={handleReject}
                disabled={actionLoading}
                className="px-4 py-2 rounded-full bg-red-600 text-white disabled:opacity-50"
              >
                Reject KYC
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-400">No KYC submission found for user {username}.</p>
      )}
    </div>
  );
};

export default UserVerification;
