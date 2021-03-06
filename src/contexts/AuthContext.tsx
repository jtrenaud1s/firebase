import React, { createContext, useEffect, useState } from "react";
import { auth, getUser } from "../config/firebase";
import AuthUser from "../interfaces/IAuthUser";
import { IUser } from "../interfaces/IUser";

export interface IAuthContext {
  user: AuthUser | null;
  loading: boolean;
}

interface IProps {}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  loading: true,
});

const AuthProvider: React.FC<IProps> = (props) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      setLoading(true);
      if (authUser) {
        getUser(authUser.uid)
          .get()
          .then((snapshot) => {
            const dbUser = snapshot.data();

            if (!dbUser) throw new Error("User does not have a profile!");

            const user: AuthUser = {
              ...(dbUser as IUser),
              uid: authUser.uid,
              emailVerified: authUser.emailVerified,
            };
            setUser(user);
            setLoading(false);
          });
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);

  const value = {
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
