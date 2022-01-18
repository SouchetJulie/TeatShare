import Card from "../atoms/Card";
import { FunctionComponent } from "react";
import Input from "../atoms/Input";

interface Props {}

const SignUpForm: FunctionComponent<Props> = () => {
  return (
    <Card>
      <form action="/api/user/signup" method="POST">
        <label htmlFor="firstName">Prénom :</label>
        <Input
          id="firstName"
          name="firstName"
          placeholder="Entrez votre prénom"
          type="text"
        />

        <label htmlFor="lastName">Nom :</label>
        <Input
          id="lastName"
          name="lastName"
          placeholder="Entrez votre nom"
          type="text"
        />

        <label htmlFor="email">Email :</label>
        <Input
          id="email"
          name="email"
          placeholder="Entrez un email valide"
          type="email"
        />

        <label htmlFor="password">Mot de passe :</label>
        <Input
          id="password"
          name="password"
          placeholder="Choisissez un mot de passe fort"
          type="password"
        />

        <label htmlFor="passwordConfirm">Répétez le mot de passe :</label>
        <Input
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
