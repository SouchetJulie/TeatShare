import LandingPage from "../client/components/LandingPage/LandingPage";
import Head from "next/head";
import { FunctionComponent } from "react";
import HomePage from "@components/HomePage/HomePage";
import { useSelector } from "react-redux";
import { selectAuthenticatedUser } from "@stores/user.store";

interface Props {}

/**
 * Home page.
 * @constructor
 */
const Home: FunctionComponent<Props> = () => {
  const user = useSelector(selectAuthenticatedUser);
  // TODO use lessons component when authenticated
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
