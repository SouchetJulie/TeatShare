import avatarLogo from "@assets/logos/avatar_placeholder.png";
import { IUserPublic } from "@typing/user.interface";
import { FunctionComponent } from "react";
import Card from "react-bootstrap/Card";
import styles from "../../styles/dashboard/dashboard.module.scss";

interface Props {
  user: IUserPublic;
  nbrPost: number;
}

const DashBoardCard: FunctionComponent<Props> = ({ user, nbrPost }: Props) => {
  console.log("user :", user.grades);
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
            {user && user.grades.length > 1 ? (
              <p>classes enseignées</p>
            ) : (
              <p>classe enseignée</p>
            )}

            <span>
              {user && user.grades.length
                ? user.grades.map((grade) => {
                    return <>{grade}&nbsp;</>;
                  })
                : "Pas de classe"}
            </span>
            <h6>{nbrPost} POSTS - 2 COMMENTAIRES</h6>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
export default DashBoardCard;
