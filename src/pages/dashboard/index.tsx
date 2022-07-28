import Dashboard from "@client/components/dashboard/Dashboard";
import { useAutoLogin } from "@hooks/auto-login.hook";
import { FunctionComponent } from "react";

const index: FunctionComponent = () => {
  const user = useAutoLogin();

  return <Dashboard user={user} />;
};

export default index;
