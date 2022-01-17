import { FunctionComponent } from "react";
import LoginFormComponent from "@components/signIn_signUp/LoginForm.component";

interface Props {}

const login: FunctionComponent<Props> = () => {
  return (
    <LoginFormComponent />
  );
};

export default login;
