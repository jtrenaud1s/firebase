import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../config/firebase";
import logging from "../../config/logging";
import IPageProps from "../../interfaces/IPageProps";

const RegisterPage: React.FunctionComponent<IPageProps> = () => {
  const [registering, setRegistering] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("initialState");
  const [error, setError] = useState("initialState");

  const history = useHistory();

  const signUpWithEmailAndPassword = () => {
    if (error !== "") setError("");

    setRegistering(true);

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        logging.info(result);
        history.push("login");
      })
      .catch((error) => {
        logging.error(error);

        if (error.code.includes("auth/weak-password")) {
          setError("Please enter a stronger password.");
        } else if (error.code.includes("auth/email-already-in-use")) {
          setError("Email already in use.");
        } else {
          setError("Unable to register.  Please try again later.");
        }

        setRegistering(false);
      });
  };

  return (
    <div>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email Address"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <input
        type="password"
        name="confirm"
        id="confirm"
        placeholder="Confirm Password"
        onChange={(e) => setConfirm(e.target.value)}
        value={confirm}
      />
      <button
        disabled={registering}
        onClick={() => signUpWithEmailAndPassword()}>
        Sign Up
      </button>
      <small>
        <p>
          Already a member? <Link to="/login">Login!</Link>
        </p>
      </small>
    </div>
  );
};

export default RegisterPage;
