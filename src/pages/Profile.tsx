import React, { useContext, useState } from "react";
import IPageProps from "../interfaces/IPageProps";
import { Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import Layout from "./Layout/Layout";
import Loadscreen from "../components/Loadscreen";
import { AuthContext } from "../contexts/AuthContext";
import ProfilePictureSelector from "../components/ProfilePictureSelector";
import { IUser } from "../interfaces/IUser";

const ProfilePage: React.FunctionComponent<IPageProps> = (props) => {
  const { user, loading } = useContext(AuthContext);
  const [firstName, setFirstName] = useState(user!.firstName);
  const [lastName, setLastName] = useState(user!.lastName)

  if (loading) {
    return <Loadscreen />;
  }

  return (
    <Layout title="User Profile">
      <Tabs defaultActiveKey="profile" id="profile-tabs-main" className="mb-3">
        <Tab eventKey="profile" title="My Profile">
          <h2>My Profile</h2>
          <Form>
            <Row>
              <Col sm={12} md={2}>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phil"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} md={2}>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Born"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group>
                  <Form.Label>Profile Picture</Form.Label>
                  <ProfilePictureSelector user={user as IUser}/>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Tab>
        <Tab eventKey="contact" title="Contact Info"></Tab>
        <Tab eventKey="password" title="Change Password"></Tab>
      </Tabs>
    </Layout>
  );
};

export default ProfilePage;
