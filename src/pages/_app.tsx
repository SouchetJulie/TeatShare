import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";

import Footer from "@components/menu_TORENAME/Footer";
import NavBar from "@components/menu_TORENAME/NavBar";
import SideBar from "@components/menu_TORENAME/SideBar";
import Alert from "@components/ui/AlertComponent";
import { store } from "@stores/store";
import { IAlert, selectAlerts } from "@stores/alert.store";
import "@styles/globals.scss";
import { selectIsAuthenticated } from "@stores/user.store";
import { useAppSelector } from "@hooks/store-hook";
import { useAutoLogin } from "@hooks/auto-login.hook";

/**
 * Main application component: contains the parts that are shared for the whole app.
 * @constructor
 */
const App = ({ Component, pageProps }: AppProps) => {
  useAutoLogin(); // auto-login if session has not expired yet
  const isAuthenticated: boolean = useAppSelector(selectIsAuthenticated);
  const alertList: IAlert[] = useAppSelector(selectAlerts);

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
        <title>TeatShare</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <NavBar />
        <SideBar />
      </header>
      <main id="__next_page" className={isAuthenticated ? "authenticated" : ""}>
        <Component {...pageProps} />
      </main>
      <div className="d-flex flex-column position-fixed bottom-0 w-100 onTop">
        {alerts}
      </div>
      <Footer />
    </>
  );
};

/**
 * Wrapper for the app for accessing Redux store
 * @param {AppProps} props
 * @return {JSX.Element}
 */
const _app = ({ Component, pageProps, router }: AppProps): JSX.Element => (
  <Provider store={store}>
    <App pageProps={pageProps} Component={Component} router={router} />
  </Provider>
);

export default _app;
