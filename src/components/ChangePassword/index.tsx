import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { auth } from "../../config/firebase";
import logging from "../../config/logging";

interface IProps {}

const ChangePassword: React.FC<IProps> = (props) => {
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

  return (
    <div>
      <Form>
        <Row>
          <Col sm={12} md={6} lg={3}>
            <Form.Group className="mb-2">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                name="oldPassword"
                id="oldPassword"
                onChange={(event) => setOld(event.target.value)}
                value={old}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6} lg={3}>
            <Form.Group className="mb-2">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6} lg={3}>
            <Form.Group className="mb-4">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                name="confirm"
                id="confirm"
                onChange={(event) => setConfirm(event.target.value)}
                value={confirm}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button
          disabled={changing}
          onClick={() => passwordChangeRequest()}>
          Change Password
        </Button>
      </Form>
      <span>{error}</span>
    </div>
  );
};

export default ChangePassword;
