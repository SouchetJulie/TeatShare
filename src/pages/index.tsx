import LandingPage from "../client/components/LandingPage";
import Link from "next/link";
import Head from "next/head";

// eslint-disable-next-line require-jsdoc
export default function Home() {
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
      <Link href="/test">Test</Link>
    </>
  );
}
