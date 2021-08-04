import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../config/firebase";
import logging from "../../config/logging";
//import firebase from "firebase";
//import { SignInWithSocialMedia } from "../../pages/auth/modules";
import { CenterContainer } from "../CenterContainer";
import { Card } from "../Card";
import { Input } from "../Input";
import { Button } from "../Button";
import { H1 } from "../Heading/H1";

const LoginBox: React.FC = (props) => {
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

  // const signInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
  //   if (error !== "") setError("");

  //   setAuthenticating(true);

  //   SignInWithSocialMedia(provider)
  //     .then((result) => {
  //       logging.info(result);
  //       history.push("/");
  //     })
  //     .catch((error) => {
  //       logging.error(error);
  //       setAuthenticating(false);
  //       setError(error.message);
  //     });
  // };

  return (
    <CenterContainer className="flex flex-col">
      <Card className="items-center">
        <H1 className="text-center">Login</H1>
        <span>{error}</span>
        <Input
          type="email"
          name="email"
          id="email"
          className="mb-4"
          placeholder="Email Address"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <Input
          type="password"
          name="password"
          id="password"
          className="mb-4"
          placeholder="Enter Password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <Button
          className="mb-4"
          disabled={authenticating}
          onClick={() => signInWithEmailAndPassword()}>
          Login
        </Button>

        {/* <hr className="bg-info m-3" />
        <button
          disabled={authenticating}
          onClick={() => signInWithSocialMedia(Providers.google)}
          style={{ backgroundColor: "#ea4335", borderColor: "#ea4335" }}>
          Sign in with Google
        </button> */}
      </Card>
      <small>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/register">Register here.</Link>
        </p>
        <p className="text-center">
          <Link to="/forget">Forget your password?</Link>
        </p>
      </small>
    </CenterContainer>
  );
};

export default LoginBox;
