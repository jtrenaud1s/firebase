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
        <Profile user={user!} />
        <Nav className="flex-column">
          <Nav.Link
            exact
            aria-current="page"
            as={NavLink}
            to="/"
            activeClassName="active">
            Dashboard
          </Nav.Link>
        </Nav>
        {userHasPermission(user as IUser, "recruitment") && (
          <Nav.Link
            aria-current="page"
            as={NavLink}
            to="/recruitment"
            activeClassName="active">
            Recruitment
          </Nav.Link>
        )}
        {userHasPermission(user as IUser, "studyhours") && (
          <Nav.Link
            aria-current="page"
            as={NavLink}
            to="/recruitment"
            activeClassName="active">
            Study Hours
          </Nav.Link>
        )}
        {userHasPermission(user as IUser, "committees") && (
          <Nav.Link
            aria-current="page"
            as={NavLink}
            to="/committees"
            activeClassName="active">
            Committees
          </Nav.Link>
        )}
        {userHasPermission(user as IUser, "merch") && (
          <Nav.Link
            aria-current="page"
            as={NavLink}
            to="/merch"
            activeClassName="active">
            Merch
          </Nav.Link>
        )}
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Administration</span>
        </h6>
        <Nav className="nav flex-column mb-2">
          {userHasPermission(user as IUser, "users.manage") && (
            <NavDropdown id="management" title="User Management">
              <NavDropdown.Item
                aria-current="page"
                as={NavLink}
                to="/users"
                activeClassName="active">
                Users
              </NavDropdown.Item>
              <NavDropdown.Item
                aria-current="page"
                as={NavLink}
                to="/roles"
                activeClassName="active">
                Roles
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </div>
    </Navbar.Collapse>
  );
};

export default SideNav;
