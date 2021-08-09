import React, { useState } from "react";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../config/firebase";
import logging from "../../config/logging";
import Box from "../Box";

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
    <div className="d-flex flex-column w-25">
      <Box title="Sign Up">
        <FormGroup className="w-100">
          <FormLabel>Email</FormLabel>
          <FormControl
            type="email"
            name="email"
            id="email"
            className="mb-2"
            placeholder="you@school.edu"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </FormGroup>
        <FormGroup className="w-100">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            name="password"
            id="password"
            placeholder="..."
            className="mb-2"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </FormGroup>
        <FormGroup className="w-100">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type="password"
            name="confirm"
            id="confirm"
            className="mb-2"
            placeholder="Confirm Password"
            onChange={(e) => setConfirm(e.target.value)}
            value={confirm}
          />
        </FormGroup>
        <Button
          className="w-100"
          disabled={registering}
          onClick={() => signUpWithEmailAndPassword()}>
          Sign Up
        </Button>
      </Box>
      <small>
        <p className="mt-4 text-center">
          Already a member? <Link to="/login">Login!</Link>
        </p>
      </small>
    </div>
  );
};

export default SignUpBox;
