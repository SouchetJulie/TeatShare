import React, {FunctionComponent, useEffect, useState} from 'react';
import {Alert} from "react-bootstrap";

import {useAppDispatch} from "@hooks/store-hook";
import {IAlert, removeAlert} from "@stores/alert.store";


const AlertComponent: FunctionComponent<IAlert> = ({message, success, id}) => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(true);

  const remove = () => {
    setShow(false);
    dispatch(removeAlert(id));
  }

  // Hides the alert after a time
  useEffect(() => {
    setTimeout(remove, 2500);
  }, [setShow])

  const variant = success ? 'success' : 'danger';

  return (
    <Alert
      variant={variant}
      show={show}
      onClose={remove}
      dismissible
    >
      {message}
    </Alert>
  )
};

export default AlertComponent;
