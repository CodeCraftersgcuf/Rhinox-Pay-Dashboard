import React from "react";
import { useParams } from "react-router-dom";

const Connect: React.FC = () => {
  const { username } = useParams();
  
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">User Connect: {username}</h1>
      <p>User Connect content goes here</p>
    </div>
  );
};

export default Connect;
