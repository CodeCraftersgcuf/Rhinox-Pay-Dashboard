import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import images from "../../../../constants/images";

const UserTransaction: React.FC = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [transactionType, setTransactionType] = useState<"Fiat" | "Crypto">("Fiat");
  const [selectedTimeRange, setSelectedTimeRange] = useState("All Time");
  const [selectedAction, setSelectedAction] = useState("Send");
  const [searchQuery, setSearchQuery] = useState("");
  const [showTxTypeDropdown, setShowTxTypeDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedTxType, setSelectedTxType] = useState("Tx Type");

  // Reset dropdown selection when action changes
  useEffect(() => {
    if (selectedAction === "Fund") {
      setSelectedTxType("Route");
    } else {
      setSelectedTxType("Tx Type");
    }
    if (selectedAction === "P2P" || selectedAction === "Bill Payments") {
      setSelectedBuy("Buy");
    }
  }, [selectedAction]);
  const [selectedCountry, setSelectedCountry] = useState("Country");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [showBuyDropdown, setShowBuyDropdown] = useState(false);
  const [selectedBuy, setSelectedBuy] = useState("Buy");
  const [selectedCryptoAction, setSelectedCryptoAction] = useState("All");
  const [showTokenDropdown, setShowTokenDropdown] = useState(false);
  const [selectedToken, setSelectedToken] = useState("Token");
  const [selectedTransactions, setSelectedTransactions] = useState<Set<string>>(new Set());
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const txTypeDropdownRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const buyDropdownRef = useRef<HTMLDivElement>(null);
  const tokenDropdownRef = useRef<HTMLDivElement>(null);

  const timeRanges = ["All Time", "7 Days", "1 month", "1 Year", "Custom"];
  const actionButtons = ["Send", "Fund", "Convert", "Withdraw", "P2P", "Bill Payments"];

  // Get dropdown options based on selected action
  const getTxTypeOptions = () => {
    if (selectedAction === "Fund") {
      return ["All Routes", "Bank transfer", "Mobile Money", "Conversion", "P2P"];
    }
    if (selectedAction === "Withdraw") {
      return ["All Routes", "Bank Transfer", "Mobile Money"];
    }
    return ["All types", "Bank Transfer", "Rhinox ID", "Mobile money"];
  };

  const getTxTypeLabel = () => {
    if (selectedAction === "Fund" || selectedAction === "Withdraw") {
      return "Route";
    }
    return "Tx Type";
  };

  const txTypeOptions = getTxTypeOptions();
  const countryOptions = ["All Countries", "Nigeria", "Ghana", "Kenya", "South Africa"];
  const statusOptions = ["All Status", "Successful", "Pending", "Failed"];
  const cryptoActions = ["All", "Deposit", "Withdraw", "P2P"];
  const tokenOptions = [
    { name: "Bitcoin", logo: images.image_25, balance: "0.00001" },
    { name: "Ethereum", logo: images.image_26, balance: "10" },
    { name: "Solana", logo: images.image_27, balance: "100" }
  ];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showTxTypeDropdown && txTypeDropdownRef.current && !txTypeDropdownRef.current.contains(event.target as Node)) {
        setShowTxTypeDropdown(false);
      }
      if (showCountryDropdown && countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
      if (showStatusDropdown && statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setShowStatusDropdown(false);
      }
      if (showBuyDropdown && buyDropdownRef.current && !buyDropdownRef.current.contains(event.target as Node)) {
        setShowBuyDropdown(false);
      }
      if (showTokenDropdown && tokenDropdownRef.current && !tokenDropdownRef.current.contains(event.target as Node)) {
        setShowTokenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTxTypeDropdown, showCountryDropdown, showStatusDropdown, showBuyDropdown, showTokenDropdown]);

  const sendTransactions = [
    {
      id: "12dwerkxywurcksc",
      amount: "N200,000",
      status: "success",
      country: "Nigeria",
      route: "Bank Transfer",
      date: "Oct 16, 2025 - 07:22 AM",
      recipient: "Adebisi Lateefat",
      fee: "N20",
      bank: "Wema Bank",
      accountNumber: "0123456789",
      accountName: "Opay",
      paymentMethod: "Bank Transfer"
    },
    {
      id: "asdkfj12324kdsk",
      amount: "N20,000",
      status: "failed",
      country: "Nigeria",
      route: "Bank Transfer",
      date: "22/10/25 - 07:22 AM",
      recipient: "John Doe",
      fee: "N10",
      bank: "Access Bank",
      accountNumber: "1234567890",
      accountName: "John Doe",
      paymentMethod: "Bank Transfer"
    },
    {
      id: "asdkfj12324kdsk",
      amount: "N20,000",
      status: "success",
      country: "Nigeria",
      route: "Bank Transfer",
      date: "22/10/25 - 07:22 AM",
      recipient: "Jane Smith",
      fee: "N10",
      bank: "GTBank",
      accountNumber: "0987654321",
      accountName: "Jane Smith",
      paymentMethod: "Bank Transfer"
    },
    {
      id: "asdkfj12324kdsk",
      amount: "N20,000",
      status: "success",
      country: "Nigeria",
      route: "Bank Transfer",
      date: "22/10/25 - 07:22 AM",
      recipient: "Mike Johnson",
      fee: "N10",
      bank: "First Bank",
      accountNumber: "1122334455",
      accountName: "Mike Johnson",
      paymentMethod: "Bank Transfer"
    },
    {
      id: "asdkfj12324kdsk",
      amount: "N20,000",
      status: "success",
      country: "Nigeria",
      route: "Bank Transfer",
      date: "22/10/25 - 07:22 AM",
      recipient: "Sarah Williams",
      fee: "N10",
      bank: "Zenith Bank",
      accountNumber: "5566778899",
      accountName: "Sarah Williams",
      paymentMethod: "Bank Transfer"
    }
  ];

  const fundTransactions = [
    {
      id: "asdkfj12324kdsk",
      amount: "N20,000",
      status: "success",
      country: "Nigeria",
      route: "Yellow Card",
      date: "22/10/25 - 07:22 AM",
      recipient: "User 1",
      fee: "N10",
      bank: "Yellow Card",
      accountNumber: "1234567890",
      accountName: "User 1",
      paymentMethod: "Yellow Card"
    },
    {
      id: "asdkfj12324kdsk",
      amount: "N20,000",
      status: "success",
      country: "Nigeria",
      route: "Yellow Card",
      date: "22/10/25 - 07:22 AM",
      recipient: "User 2",
      fee: "N10",
      bank: "Yellow Card",
      accountNumber: "1234567891",
      accountName: "User 2",
      paymentMethod: "Yellow Card"
    },
    {
      id: "asdkfj12324kdsk",
      amount: "N20,000",
      status: "success",
      country: "Nigeria",
      route: "Conversion",
      date: "22/10/25 - 07:22 AM",
      recipient: "User 3",
      fee: "N10",
      bank: "Conversion",
      accountNumber: "1234567892",
      accountName: "User 3",
      paymentMethod: "Conversion"
    },
    {
      id: "asdkfj12324kdsk",
      amount: "N20,000",
      status: "success",
      country: "Nigeria",
      route: "Crypto",
      date: "22/10/25 - 07:22 AM",
      recipient: "User 4",
      fee: "N10",
      bank: "Crypto",
      accountNumber: "1234567893",
      accountName: "User 4",
      paymentMethod: "Crypto"
    },
    {
      id: "asdkfj12324kdsk",
      amount: "N20,000",
      status: "success",
      country: "Nigeria",
      route: "P2P",
      date: "22/10/25 - 07:22 AM",
      recipient: "User 5",
      fee: "N10",
      bank: "P2P",
      accountNumber: "1234567894",
      accountName: "User 5",
      paymentMethod: "P2P"
    }
  ];

  const convertTransactions = [
    {
      id: "asdkfj12324kdsk",
      amount: "N20,000",
      amountSent: "N20,000",
      received: "c1,000",
      status: "success",
      country: "Nigeria",
      route: "Conversion",
      date: "22/10/25 - 07:22 AM",
      recipient: "User 1",
      fee: "N10",
      bank: "Conversion",
      accountNumber: "1234567890",
      accountName: "User 1",
      paymentMethod: "Conversion",
      rate: "1N = c1000",
      conversion: "NGN - GHC"
    },
    {
      id: "asdfghjk109876",
      amount: "N30,000",
      amountSent: "N30,000",
      received: "c3,000",
      status: "success",
      country: "Nigeria",
      route: "Conversion",
      date: "22/10/25 - 09:00 AM",
      recipient: "User 2",
      fee: "N15",
      bank: "Conversion",
      accountNumber: "1234567891",
      accountName: "User 2",
      paymentMethod: "Conversion",
      rate: "1N = c1000",
      conversion: "NGN - GHC"
    },
    {
      id: "zxczxqwe456789",
      amount: "N45,000",
      amountSent: "N45,000",
      received: "c4,500",
      status: "success",
      country: "Nigeria",
      route: "Conversion",
      date: "22/10/25 - 08:15 AM",
      recipient: "User 3",
      fee: "N22",
      bank: "Conversion",
      accountNumber: "1234567892",
      accountName: "User 3",
      paymentMethod: "Conversion",
      rate: "1N = c1000",
      conversion: "NGN - GHC"
    },
    {
      id: "qwertyuiop56789",
      amount: "N60,000",
      amountSent: "N60,000",
      received: "c6,000",
      status: "success",
      country: "Nigeria",
      route: "Conversion",
      date: "22/10/25 - 10:30 AM",
      recipient: "User 4",
      fee: "N30",
      bank: "Conversion",
      accountNumber: "1234567893",
      accountName: "User 4",
      paymentMethod: "Conversion",
      rate: "1N = c1000",
      conversion: "NGN - GHC"
    },
    {
      id: "asdkfj12324kdsk",
      amount: "N25,000",
      amountSent: "N25,000",
      received: "c2,500",
      status: "success",
      country: "Nigeria",
      route: "Conversion",
      date: "22/10/25 - 11:45 AM",
      recipient: "User 5",
      fee: "N12",
      bank: "Conversion",
      accountNumber: "1234567894",
      accountName: "User 5",
      paymentMethod: "Conversion",
      rate: "1N = c1000",
      conversion: "NGN - GHC"
    }
  ];

  const withdrawTransactions = [
    {
      id: "asdkfj12324kdsk",
      amount: "N20,000",
      status: "success",
      country: "Nigeria",
      route: "Yellow Card",
      date: "22/10/25 - 07:22 AM",
      recipient: "User 1",
      fee: "N10",
      bank: "Wema Bank",
      accountNumber: "1234567890",
      accountName: "Opay",
      paymentMethod: "Bank Transfer"
    },
    {
      id: "asdkfj12324kdsk",
      amount: "N20,000",
      status: "success",
      country: "Nigeria",
      route: "Yellow Card",
      date: "22/10/25 - 07:22 AM",
      recipient: "User 2",
      fee: "N10",
      bank: "Wema Bank",
      accountNumber: "1234567891",
      accountName: "Opay",
      paymentMethod: "Bank Transfer"
    },
    {
      id: "asdkfj12324kdsk",
      amount: "N20,000",
      status: "success",
      country: "Nigeria",
      route: "Conversion",
      date: "22/10/25 - 07:22 AM",
      recipient: "User 3",
      fee: "N10",
      bank: "Wema Bank",
      accountNumber: "1234567892",
      accountName: "Opay",
      paymentMethod: "Bank Transfer"
    },
    {
      id: "asdkfj12324kdsk",
      amount: "N20,000",
      status: "success",
      country: "Nigeria",
      route: "Crypto",
      date: "22/10/25 - 07:22 AM",
      recipient: "User 4",
      fee: "N10",
      bank: "Wema Bank",
      accountNumber: "1234567893",
      accountName: "Opay",
      paymentMethod: "Bank Transfer"
    },
    {
      id: "asdkfj12324kdsk",
      amount: "N20,000",
      status: "success",
      country: "Nigeria",
      route: "P2P",
      date: "22/10/25 - 07:22 AM",
      recipient: "User 5",
      fee: "N10",
      bank: "Wema Bank",
      accountNumber: "1234567894",
      accountName: "Opay",
      paymentMethod: "Bank Transfer"
    }
  ];

  const p2pTransactions = [
    {
      id: "asdkfj12324kdsk",
      amount: "N20,000",
      status: "success",
      country: "Nigeria",
      route: "P2P",
      date: "22/10/25 - 07:22 AM",
      recipient: "Lawal",
      vendorName: "Lawal",
      fee: "N10",
      bank: "P2P",
      accountNumber: "1234567890",
      accountName: "Lawal",
      paymentMethod: "P2P",
      merchantName: "Qamar Malik",
      p2pType: "Crypto Sell",
      usdtAmount: "20 USDT",
      price: "1,500 NGN",
      totalQty: "5.2 USDT",
      txFee: "0",
      txId: "128DJ2I311DJKQKCM",
      orderTime: "Oct 16, 2025 - 07:22AM",
      review: "He is fast and reliable"
    },
    {
      id: "asdkfj12324kdsk",
      amount: "N20,000",
      status: "success",
      country: "Nigeria",
      route: "P2P",
      date: "22/10/25 - 07:22 AM",
      recipient: "Adewale Saheed",
      vendorName: "Adewale Saheed",
      fee: "N10",
      bank: "P2P",
      accountNumber: "1234567891",
      accountName: "Adewale Saheed",
      paymentMethod: "P2P"
    },
    {
      id: "asdkfj12324kdsk",
      amount: "N20,000",
      status: "success",
      country: "Nigeria",
      route: "P2P",
      date: "22/10/25 - 07:22 AM",
      recipient: "Chris",
      vendorName: "Chris",
      fee: "N10",
      bank: "P2P",
      accountNumber: "1234567892",
      accountName: "Chris",
      paymentMethod: "P2P"
    },
    {
      id: "asdkfj12324kdsk",
      amount: "N20,000",
      status: "success",
      country: "Nigeria",
      route: "P2P",
      date: "22/10/25 - 07:22 AM",
      recipient: "Shawnn Michael",
      vendorName: "Shawnn Michael",
      fee: "N10",
      bank: "P2P",
      accountNumber: "1234567893",
      accountName: "Shawnn Michael",
      paymentMethod: "P2P"
    },
    {
      id: "asdkfj12324kdsk",
      amount: "N20,000",
      status: "success",
      country: "Nigeria",
      route: "P2P",
      date: "22/10/25 - 07:22 AM",
      recipient: "Anita Baker",
      vendorName: "Anita Baker",
      fee: "N10",
      bank: "P2P",
      accountNumber: "1234567894",
      accountName: "Anita Baker",
      paymentMethod: "P2P"
    }
  ];

  const billPaymentsTransactions = [
    {
      id: "asdkfj12324kdsk",
      amount: "N2,000",
      status: "success",
      country: "Nigeria",
      route: "Bill Payment",
      type: "Airtime",
      date: "22/10/25 - 07:22 AM",
      recipient: "Bill Payment User 1",
      fee: "N0",
      bank: "Bill Payment",
      accountNumber: "BILL001",
      accountName: "Bill Payment User 1",
      paymentMethod: "Bill Payment",
      billerType: "MTN",
      mobileNumber: "0901245678",
      rechargeNumber: "081245789",
      transactionType: "Airtime Top Up"
    },
    {
      id: "12dwerkxywurcksc",
      amount: "N2,000",
      status: "success",
      country: "Nigeria",
      route: "Bill Payment",
      type: "Cable tv",
      date: "Oct 16, 2025 - 07:22AM",
      recipient: "Bill Payment User 2",
      fee: "N0",
      bank: "Bill Payment",
      accountNumber: "BILL002",
      accountName: "Bill Payment User 2",
      paymentMethod: "Bill Payment",
      billerType: "Dstv",
      plan: "Dstv Premium",
      decoderNumber: "042457896",
      cableAccountName: "Qamardeen Abdul Malik",
      transactionType: "Cable TV"
    },
    {
      id: "12dwerkxywurcksc",
      amount: "N2,000",
      status: "success",
      country: "Nigeria",
      route: "Bill Payment",
      type: "Data Recharge",
      date: "Oct 16, 2025 - 07:22AM",
      recipient: "Bill Payment User 3",
      fee: "N0",
      bank: "Bill Payment",
      accountNumber: "BILL003",
      accountName: "Bill Payment User 3",
      paymentMethod: "Bill Payment",
      billerType: "MTN",
      mobileNumber: "08012456789",
      plan: "1.5 GB for 30 Days",
      rechargeNumber: "081245789",
      transactionType: "Bill Payment"
    },
    {
      id: "12dwerkxywurcksc",
      amount: "N2,000",
      status: "success",
      country: "Nigeria",
      route: "Bill Payment",
      type: "Electricity",
      date: "Oct 16, 2025 - 07:22AM",
      recipient: "Bill Payment User 4",
      fee: "N0",
      bank: "Bill Payment",
      accountNumber: "BILL004",
      accountName: "Bill Payment User 4",
      paymentMethod: "Bill Payment",
      billerType: "Ikeja Electricity",
      accountType: "Prepaid",
      meterNumber: "042457896",
      electricityAccountName: "Qamardeen Abdul Malik",
      token: "ABCD-DFGTH-ASWER-1234-133ER",
      transactionType: "Electricity"
    },
    {
      id: "12dwerkxywurcksc",
      amount: "N2,000",
      status: "success",
      country: "Nigeria",
      route: "Bill Payment",
      type: "Betting",
      date: "Oct 16, 2025 - 07:22AM",
      recipient: "Bill Payment User 5",
      fee: "N0",
      bank: "Bill Payment",
      accountNumber: "BILL005",
      accountName: "Bill Payment User 5",
      paymentMethod: "Bill Payment",
      billerType: "Sportybet",
      userId: "081234567",
      bettingAccountName: "Qamardeen Abdul Malik",
      token: "ABCD-DFGTH-ASWER-1234-133ER",
      transactionType: "Betting"
    },
    {
      id: "12dwerkxywurcksc",
      amount: "N2,000",
      status: "success",
      country: "Nigeria",
      route: "Bill Payment",
      type: "Internet",
      date: "Oct 16, 2025 - 07:22AM",
      recipient: "Bill Payment User 6",
      fee: "N0",
      bank: "Bill Payment",
      accountNumber: "BILL006",
      accountName: "Bill Payment User 6",
      paymentMethod: "Bill Payment",
      billerType: "Smile",
      routerNumber: "08012456789",
      plan: "1.5 GB for 30 Days",
      rechargeNumber: "081245789",
      transactionType: "Bill Payment"
    }
  ];

  // Crypto transactions data
  const cryptoTransactions = [
    {
      id: "Crypto Deposit",
      amount: "0.000123",
      status: "success",
      crypto: "Ethereum",
      network: "Ethereum",
      date: "22/10/25 - 07:22 AM",
      recipient: "Crypto User 1",
      fee: "0.00001",
      cryptoLogo: images.image_26,
      quantity: "0.000123 ETH",
      amountUSD: "$2,550.50",
      feeUSD: "$2.50",
      receivingAddress: "0x123edfgtrwe457kslwitkwflelwlvid",
      sendingAddress: "0x123edfgtrwe457kslwitkwflelwlvid",
      txHash: "13ijksm219ef23e9f3295h2nfi923rf9n9219",
      transactionId: "12dwerkxywurcksc"
    },
    {
      id: "Crypto Deposit",
      amount: "0.000456",
      status: "pending",
      crypto: "Ethereum",
      network: "Ethereum",
      date: "22/10/25 - 08:15 AM",
      recipient: "Crypto User 2",
      fee: "0.00002",
      cryptoLogo: images.image_26,
      quantity: "0.25 ETH",
      amountUSD: "$2,550.50",
      feeUSD: "$2.50",
      receivingAddress: "0x123edfgtrwe457kslwitkwflelwlvid",
      sendingAddress: "0x123c2fk3edw",
      txHash: "13ijksm219ef23e9f3295h2nfi923rf9n9219",
      transactionId: "12dwerkxywurcksc"
    },
    {
      id: "Crypto Deposit",
      amount: "0.000789",
      status: "success",
      crypto: "Ethereum",
      network: "Ethereum",
      date: "22/10/25 - 09:30 AM",
      recipient: "Crypto User 3",
      fee: "0.00001",
      cryptoLogo: images.image_26,
      quantity: "0.000789 ETH",
      amountUSD: "$2,550.50",
      feeUSD: "$2.50",
      receivingAddress: "0x123edfgtrwe457kslwitkwflelwlvid",
      sendingAddress: "0x123edfgtrwe457kslwitkwflelwlvid",
      txHash: "13ijksm219ef23e9f3295h2nfi923rf9n9219",
      transactionId: "12dwerkxywurcksc"
    },
    {
      id: "Crypto Deposit",
      amount: "0.001234",
      status: "pending",
      crypto: "Ethereum",
      network: "Ethereum",
      date: "22/10/25 - 10:45 AM",
      recipient: "Crypto User 4",
      fee: "0.00005",
      cryptoLogo: images.image_26,
      quantity: "0.001234 ETH",
      amountUSD: "$2,550.50",
      feeUSD: "$2.50",
      receivingAddress: "0x123edfgtrwe457kslwitkwflelwlvid",
      sendingAddress: "0x123c2fk3edw",
      txHash: "13ijksm219ef23e9f3295h2nfi923rf9n9219",
      transactionId: "12dwerkxywurcksc"
    },
    {
      id: "Crypto Deposit",
      amount: "0.000567",
      status: "success",
      crypto: "Ethereum",
      network: "Ethereum",
      date: "22/10/25 - 11:20 AM",
      recipient: "Crypto User 5",
      fee: "0.00001",
      cryptoLogo: images.image_26,
      quantity: "0.000567 ETH",
      amountUSD: "$2,550.50",
      feeUSD: "$2.50",
      receivingAddress: "0x123edfgtrwe457kslwitkwflelwlvid",
      sendingAddress: "0x123edfgtrwe457kslwitkwflelwlvid",
      txHash: "13ijksm219ef23e9f3295h2nfi923rf9n9219",
      transactionId: "12dwerkxywurcksc"
    },
    {
      id: "Crypto Deposit",
      amount: "0.000890",
      status: "pending",
      crypto: "Ethereum",
      network: "Ethereum",
      date: "22/10/25 - 12:30 PM",
      recipient: "Crypto User 6",
      fee: "0.00001",
      cryptoLogo: images.image_26,
      quantity: "0.000890 ETH",
      amountUSD: "$2,550.50",
      feeUSD: "$2.50",
      receivingAddress: "0x123edfgtrwe457kslwitkwflelwlvid",
      sendingAddress: "0x123c2fk3edw",
      txHash: "13ijksm219ef23e9f3295h2nfi923rf9n9219",
      transactionId: "12dwerkxywurcksc"
    }
  ];

  // Get transactions based on selected action and transaction type
  const getTransactions = () => {
    let transactions;

    if (transactionType === "Crypto") {
      transactions = cryptoTransactions;
    } else {
      switch (selectedAction) {
        case "Send":
          transactions = sendTransactions;
          break;
        case "Fund":
          transactions = fundTransactions;
          break;
        case "Convert":
          transactions = convertTransactions;
          break;
        case "Withdraw":
          transactions = withdrawTransactions;
          break;
        case "P2P":
          transactions = p2pTransactions;
          break;
        case "Bill Payments":
          transactions = billPaymentsTransactions;
          break;
        default:
          transactions = sendTransactions;
      }
    }

    // Filter by status only for Crypto transactions
    if (transactionType === "Crypto" && selectedStatus !== "All Status") {
      const statusMap: Record<string, string> = {
        "Successful": "success",
        "Pending": "pending",
        "Failed": "failed"
      };
      const filterStatus = statusMap[selectedStatus];
      if (filterStatus) {
        transactions = transactions.filter(t => t.status === filterStatus);
      }
    }

    return transactions;
  };

  const transactions = getTransactions();

  const handleSelectAll = () => {
    if (selectedTransactions.size === transactions.length && transactions.length > 0) {
      setSelectedTransactions(new Set());
    } else {
      setSelectedTransactions(new Set(transactions.map((_, index) => index.toString())));
    }
  };

  const handleSelectTransaction = (transactionIndex: number) => {
    setSelectedTransactions(prev => {
      const newSet = new Set(prev);
      const indexStr = transactionIndex.toString();
      if (newSet.has(indexStr)) {
        newSet.delete(indexStr);
      } else {
        newSet.add(indexStr);
      }
      return newSet;
    });
  };

  return (
    <div>
      {/* Top Navigation Bar */}
      <div
        className="md:mx-[-32px] mx-[-16px] md:mt-[-32px] mt-[-16px] mb-6 md:mb-6"
        style={{
          width: 'calc(100% + 64px)'
        }}
      >
        <div
          className="flex gap-2 md:gap-6 border-b border-gray-700 flex-wrap md:flex-nowrap overflow-x-auto h-[50px]"
          style={{
            width: '100%',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
            borderBottomWidth: '0.3px',
            borderBottomStyle: 'solid',
            borderBottomColor: 'rgba(156, 163, 175, 0.5)',
            position: 'relative'
          }}
        >
          <button
            onClick={() => navigate(`/user/management/profile/${username}`)}
            className="text-gray-400 hover:text-white transition-colors"
            style={{
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              marginLeft: '32px'
            }}
          >
            User Profile
          </button>
          <button
            onClick={() => navigate(`/user/management/${username}/wallet`)}
            className="text-gray-400 hover:text-white transition-colors"
            style={{
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            User Wallet
          </button>
          <button
            className="relative"
            style={{
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              color: '#95D440',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            Transactions
            <span
              style={{
                position: 'absolute',
                bottom: '-0.3px',
                left: 0,
                right: 0,
                height: '2px',
                backgroundColor: '#95D440'
              }}
            ></span>
          </button>
          <button
            onClick={() => navigate(`/user/management/${username}/p2p`)}
            className="text-gray-400 hover:text-white transition-colors"
            style={{
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            P2P Profile
          </button>

          {/* Toggle Switch */}
          <div className="flex items-center ml-auto">
            <div className="flex items-center bg-[#1A252F]" style={{
              width: '208px',
              height: '34px',
              borderRadius: '100px',
              borderWidth: '0.3px',
              borderStyle: 'solid',
              borderColor: '#FFFFFF33',
              padding: '2px',
              position: 'relative',
              marginRight: '30px'
            }}>
              <button
                onClick={() => setTransactionType("Fiat")}
                className="rounded-full text-sm font-normal transition-all duration-200"
                style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  flex: 1,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  ...(transactionType === "Fiat" ? {
                    backgroundColor: '#95D440',
                    color: '#000000'
                  } : {
                    backgroundColor: 'transparent',
                    color: '#9CA3AF'
                  })
                }}
              >
                Fiat
              </button>
              <button
                onClick={() => setTransactionType("Crypto")}
                className="rounded-full text-sm font-normal transition-all duration-200"
                style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  flex: 1,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  ...(transactionType === "Crypto" ? {
                    backgroundColor: '#95D440',
                    color: '#000000'
                  } : {
                    backgroundColor: 'transparent',
                    color: '#9CA3AF'
                  })
                }}
              >
                Crypto
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section with Gradient Background */}
      <div
        className="px-8 mt-6 mb-6"
        style={{
          background: 'linear-gradient(90deg, #0B1A20 0%, #0B1420 100%)',
          height: '250px',
          borderRadius: '15px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        {/* Header Section with Time Filters */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-white mb-2 pt-10 font-normal not-italic text-[30px] leading-[100%] tracking-[0%]" style={{
              fontFamily: 'Agbalumo, sans-serif'
            }}>{transactionType === 'Crypto' ? 'Crypto Transactions' : 'User Transactions'}</h2>
            <p className="pt-2" style={{
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#757E81'
            }}>{transactionType === 'Crypto' ? 'View manage my user crypto transactions' : 'View manage my user wallet details'}</p>
          </div>

          {/* Time Range Filters */}
          <div className="flex items-center gap-2 border-b border-white/10 pb-4 mt-7 pt-5.5" style={{ borderBottomWidth: '0.3px' }}>
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => setSelectedTimeRange(range)}
                className={`px-4 py-2 rounded-full text-sm font-normal transition-colors ${selectedTimeRange === range
                  ? 'bg-white text-black'
                  : 'bg-transparent text-white border border-[#273B3F]'
                  }`}
                style={{
                  borderWidth: '0.3px',
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
                }}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Transaction Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Total Transactions Card */}
          <div className="p-6 flex items-center gap-4" style={{ borderRadius: '10px', background: 'linear-gradient(90deg, #4880C0 0%, #1B589E 100%)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4887CF' }}>
              <img
                src={images.Vector3}
                alt="Wallet"
                className="w-6 h-6"
                style={{ filter: 'brightness(0)' }}
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-normal mb-1" style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                color: '#CEDDED'
              }}>Total Transactions</p>
              <p className="text-white text-3xl font-bold leading-none" style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
              }}>250</p>
            </div>
          </div>

          {/* Fiat Transactions Card */}
          <div className="p-6 flex items-center gap-4" style={{ borderRadius: '10px', background: 'linear-gradient(90deg, #4880C0 0%, #1B589E 100%)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4887CF' }}>
              <img
                src={images.Vector3}
                alt="Wallet"
                className="w-6 h-6"
                style={{ filter: 'brightness(0)' }}
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-normal mb-1" style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                color: '#CEDDED'
              }}>Fiat Transactions</p>
              <p className="text-white text-3xl font-bold leading-none" style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
              }}>150</p>
            </div>
          </div>

          {/* Crypto Transactions Card */}
          <div className="p-6 flex items-center gap-4" style={{ borderRadius: '10px', background: 'linear-gradient(90deg, #4880C0 0%, #1B589E 100%)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4887CF' }}>
              <img
                src={images.Vector3}
                alt="Wallet"
                className="w-6 h-6"
                style={{ filter: 'brightness(0)' }}
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-normal mb-1" style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                color: '#CEDDED'
              }}>Crypto Transactions</p>
              <p className="text-white text-3xl font-bold leading-none" style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
              }}>100</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons and Filters */}
      <div className="mb-6 flex items-center flex-wrap" style={{ paddingRight: '32px' }}>
        {/* Action Buttons Container */}
        {transactionType !== 'Crypto' && (
          <div className="flex items-center" style={{
            width: '390px',
            height: '34px',
            borderRadius: '100px',
            borderWidth: '0.3px',
            borderStyle: 'solid',
            borderColor: '#FFFFFF33',
            backgroundColor: '#FFFFFF0D',
            paddingTop: '2px',
            paddingBottom: '2px',
            paddingLeft: '0',
            paddingRight: '16px',
            gap: '8px'
          }}>
            {actionButtons.map((action) => (
              <button
                key={action}
                onClick={() => setSelectedAction(action)}
                className={`font-normal transition-colors whitespace-nowrap ${selectedAction === action
                  ? 'text-black'
                  : 'text-white'
                  }`}
                style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '10px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  height: '30px',
                  borderRadius: '100px',
                  padding: '0 12px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '0',
                  ...(selectedAction === action ? {
                    backgroundColor: '#A9EF45',
                    color: '#000000'
                  } : {
                    backgroundColor: 'transparent',
                    color: '#FFFFFF'
                  })
                }}
              >
                {action}
              </button>
            ))}
          </div>
        )}
        {/* Crypto Action Buttons */}
        {transactionType === 'Crypto' && (
          <div className="flex items-center" style={{
            width: 'auto',
            height: '34px',
            borderRadius: '100px',
            borderWidth: '0.3px',
            borderStyle: 'solid',
            borderColor: '#FFFFFF33',
            backgroundColor: '#FFFFFF0D',
            paddingTop: '2px',
            paddingBottom: '2px',
            paddingLeft: '0',
            paddingRight: '0',
            gap: '4px'
          }}>
            {cryptoActions.map((action) => (
              <button
                key={action}
                onClick={() => setSelectedCryptoAction(action)}
                className={`font-normal transition-colors whitespace-nowrap ${selectedCryptoAction === action
                  ? 'text-black'
                  : 'text-white'
                  }`}
                style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '10px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  height: '30px',
                  borderRadius: '100px',
                  padding: '0 12px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: action === 'P2P' ? 'auto' : '0',
                  ...(selectedCryptoAction === action ? {
                    backgroundColor: '#A9EF45',
                    color: '#000000'
                  } : {
                    backgroundColor: 'transparent',
                    color: '#FFFFFF'
                  })
                }}
              >
                {action}
              </button>
            ))}
          </div>
        )}
        {/* Bulk Action Button */}
        <button
          className="text-white border border-[#273B3F] whitespace-nowrap flex items-center justify-center"
          style={{
            width: '97px',
            height: '34px',
            borderRadius: '100px',
            borderWidth: '0.3px',
            backgroundColor: '#111E26',
            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: '10px',
            lineHeight: '100%',
            letterSpacing: '0%',
            marginLeft: '15px'
          }}
        >
          Bulk Action
        </button>

        {/* Buy Dropdown - For P2P and Bill Payments */}
        {(selectedAction === 'P2P' || selectedAction === 'Bill Payments') && (
          <div className="relative" style={{ marginLeft: '15px' }}>
            <button
              onClick={() => {
                setShowBuyDropdown(!showBuyDropdown);
                setShowCountryDropdown(false);
                setShowStatusDropdown(false);
              }}
              className="flex items-center justify-center gap-1 text-white border border-[#273B3F] whitespace-nowrap"
              style={{
                width: '97px',
                height: '34px',
                borderRadius: '100px',
                borderWidth: '0.3px',
                backgroundColor: '#111E26',
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '10px',
                lineHeight: '100%',
                letterSpacing: '0%'
              }}
            >
              {selectedBuy}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {showBuyDropdown && (
              <>
                <style>{`
                  .buy-dropdown::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                <div ref={buyDropdownRef} className="absolute top-full left-0 mt-2 z-50 buy-dropdown" style={{
                  width: selectedAction === 'Bill Payments' ? '150px' : '105px',
                  borderRadius: '10px',
                  backgroundColor: '#020C19B2',
                  boxShadow: '5px 5px 15px 0px #00000040',
                  backdropFilter: 'blur(4px)',
                  padding: '4px 0',
                  overflow: 'hidden'
                }}>
                  {(selectedAction === 'Bill Payments'
                    ? ["All Bill Payments", "Airtime Recharge", "Data Recharge", "Cable TV", "Electricity", "Betting", "Internet subscription"]
                    : ["All Trades", "Buy Trades", "Sell Trades"]
                  ).map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedBuy(option);
                        setShowBuyDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm font-normal transition-colors hover:bg-white/5 ${selectedBuy === option ? 'bg-white/10' : ''
                        }`}
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        color: 'white',
                        fontSize: '10px'
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Tx Type Dropdown */}
        {selectedAction !== 'Convert' && selectedAction !== 'P2P' && selectedAction !== 'Bill Payments' && transactionType !== 'Crypto' && (
          <div className="relative" style={{ marginLeft: '15px' }}>
            <button
              onClick={() => {
                setShowTxTypeDropdown(!showTxTypeDropdown);
                setShowCountryDropdown(false);
                setShowStatusDropdown(false);
              }}
              className="flex items-center justify-center gap-1 text-white border border-[#273B3F] whitespace-nowrap"
              style={{
                width: '97px',
                height: '34px',
                borderRadius: '100px',
                borderWidth: '0.3px',
                backgroundColor: '#111E26',
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '10px',
                lineHeight: '100%',
                letterSpacing: '0%'
              }}
            >
              {(selectedTxType === "Tx Type" || selectedTxType === "Route") ? getTxTypeLabel() : selectedTxType}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {showTxTypeDropdown && (
              <>
                <style>{`
                  .tx-type-dropdown::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                <div ref={txTypeDropdownRef} className="absolute top-full left-0 mt-2 z-50 tx-type-dropdown" style={{
                  width: '105px',
                  borderRadius: '10px',
                  backgroundColor: '#020C19B2',
                  boxShadow: '5px 5px 15px 0px #00000040',
                  backdropFilter: 'blur(4px)',
                  padding: '4px 0',
                  overflow: 'hidden'
                }}>
                  {txTypeOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedTxType(option);
                        setShowTxTypeDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm font-normal transition-colors hover:bg-white/5 ${selectedTxType === option ? 'bg-white/10' : ''
                        }`}
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        color: 'white',
                        fontSize: '10px'
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Country Dropdown */}
        {selectedAction !== 'Convert' && transactionType !== 'Crypto' && (
          <div className="relative" style={{ marginLeft: '15px' }}>
            <button
              onClick={() => {
                setShowCountryDropdown(!showCountryDropdown);
                setShowTxTypeDropdown(false);
                setShowStatusDropdown(false);
              }}
              className="flex items-center justify-center gap-1 text-white border border-[#273B3F] whitespace-nowrap"
              style={{
                width: '97px',
                height: '34px',
                borderRadius: '100px',
                borderWidth: '0.3px',
                backgroundColor: '#111E26',
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '10px',
                lineHeight: '100%',
                letterSpacing: '0%'
              }}
            >
              {selectedCountry}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {showCountryDropdown && (
              <>
                <style>{`
                  .country-dropdown::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                <div ref={countryDropdownRef} className="absolute top-full left-0 mt-2 z-50 overflow-y-auto country-dropdown" style={{
                  width: '105px',
                  height: '127px',
                  borderRadius: '10px',
                  backgroundColor: '#020C19B2',
                  boxShadow: '5px 5px 15px 0px #00000040',
                  backdropFilter: 'blur(4px)',
                  padding: '4px 0',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}>
                  {countryOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedCountry(option);
                        setShowCountryDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm font-normal transition-colors hover:bg-white/5 ${selectedCountry === option ? 'bg-white/10' : ''
                        }`}
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        color: 'white',
                        fontSize: '10px'
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* All Status Dropdown */}
        <div className="relative" style={{ marginLeft: '15px' }}>
          <button
            onClick={() => {
              setShowStatusDropdown(!showStatusDropdown);
              setShowTxTypeDropdown(false);
              setShowCountryDropdown(false);
              setShowTokenDropdown(false);
            }}
            className="flex items-center justify-center gap-1 text-white border border-[#273B3F] whitespace-nowrap"
            style={{
              width: '97px',
              height: '34px',
              borderRadius: '100px',
              borderWidth: '0.3px',
              backgroundColor: '#111E26',
              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '10px',
              lineHeight: '100%',
              letterSpacing: '0%'
            }}
          >
            {selectedStatus}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          {showStatusDropdown && (
            <>
              <style>{`
                .status-dropdown::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <div ref={statusDropdownRef} className="absolute top-full left-0 mt-2 z-50 overflow-y-auto status-dropdown" style={{
                width: '105px',
                height: '127px',
                borderRadius: '10px',
                backgroundColor: '#020C19B2',
                boxShadow: '5px 5px 15px 0px #00000040',
                backdropFilter: 'blur(4px)',
                padding: '4px 0',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}>
                {statusOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedStatus(option);
                      setShowStatusDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm font-normal transition-colors hover:bg-white/5 ${selectedStatus === option ? 'bg-white/10' : ''
                      }`}
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      color: 'white',
                      fontSize: '10px'
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Token Dropdown - Only for Crypto */}
        {transactionType === 'Crypto' && (
          <div className="relative" style={{ marginLeft: '15px' }}>
            <button
              onClick={() => {
                setShowTokenDropdown(!showTokenDropdown);
                setShowStatusDropdown(false);
                setShowTxTypeDropdown(false);
                setShowCountryDropdown(false);
              }}
              className="flex items-center justify-center gap-1 text-white border border-[#273B3F] whitespace-nowrap"
              style={{
                width: '97px',
                height: '34px',
                borderRadius: '100px',
                borderWidth: '0.3px',
                backgroundColor: '#111E26',
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '10px',
                lineHeight: '100%',
                letterSpacing: '0%'
              }}
            >
              {selectedToken === "Token" ? "Token" : tokenOptions.find(t => t.name === selectedToken)?.name || "Token"}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {showTokenDropdown && (
              <>
                <style>{`
                  .token-dropdown::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                <div ref={tokenDropdownRef} className="absolute top-full left-0 mt-2 z-50 overflow-y-auto token-dropdown" style={{
                  width: '200px',
                  borderRadius: '10px',
                  backgroundColor: '#020C19',
                  boxShadow: '5px 5px 15px 0px #00000040',
                  backdropFilter: 'blur(4px)',
                  padding: '4px 0',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}>
                  {tokenOptions.map((token) => (
                    <button
                      key={token.name}
                      onClick={() => {
                        setSelectedToken(token.name);
                        setShowTokenDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-3 transition-colors hover:bg-white/5 ${selectedToken === token.name ? 'bg-white/10' : ''
                        }`}
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      {/* Token Logo */}
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        overflow: 'hidden'
                      }}>
                        <img
                          src={token.logo}
                          alt={token.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '50%'
                          }}
                        />
                      </div>
                      {/* Token Name and Balance */}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                        flex: 1
                      }}>
                        <span style={{
                          fontSize: '12px',
                          fontWeight: 400,
                          color: '#FFFFFF'
                        }}>
                          {token.name}
                        </span>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 400,
                          color: '#9CA3AF'
                        }}>
                          Bal : {token.balance}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Send Transactions Section */}
      <div>
        <div
          style={{
            backgroundColor: '#020B16',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            borderBottomLeftRadius: '15px',
            borderBottomRightRadius: '15px',
            width: '100%'
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" style={{ padding: '24px 32px 16px 32px', height: '60px' }}>
            <h3
              className="text-white"
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                fontStyle: 'normal',
                lineHeight: '100%',
                letterSpacing: '0%'
              }}
            >
              {transactionType === 'Crypto' ? 'Crypto Transactions' : `${selectedAction} Transactions`}
            </h3>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-white"
                style={{
                  width: '267px',
                  height: '35px',
                  borderRadius: '100px',
                  border: 'none',
                  backgroundColor: '#0F1722',
                  paddingLeft: '40px',
                  paddingRight: '16px',
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '12px',
                  outline: 'none'
                }}
              />
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{
                  position: 'absolute',
                  left: '16px',
                  color: '#9CA3AF'
                }}
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
          </div>

          {/* Table Section */}
          <div style={{ width: '100%', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px', overflow: 'hidden' }}>
            {/* Table Header */}
            <div style={{ backgroundColor: '#1C2530', width: '100%' }}>
              <table className="w-full" style={{ height: '60px', width: '100%', tableLayout: 'auto' }}>
                <thead>
                  <tr style={{ height: '60px', width: '100%' }}>
                    <th className="text-left py-3" style={{ verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '24px', paddingRight: '12px' }}>
                      <div className="relative inline-block" style={{ width: '16px', height: '16px' }}>
                        <input
                          type="checkbox"
                          checked={selectedTransactions.size === transactions.length && transactions.length > 0}
                          onChange={handleSelectAll}
                          className="rounded cursor-pointer"
                          style={{
                            width: '16px',
                            height: '16px',
                            backgroundColor: selectedTransactions.size === transactions.length && transactions.length > 0 ? '#A9EF45' : 'transparent',
                            borderColor: 'white',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            outline: 'none',
                            margin: 0,
                            padding: 0,
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                            cursor: 'pointer',
                            position: 'relative',
                            zIndex: 1
                          }}
                        />
                        {selectedTransactions.size === transactions.length && transactions.length > 0 && (
                          <svg
                            className="absolute pointer-events-none"
                            style={{
                              width: '10px',
                              height: '10px',
                              top: '3px',
                              left: '3px',
                              marginTop: '2px',
                              zIndex: 2
                            }}
                            fill="none"
                            stroke="black"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </th>
                    <th
                      className="text-left py-3 text-white"
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '12px',
                        fontWeight: 400,
                        verticalAlign: 'middle',
                        backgroundColor: '#1C2530',
                        paddingLeft: '0px',
                        paddingRight: '40px'
                      }}
                    >
                      Transaction id
                    </th>
                    {selectedAction === 'Convert' ? (
                      <>
                        <th
                          className="text-left py-3 text-white"
                          style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '12px',
                            fontWeight: 400,
                            verticalAlign: 'middle',
                            backgroundColor: '#1C2530',
                            paddingLeft: '0px',
                            paddingRight: '42px'
                          }}
                        >
                          Amount Sent
                        </th>
                        <th
                          className="text-left py-3 text-white"
                          style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '12px',
                            fontWeight: 400,
                            verticalAlign: 'middle',
                            backgroundColor: '#1C2530',
                            paddingLeft: '0px',
                            paddingRight: '42px'
                          }}
                        >
                          Received
                        </th>
                        <th
                          className="text-left py-3 text-white"
                          style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '12px',
                            fontWeight: 400,
                            verticalAlign: 'middle',
                            backgroundColor: '#1C2530',
                            paddingLeft: '0px',
                            paddingRight: '2px'
                          }}
                        >
                          Status
                        </th>
                        <th
                          className="text-left py-3 text-white"
                          style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '12px',
                            fontWeight: 400,
                            verticalAlign: 'middle',
                            backgroundColor: '#1C2530',
                            paddingLeft: '50px',
                            paddingRight: '42px'
                          }}
                        >
                          Rate
                        </th>
                        <th
                          className="text-left py-3 text-white"
                          style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '12px',
                            fontWeight: 400,
                            verticalAlign: 'middle',
                            backgroundColor: '#1C2530',
                            paddingLeft: '0px',
                            paddingRight: '82px'
                          }}
                        >
                          Conversion
                        </th>
                      </>
                    ) : (
                      <>
                        <th
                          className="text-left py-3 text-white"
                          style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '12px',
                            fontWeight: 400,
                            verticalAlign: 'middle',
                            backgroundColor: '#1C2530',
                            paddingLeft: '0px',
                            paddingRight: '42px'
                          }}
                        >
                          Amount
                        </th>
                        <th
                          className="text-left py-3 text-white"
                          style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontSize: '12px',
                            fontWeight: 400,
                            verticalAlign: 'middle',
                            backgroundColor: '#1C2530',
                            paddingLeft: '0px',
                            paddingRight: '2px'
                          }}
                        >
                          Status
                        </th>
                        {transactionType === 'Crypto' ? (
                          <>
                            <th
                              className="text-left py-3 text-white"
                              style={{
                                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                                fontSize: '12px',
                                fontWeight: 400,
                                verticalAlign: 'middle',
                                backgroundColor: '#1C2530',
                                paddingLeft: '90px',
                                paddingRight: '32px'
                              }}
                            >
                              Crypto
                            </th>
                            <th
                              className="text-left py-3 text-white"
                              style={{
                                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                                fontSize: '12px',
                                fontWeight: 400,
                                verticalAlign: 'middle',
                                backgroundColor: '#1C2530',
                                paddingLeft: '40px',
                                paddingRight: '162px'
                              }}
                            >
                              Network
                            </th>
                          </>
                        ) : (
                          <>
                            <th
                              className="text-left py-3 text-white"
                              style={{
                                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                                fontSize: '12px',
                                fontWeight: 400,
                                verticalAlign: 'middle',
                                backgroundColor: '#1C2530',
                                paddingLeft: '50px',
                                paddingRight: '32px'
                              }}
                            >
                              Country
                            </th>
                            <th
                              className="text-left py-3 text-white"
                              style={{
                                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                                fontSize: '12px',
                                fontWeight: 400,
                                verticalAlign: 'middle',
                                backgroundColor: '#1C2530',
                                paddingLeft: selectedAction === 'P2P' || selectedAction === 'Bill Payments' ? '40px' : '40px',
                                paddingRight: '122px'
                              }}
                            >
                              {selectedAction === 'P2P' ? 'Vendor Name' : selectedAction === 'Bill Payments' ? 'Type' : 'Route'}
                            </th>
                          </>
                        )}
                      </>
                    )}
                    <th
                      className="text-left py-3 text-white"
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '12px',
                        fontWeight: 400,
                        verticalAlign: 'middle',
                        backgroundColor: '#1C2530',
                        paddingLeft: '0px',
                        paddingRight: '62px'
                      }}
                    >
                      Date
                    </th>
                    <th
                      className="text-left py-3 text-white"
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '12px',
                        fontWeight: 400,
                        verticalAlign: 'middle',
                        backgroundColor: '#1C2530',
                        paddingLeft: '60px',
                        paddingRight: '32px'
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
              </table>
            </div>

            {/* Table Body */}
            <div style={{ backgroundColor: '#0F1825', width: '100%', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
              <table className="w-full" style={{ width: '100%', tableLayout: 'auto' }}>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr
                      key={index}
                      className="border-b border-[#2B363E] hover:bg-[#1A252F] transition-colors"
                      style={{ height: '60px' }}
                    >
                      <td className="py-3" style={{ verticalAlign: 'middle', paddingLeft: '24px', paddingRight: '12px' }}>
                        <div className="relative inline-block" style={{ width: '16px', height: '16px' }}>
                          <input
                            type="checkbox"
                            checked={selectedTransactions.has(index.toString())}
                            onChange={() => handleSelectTransaction(index)}
                            className="rounded cursor-pointer"
                            style={{
                              width: '16px',
                              height: '16px',
                              backgroundColor: selectedTransactions.has(index.toString()) ? '#A9EF45' : 'transparent',
                              borderColor: 'white',
                              borderWidth: '1px',
                              borderStyle: 'solid',
                              outline: 'none',
                              margin: 0,
                              padding: 0,
                              appearance: 'none',
                              WebkitAppearance: 'none',
                              MozAppearance: 'none',
                              cursor: 'pointer',
                              position: 'relative',
                              zIndex: 1
                            }}
                          />
                          {selectedTransactions.has(index.toString()) && (
                            <svg
                              className="absolute pointer-events-none"
                              style={{
                                width: '10px',
                                height: '10px',
                                top: '3px',
                                left: '3px',
                                marginTop: '2px',
                                zIndex: 2
                              }}
                              fill="none"
                              stroke="black"
                              strokeWidth="2.5"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </td>
                      <td
                        className="text-left py-3"
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '12px',
                          fontWeight: 400,
                          color: '#D1D5DB',
                          verticalAlign: 'middle',
                          paddingLeft: '0px',
                          paddingRight: selectedAction === 'Convert' ? '30px' : '42px'
                        }}
                      >
                        {transaction.id}
                      </td>
                      {selectedAction === 'Convert' ? (
                        <>
                          <td
                            className="text-left py-3"
                            style={{
                              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '12px',
                              fontWeight: 400,
                              color: '#D1D5DB',
                              verticalAlign: 'middle',
                              paddingLeft: '70px',
                              paddingRight: '42px'
                            }}
                          >
                            {(transaction as any).amountSent || transaction.amount}
                          </td>
                          <td
                            className="text-left py-3"
                            style={{
                              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '12px',
                              fontWeight: 400,
                              color: '#D1D5DB',
                              verticalAlign: 'middle',
                              paddingLeft: '60px',
                              paddingRight: '42px'
                            }}
                          >
                            {(transaction as any).received || '-'}
                          </td>
                          <td className="py-3" style={{ verticalAlign: 'middle', paddingLeft: '30px', paddingRight: '32px' }}>
                            <div className="flex items-center">
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: transaction.status === 'success' ? '#008000' : transaction.status === 'failed' ? '#FF0000' : '#FFD700' }}></span>
                            </div>
                          </td>
                          <td
                            className="text-left py-3"
                            style={{
                              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '12px',
                              fontWeight: 400,
                              color: '#D1D5DB',
                              verticalAlign: 'middle',
                              paddingLeft: '30px',
                              paddingRight: '42px'
                            }}
                          >
                            {(transaction as any).rate || '-'}
                          </td>
                          <td
                            className="text-left py-3"
                            style={{
                              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '12px',
                              fontWeight: 400,
                              color: '#D1D5DB',
                              verticalAlign: 'middle',
                              paddingLeft: '20px',
                              paddingRight: '122px'
                            }}
                          >
                            {(transaction as any).conversion || '-'}
                          </td>
                        </>
                      ) : (
                        <>
                          <td
                            className="text-left py-3"
                            style={{
                              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                              fontSize: '12px',
                              fontWeight: 400,
                              color: '#D1D5DB',
                              verticalAlign: 'middle',
                              paddingLeft: '0px',
                              paddingRight: '62px'
                            }}
                          >
                            {transaction.amount}
                          </td>
                          <td className="py-3" style={{ verticalAlign: 'middle', paddingLeft: '0px', paddingRight: '72px' }}>
                            <div className="flex items-center">
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: transaction.status === 'success' ? '#008000' : transaction.status === 'failed' ? '#FF0000' : '#FFD700' }}></span>
                            </div>
                          </td>
                          {transactionType === 'Crypto' ? (
                            <>
                              <td className="py-3" style={{ verticalAlign: 'middle', paddingLeft: '0px', paddingRight: '62px' }}>
                                <div className="flex items-center gap-2">
                                  <div style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    flexShrink: 0
                                  }}>
                                    <img
                                      src={(transaction as any).cryptoLogo || images.image_26}
                                      alt={(transaction as any).crypto || 'Ethereum'}
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '50%'
                                      }}
                                    />
                                  </div>
                                  <span
                                    style={{
                                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                                      fontSize: '12px',
                                      fontWeight: 400,
                                      color: '#D1D5DB'
                                    }}
                                  >
                                    {(transaction as any).crypto || 'Ethereum'}
                                  </span>
                                </div>
                              </td>
                              <td
                                className="text-left py-3"
                                style={{
                                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                                  fontSize: '12px',
                                  fontWeight: 400,
                                  color: '#D1D5DB',
                                  verticalAlign: 'middle',
                                  paddingLeft: '0px',
                                  paddingRight: '135px'
                                }}
                              >
                                {(transaction as any).network || 'Ethereum'}
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="py-3" style={{ verticalAlign: 'middle', paddingLeft: '0px', paddingRight: '62px' }}>
                                <div className="flex items-center gap-2">
                                  <img
                                    src={images.flag}
                                    alt={(transaction as any).country || 'Country'}
                                    className="w-5 h-3 object-cover rounded"
                                  />
                                  <span
                                    style={{
                                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                                      fontSize: '12px',
                                      fontWeight: 400,
                                      color: '#D1D5DB'
                                    }}
                                  >
                                    {(transaction as any).country || 'Nigeria'}
                                  </span>
                                </div>
                              </td>
                              <td
                                className="text-left py-3"
                                style={{
                                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                                  fontSize: '12px',
                                  fontWeight: 400,
                                  color: '#D1D5DB',
                                  verticalAlign: 'middle',
                                  paddingLeft: '0px',
                                  paddingRight: '72px'
                                }}
                              >
                                {selectedAction === 'P2P'
                                  ? ((transaction as any).vendorName || (transaction as any).recipient)
                                  : selectedAction === 'Bill Payments'
                                    ? ((transaction as any).type || (transaction as any).route)
                                    : (transaction as any).route}
                              </td>
                            </>
                          )}
                        </>
                      )}
                      <td
                        className="text-left py-3"
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          fontSize: '12px',
                          fontWeight: 400,
                          color: '#D1D5DB',
                          verticalAlign: 'middle',
                          paddingLeft: '0px',
                          paddingRight: '62px'
                        }}
                      >
                        {transaction.date}
                      </td>
                      <td className="py-3" style={{ verticalAlign: 'middle', paddingLeft: '0px', paddingRight: '24px' }}>
                        <button
                          onClick={() => {
                            setSelectedTransaction(transaction);
                            setShowTransactionModal(true);
                          }}
                          className="text-xs font-normal rounded-full whitespace-nowrap"
                          style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            backgroundColor: '#95D440',
                            color: '#000000',
                            padding: '6px 12px',
                            cursor: 'pointer',
                            border: 'none'
                          }}
                        >
                          Full Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {showTransactionModal && selectedTransaction && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#0C1D33CC',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setShowTransactionModal(false)}
        >
          <div
            className="transaction-modal"
            style={{
              backgroundColor: '#020B16',
              borderRadius: '20px',
              width: '450px',
              maxHeight: 'calc(90vh + 30px)',
              overflowY: 'auto',
              padding: '24px',
              position: 'relative',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <style>{`
              .transaction-modal::-webkit-scrollbar {
                display: none;
              }
              .transaction-modal {
                scrollbarWidth: none;
                msOverflowStyle: none;
              }
            `}</style>
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              width: 'calc(100% + 48px)',
              marginLeft: '-24px',
              marginRight: '-24px',
              paddingLeft: '24px',
              paddingRight: '24px',
              boxSizing: 'border-box'
            }}>
              <h3 style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '18px',
                fontWeight: 600,
                color: '#FFFFFF'
              }}>
                Transaction details
              </h3>
              <button
                onClick={() => setShowTransactionModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: 0,
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>

            {/* Success/Error Icon */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '120px',
                height: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                {selectedTransaction.status === 'failed' ? (
                  <img
                    src={images.Seal_red}
                    alt="Error"
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'contain'
                    }}
                  />
                ) : (
                  <img
                    src={images.seal}
                    alt="Success"
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'contain'
                    }}
                  />
                )}
              </div>
              {selectedTransaction.status === 'failed' ? (
                <>
                  <p style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#FF0000',
                    marginBottom: '8px'
                  }}>
                    {selectedTransaction.amount} Not Sent
                  </p>
                  <p style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#D1D5DB',
                    textAlign: 'center',
                    lineHeight: '1.5'
                  }}>
                    Your transfer of {selectedTransaction.amount.replace('N', '').replace(',', '')} could not be completed.
                  </p>
                </>
              ) : (
                <>
                  {selectedAction === 'Bill Payments' && (selectedTransaction as any).type === 'Airtime' ? (
                    <>
                      <p style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '20px',
                        fontWeight: 600,
                        color: '#008000',
                        marginBottom: '8px'
                      }}>
                        Success
                      </p>
                      <p style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        color: '#D1D5DB',
                        textAlign: 'center',
                        lineHeight: '1.5'
                      }}>
                        <span style={{ fontWeight: 600 }}>Congratulations,</span> You have successfully Recharged {selectedTransaction.amount} to {(selectedTransaction as any).rechargeNumber || '081245789'}.
                      </p>
                    </>
                  ) : selectedAction === 'Bill Payments' && (selectedTransaction as any).type === 'Data Recharge' ? (
                    <>
                      <p style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '20px',
                        fontWeight: 600,
                        color: '#008000',
                        marginBottom: '8px'
                      }}>
                        Success
                      </p>
                      <p style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        color: '#D1D5DB',
                        textAlign: 'center',
                        lineHeight: '1.5'
                      }}>
                        <span style={{ fontWeight: 600 }}>Congratulations,</span> You have successfully Recharged {(selectedTransaction as any).plan || '1.5 GB Data'} to {(selectedTransaction as any).rechargeNumber || '081245789'}.
                      </p>
                    </>
                  ) : selectedAction === 'Bill Payments' && (selectedTransaction as any).type === 'Cable tv' ? (
                    <>
                      <p style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '20px',
                        fontWeight: 600,
                        color: '#008000',
                        marginBottom: '8px'
                      }}>
                        Success
                      </p>
                      <p style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        color: '#D1D5DB',
                        textAlign: 'center',
                        lineHeight: '1.5'
                      }}>
                        <span style={{ fontWeight: 600 }}>Congratulations.</span> You have successfully Recharged your decoder with {(selectedTransaction as any).plan || 'Dstv Premium'}.
                      </p>
                    </>
                  ) : selectedAction === 'Bill Payments' && (selectedTransaction as any).type === 'Betting' ? (
                    <>
                      <p style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '20px',
                        fontWeight: 600,
                        color: '#008000',
                        marginBottom: '8px'
                      }}>
                        Success
                      </p>
                      <p style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        color: '#D1D5DB',
                        textAlign: 'center',
                        lineHeight: '1.5'
                      }}>
                        <span style={{ fontWeight: 600 }}>Congratulations,</span> You have successfully Recharged your {(selectedTransaction as any).billerType || 'Sporty bet'} account.
                      </p>
                    </>
                  ) : selectedAction === 'Bill Payments' && (selectedTransaction as any).type === 'Internet' ? (
                    <>
                      <p style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '20px',
                        fontWeight: 600,
                        color: '#008000',
                        marginBottom: '8px'
                      }}>
                        Success
                      </p>
                      <p style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        color: '#D1D5DB',
                        textAlign: 'center',
                        lineHeight: '1.5'
                      }}>
                        <span style={{ fontWeight: 600 }}>Congratulations,</span> You have successfully Recharged {(selectedTransaction as any).plan || '1.5 GB Data'} to {(selectedTransaction as any).rechargeNumber || '081245789'}.
                      </p>
                    </>
                  ) : selectedAction === 'Bill Payments' && (selectedTransaction as any).type === 'Electricity' ? (
                    <>
                      <p style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '20px',
                        fontWeight: 600,
                        color: '#008000',
                        marginBottom: '8px'
                      }}>
                        Success
                      </p>
                      <p style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        color: '#D1D5DB',
                        textAlign: 'center',
                        lineHeight: '1.5'
                      }}>
                        <span style={{ fontWeight: 600 }}>Congratulations,</span> You have successfully Recharged your electricity.
                      </p>
                    </>
                  ) : (
                    <>
                      <p style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '20px',
                        fontWeight: 600,
                        color: '#008000',
                        marginBottom: '8px'
                      }}>
                        {transactionType === 'Crypto'
                          ? `${(selectedTransaction as any).quantity || selectedTransaction.amount} ${selectedTransaction.status === 'success' ? 'Sent' : 'Received'}`
                          : selectedAction === 'P2P'
                            ? `${(selectedTransaction as any).usdtAmount || '20 USDT'} Sold`
                            : (selectedAction === 'Fund' && selectedTransaction.route === 'Conversion') || selectedAction === 'Convert'
                              ? `${selectedTransaction.amount} Converted`
                              : `${selectedTransaction.amount} ${selectedAction === 'Fund' ? 'Received' : 'Sent'}`}
                      </p>
                      <p style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        color: '#D1D5DB',
                        textAlign: 'center',
                        lineHeight: '1.5'
                      }}>
                        {transactionType === 'Crypto' ? (
                          <>
                            <span style={{ fontWeight: 600 }}>Congratulations,</span> You have successfully {selectedTransaction.status === 'success' ? 'sent' : 'received'} {(selectedTransaction as any).quantity || selectedTransaction.amount} {selectedTransaction.status === 'success' ? `to ${(selectedTransaction as any).receivingAddress || '0x123edfgtrwe457kslwitkwflelwlvid'}` : `from ${(selectedTransaction as any).sendingAddress || '0x123c2fk3edw'}`}.
                          </>
                        ) : selectedAction === 'P2P' ? (
                          <>
                            <span style={{ fontWeight: 600 }}>Congratulations,</span> You have successfully Sold {(selectedTransaction as any).usdtAmount || '20 USDT'}.
                          </>
                        ) : (selectedAction === 'Fund' && selectedTransaction.route === 'Conversion') || selectedAction === 'Convert' ? (
                          <>
                            <span style={{ fontWeight: 600 }}>Congratulations,</span> You have successfully Converted {selectedTransaction.amount} to Kenya Shillings.
                          </>
                        ) : selectedAction === 'Fund' ? (
                          <>
                            <span style={{ fontWeight: 600 }}>Congratulations,</span> You have successfully sent {selectedTransaction.amount} from {selectedTransaction.route}.
                          </>
                        ) : (
                          <>
                            <span style={{ fontWeight: 600 }}>Congratulations,</span> You have successfully sent {selectedTransaction.amount} to
                            <br />
                            {selectedTransaction.recipient}.
                          </>
                        )}
                      </p>
                    </>
                  )}
                </>
              )}
            </div>

            <>
              {/* Crypto Transaction Details */}
              {transactionType === 'Crypto' ? (
                <>
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#0F1722',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxSizing: 'border-box'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                      paddingBottom: '12px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      width: 'calc(100% + 32px)',
                      marginLeft: '-16px',
                      marginRight: '-16px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      boxSizing: 'border-box'
                    }}>
                      <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Crypto Sent</span>
                      <span style={{ color: '#A5A8AD', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).crypto || 'Ethereum'}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                      paddingBottom: '12px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      width: 'calc(100% + 32px)',
                      marginLeft: '-16px',
                      marginRight: '-16px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      boxSizing: 'border-box'
                    }}>
                      <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Network</span>
                      <span style={{ color: '#A5A8AD', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).network || 'Ethereum'}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                      paddingBottom: '12px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      width: 'calc(100% + 32px)',
                      marginLeft: '-16px',
                      marginRight: '-16px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      boxSizing: 'border-box'
                    }}>
                      <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Quantity</span>
                      <span style={{ color: '#A5A8AD', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).quantity || selectedTransaction.amount}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                      paddingBottom: '12px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      width: 'calc(100% + 32px)',
                      marginLeft: '-16px',
                      marginRight: '-16px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      boxSizing: 'border-box'
                    }}>
                      <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Amount</span>
                      <span style={{ color: '#A5A8AD', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).amountUSD || '$2,550.50'}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                      paddingBottom: '12px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      width: 'calc(100% + 32px)',
                      marginLeft: '-16px',
                      marginRight: '-16px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      boxSizing: 'border-box'
                    }}>
                      <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Fee</span>
                      <span style={{ color: '#A5A8AD', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.fee} ({(selectedTransaction as any).feeUSD || '$2.50'})</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                      alignItems: 'center',
                      paddingBottom: '12px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      width: 'calc(100% + 32px)',
                      marginLeft: '-16px',
                      marginRight: '-16px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      boxSizing: 'border-box'
                    }}>
                      <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Receiving Address</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => navigator.clipboard.writeText((selectedTransaction as any).receivingAddress || '')}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        </button>
                        <span style={{ color: '#A5A8AD', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).receivingAddress || '0x123edfgtrwe457kslwitkwflelwlvid'}</span>
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                      alignItems: 'center',
                      paddingBottom: '12px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      width: 'calc(100% + 32px)',
                      marginLeft: '-16px',
                      marginRight: '-16px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      boxSizing: 'border-box'
                    }}>
                      <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Sending Address</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => navigator.clipboard.writeText((selectedTransaction as any).sendingAddress || '')}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        </button>
                        <span style={{ color: '#A5A8AD', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).sendingAddress || '0x123c2fk3edw'}</span>
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                      alignItems: 'center',
                      paddingBottom: '12px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      width: 'calc(100% + 32px)',
                      marginLeft: '-16px',
                      marginRight: '-16px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      boxSizing: 'border-box'
                    }}>
                      <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Tx Hash</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => navigator.clipboard.writeText((selectedTransaction as any).txHash || '')}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        </button>
                        <span style={{ color: '#A5A8AD', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).txHash || '13ijksm219ef23e9f3295h2nfi923rf9n9219'}</span>
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                      alignItems: 'center',
                      paddingBottom: '12px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      width: 'calc(100% + 32px)',
                      marginLeft: '-16px',
                      marginRight: '-16px',
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      boxSizing: 'border-box'
                    }}>
                      <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Transaction Id</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => navigator.clipboard.writeText((selectedTransaction as any).transactionId || selectedTransaction.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        </button>
                        <span style={{ color: '#A5A8AD', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).transactionId || selectedTransaction.id}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Date</span>
                      <span style={{ color: '#A5A8AD', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.date}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Transaction Summary - Only show for non-Fund transactions or non-Yellow Card/Conversion route, and not for Convert/P2P/Bill Payments action */}
                  {selectedAction !== 'Convert' && selectedAction !== 'P2P' && selectedAction !== 'Bill Payments' && (selectedAction !== 'Fund' || (selectedTransaction.route !== 'Yellow Card' && selectedTransaction.route !== 'Conversion')) && (
                    <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#0F1722', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '12px',
                        paddingBottom: '12px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        width: 'calc(100% + 32px)',
                        marginLeft: '-16px',
                        marginRight: '-16px',
                        paddingLeft: '16px',
                        paddingRight: '16px',
                        boxSizing: 'border-box'
                      }}>
                        <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Transfer Amount</span>
                        <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.amount}</span>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '12px',
                        paddingBottom: '12px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        width: 'calc(100% + 32px)',
                        marginLeft: '-16px',
                        marginRight: '-16px',
                        paddingLeft: '16px',
                        paddingRight: '16px',
                        boxSizing: 'border-box'
                      }}>
                        <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Fee</span>
                        <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.fee}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Payment Amount</span>
                        <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.amount}</span>
                      </div>
                    </div>
                  )}

                  {/* Recipient and Transaction Details */}
                  {((selectedAction === 'Fund' && selectedTransaction.route === 'Conversion') || selectedAction === 'Convert') ? (
                    <>
                      {/* Conversion Summary Block */}
                      <div style={{
                        padding: '16px',
                        backgroundColor: '#0F1722',
                        borderRadius: '10px',
                        marginBottom: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxSizing: 'border-box'
                      }}>
                        {/* You Converted Row */}
                        <div style={{
                          marginBottom: '16px'
                        }}>
                          <div style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontWeight: 274,
                            fontStyle: 'normal',
                            fontSize: '13.02px',
                            lineHeight: '100%',
                            letterSpacing: '0%',
                            color: '#FFFFFF80',
                            marginBottom: '8px'
                          }}>
                            You Converted
                          </div>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              width: '140px',
                              height: '50px',
                              padding: '10px 12px',
                              backgroundColor: '#FFFFFF08',
                              borderRadius: '130.23px',
                              border: 'none'
                            }}>
                              <img
                                src={images.flag}
                                alt="Nigeria"
                                style={{
                                  width: '24px',
                                  height: '18px',
                                  objectFit: 'cover',
                                  borderRadius: '2px'
                                }}
                              />
                              <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>Nigeria</span>
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: '4px' }}>
                                <path d="M3 4.5L6 7.5L9 4.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <span style={{ fontSize: '16px', fontWeight: 600 }}>
                              <span className="inline-block align-baseline" style={{ color: '#FFFFFF', fontSize: '8px', verticalAlign: 'baseline', lineHeight: '1' }}>N</span>
                              <span style={{ color: '#FFFFFF' }}>{parseFloat(selectedTransaction.amount.replace('N', '').replace(/,/g, '')).toLocaleString()}</span>
                              <span style={{ color: '#9CA3AF' }}>.00</span>
                            </span>
                          </div>
                        </div>

                        {/* Conversion Icon with Horizontal Line */}
                        <div style={{
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '16px',
                          marginTop: '16px'
                        }}>
                          {/* Horizontal Line */}
                          <div style={{
                            position: 'absolute',
                            width: '100%',
                            height: '1px',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            left: 0,
                            right: 0,
                            zIndex: 0
                          }}></div>
                          {/* Icon */}
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#95D440',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            zIndex: 1
                          }}>
                            <img
                              src={images.arrow_swap_3}
                              alt="Swap"
                              style={{
                                width: '20px',
                                height: '20px',
                                objectFit: 'contain'
                              }}
                            />
                          </div>
                        </div>

                        {/* User Received Row */}
                        <div>
                          <div style={{
                            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                            fontWeight: 274,
                            fontStyle: 'normal',
                            fontSize: '13.02px',
                            lineHeight: '100%',
                            letterSpacing: '0%',
                            color: '#FFFFFF80',
                            marginBottom: '8px'
                          }}>
                            User Received
                          </div>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              width: '140px',
                              height: '50px',
                              padding: '10px 12px',
                              backgroundColor: '#FFFFFF08',
                              borderRadius: '130.23px',
                              border: 'none'
                            }}>
                              <img
                                src={images.flag4}
                                alt="Kenya"
                                style={{
                                  width: '24px',
                                  height: '18px',
                                  objectFit: 'cover',
                                  borderRadius: '2px'
                                }}
                              />
                              <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>Kenya</span>
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: '4px' }}>
                                <path d="M3 4.5L6 7.5L9 4.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <span style={{ fontSize: '16px', fontWeight: 600 }}>
                              <span className="inline-block align-baseline" style={{ color: '#FFFFFF', fontSize: '8px', verticalAlign: 'baseline', lineHeight: '1' }}>ksh </span>
                              <span style={{ color: '#FFFFFF' }}>{Math.round(parseFloat(selectedTransaction.amount.replace('N', '').replace(/,/g, '')) * 0.08168).toLocaleString()}</span>
                              <span style={{ color: '#9CA3AF' }}>.00</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Transaction Details Block - Separate */}
                      <div style={{
                        padding: '16px',
                        backgroundColor: '#0F1722',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxSizing: 'border-box'
                      }}>
                        {/* Transaction Details */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Transaction Fee</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>500 NGN</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Exchange Rate</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>N1 ~ Ksh1.110</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Funding Route</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.paymentMethod}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          alignItems: 'center',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Transaction Id</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              onClick={() => navigator.clipboard.writeText(selectedTransaction.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                            </button>
                            <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.id}</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Date</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.date}</span>
                        </div>
                      </div>
                    </>
                  ) : selectedAction === 'P2P' ? (
                    <>
                      {/* Merchant Details */}
                      <div style={{
                        padding: '16px',
                        backgroundColor: '#0F1722',
                        borderRadius: '10px',
                        marginBottom: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxSizing: 'border-box'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Merchant Name</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).merchantName || 'Qamar Malik'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Contact</span>
                          <button
                            style={{
                              backgroundColor: '#A9EF45',
                              color: '#000000',
                              border: 'none',
                              borderRadius: '100px',
                              padding: '8px 20px',
                              fontSize: '12px',
                              fontWeight: 300,
                              cursor: 'pointer',
                              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif'
                            }}
                          >
                            Chat
                          </button>
                        </div>
                      </div>

                      {/* Transaction Details */}
                      <div style={{
                        padding: '16px',
                        backgroundColor: '#0F1722',
                        borderRadius: '10px',
                        marginBottom: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxSizing: 'border-box'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>P2P Type</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).p2pType || 'Crypto Sell'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Amount</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).amount || '10,000 NGN'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Price</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).price || '1,500 NGN'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Total Qty</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).totalQty || '5.2 USDT'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Tx Fee</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).txFee || '0'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          alignItems: 'center',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Tx id</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              onClick={() => navigator.clipboard.writeText((selectedTransaction as any).txId || selectedTransaction.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                            </button>
                            <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).txId || selectedTransaction.id}</span>
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Payment method</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Bank Transfer</span>
                            <span style={{ color: '#95D440', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>View Account</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Order time</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).orderTime || selectedTransaction.date}</span>
                        </div>
                      </div>

                      {/* My Review Section */}
                      <div style={{
                        padding: '16px',
                        backgroundColor: '#0F1722',
                        borderRadius: '10px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxSizing: 'border-box'
                      }}>
                        <div style={{
                          width: '230px',
                          height: '60px',
                          padding: '12px',
                          borderRadius: '130.23px',
                          border: '0.65px solid #008000',
                          marginBottom: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          boxSizing: 'border-box'
                        }}>
                          <img
                            src={images.Group_41}
                            alt="Like"
                            style={{
                              width: '32px',
                              height: '32px',
                              objectFit: 'contain',
                              flexShrink: 0
                            }}
                          />
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 400 }}>You gave this order a like</span>
                        </div>
                        <div style={{
                          position: 'relative',
                          marginBottom: '12px'
                        }}>
                          <input
                            type="text"
                            value={(selectedTransaction as any).review || 'He is fast and reliable'}
                            readOnly
                            style={{
                              width: '100%',
                              padding: '12px',
                              backgroundColor: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '8px',
                              color: '#FFFFFF',
                              fontSize: '12px',
                              fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                              outline: 'none'
                            }}
                          />
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: '12px'
                        }}>
                          <button
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '4px',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </button>
                          <button
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '4px',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </>
                  ) : selectedAction === 'Bill Payments' && (selectedTransaction as any).type === 'Airtime' ? (
                    <>
                      {/* Bill Payment Transaction Details */}
                      <div style={{
                        padding: '16px',
                        backgroundColor: '#0F1722',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxSizing: 'border-box'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Biller Type</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).billerType || 'MTN'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Mobile Number</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).mobileNumber || '0901245678'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Amount</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.amount}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Fee</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.fee || 'N0'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          alignItems: 'center',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Transaction Id</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              onClick={() => navigator.clipboard.writeText(selectedTransaction.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                            </button>
                            <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.id}</span>
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Transaction type</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).transactionType || 'Airtime Top Up'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Date</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.date}</span>
                        </div>
                      </div>
                    </>
                  ) : selectedAction === 'Bill Payments' && (selectedTransaction as any).type === 'Data Recharge' ? (
                    <>
                      {/* Bill Payment Data Recharge Transaction Details */}
                      <div style={{
                        padding: '16px',
                        backgroundColor: '#0F1722',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxSizing: 'border-box'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Biller Type</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).billerType || 'MTN'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Mobile Number</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).mobileNumber || '08012456789'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Plan</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).plan || '1.5 GB for 30 Days'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Amount</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.amount}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Fee</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.fee || 'N0'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          alignItems: 'center',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Transaction Id</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              onClick={() => navigator.clipboard.writeText(selectedTransaction.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                            </button>
                            <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.id}</span>
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Transaction type</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).transactionType || 'Bill Payment'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Date</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.date}</span>
                        </div>
                      </div>
                    </>
                  ) : selectedAction === 'Bill Payments' && (selectedTransaction as any).type === 'Electricity' ? (
                    <>
                      {/* Bill Payment Electricity Transaction Details */}
                      <div style={{
                        padding: '16px',
                        backgroundColor: '#0F1722',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxSizing: 'border-box'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Biller Type</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).billerType || 'Ikeja Electricity'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Account Type</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).accountType || 'Prepaid'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Meter Number</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).meterNumber || '042457896'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Account Name</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).electricityAccountName || 'Qamardeen Abdul Malik'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Amount</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.amount}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Fee</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.fee || 'N0'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          alignItems: 'center',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Token</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              onClick={() => navigator.clipboard.writeText((selectedTransaction as any).token || '')}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                            </button>
                            <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).token || 'ABCD-DFGTH-ASWER-1234-133ER'}</span>
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          alignItems: 'center',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Transaction Id</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              onClick={() => navigator.clipboard.writeText(selectedTransaction.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                            </button>
                            <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.id}</span>
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Transaction type</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).transactionType || 'Electricity'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Date</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.date}</span>
                        </div>
                      </div>
                    </>
                  ) : selectedAction === 'Bill Payments' && (selectedTransaction as any).type === 'Cable tv' ? (
                    <>
                      {/* Bill Payment Cable TV Transaction Details */}
                      <div style={{
                        padding: '16px',
                        backgroundColor: '#0F1722',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxSizing: 'border-box'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Biller Type</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).billerType || 'Dstv'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Plan</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).plan || 'Dstv Premium'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Decoder Number</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).decoderNumber || '042457896'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Account Name</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).cableAccountName || 'Qamardeen Abdul Malik'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Amount</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.amount}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Fee</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.fee || 'N0'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          alignItems: 'center',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Transaction Id</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              onClick={() => navigator.clipboard.writeText(selectedTransaction.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                            </button>
                            <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.id}</span>
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Transaction type</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).transactionType || 'Cable TV'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Date</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.date}</span>
                        </div>
                      </div>
                    </>
                  ) : selectedAction === 'Bill Payments' && (selectedTransaction as any).type === 'Betting' ? (
                    <>
                      {/* Bill Payment Betting Transaction Details */}
                      <div style={{
                        padding: '16px',
                        backgroundColor: '#0F1722',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxSizing: 'border-box'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Biller Type</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).billerType || 'Sportybet'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>User ID</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).userId || '081234567'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Account Name</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).bettingAccountName || 'Qamardeen Abdul Malik'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Amount</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.amount}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Fee</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.fee || 'N0'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          alignItems: 'center',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Token</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              onClick={() => navigator.clipboard.writeText((selectedTransaction as any).token || '')}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                            </button>
                            <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).token || 'ABCD-DFGTH-ASWER-1234-133ER'}</span>
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          alignItems: 'center',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Transaction Id</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              onClick={() => navigator.clipboard.writeText(selectedTransaction.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                            </button>
                            <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.id}</span>
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Transaction type</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).transactionType || 'Betting'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Date</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.date}</span>
                        </div>
                      </div>
                    </>
                  ) : selectedAction === 'Bill Payments' && (selectedTransaction as any).type === 'Internet' ? (
                    <>
                      {/* Bill Payment Internet Transaction Details */}
                      <div style={{
                        padding: '16px',
                        backgroundColor: '#0F1722',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxSizing: 'border-box'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Biller Type</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).billerType || 'Smile'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Router Number</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).routerNumber || '08012456789'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Plan</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).plan || '1.5 GB for 30 Days'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Amount</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.amount}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Fee</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.fee || 'N0'}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          alignItems: 'center',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Transaction Id</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              onClick={() => navigator.clipboard.writeText(selectedTransaction.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                            </button>
                            <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.id}</span>
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Transaction type</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{(selectedTransaction as any).transactionType || 'Bill Payment'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Date</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.date}</span>
                        </div>
                      </div>
                    </>
                  ) : selectedAction === 'Fund' && selectedTransaction.route === 'Yellow Card' ? (
                    <>
                      <div style={{
                        padding: '16px',
                        backgroundColor: '#0F1722',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxSizing: 'border-box'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Country</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.country}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Amount Received</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.amount}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Funding Route</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.paymentMethod}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Route</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.route}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          alignItems: 'center',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Transaction Id</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              onClick={() => navigator.clipboard.writeText(selectedTransaction.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                            </button>
                            <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.id}</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Date</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.date}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{
                        padding: '16px',
                        backgroundColor: '#0F1722',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        boxSizing: 'border-box'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Country</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.country}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Bank</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.bank}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          alignItems: 'center',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Account Number</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              onClick={() => navigator.clipboard.writeText(selectedTransaction.accountNumber)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                            </button>
                            <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.accountNumber}</span>
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Account Name</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.accountName}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          alignItems: 'center',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Transaction Id</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              onClick={() => navigator.clipboard.writeText(selectedTransaction.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                            </button>
                            <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.id}</span>
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          width: 'calc(100% + 32px)',
                          marginLeft: '-16px',
                          marginRight: '-16px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Payment Method</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.paymentMethod}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Date</span>
                          <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{selectedTransaction.date}</span>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTransaction;
