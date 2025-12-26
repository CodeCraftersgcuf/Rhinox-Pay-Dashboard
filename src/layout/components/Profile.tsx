import React from "react";
import images from "../../constants/images";

interface ProfileProps {
  name?: string;
  img?: string;
}

const Profile: React.FC<ProfileProps> = ({ name = "Admin", img }) => {
  return (
    <div className="flex items-center gap-4">
      <img 
        src={img || images.profile_image} 
        alt="profile" 
        className="rounded-full object-cover" 
        style={{ width: '53px', height: '53px' }}
      />
      <h2 className="text-white text-lg" style={{ fontWeight: 400 }}>Hey Admin</h2>
    </div>
  );
};

export default Profile;
