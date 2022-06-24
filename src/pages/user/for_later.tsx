import { useLoginRedirect } from "@hooks/login-redirect.hook";
import React, { FunctionComponent } from "react";

const forLater: FunctionComponent = () => {
  const user = useLoginRedirect();

  return user ? <div>TODO</div> : <></>;
};

export default forLater;
