import React from "react";
import UserProvider from "../contexts/UserContext";
import { useAuth, usePermissions } from "../hooks/hooks";
import IPageProps from "../interfaces/IPageProps";
import { IUser } from "../interfaces/IUser";
import Layout from "./Layout/Layout";

const Internal = () => {
  const {userHasPermission} = usePermissions()

  const [user] = useAuth()

  return (
    <Layout title="Dashboard">
      <p>{userHasPermission(user as IUser, "reee") && "You have inherited permission!"}</p>
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
