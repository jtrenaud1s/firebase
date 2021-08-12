import React from "react";
import { useStuff } from "../hooks/useStuff";
import IPageProps from "../interfaces/IPageProps";
import Layout from "./Layout/Layout";

const HomePage: React.FunctionComponent<IPageProps> = (props) => {
  const stuff = useStuff();

  return (
    <Layout title="Dashboard">
      <p>Bing Bong</p>
      <ol>
        {stuff.map((item: any) => {
          return <li key={item.id}>{item.name}</li>;
        })}
      </ol>
    </Layout>
  );
};

export default HomePage;
