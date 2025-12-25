import React from "react";
import { useParams } from "react-router-dom";

const AdminProfile: React.FC = () => {
  const { username } = useParams();
  
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Admin Profile: {username}</h1>
      <p>Admin Profile content goes here</p>
    </div>
  );
};

export default AdminProfile;
