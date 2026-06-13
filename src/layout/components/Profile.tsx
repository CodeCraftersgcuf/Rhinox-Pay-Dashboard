import React from "react";
import { useNavigate } from "react-router-dom";
import images from "../../constants/images";
import { getAdminUser, clearAdminAuth } from "../../services/authService";
import { adminApiSend } from "../../services/adminApi";
import { ADMIN_ROUTES } from "../../api/apiConfig";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const admin = getAdminUser();
  const name = admin?.firstName ? `${admin.firstName} ${admin.lastName || ''}`.trim() : 'Admin';

  const handleLogout = async () => {
    try {
      await adminApiSend(ADMIN_ROUTES.AUTH.LOGOUT, 'POST');
    } catch {
      // ignore
    } finally {
      clearAdminAuth();
      navigate('/');
    }
  };

  return (
    <div className="flex items-center gap-4">
      <img
        src={images.profile_image}
        alt="profile"
        className="rounded-full object-cover"
        style={{ width: '50px', height: '50px' }}
      />
      <div>
        <h2 className="text-white text-lg" style={{ fontWeight: 400 }}>Hey {name}</h2>
        <button onClick={handleLogout} className="text-xs text-lime-400">Logout</button>
      </div>
    </div>
  );
};

export default Profile;
