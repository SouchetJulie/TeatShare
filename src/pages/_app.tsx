import {AppProps} from "next/app";
import {useState} from "react";
import {Provider} from "react-redux";

import Alert from "@components/Alert";
import {store} from "@stores/store";
import {IAlert} from "@stores/alert.store";

import "@styles/globals.scss";
import NavBar from "@components/menu/NavBar";

// eslint-disable-next-line require-jsdoc
function MyApp({Component, pageProps}: AppProps) {
  const [alertList, setAlertList] = useState([]);

  store.subscribe(() => setAlertList(store.getState().alerts.list));

  const alerts = alertList
    .map((alert: IAlert) => {
      return <Alert
        key={`alert-${alert.id}`}
        message={alert.message}
        success={alert.success}
        id={alert.id}
      />
    });

  return (
    <>
      <NavBar/>
    <Provider store={store}>
      <div className="d-flex flex-column position-fixed bottom-0 w-100">
        {alerts}
      </div>
      <Component {...pageProps} />
    </Provider>
    </>
  );
}

export default MyApp;
