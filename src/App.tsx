import { Route, RouteComponentProps, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import routes from "./config/routes";
import AuthProvider from "./contexts/AuthContext";
import RoleProvider from "./contexts/RoleContext";

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
  return (
    <AuthProvider>
      <RoleProvider>
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
      </RoleProvider>
    </AuthProvider>
  );
};

export default Application;
