import Card from "../atoms/Card";
import { FunctionComponent } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Illu1 from "../../../../public/assets/illu1.svg";
import Illu2 from "../../../../public/assets/illu2.svg";

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
      <div className="loginIcons">
        <Image src={Illu2} alt="" height="350px" width="350px" />
        <Image src={Illu1} alt="" height="350px" width="350px" />
      </div>
    </div>
  );
};
export default LoginForm;
