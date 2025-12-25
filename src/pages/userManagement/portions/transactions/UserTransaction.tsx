import React from "react";
import { useParams } from "react-router-dom";

const UserTransaction: React.FC = () => {
  const { username } = useParams();
  
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">User Transactions: {username}</h1>
      <p>User Transactions content goes here</p>
    </div>
  );
};

export default UserTransaction;
