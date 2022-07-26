import { useAutoLogin } from "@hooks/auto-login.hook";
import { useAppSelector } from "@hooks/store-hook";
import { IAlert, selectAlerts } from "@stores/alert.store";
import { store } from "@stores/store";
import { selectIsAuthenticated } from "@stores/user.store";
import "@styles/globals.scss";
import { AppProps } from "next/app";
import Head from "next/head";
import Container from "react-bootstrap/Container";
import { Provider } from "react-redux";
import Footer from "../client/components/menu/Footer";
import NavBar from "../client/components/menu/NavBar";
import SideBar from "../client/components/menu/SideBar";
import Alert from "../client/components/ui/AlertComponent";

import fr from "date-fns/locale/fr";

import { registerLocale, setDefaultLocale } from "react-datepicker";

setDefaultLocale("fr");
registerLocale("fr", fr);

/**
 * Main application component: contains the parts that are shared for the whole app.
 * @constructor
 */
const App = ({ Component, pageProps }: AppProps) => {
  useAutoLogin(); // auto-login if session has not expired yet
  const isAuthenticated: boolean = useAppSelector(selectIsAuthenticated);
  const alertList: IAlert[] = useAppSelector(selectAlerts);

  const alerts = alertList.map((alert: IAlert) => (
    <Alert
      key={`alert-${alert.id}`}
      message={alert.message}
      success={alert.success}
      id={alert.id}
      ttl={alert.ttl}
    />
  ));

  return (
    <>
      <Head>
        <title>TeatShare</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Container
        fluid
        className=" p-0 min-vh-100 d-flex justify-content-between flex-column"
      >
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
        <Footer isAuthenticated={isAuthenticated} />
      </Container>
      <div className="d-flex flex-column position-fixed bottom-0 w-100 onTop">
        {alerts}
      </div>
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
