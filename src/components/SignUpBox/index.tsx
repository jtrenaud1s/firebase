import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../config/firebase";
import logging from "../../config/logging";
import { Button } from "../Button";
import { Card } from "../Card";
import { CenterContainer } from "../CenterContainer";
import { H1 } from "../Heading/H1";
import { Input } from "../Input";

const SignUpBox: React.FC = () => {
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
    <CenterContainer className="flex flex-col">
      <Card className="items-center">
        <H1 className="text-center">Sign Up</H1>
        <Input
          type="email"
          name="email"
          id="email"
          className="mb-4"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          type="password"
          name="password"
          id="password"
          className="mb-4"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Input
          type="password"
          name="confirm"
          id="confirm"
          className="mb-4"
          placeholder="Confirm Password"
          onChange={(e) => setConfirm(e.target.value)}
          value={confirm}
        />
        <Button
          className="w-full"
          disabled={registering}
          onClick={() => signUpWithEmailAndPassword()}>
          Sign Up
        </Button>
      </Card>
      <small>
        <p className="mt-4">
          Already a member? <Link to="/login">Login!</Link>
        </p>
      </small>
    </CenterContainer>
  );
};

export default SignUpBox;
