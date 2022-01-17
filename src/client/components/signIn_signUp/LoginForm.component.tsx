import { FunctionComponent } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LoginFormComponentProps {}

const LoginFormComponent: FunctionComponent<LoginFormComponentProps> = () => {
  return (
    <div className="cardWrapper">
      <div className="cardContainer">
        <div className="cancelIcon">
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <h2>Se connecter</h2>
        <form action="/api/user/login" method="POST">
          <input
            id="email"
            name="email"
            placeholder="adresse email"
            type="email"
            required
          />

          <input
            id="password"
            name="password"
            placeholder="mot de passe"
            type="password"
            required
          />

          <button type="submit">Envoyer</button>
          <button type="submit">Créer un compte</button>
        </form>
      </div>
    </div>
  );
};
export default LoginFormComponent;
/**    <form action={'/api/user/login'} method="POST">
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
 **/