import React from "react";
import { useParams } from "react-router-dom";

const Social: React.FC = () => {
  const { username } = useParams();
  
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">User Social: {username}</h1>
      <p>User Social content goes here</p>
    </div>
  );
};

export default Social;
