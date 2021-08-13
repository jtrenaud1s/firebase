import React from "react";
import { Redirect } from "react-router-dom";
import logging from "../../config/logging";
import { useAuth } from "../../hooks/hooks";
import Loadscreen from "../Loadscreen";

export interface IProtectedRouteProps {}

const ProtectedRoute: React.FunctionComponent<IProtectedRouteProps> = (
  props
) => {
  const [ user, loading ] = useAuth();
  const { children } = props;

  if(loading) {
    return <Loadscreen />
  }

  if (!user) {
    logging.warn("No user detected, redirecting");
    return <Redirect to="/login" />;
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
