import { useAutoLogin } from "@hooks/auto-login.hook";
import React, { FunctionComponent } from "react";

const settings: FunctionComponent = () => {
  const user = useAutoLogin();

  return user ? <div>TODO</div> : <></>;
};

export default settings;
