import React, { useEffect, useRef, useState } from "react";
import images from "../../constants/images";
import { Pencil, Trash2 } from "lucide-react";

export interface AdminUser {
  id: string;
  username: string;
  role: string;
  country: string;
  status: "Active" | "Inactive";
  date: string;
}

interface AdminTableProps {
  rows: AdminUser[];
  searchText: string;
  onSearch: (value: string) => void;
  onViewDetails: (admin: AdminUser) => void;
  onToggleStatus?: (admin: AdminUser) => void;
  onDelete?: (admin: AdminUser) => void;
}

const AdminTable: React.FC<AdminTableProps> = ({
  rows,
  searchText,
  onSearch,
  onViewDetails,
  onToggleStatus,
  onDelete,
}) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const selectAllRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Keep selection in sync with currently visible rows.
    setSelectedIds((prev) => {
      const next = new Set<string>();
      rows.forEach((row) => {
        if (prev.has(row.id)) next.add(row.id);
      });
      return next;
    });
  }, [rows]);

  const allSelected = rows.length > 0 && rows.every((row) => selectedIds.has(row.id));
  const partiallySelected = selectedIds.size > 0 && !allSelected;

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = partiallySelected;
    }
  }, [partiallySelected]);

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
      return;
    }

    setSelectedIds(new Set(rows.map((row) => row.id)));
  };

  const toggleRowSelection = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section
      className="w-full rounded-lg overflow-hidden"
      style={{ backgroundColor: "#0B1820", borderRadius: "20px", marginTop: "9.6px" }}
    >
      <div
        className="flex flex-col items-start gap-3 px-4 py-3 md:h-[60px] md:flex-row md:items-center md:justify-between md:px-6 md:py-0"
        style={{ backgroundColor: "#020B16", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
      >
        <h3 className="text-white text-[20px]">Admins</h3>
        <div className="relative w-full md:w-auto">
          <div
            className="flex items-center px-3 py-2"
            style={{ width: "100%", maxWidth: "267px", height: "35px", borderRadius: "100px", backgroundColor: "#0F1722" }}
          >
            <i className="bi bi-search text-gray-400 mr-2" />
            <input
              value={searchText}
              onChange={(event) => onSearch(event.target.value)}
              placeholder="Search"
              className="bg-transparent text-white outline-none flex-1 placeholder-[#878B90] text-sm"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto" style={{ backgroundColor: "#0F1825" }}>
        <table className="min-w-[900px] w-full">
        <thead>
          <tr className="text-left text-[11px] text-[#FFFFFF]" style={{ backgroundColor: "#1C2530" }}>
            <th className="px-4 py-3">
              <input
                ref={selectAllRef}
                type="checkbox"
                className="h-4 w-4 appearance-none rounded-[3px] border border-[#9CA8B3] bg-transparent align-middle checked:border-[#A9EF45] checked:bg-[#A9EF45]"
                checked={allSelected}
                onChange={toggleSelectAll}
              />
            </th>
            <th className="px-4 py-3">User name</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Country</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Agent</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((admin) => (
            <tr key={admin.id} className="border-b border-[#2B363E] text-[12px] text-white">
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 appearance-none rounded-[3px] border border-[#9CA8B3] bg-transparent align-middle checked:border-[#A9EF45] checked:bg-[#A9EF45]"
                  checked={selectedIds.has(admin.id)}
                  onChange={() => toggleRowSelection(admin.id)}
                />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <img src={images.avater1} alt={admin.username} className="h-8 w-8 rounded-full" />
                  <span>{admin.username}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-[#CFD7DD]">{admin.role}</td>
              <td className="px-4 py-3 text-[#CFD7DD]">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-4 w-4 rounded-full bg-gradient-to-r from-[#0A9E58] via-white to-[#0A9E58]" />
                  {admin.country}
                </span>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-[11px] ${
                    admin.status === "Active"
                      ? "bg-[#008000] text-white"
                      : "bg-[#6B7280] text-white"
                  }`}
                >
                  {admin.status}
                </span>
              </td>
              <td className="px-4 py-3 text-[#CFD7DD]">{admin.date}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onViewDetails(admin)}
                  className="h-[35px] rounded-full bg-[#A9EF45] px-6 text-[11px] font-medium text-[#0C141C]"
                >
                  Details
                </button>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleStatus?.(admin)}
                    className="h-8 w-8 rounded-md border border-[#26333F] text-[#C8D0D6] bg-[#0C1620]"
                    title="Toggle status"
                  >
                    <Pencil size={14} className="mx-auto" />
                  </button>
                  <button
                    onClick={() => onDelete?.(admin)}
                    className="h-8 w-8 rounded-md border border-[#26333F] text-[#E10405] bg-[#0C1620]"
                    title="Deactivate admin"
                  >
                    <Trash2 size={14} className="mx-auto" />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {!rows.length && (
            <tr>
              <td colSpan={8} className="px-4 py-8 text-center text-xs text-[#7F8B95]">
                No admins found for the selected filters.
              </td>
            </tr>
          )}
        </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminTable;
