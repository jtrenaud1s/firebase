import React from "react";
import { Card } from "react-bootstrap";
import { IUser } from "../../interfaces/IUser";

import Profile from "../Profile";

interface IProps {
  user: IUser;
}

const UserItem: React.FC<IProps> = (props) => {
  return (
    <Card className="pb-5 pt-5">
      <Profile user={props.user} size="128px" />
    </Card>
  );
};

export default UserItem;
