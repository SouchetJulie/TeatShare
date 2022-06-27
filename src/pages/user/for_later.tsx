import { useAutoLogin } from "@hooks/auto-login.hook";
import React, { FunctionComponent } from "react";

const forLater: FunctionComponent = () => {
  const user = useAutoLogin();

  return user ? <div>TODO</div> : <></>;
};

export default forLater;
