import LandingPage from "../client/components/LandingPage/LandingPage";
import Head from "next/head";
import { FunctionComponent } from "react";
import HomePage from "@components/HomePage/HomePage";
import { useUser } from "@hooks/useUser.hook";

interface Props {}

/**
 * Home page.
 * @constructor
 */
const Home: FunctionComponent<Props> = () => {
  const { user } = useUser();
  const component: JSX.Element = user ? <HomePage /> : <LandingPage />;
  return (
    <>
      <Head>
        <title>TeatShare - Accueil</title>
      </Head>
      {component}
    </>
  );
};
export default Home;
