import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Firebase from "../config/firebase";
import IPageProps from "../interfaces/IPageProps";
import Layout from "./Layout/Layout";

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
    <Layout title="Dashboard">
      <p>Bing Bong</p>
      <p>
        Change your password <Link to="/change">here</Link>.
      </p>
      <ol>
        {stuff.map((item: any) => {
          return <li key={item.id}>{item.name}</li>
        })}
      </ol>
    </Layout>
  );
};

export default HomePage;
