import { useAutoLogin } from "@hooks/auto-login.hook";
import { FunctionComponent } from "react";

const settings: FunctionComponent = () => {
  const user = useAutoLogin();

  return user ? <div>TODO</div> : <></>;
};

export default settings;
