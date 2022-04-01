import React, { FunctionComponent } from "react";
import { useLoginRedirect } from "@hooks/login-redirect.hook";

const forLater: FunctionComponent = () => {
  const user = useLoginRedirect();

  return user ? <div>TODO</div> : <></>;
};

export default forLater;
