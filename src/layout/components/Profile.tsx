import React from "react";
import images from "../../constants/images";

interface ProfileProps {
  name?: string;
  img?: string;
}

const Profile: React.FC<ProfileProps> = ({ name = "Admin", img }) => {
  return (
    <div className="flex items-center gap-4 ">
      <div>
        {/* <h4 className="text-lg ">Hey,</h4> */}
        <h2 className="text-lg">{name},Admin</h2>
      </div>
      <img src={img} alt="profile" className="w-14 h-14 rounded-md" />
    </div>
  );
};

export default Profile;
