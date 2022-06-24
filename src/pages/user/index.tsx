import { useLoginRedirect } from "@hooks/login-redirect.hook";
import React, { FunctionComponent } from "react";

const index: FunctionComponent = () => {
  const user = useLoginRedirect();

  return user ? <div>TODO</div> : <></>;
};

export default index;
