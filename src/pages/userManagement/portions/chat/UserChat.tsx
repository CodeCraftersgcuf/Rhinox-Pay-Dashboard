import React from "react";
import { useParams } from "react-router-dom";

const UserChat: React.FC = () => {
  const { username } = useParams();
  
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">User Chat: {username}</h1>
      <p>User Chat content goes here</p>
    </div>
  );
};

export default UserChat;
