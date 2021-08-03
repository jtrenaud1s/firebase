import React from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../config/firebase";
import logging from "../../config/logging";
import IPageProps from "../../interfaces/IPageProps";

const LogoutPage: React.FunctionComponent<IPageProps> = (props) => {
  const history = useHistory();

  const Logout = () => {
    auth
      .signOut()
      .then(() => history.push("/login"))
      .catch((error) => logging.error(error));
  };

  return (
    <div>
      <h1>Logout</h1>
      <p className="text-center">Are you sure you want to logout?</p>
      <div className="text-center">
        <button onClick={() => history.goBack()}>Cancel</button>
        <button onClick={() => Logout()}>Logout</button>
      </div>
    </div>
  );
};

export default LogoutPage;
