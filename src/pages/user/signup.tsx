import { FunctionComponent } from "react";
import SignUpFormComponent from '../../client/components/signIn_signUp/LoginForm.component';

interface Props {}

const signup: FunctionComponent<Props> = () => {
  return (
    <SignUpFormComponent />
  );
};

export default signup;