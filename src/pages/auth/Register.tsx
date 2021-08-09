import React from "react";
import CenterContainer from "../../components/CenterContainer";
import SignUpBox from "../../components/SignUpBox";
import IPageProps from "../../interfaces/IPageProps";

const RegisterPage: React.FunctionComponent<IPageProps> = () => {

  return (
    <CenterContainer>
      <SignUpBox />
    </CenterContainer>
  );
};

export default RegisterPage;
