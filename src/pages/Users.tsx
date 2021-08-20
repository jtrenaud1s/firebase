import React from "react";
import { Spinner, Tab, Tabs } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import UserList from "../components/UserList";
import UserProvider from "../contexts/UserContext";
import { useAuth, usePermissions, useUsers } from "../hooks/hooks";
import IPageProps from "../interfaces/IPageProps";
import { IUser } from "../interfaces/IUser";
import Layout from "./Layout/Layout";

const Internal = () => {
  const { users, loading } = useUsers();
  const { userHasPermission } = usePermissions();
  const [user] = useAuth();
  const history = useHistory()

  if(!userHasPermission(user as IUser, "users.manage")){
    history.goBack()
    return <></>
  }

  // <UserList>
  //   <TransitionGroup>
  //     {(users as IUser[]).map((user: IUser) => {
  //       return (
  //         <CSSTransition key={user.uid} timeout={500} classNames="user">
  //           <li className="user">
  //             {user.firstName} {user.lastName}
  //           </li>
  //         </CSSTransition>
  //       );
  //     })}
  //   </TransitionGroup>
  // </UserList>;

  return (
    <Layout title="User Management">
      {loading && <Spinner animation="border" variant="dark" />}
      <Tabs defaultActiveKey="actives">
        <Tab eventKey="actives" title="Active Members">
          <UserList users={users} role="superuser" />
        </Tab>
        <Tab eventKey="pnms" title="Potential New Members">
          <UserList users={users} role="pnm" />
        </Tab>
      </Tabs>
    </Layout>
  );
};

const UsersPage: React.FunctionComponent<IPageProps> = (props) => {
  return (
    <UserProvider>
      <Internal />
    </UserProvider>
  );
};

export default UsersPage;
