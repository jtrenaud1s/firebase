import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Firebase from "../config/firebase";
import IPageProps from "../interfaces/IPageProps";

const useStuff = () => {
  const [stuff, setStuff] = useState<any>([])

  useEffect(() => {
    Firebase.firestore().collection('stuff').onSnapshot((snapshot) => {
      const newStuff = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))

      setStuff(newStuff)
    })
  }, [])

  return stuff
}

const HomePage: React.FunctionComponent<IPageProps> = (props) => {

  const stuff = useStuff()


  return (
    <div>
      <p>Welcome to this page that is protected by Friebase auth!</p>
      <p>
        Change your password <Link to="/change">here</Link>.
      </p>
      <p>
        Click <Link to="/logout">here</Link> to logout.
      </p>
      <ol>
        {stuff.map((item: any) => {
          return <li key={item.id}>{item.name}</li>
        })}
      </ol>
    </div>
  );
};

export default HomePage;
