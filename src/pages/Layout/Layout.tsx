import React from "react";
import { Container } from "react-bootstrap";
import SideNav from "./SideNav";
import TopNav from "./TopNav";

interface IProps {
  title?: String;
}

const Layout: React.FC<IProps> = (props) => {
  return (
    <div>
      <TopNav />
      <Container fluid>
        <div className="row">
          <SideNav />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {props.title && (
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">{props.title}</h1>
              </div>
            )}
            {props.children}
          </main>
        </div>
      </Container>
    </div>
  );
};

export default Layout;
