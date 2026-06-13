import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import './App.css'

import Dashboard from "./pages/dashboard/Dashboard";
import Setting from "./pages/setting/Setting";
import AdminProfile from "./pages/setting/AdminProfile";
import Support from "./pages/support/Support";
import Transaction from "./pages/transaction/Transaction";
import KYC from "./pages/kyc/KYC";
import WalletManagement from "./pages/walletManagement/WalletManagement";
import Rates from "./pages/rates/Rates";
import P2P from "./pages/p2p/P2P";
import ChatAppeals from "./pages/chatAppeals/ChatAppeals";
import MasterWallet from "./pages/masterWallet/MasterWallet";
import Rewards from "./pages/rewards/Rewards";
import Analytics from "./pages/analytics/Analytics";
import UserManagement from "./pages/userManagement/UserManagement";
import Notification from "./pages/notification/Notification";
import UserProfile from "./pages/userManagement/portions/UserProfile";
import UserWallet from "./pages/userManagement/portions/UserWallet";
import UserChat from "./pages/userManagement/portions/chat/UserChat";
import UserVerification from "./pages/userManagement/portions/verification/UserVerification";
import UserTransaction from "./pages/userManagement/portions/transactions/UserTransaction";
import P2PProfile from "./pages/userManagement/portions/p2p/P2PProfile";
import Login from "./auth/Login";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="user/management" element={<UserManagement />} />
            <Route path="user/management/profile/:username" element={<UserProfile />} />
            <Route path="user/management/:username/wallet" element={<UserWallet />} />
            <Route path="user/management/:username/chat" element={<UserChat />} />
            <Route path="user/management/:username/verifications" element={<UserVerification />} />
            <Route path="user/management/:username/transactions" element={<UserTransaction />} />
            <Route path="user/management/:username/p2p" element={<P2PProfile />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="kyc" element={<KYC />} />
            <Route path="wallet-management" element={<WalletManagement />} />
            <Route path="rates" element={<Rates />} />
            <Route path="p2p" element={<P2P />} />
            <Route path="chat-appeals" element={<ChatAppeals />} />
            <Route path="master-wallet" element={<MasterWallet />} />
            <Route path="rewards" element={<Rewards />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="support" element={<Support />} />
            <Route path="notification" element={<Notification />} />
            <Route path="settings" element={<Setting />} />
            <Route path="settings/admin/:adminId" element={<AdminProfile />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
