import React from "react";
import { useParams } from "react-router-dom";

const UserVerification: React.FC = () => {
  const { username } = useParams();
  
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">User Verification: {username}</h1>
      <p>User Verification content goes here</p>
    </div>
  );
};

export default UserVerification;
