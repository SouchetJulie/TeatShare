import LandingPage from "../client/components/LandingPage";
import Link from "next/link";
import Head from "next/head";

// eslint-disable-next-line require-jsdoc
export default function Test() {
  return (
    <>
      <Head>
        <title>TeatShare - Test</title>
        <meta
          name="description"
          content="Site de partage de fiches de cours pour les instituteurs, par les instituteurs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingPage />
      <Link href="/">Home</Link>
    </>
  );
}
