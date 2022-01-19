import { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import { Provider } from "react-redux";

import Alert from "@components/Alert";
import NavBar from "@components/menu/NavBar";
import SideBar from "@components/menu/SideBar";
import { useUser } from "@hooks/useUser.hook";
import { store } from "@stores/store";
import { IAlert } from "@stores/alert.store";
import "@styles/globals.scss";
import { NavbarVariant } from "@typing/navbar-variant.enum";

/**
 * Main application component: contains the parts that are in common for the whole app.
 * @constructor
 */
function App({ Component, pageProps }: AppProps) {
  const { user } = useUser(); // TODO use store
  const [alertList, setAlertList] = useState([]);

  let navbarVariant: NavbarVariant = NavbarVariant.dark;
  if (!user) {
    navbarVariant = NavbarVariant.light;
  }

  store.subscribe(() => setAlertList(store.getState().alerts.list));

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
        <NavBar variant={navbarVariant} />
        <SideBar hasUser={!!user} />
        <Component {...pageProps} />
        <div className="d-flex flex-column position-fixed bottom-0 w-100">
          {alerts}
        </div>
      </Provider>
    </>
  );
}

export default App;
