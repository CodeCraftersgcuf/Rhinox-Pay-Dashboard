import React from "react";
import { Search } from "lucide-react";
import images from "../../constants/images";
import { AppealRow } from "./types";

interface ChatAppealsTableProps {
  searchText: string;
  onSearchTextChange: (value: string) => void;
  filteredRows: AppealRow[];
  selectedIds: Set<string>;
  partiallySelected: boolean;
  allSelected: boolean;
  toggleSelectAll: () => void;
  toggleRow: (id: string) => void;
  onViewChat: (row: AppealRow) => void;
}

const ChatAppealsTable: React.FC<ChatAppealsTableProps> = ({
  searchText,
  onSearchTextChange,
  filteredRows,
  selectedIds,
  partiallySelected,
  allSelected,
  toggleSelectAll,
  toggleRow,
  onViewChat,
}) => {
  return (
    <section className="w-full overflow-hidden rounded-[20px]" style={{ backgroundColor: "#0B1820" }}>
      <div
        className="flex flex-col gap-3 px-4 py-3 md:h-[60px] md:flex-row md:items-center md:justify-between md:px-6"
        style={{ backgroundColor: "#020B16" }}
      >
        <h3 className="text-[22px] text-white">P2P Ads Posted</h3>
        <div className="flex h-[35px] w-full max-w-[267px] items-center rounded-full bg-[#0F1722] px-3">
          <Search size={14} className="mr-2 text-gray-400" />
          <input
            value={searchText}
            onChange={(event) => onSearchTextChange(event.target.value)}
            placeholder="Search"
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#878B90]"
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-[#0F1825]">
        <table className="w-full">
          <thead>
            <tr className="text-left text-[10px] text-white" style={{ backgroundColor: "#1C2530" }}>
              <th className="px-3 py-3">
                <input
                  type="checkbox"
                  className={`appeals-checkbox ${partiallySelected ? "appeals-checkbox-indeterminate" : ""}`}
                  checked={allSelected}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="px-3 py-3">User name</th>
              <th className="px-3 py-3">Vendor</th>
              <th className="px-3 py-3">Token</th>
              <th className="px-3 py-3">Country</th>
              <th className="px-3 py-3">Qty</th>
              <th className="px-3 py-3">Amount</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Date</th>
              <th className="px-3 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.id} className="border-b border-[#2B363E] text-[11px] text-white">
                <td className="px-3 py-3">
                  <input
                    type="checkbox"
                    className="appeals-checkbox"
                    checked={selectedIds.has(row.id)}
                    onChange={() => toggleRow(row.id)}
                  />
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <img src={images.avater1} alt={row.username} className="h-7 w-7 rounded-full bg-[#A9EF45]" />
                    <span>{row.username}</span>
                  </div>
                </td>
                <td className="px-3 py-3 text-[#CFD7DD]">{row.vendor}</td>
                <td className="px-3 py-3 text-[#CFD7DD]">
                  <span className="inline-flex items-center gap-2">
                    <img src={images.cryptocurrency_color_usdt} alt="USDT" className="h-4 w-4 rounded-full" />
                    {row.token}
                  </span>
                </td>
                <td className="px-3 py-3 text-[#CFD7DD]">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-4 w-4 rounded-full bg-gradient-to-r from-[#0A9E58] via-white to-[#0A9E58]" />
                    {row.country}
                  </span>
                </td>
                <td className="px-3 py-3 text-[#CFD7DD]">{row.qty}</td>
                <td className="px-3 py-3 text-[#CFD7DD]">{row.amount}</td>
                <td className="px-3 py-3 text-[#CFD7DD]">
                  <div className="flex flex-col gap-1">
                    <span
                      className={`inline-block h-2.5 w-2.5 rounded-full ${row.statusColor === "green" ? "bg-[#0C9E2A]" : "bg-[#F5A60A]"}`}
                    />
                    {row.statusText && <span className="text-[8px] text-[#B6C2CE]">{row.statusText}</span>}
                  </div>
                </td>
                <td className="px-3 py-3 text-[#CFD7DD]">
                  <p>{row.date}</p>
                  <p>{row.time}</p>
                </td>
                <td className="px-3 py-3">
                  <button
                    onClick={() => onViewChat(row)}
                    className="h-[30px] min-w-[84px] rounded-full bg-[#A9EF45] px-4 text-[10px] font-medium text-[#0C141C]"
                  >
                    View Chat
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ChatAppealsTable;
