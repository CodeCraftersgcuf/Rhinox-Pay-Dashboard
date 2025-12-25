import React from "react";
import { useParams } from "react-router-dom";

const Market: React.FC = () => {
  const { username } = useParams();
  
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">User Market: {username}</h1>
      <p>User Market content goes here</p>
    </div>
  );
};

export default Market;
