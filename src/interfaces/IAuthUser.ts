import { IUser } from "./IUser";

interface AuthUser extends IUser {
  emailVerified: boolean;
}

export default AuthUser