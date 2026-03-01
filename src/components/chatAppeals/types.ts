export interface AppealRow {
  id: string;
  username: string;
  vendor: string;
  adType: "Buy ad" | "Sell Ads";
  token: string;
  country: string;
  qty: string;
  amount: string;
  statusColor: "green" | "yellow" | "red";
  statusText?: string;
  date: string;
  time: string;
}

export interface AppealStatusOption {
  value: string;
  dot: string;
}
