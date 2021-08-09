import React from "react";
import IPageProps from "../../interfaces/IPageProps";
import LoginBox from "../../components/Login";
import CenterContainer from "../../components/CenterContainer";

const LoginPage: React.FunctionComponent<IPageProps> = (props) => {
  return (
    <CenterContainer>
      <LoginBox />
    </CenterContainer>
  );
};

export default LoginPage;
