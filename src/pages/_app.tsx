import { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import { Provider } from "react-redux";

import Alert from "@components/AlertComponent";
import NavBar from "@components/Menu/NavBar";
import SideBar from "@components/Menu/SideBar";
import { store } from "@stores/store";
import { IAlert, selectAlerts } from "@stores/alert.store";
import "@styles/globals.scss";
import { selectIsAuthenticated } from "@stores/user.store";

/**
 * Main application component: contains the parts that are in common for the whole app.
 * @constructor
 */
function App({ Component, pageProps }: AppProps) {
  const [alertList, setAlertList] = useState<IAlert[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  store.subscribe(() => {
    const state = store.getState();
    setAlertList(selectAlerts(state));
    setIsAuthenticated(selectIsAuthenticated(state));
  });

  const alerts = alertList.map((alert: IAlert) => {
    return (
      <Alert
        key={`alert-${alert.id}`}
        message={alert.message}
        success={alert.success}
        id={alert.id}
        ttl={alert.ttl}
      />
    );
  });

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"
        />
        <title>TeatShare</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href={"/favicon.ico"} />
      </Head>
      <Provider store={store}>
        <header>
          <NavBar />
          <SideBar />
        </header>
        <main
          id="__next_page"
          className={isAuthenticated ? "authenticated" : ""}
        >
          <Component {...pageProps} />
        </main>
        <div className="d-flex flex-column position-fixed bottom-0 w-100 onTop">
          {alerts}
        </div>
      </Provider>
    </>
  );
}

export default App;
