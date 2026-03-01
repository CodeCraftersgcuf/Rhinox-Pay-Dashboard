import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import './App.css'

// Importing all pages
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
import ConnectManagement from "./pages/connect/ConnectManagement";
import MarketManagement from "./pages/market/MarketManagement";
import GymManagement from "./pages/gym/GymManagement";
import Market from "./pages/userManagement/portions/market/Market";
import Connect from "./pages/userManagement/portions/connect/Connect";
import Social from "./pages/userManagement/portions/social/Social";
import UserManagement from "./pages/userManagement/UserManagement";
import Notification from "./pages/notification/Notification";
import UserProfile from "./pages/userManagement/portions/UserProfile";
import UserWallet from "./pages/userManagement/portions/UserWallet";
import GymHub from "./pages/userManagement/portions/gymhub/GymHub";
import UserChat from "./pages/userManagement/portions/chat/UserChat";
import UserVerification from "./pages/userManagement/portions/verification/UserVerification";
import UserTransaction from "./pages/userManagement/portions/transactions/UserTransaction";
import P2PProfile from "./pages/userManagement/portions/p2p/P2PProfile";
import UserManagementSocial from "./pages/userManegement_dropDown_portion/UserManagement_Social/UserManagementSocial";
import UserManagementConnect from "./pages/userManegement_dropDown_portion/UserManagement_Connect/UserManagementConnect";
import UserManagementMarket from "./pages/userManegement_dropDown_portion/UserManagement_Market/UserManagementMarket";
import UserManagementGym from "./pages/userManegement_dropDown_portion/UserManagement_Gym/UserManagementGym";
import Login from "./auth/Login";
import AuthenticatorSetup from "./auth/AuthenticatorSetup";
import AuthenticatorCode from "./auth/AuthenticatorCode";



const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/authenticator-setup" element={<AuthenticatorSetup />} />
        <Route path="/authenticator-code" element={<AuthenticatorCode />} />
        {/* Layout Wraps All Routes */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          {/* user management */}
          <Route path="user/management" element={<UserManagement />} />
          <Route path="user/management/profile/:username" element={<UserProfile />} />
          <Route path="user/management/:username/wallet" element={<UserWallet />} />
          <Route path="user/management/:username/social" element={<Social />} />
          <Route path="user/management/:username/market" element={<Market />} />
          <Route path="user/management/:username/connect" element={<Connect />} />
          <Route path="user/management/:username/gymhub" element={<GymHub />} />
          <Route path="/user/management/:username/chat" element={<UserChat />} />
          <Route path="/user/management/:username/verifications" element={<UserVerification />} />
          <Route path="/user/management/:username/transactions" element={<UserTransaction />} />
          <Route path="/user/management/:username/p2p" element={<P2PProfile />} />


          {/* dropdown pages */}
          <Route path="user/management/social" element={<UserManagementSocial />} />
          <Route path="user/management/connect" element={<UserManagementConnect />} />
          <Route path="user/management/market" element={<UserManagementMarket />} />
          <Route path="user/management/gymhub" element={<UserManagementGym />} />

          <Route path="transaction" element={<Transaction />} />
          <Route path="kyc" element={<KYC />} />
          <Route path="wallet-management" element={<WalletManagement />} />
          <Route path="rates" element={<Rates />} />
          <Route path="p2p" element={<P2P />} />
          <Route path="chat-appeals" element={<ChatAppeals />} />
          <Route path="master-wallet" element={<MasterWallet />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="connect" element={<ConnectManagement />} />
          <Route path="market" element={<MarketManagement />} />
          <Route path="gym" element={<GymManagement />} />
          <Route path="support" element={<Support />} />
          <Route path="notification" element={<Notification />} />
          <Route path="settings" element={<Setting />} />
          <Route path="settings/admin/:adminId" element={<AdminProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
