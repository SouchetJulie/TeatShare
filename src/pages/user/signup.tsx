import React, { FunctionComponent } from "react";

interface Props {}

const signup: FunctionComponent<Props> = () => {
  return (
    <form action="/api/user" method="POST">
      <label htmlFor="firstName">Prénom :</label>
      <input
        id="firstName"
        name="firstName"
        placeholder="Entrez votre prénom"
        required
      />

      <label htmlFor="firstName">Nom :</label>
      <input
        id="lastName"
        name="lastName"
        placeholder="Entrez votre nom"
        required
      />

      <button type="submit">Envoyer</button>
    </form>
  );
};

export default signup;
