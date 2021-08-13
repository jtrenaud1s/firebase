import { useEffect, useState, useContext } from "react";
import Firebase from "../config/firebase";
import { AuthContext } from "../contexts/AuthContext";
import { UserContext } from "../contexts/UserContext";

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
  return [users, loading];
};
