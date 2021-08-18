import React from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { CardText, Eye } from "react-bootstrap-icons";
import { IUser } from "../../interfaces/IUser";

import Profile from "../Profile";

interface IProps {
  user: IUser;
}

const UserItem: React.FC<IProps> = (props) => {
  return (
    <Card className="pb-2 ps-2 pe-2 pt-5">
      <Profile user={props.user} size="128px" />
      <div className="d-flex flex-row align-items-center justify-content-end p-2">
        <ButtonGroup>
          <Button variant="default" size="sm">
            <Eye size={20} />
          </Button>
          <Button variant="default" size="sm">
            <CardText size={20} />
          </Button>
        </ButtonGroup>
      </div>
    </Card>
  );
};

export default UserItem;
