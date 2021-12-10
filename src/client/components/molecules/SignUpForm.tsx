import Card from "../atoms/Card";
import { FunctionComponent } from "react";

interface Props {}

const SignUpForm: FunctionComponent<Props> = () => {
  return (
    <Card>
      <h2>S&apos;incrire</h2>
      <form action="/api/user/signup" method="POST">
        <input
          id="firstName"
          name="firstName"
          placeholder="Entrez votre prénom"
          type="text"
        />

        <input
          id="lastName"
          name="lastName"
          placeholder="Entrez votre nom"
          type="text"
        />

        <input
          id="email"
          name="email"
          placeholder="Entrez un email valide"
          type="email"
        />

        <input
          id="password"
          name="password"
          placeholder="Choisissez un mot de passe fort"
          type="password"
        />

        <input
          id="passwordConfirm"
          name="passwordConfirm"
          placeholder="Choisissez un mot de passe fort"
          type="password"
        />

        <button type="submit">Envoyer</button>
      </form>
    </Card>
  );
};
export default SignUpForm;
