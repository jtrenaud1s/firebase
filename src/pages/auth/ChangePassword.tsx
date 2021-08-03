import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { auth } from "../../config/firebase";
import logging from "../../config/logging";
import IPageProps from "../../interfaces/IPageProps";

const ChangePasswordPage: React.FunctionComponent<IPageProps> = (props) => {
  const [changing, setChanging] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [old, setOld] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");

  const history = useHistory();

  const passwordChangeRequest = () => {
    if (password !== confirm) {
      setError("Make sure your passwords are matching");
      return;
    }

    if (error !== "") setError("");

    setChanging(true);

    auth.currentUser
      ?.updatePassword(password)
      .then(() => {
        logging.info("Password change successful.");
        history.push("/");
      })
      .catch((error) => {
        logging.error(error);
        setChanging(false);
        setError(error.message);
      });
  };

  if (auth.currentUser?.providerData[0]?.providerId !== "password")
    return <Redirect to="/" />;

  return (
    <div>
      <h1>Change Password</h1>

      <input
        type="password"
        name="oldPassword"
        id="oldPassword"
        placeholder="Current Password"
        onChange={(event) => setOld(event.target.value)}
        value={old}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Enter Password"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
      />

      <input
        type="password"
        name="confirm"
        id="confirm"
        placeholder="Confirm Password"
        onChange={(event) => setConfirm(event.target.value)}
        value={confirm}
      />

      <button disabled={changing} onClick={() => passwordChangeRequest()}>
        Change Password
      </button>
      <span>{error}</span>
    </div>
  );
};

export default ChangePasswordPage;
