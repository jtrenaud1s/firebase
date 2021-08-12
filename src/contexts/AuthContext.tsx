import React, { createContext, useEffect, useState } from 'react'
import { auth, getUser } from '../config/firebase';
import logging from '../config/logging';
import AuthUser from '../types/AuthUser'

export interface IAuthContext {
  user: AuthUser | null
  loading: boolean
}

interface IProps {

}

export const AuthContext = createContext<IAuthContext>({user: null, loading: true})

const AuthProvider: React.FC<IProps> = (props) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      setLoading(true)
      logging.info("Log")
      console.log(authUser);
      if (authUser) {
        getUser(authUser.uid)
          .get()
          .then((snapshot) => {
            const dbUser = snapshot.data();

            if (!dbUser) throw new Error("User does not have a profile!");

            const user: AuthUser = {
              uid: authUser.uid,
              email: authUser.email!,
              emailVerified: authUser.emailVerified,
              firstName: dbUser.firstName,
              lastName: dbUser.lastName,
              iNumber: dbUser.iNumber,
              role: dbUser.role,
              roles: dbUser.roles,
            };
            setUser(user)
            setLoading(false)
          });
      } else {
        setUser(null)
        setLoading(false)
      }
    });
  }, []);

  const value = {
    user,
    loading
  }

  if (loading) {
    return <>loading...</>
  }
  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
