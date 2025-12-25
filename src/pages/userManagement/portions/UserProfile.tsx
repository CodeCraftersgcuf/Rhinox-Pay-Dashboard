import React from "react";
import { useParams } from "react-router-dom";

const UserProfile: React.FC = () => {
  const { username } = useParams();
  
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">User Profile: {username}</h1>
      <p>User Profile content goes here</p>
    </div>
  );
};

export default UserProfile;
