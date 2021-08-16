import React, { createContext, useEffect, useState } from "react";
import { Firestore } from "../config/firebase";
import { IRole } from "../interfaces/IRole";

export interface IRoleContext {
  roles: IRole[];
  loading: boolean;
}

interface IProps {}

export const RoleContext = createContext<IRoleContext>({
  roles: [],
  loading: true,
});

const RoleProvider: React.FC<IProps> = (props) => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = Firestore.collection("roles").onSnapshot((snapshot) => {
      const newroles: IRole[] = snapshot.docs.map(
        (doc) =>
          ({
            ...(doc.data() as IRole),
            id: doc.id,
          } as IRole)
      );
      setRoles(newroles);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: IRoleContext = {
    roles,
    loading,
  };

  return (
    <RoleContext.Provider value={value}>{props.children}</RoleContext.Provider>
  );
};

export default RoleProvider;
