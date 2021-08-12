import React from "react";
import { Redirect } from "react-router-dom";
import logging from "../../config/logging";
import { useAuth } from "../../hooks/useAuth";

export interface IProtectedRouteProps {}

const ProtectedRoute: React.FunctionComponent<IProtectedRouteProps> = (
  props
) => {
  const [ user, loading ] = useAuth();
  const { children } = props;

  if(loading) {
    return <div>loading...</div>
  }

  if (!user) {
    logging.warn("No user detected, redirecting");
    return <Redirect to="/login" />;
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
