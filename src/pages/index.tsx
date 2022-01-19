import LandingPage from "../client/components/LandingPage/LandingPage";
import Head from "next/head";
import { FunctionComponent } from "react";
import HomePage from "@components/HomePage/HomePage";
import { useUser } from "@hooks/useUser.hook";

interface Props {}

/**
 * App constructor
 * @constructor
 */
const Home: FunctionComponent<Props> = () => {
  const { user } = useUser();
  const displayNav: boolean = user ? true : false;
  const whatLanding: JSX.Element = user ? (
    <HomePage displayNav={displayNav} />
  ) : (
    <LandingPage />
  );
  return (
    <>
      <Head>
        <title>TeatShare - Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>
      </Head>
      {whatLanding}
    </>
  );
};
export default Home;
