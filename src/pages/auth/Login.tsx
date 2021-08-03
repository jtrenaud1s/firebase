import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, Providers } from "../../config/firebase";
import logging from "../../config/logging";
import firebase from "firebase";
import { SignInWithSocialMedia } from "./modules";
import IPageProps from "../../interfaces/IPageProps";

const LoginPage: React.FunctionComponent<IPageProps> = (props) => {
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const history = useHistory();

  const signInWithEmailAndPassword = () => {
    if (error !== "") setError("");

    setAuthenticating(true);

    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        logging.info(result);
        history.push("/");
      })
      .catch((error) => {
        logging.error(error);
        setAuthenticating(false);
        setError(error.message);
      });
  };

  const signInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
    if (error !== "") setError("");

    setAuthenticating(true);

    SignInWithSocialMedia(provider)
      .then((result) => {
        logging.info(result);
        history.push("/");
      })
      .catch((error) => {
        logging.error(error);
        setAuthenticating(false);
        setError(error.message);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email Address"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
      </div>
      <div>
        <input
          autoComplete="new-password"
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </div>
      <button
        disabled={authenticating}
        onClick={() => signInWithEmailAndPassword()}>
        Login
      </button>
      <small>
        <p>
          Don't have an account? <Link to="/register">Register here.</Link>
        </p>
        <p>
          <Link to="/forget">Forget your password?</Link>
        </p>
      </small>
      <span>{error}</span>
      <hr className="bg-info m-3" />
      <button
        disabled={authenticating}
        onClick={() => signInWithSocialMedia(Providers.google)}
        style={{ backgroundColor: "#ea4335", borderColor: "#ea4335" }}>
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginPage;
