export interface Transaction {
  id: string;
  amount: string;
  status: "success" | "failed" | "pending";
  country: string;
  route: string;
  date: string;
  recipient: string;
  fee: string;
  bank: string;
  accountNumber: string;
  accountName: string;
  paymentMethod: string;
  // Optional fields for different transaction types
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
}

export type ActionType = "Send" | "Fund" | "Convert" | "Withdraw" | "P2P" | "Bill Payments";

