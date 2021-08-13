import React from "react";
import UserProvider from "../contexts/UserContext";
import { useUsers } from "../hooks/hooks";
import IPageProps from "../interfaces/IPageProps";
import { IUser } from "../interfaces/IUser";
import Layout from "./Layout/Layout";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from "styled-components";
import Loadscreen from "../components/Loadscreen";

const UserList = styled.ol`
  .user-enter {
    opacity: 0;
  }
  .user-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }
  .user-exit {
    opacity: 1;
  }
  .user-exit-active {
    opacity: 0;
    transition: opacity 500ms ease-in;
  }
`;

const Internal = () => {
  const [users, loading] = useUsers();

  return (
    <Layout title="Dashboard">
      <h2>Users</h2>
      {loading && <Loadscreen />}
      <UserList>
        <TransitionGroup>
          {(users as IUser[]).map((user: IUser) => {
            return (
              <CSSTransition key={user.uid} timeout={500} classNames="user">
                <li className="user">
                  {user.firstName} {user.lastName}
                </li>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </UserList>
    </Layout>
  );
};

const HomePage: React.FunctionComponent<IPageProps> = (props) => {
  return (
    <UserProvider>
      <Internal />
    </UserProvider>
  );
};

export default HomePage;
