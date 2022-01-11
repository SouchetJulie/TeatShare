import LandingPage from "../client/components/LandingPage/LandingPage";
import Head from "next/head";
import {FunctionComponent} from "react";

interface Props {}

/**
 * App constructor
 * @constructor
 */
const Home: FunctionComponent<Props> = () => {
  return (
    <>
      <Head>
        <title>TeatShare - Home</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingPage />
    </>
  );
}
export default Home;