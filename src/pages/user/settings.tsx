import React, { FunctionComponent } from "react";
import { useAutoLogin } from "@hooks/auto-login.hook";

const settings: FunctionComponent = () => {
  const user = useAutoLogin();

  return user ? <div>TODO</div> : <></>;
};

export default settings;
