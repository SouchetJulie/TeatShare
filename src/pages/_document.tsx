import { Head, Html, Main, NextScript } from "next/document";
import { ReactElement } from "react";

/**
 * Custom <document> for adding elements in <Head>.
 * @return {ReactElement}
 */
const Document = (): ReactElement => (
  <Html lang="fr">
    <Head>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"
      />
      <link rel="icon" href={"/favicon.ico"} />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
