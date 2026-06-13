import { Navigate, Outlet } from 'react-router-dom';
import { isAdminAuthenticated } from '../services/authService';

const ProtectedRoute = () => {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
