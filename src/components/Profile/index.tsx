import React from "react";

interface IProps {
  img: string;
  name: string | "Guest";
  role: string;
}

const Profile: React.FC<IProps> = ({img, name = "Guest", role}) => {
  return (
    <div className="text-center p-2">
      <img
        src={img}
        className="img-fluid rounded-circle mb-2"
        alt={name}
        width="64px"
        height="64px"
      />
      <div className="fw-bold">{name}</div>
      <small>Active</small>
    </div>
  );
};

export default Profile;
