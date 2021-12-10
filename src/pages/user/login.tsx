import { FunctionComponent } from "react";

interface Props {}

const login: FunctionComponent<Props> = () => {
  return (
    <form action={'/api/user/login'} method="POST">
      <label htmlFor="email">Email :</label>
      <input
        id="email"
        name="email"
        placeholder="Entrez votre email"
        type="email"
        required
      />

      <label htmlFor="password">Mot de passe :</label>
      <input
        id="password"
        name="password"
        placeholder="Entrez votre mot de passe"
        type="password"
        required
      />

      <button type="submit">Envoyer</button>
    </form>
  );
};

export default login;
