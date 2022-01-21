import React, { FunctionComponent } from "react";
import { useLoginRedirect } from "@hooks/useLoginRedirect.hook";

const index: FunctionComponent = () => {
  const user = useLoginRedirect();

  return user ? <div>TODO</div> : <></>;
};

export default index;
