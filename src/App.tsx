import React, { useEffect, useState } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { auth } from "./config/firebase";
import logging from "./config/logging";
import routes from "./config/routes";

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        logging.info("User detected.");
      } else {
        logging.info("No user detected");
      }

      setLoading(false);
    });
  }, []);

  if (loading) return <div>loading...</div>;

  return (
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={(routeProps: RouteComponentProps<any>) => {
              if (route.protected)
                return (
                  <ProtectedRoute>
                    <route.component {...routeProps} />
                  </ProtectedRoute>
                );

              return <route.component {...routeProps} />;
            }}
          />
        ))}
      </Switch>
  );
};

export default Application;
