import React from "react";
import { useRoles } from "../../hooks/hooks";
import { IUser } from "../../interfaces/IUser";
import avatar from "../../assets/img/avatar.jpg";

interface IProps {
  user: IUser
  size?: string
}

const Profile: React.FC<IProps> = ({user, size = "64px"}: IProps) => {
  const {getRole} = useRoles()
  const role = getRole(user.role)
  if (role === null) {
    throw new Error('Role doesnt exist!')
  }
  return (
    <div className="text-center p-2">
      <img
        src={user.profilePicture || avatar}
        className="img-fluid rounded-circle mb-2"
        alt={`${user.firstName} ${user.lastName}`}
        width={size}
        height={size}
      />
      <div className="fw-bold">{`${user.firstName} ${user.lastName}`}</div>
      <small>{role.name}</small>
    </div>
  );
};

export default Profile;
