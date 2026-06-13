import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Gift, Search } from "lucide-react";
import images from "../../constants/images";
import TimeFilterTabs from "../../components/setting/TimeFilterTabs";
import {
  fetchRewardClaims,
  fetchRewardRules,
} from "../../services/admin";
import { formatCurrency, mapCountryName } from "../../utils/adminFormatters";

interface RewardRow {
  id: string;
  username: string;
  tier: "Gold" | "Silver" | "Bronze";
  country: string;
  totalReward: string;
  lastReward: string;
}

const timeRanges = ["All Time", "7 Days", "1 month", "1 Year", "Custom"];

const formatTier = (tier: string): RewardRow["tier"] => {
  const value = tier?.toLowerCase();
  if (value === "gold") return "Gold";
  if (value === "silver") return "Silver";
  return "Bronze";
};

const filterButtonStyle: React.CSSProperties = {
  width: "90px",
  height: "30px",
  borderRadius: "100px",
  borderWidth: "0.3px",
  borderStyle: "solid",
  borderColor: "#27353B",
  backgroundColor: "#101F26",
  fontSize: "10px",
  fontWeight: 400,
};

const Rewards: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("All Time");
  const [selectedCountry, setSelectedCountry] = useState("Country");
  const [selectedTier, setSelectedTier] = useState("Tier");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showTierDropdown, setShowTierDropdown] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const countryDropdownRef = useRef<HTMLDivElement | null>(null);
  const tierDropdownRef = useRef<HTMLDivElement | null>(null);
  const [rows, setRows] = useState<RewardRow[]>([]);
  const [rewardStats, setRewardStats] = useState({
    totalRewards: "$0",
    goldUsers: "0",
    silverUsers: "0",
    bronzeUsers: "0",
  });
  const [loading, setLoading] = useState(true);

  const countryOptions = ["Country", "Nigeria", "Ghana", "Kenya", "South Africa"];
  const tierOptions = ["Tier", "Gold", "Silver", "Bronze"];

  const loadRewards = async () => {
    setLoading(true);
    try {
      const [claimsData] = await Promise.all([
        fetchRewardClaims({
          range: selectedTimeRange,
          tier: selectedTier,
          search: searchText.trim() || undefined,
          country: selectedCountry,
          limit: 100,
        }),
        fetchRewardRules({ limit: 100 }),
      ]);

      const claimRows = (claimsData?.items || []).map((row: any) => ({
        id: String(row.id),
        username: row.username,
        tier: formatTier(row.tier),
        country: mapCountryName(row.country),
        totalReward: formatCurrency(row.totalReward),
        lastReward: row.lastReward || "-",
      }));
      setRows(claimRows);

      const stats = claimsData?.stats || {};
      const totalValue = claimRows.reduce(
        (sum: number, row: RewardRow) => sum + Number(String(row.totalReward).replace(/[^0-9.-]+/g, "") || 0),
        0
      );
      setRewardStats({
        totalRewards: formatCurrency(totalValue || stats.totalClaims || 0),
        goldUsers: String(stats.gold || 0),
        silverUsers: String(stats.silver || 0),
        bronzeUsers: String(stats.bronze || 0),
      });
    } catch (error) {
      console.error("Failed to load rewards:", error);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRewards();
  }, [selectedTimeRange, selectedTier, searchText, selectedCountry]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false);
      }
      if (tierDropdownRef.current && !tierDropdownRef.current.contains(event.target as Node)) {
        setShowTierDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredRows = rows;

  const allSelected =
    filteredRows.length > 0 && filteredRows.every((row) => selectedIds.has(row.id));
  const partiallySelected = selectedIds.size > 0 && !allSelected;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
      return;
    }
    setSelectedIds(new Set(filteredRows.map((row) => row.id)));
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
    <div className="space-y-4">
      <style>
        {`
          .rewards-checkbox {
            appearance: none;
            width: 14px;
            height: 14px;
            border-radius: 3px;
            border: 1px solid #9CA8B3;
            background-color: transparent;
            cursor: pointer;
          }
          .rewards-checkbox:checked {
            border-color: #A9EF45;
            background-color: #A9EF45;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 13l4 4L19 7'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 10px 10px;
          }
          .rewards-checkbox-indeterminate {
            border-color: #A9EF45;
            background-color: #A9EF45;
            background-image: none;
            position: relative;
          }
          .rewards-checkbox-indeterminate::after {
            content: "";
            position: absolute;
            left: 3px;
            right: 3px;
            top: 6px;
            height: 2px;
            background: #0B1820;
            border-radius: 2px;
          }
        `}
      </style>

      <section
        className="rounded-2xl p-4 md:p-5"
        style={{ background: "linear-gradient(90deg, #0A1920 0%, #0A1420 100%)" }}
      >
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1
              className="text-white"
              style={{
                fontFamily: "Agbalumo",
                fontWeight: 400,
                fontSize: "clamp(28px, 6vw, 40px)",
                lineHeight: "100%",
              }}
            >
              Rewards
            </h1>
            <p className="mt-2 text-sm text-[#7B8A96]">View and manage user rewards</p>
          </div>
          <TimeFilterTabs
            options={timeRanges}
            value={selectedTimeRange}
            onChange={setSelectedTimeRange}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          {[
            { label: "Total Rewards", value: loading ? "..." : rewardStats.totalRewards, bg: "linear-gradient(119.08deg, #4880C0 0%, #1B589E 96.9%)" },
            { label: "Gold Users", value: loading ? "..." : rewardStats.goldUsers, bg: "#D9A43D" },
            { label: "Silver Users", value: loading ? "..." : rewardStats.silverUsers, bg: "rgba(202, 205, 210, 0.85)" },
            { label: "Bronze Users", value: loading ? "..." : rewardStats.bronzeUsers, bg: "#B99659" },
          ].map((card) => (
            <div
              key={card.label}
              className="h-[62px] rounded-[8px] px-4 py-2"
              style={{ background: card.bg }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(0,0,0,0.18)]">
                  <Gift size={12} className="text-[#0F141A]" />
                </div>
                <div>
                  <p className="text-[9px] text-[rgba(255,255,255,0.75)]">{card.label}</p>
                  <p className="text-[28px] leading-[0.9] text-white">{card.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mb-3 mt-2 flex flex-wrap items-center gap-2">
        <button className="text-white" style={filterButtonStyle}>
          Bulk Action
        </button>

        <div className="relative" ref={countryDropdownRef}>
          <button
            onClick={() => {
              setShowCountryDropdown((prev) => !prev);
              setShowTierDropdown(false);
            }}
            className="text-white flex items-center justify-center gap-1"
            style={filterButtonStyle}
          >
            {selectedCountry}
            <ChevronDown
              size={10}
              className={showCountryDropdown ? "rotate-180 transition-transform" : "transition-transform"}
            />
          </button>
          {showCountryDropdown && (
            <div
              className="absolute left-0 z-20 mt-1 w-[110px] overflow-hidden rounded-lg border border-[#27353B]"
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
                  onClick={() => {
                    setSelectedCountry(option);
                    setShowCountryDropdown(false);
                  }}
                  className="block w-full px-3 py-2 text-left text-[11px] text-white hover:bg-[#1B2D36]"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative" ref={tierDropdownRef}>
          <button
            onClick={() => {
              setShowTierDropdown((prev) => !prev);
              setShowCountryDropdown(false);
            }}
            className="text-white flex items-center justify-center gap-1"
            style={filterButtonStyle}
          >
            {selectedTier}
            <ChevronDown
              size={10}
              className={showTierDropdown ? "rotate-180 transition-transform" : "transition-transform"}
            />
          </button>
          {showTierDropdown && (
            <div
              className="absolute left-0 z-20 mt-1 w-[110px] overflow-hidden rounded-lg border border-[#27353B]"
              style={{
                backgroundColor: "rgba(26, 38, 47, 0.2)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                boxShadow: "5px 5px 15px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              {tierOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedTier(option);
                    setShowTierDropdown(false);
                  }}
                  className="block w-full px-3 py-2 text-left text-[11px] text-white hover:bg-[#1B2D36]"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <section
        className="w-full overflow-hidden rounded-lg"
        style={{ backgroundColor: "#0B1820", borderRadius: "20px" }}
      >
        <div
          className="flex flex-col items-start gap-3 px-4 py-3 md:h-[60px] md:flex-row md:items-center md:justify-between md:px-6 md:py-0"
          style={{ backgroundColor: "#020B16" }}
        >
          <h3 className="text-white text-[20px]">Rewards</h3>
          <div
            className="flex items-center px-3 py-2"
            style={{
              width: "100%",
              maxWidth: "267px",
              height: "35px",
              borderRadius: "100px",
              backgroundColor: "#0F1722",
            }}
          >
            <Search size={14} className="mr-2 text-gray-400" />
            <input
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search"
              className="flex-1 bg-transparent text-sm text-white outline-none placeholder-[#878B90]"
            />
          </div>
        </div>

        <div className="overflow-x-auto" style={{ backgroundColor: "#0F1825" }}>
          <table className="w-full min-w-[900px]">
            <colgroup>
              <col style={{ width: "44px" }} />
              <col style={{ width: "220px" }} />
              <col style={{ width: "140px" }} />
              <col style={{ width: "140px" }} />
              <col style={{ width: "160px" }} />
              <col style={{ width: "250px" }} />
            </colgroup>
            <thead>
              <tr className="text-left text-[11px] text-[#FFFFFF]" style={{ backgroundColor: "#1C2530" }}>
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    className={`rewards-checkbox ${partiallySelected ? "rewards-checkbox-indeterminate" : ""}`}
                    checked={allSelected}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-4 py-3">User name</th>
                <th className="px-4 py-3">Tier</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Total reward</th>
                <th className="px-4 py-3">Last Reward</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className="border-b border-[#2B363E] text-[12px] text-[#CFD7DD]">
                  <td colSpan={6} className="px-4 py-6 text-center">Loading rewards...</td>
                </tr>
              ) : filteredRows.length === 0 ? (
                <tr className="border-b border-[#2B363E] text-[12px] text-[#CFD7DD]">
                  <td colSpan={6} className="px-4 py-6 text-center">No reward claims found</td>
                </tr>
              ) : (
                filteredRows.map((row) => (
                <tr key={row.id} className="border-b border-[#2B363E] text-[12px] text-white">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="rewards-checkbox"
                      checked={selectedIds.has(row.id)}
                      onChange={() => toggleRowSelection(row.id)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#A9EF45] p-[2px]">
                        <img
                          src={images.avater1}
                          alt={row.username}
                          className="h-full w-full rounded-full object-cover"
                        />
                      </span>
                      <span>{row.username}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#CFD7DD]">{row.tier}</td>
                  <td className="px-4 py-3 text-[#CFD7DD]">
                    <span className="inline-flex items-center gap-2">
                      <span className="inline-block h-4 w-4 rounded-full bg-gradient-to-r from-[#0A9E58] via-white to-[#0A9E58]" />
                      {row.country}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#CFD7DD]">{row.totalReward}</td>
                  <td className="px-4 py-3 text-[#CFD7DD]">{row.lastReward}</td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Rewards;
