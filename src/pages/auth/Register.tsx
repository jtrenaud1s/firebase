import React from "react";
import SignUpBox from "../../components/SignUpBox";
import IPageProps from "../../interfaces/IPageProps";

const RegisterPage: React.FunctionComponent<IPageProps> = () => {

  return (
    <div>
      <SignUpBox />
    </div>
  );
};

export default RegisterPage;
