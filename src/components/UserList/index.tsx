import React from "react";
import { Col, Row } from "react-bootstrap";
import { IUser } from "../../interfaces/IUser";
import UserItem from "./UserItem";

interface IProps {
  users: IUser[];
  role?: string;
}

const UserList = (props: IProps) => {
  const role = props.role;
  var users = props.users;

  if (role !== undefined) {
    users = props.users.filter((user) => user.role === role);
  }

  return (
    <Row className="mt-2">
      {users.map((user) => (
        <Col sm={12} md={6} lg={3}>
          <UserItem user={user} />
        </Col>
      ))}
    </Row>
  );
};

export default UserList;
