import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Profile from "../../components/Profile";

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { usePermissions } from "../../hooks/hooks";
import { IUser } from "../../interfaces/IUser";

const SideNav = () => {
  const { user } = useContext(AuthContext);
  const { userHasPermission } = usePermissions();

  return (
    <Navbar.Collapse
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
      <div className="position-sticky pt-3">
        <Profile
          user={user!}
        />
        <Nav className="flex-column">
          <Nav.Link
            exact
            aria-current="page"
            as={NavLink}
            to="/"
            activeClassName="active">
            Dashboard
          </Nav.Link>
          {userHasPermission(user as IUser, "recruitment") && (
            <Nav.Link
              aria-current="page"
              as={NavLink}
              to="/recruitment"
              activeClassName="active">
              Recruitment
            </Nav.Link>
          )}
          {userHasPermission(user as IUser, "users.manage") && (
            <NavDropdown id="management" title="User Management">
              <Nav.Link
                aria-current="page"
                as={NavLink}
                to="/users"
                activeClassName="active">
                Users
              </Nav.Link>
              <Nav.Link
                aria-current="page"
                as={NavLink}
                to="/roles"
                activeClassName="active">
                Roles
              </Nav.Link>
            </NavDropdown>
          )}
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
