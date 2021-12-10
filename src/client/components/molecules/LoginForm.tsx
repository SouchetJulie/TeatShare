import Card from "../atoms/Card";
import { FunctionComponent } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../assets";

interface Props {}

const LoginForm: FunctionComponent<Props> = () => {
  return (
    <div className="cardWrapper">
      <Card>
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
      </Card>
    </div>
  );
};
export default LoginForm;
