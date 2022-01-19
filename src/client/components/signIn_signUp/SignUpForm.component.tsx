import React, { FunctionComponent } from "react";

interface SignUpFormComponentProps {}

const SignUpFormComponent: FunctionComponent<SignUpFormComponentProps> = () => {
  return (
    <form action={'/api/user/signup'} method="POST">
      <label htmlFor="firstName">Prénom :</label>
      <input
        id="firstName"
        name="firstName"
        placeholder="Entrez votre prénom"
        required
      />
    
      <label htmlFor="lastName">Nom :</label>
      <input
        id="lastName"
        name="lastName"
        placeholder="Entrez votre nom"
        required
      />
    
      <label htmlFor="email">Email :</label>
      <input
        id="email"
        name="email"
        placeholder="Entrez un email valide"
        type="email"
        required
      />
    
      <label htmlFor="password">Mot de passe :</label>
      <input
        id="password"
        name="password"
        placeholder="Choisissez un mot de passe fort"
        type="password"
        required
      />
    
      <label htmlFor="passwordConfirm">Répétez le mot de passe :</label>
      <input
        id="passwordConfirm"
        name="passwordConfirm"
        placeholder="Choisissez un mot de passe fort"
        type="password"
        required
      />
    
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default SignUpFormComponent;
