import { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import { Provider } from "react-redux";

import Alert from "@components/Alert";
import NavBar from "@components/menu/NavBar";
import SideBar from "@components/menu/SideBar";
import { store } from "@stores/store";
import { IAlert } from "@stores/alert.store";
import "@styles/globals.scss";

/**
 * Main application component: contains the parts that are in common for the whole app.
 * @constructor
 */
function App({ Component, pageProps }: AppProps) {
  const [alertList, setAlertList] = useState([]);

  store.subscribe(() => {
    const state = store.getState();
    setAlertList(state.alerts.list);
    console.log("user:", state.user.authenticatedUser);
  });

  const alerts = alertList.map((alert: IAlert) => {
    return (
      <Alert
        key={`alert-${alert.id}`}
        message={alert.message}
        success={alert.success}
        id={alert.id}
      />
    );
  });

  return (
    <>
      <Head>
        <title>TeatShare</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href={"/favicon.ico"} />
      </Head>
      <Provider store={store}>
        <header>
          <NavBar />
          <SideBar />
        </header>
        <main id="__next_page">
          <Component {...pageProps} />
        </main>
        <div className="d-flex flex-column position-fixed bottom-0 w-100">
          {alerts}
        </div>
      </Provider>
    </>
  );
}

export default App;
