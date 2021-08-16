import React, { createContext, useEffect, useState } from "react";
import { Firestore } from "../config/firebase";
import { IUser } from "../interfaces/IUser";

export interface IUserContext {
  users: IUser[];
  loading: boolean;
}

interface IProps {}

export const UserContext = createContext<IUserContext>({
  users: [],
  loading: true,
});

const UserProvider: React.FC<IProps> = (props) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = Firestore.collection("users").onSnapshot((snapshot) => {
      const newUsers: IUser[] = snapshot.docs.map(
        (doc) =>
          ({
            ...(doc.data() as IUser),
            uid: doc.id,
          } as IUser)
      );
      setUsers(newUsers)
      setLoading(false)
    });

    return unsubscribe;
  }, []);

  const value: IUserContext = {
    users,
    loading,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
