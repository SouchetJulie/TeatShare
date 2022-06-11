import React, { FunctionComponent } from "react";
import { useAutoLogin } from "@hooks/auto-login.hook";

const forLater: FunctionComponent = () => {
  const user = useAutoLogin();

  return user ? <div>TODO</div> : <></>;
};

export default forLater;
