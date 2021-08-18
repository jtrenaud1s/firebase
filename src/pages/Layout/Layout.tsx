import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import SideNav from "./SideNav";
import TopNav from "./TopNav";

interface IProps {
  title?: String;
}

const Wrapper = styled.div`
  position: relative;
`;

const Layout: React.FC<IProps> = (props) => {
  return (
    <div>
      <TopNav />
      <Container fluid className=" h-100">
        <div className="row">
          <SideNav />
          <Wrapper className="col-md-9 col-lg-10 px-md-4 ms-sm-auto">
            {props.title && (
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">{props.title}</h1>
              </div>
            )}
            {props.children}
          </Wrapper>
        </div>
      </Container>
    </div>
  );
};

export default Layout;
