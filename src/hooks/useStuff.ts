import { useEffect, useState } from "react";
import Firebase from "../config/firebase";

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