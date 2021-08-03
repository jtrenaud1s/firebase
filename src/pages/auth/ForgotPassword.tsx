import React, { useState } from "react";
import { auth } from "../../config/firebase";
import logging from "../../config/logging";
import IPageProps from "../../interfaces/IPageProps";

const ForgotPasswordPage: React.FunctionComponent<IPageProps> = (props) => {
  const [sending, setSending] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const resetPasswordRequest = () => {
    if (error !== "") setError("");

    setSending(true);

    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        logging.info("Email sent.");
        setSent(true);
        setSending(false);
      })
      .catch((error) => {
        logging.error(error);
        setError(error.message);
        setSending(false);
      });
  };

  return (
    <div>
      {sent ? (
        <p>A link has been sent to your email with instructions.</p>
      ) : (
        <>
          <p>Please enter your email.</p>
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
          <button disabled={sending} onClick={() => resetPasswordRequest()}>
            Send Reset Link
          </button>
          <span>{error}</span>
        </>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
