import { AppProps } from "next/app";
import "../styles/globals.scss";

// eslint-disable-next-line require-jsdoc
function MyApp({ Component, pageProps }: AppProps) {
  // toto
  return <Component {...pageProps} />;
}

export default MyApp;
