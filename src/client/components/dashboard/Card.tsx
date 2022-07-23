import avatarLogo from "@assets/logos/avatar_placeholder.png";
import { IUserPublic } from "@typing/user.interface";
import { FunctionComponent } from "react";
import Card from "react-bootstrap/Card";
import styles from "../../styles/dashboard/dashboard.module.scss";

interface Props {
  user: IUserPublic;
}

const DashBoardCard: FunctionComponent<Props> = ({ user }: Props) => {
  return (
    <div>
      <h3> Mon Profil</h3>
      <Card className={styles.card}>
        {/* Next considère le logo comme un objet possédant un attribut src */}
        <Card.Img
          variant="top"
          src={avatarLogo.src}
          className={styles.cardImage}
        />
        <Card.Body>
          <span className={styles.badge}>veteran</span>
          <Card.Text className={styles.cardText}>
            <p>Nom</p>
            <span>{user.firstName ? user.firstName : "Votre nom"}</span>
            <p>classe(s) enseignée(s)</p>
            <span>{user.grades ? user.grades : "Pas de classe"}</span>
            <h6>6 POSTS - 2 COMMENTAIRES</h6>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
export default DashBoardCard;
