import IRoute from "../interfaces/IRoute";
import ChangePasswordPage from "../pages/auth/ChangePassword";
import ForgotPasswordPage from "../pages/auth/ForgotPassword";
import LoginPage from "../pages/auth/Login";
import LogoutPage from "../pages/auth/Logout";
import RegisterPage from "../pages/auth/Register";
import ResetPasswordPage from "../pages/auth/ResetPassword";
import Home from "../pages/Home";
import ProfilePage from "../pages/Profile";
import UsersPage from "../pages/Users";

const routes: IRoute[] = [
  {
    path: "/",
    exact: true,
    component: Home,
    name: "Dashboard",
    protected: true,
  },
  {
    path: "/register",
    exact: true,
    component: RegisterPage,
    name: "Register Page",
    protected: false,
  },
  {
    path: "/login",
    exact: true,
    component: LoginPage,
    name: "Login Page",
    protected: false,
  },
  {
    path: "/change",
    exact: true,
    component: ChangePasswordPage,
    name: "Change Password Page",
    protected: true,
  },
  {
    path: "/logout",
    exact: true,
    component: LogoutPage,
    name: "Logout Page",
    protected: true,
  },
  {
    path: "/forget",
    exact: true,
    component: ForgotPasswordPage,
    name: "Forgot Password Page",
    protected: false,
  },
  {
    path: "/reset",
    exact: true,
    component: ResetPasswordPage,
    name: "Reset Password Page",
    protected: false,
  },
  {
    path: "/profile",
    exact: true,
    component: ProfilePage,
    name: "Profile Page",
    protected: true,
  },
  {
    path: "/users",
    exact: true,
    component: UsersPage,
    name: "User Management",
    protected: true,
  },
];

export default routes;
