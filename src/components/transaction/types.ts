export interface Transaction {
  id: string;
  amount: string;
  status: "success" | "failed" | "pending";
  country?: string;
  route?: string;
  date: string;
  recipient?: string;
  fee?: string;
  bank?: string;
  accountNumber?: string;
  accountName?: string;
  paymentMethod?: string;
  amountSent?: string;
  received?: string;
  rate?: string;
  conversion?: string;
  vendorName?: string;
  type?: string;
  merchantName?: string;
  p2pType?: string;
  usdtAmount?: string;
  price?: string;
  totalQty?: string;
  txFee?: string;
  txId?: string;
  orderTime?: string;
  review?: string;
  category?: string;
  transactionType?: string;
  crypto?: string;
  network?: string;
  cryptoLogo?: string;
  quantity?: string;
  amountUSD?: string;
  feeUSD?: string;
  receivingAddress?: string;
  sendingAddress?: string;
  txHash?: string;
  transactionId?: string;
  [key: string]: any; // For additional dynamic properties
}

export type ActionType = "All" | "Send" | "Fund" | "Convert" | "Withdraw" | "P2P" | "Bill Payments";
export type TransactionType = "All" | "Fiat" | "Crypto";

