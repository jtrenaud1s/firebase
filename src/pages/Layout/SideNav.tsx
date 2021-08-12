import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Profile from "../../components/Profile";

import avatar from "../../assets/img/avatar.jpg";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const SideNav = () => {
  
  const {user} = useContext(AuthContext)

  return (
    <Navbar.Collapse
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
      <div className="position-sticky pt-3">
        <Profile img={avatar} name={`${user?.firstName} ${user?.lastName}`} role="SuperUser" />
        <Nav className="flex-column">
          <Nav.Link
            active={true}
            aria-current="page"
            as={NavLink}
            to="/"
            activeClassName="active">
            Dashboard
          </Nav.Link>
        </Nav>
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Saved reports</span>
        </h6>
        <Nav className="nav flex-column mb-2">
          <Nav.Link as={NavLink} to="/test" activeClassName="active">
            Current month
          </Nav.Link>
        </Nav>
      </div>
    </Navbar.Collapse>
  );
};

export default SideNav;
