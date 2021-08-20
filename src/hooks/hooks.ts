import { useEffect, useState, useContext } from "react";
import Firebase from "../config/firebase";
import { AuthContext } from "../contexts/AuthContext";
import { RoleContext } from "../contexts/RoleContext";
import { UserContext } from "../contexts/UserContext";
import { IRole } from "../interfaces/IRole";
import { IUser } from "../interfaces/IUser";

export const useStuff = () => {
  const [stuff, setStuff] = useState<any>([]);

  useEffect(() => {
    Firebase.firestore()
      .collection("stuff")
      .onSnapshot((snapshot) => {
        const newStuff = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setStuff(newStuff);
      });
  }, []);

  return stuff;
};

export const useAuth = () => {
  const { user, loading } = useContext(AuthContext);
  return [user, loading];
};

export const useUsers = () => {
  const { users, loading } = useContext(UserContext);

  const getUser = (id: string) => {
    const results: IUser[] = users.filter((user) => user.uid === id);
    return results.length > 0 ? results[0] : null;
  };

  return { users, getUser, loading };
};

export const useRoles = () => {
  const { roles, loading } = useContext(RoleContext);

  const getRole = (id: string) => {
    const results: IRole[] = roles.filter((role) => role.id === id);

    if (results.length === 0) {
      throw new Error("Role Doesn't exist!")
    }

    return results[0]
  };

  return { roles, getRole, loading };
};

export const usePermissions = () => {
  const { getRole } = useRoles();

  const userHasPermission = (user: IUser, permission: string) => {
    const role = getRole(user.role);
    if (role === null) return false;

    if (roleHasPermission(role, permission)) return true;

    const others = user.roles.map((role) => getRole(role));

    for (const rol of others) {
      if (rol === null) return false;
      if (roleHasPermission(rol, permission)) return true;
    }
    return false;
  };

  const roleHasPermission = (role: IRole, permission: string) => {
    if (role.permissions.includes(permission)) {
      return true;
    }

    const inheritance = role.inherits.map((inherit) => getRole(inherit));

    if (inheritance === null) return false;

    for (const rol of inheritance) {
      if (rol === null) return false;
      if (roleHasPermission(rol, permission)) return true;
    }
    return false;
  };

  return { userHasPermission, roleHasPermission };
};
