import avatarLogo from "@assets/logos/avatar_placeholder.png";
import { getUsername } from "@client/utils/get-username.utils";
import styles from "@styles/dashboard/dashboard.module.scss";
import { CleanFile } from "@typing/clean-file.interface";
import { EGrade } from "@typing/grade.enum";
import { IUserPublic } from "@typing/user.interface";
import React, { FunctionComponent } from "react";
import Card from "react-bootstrap/Card";

interface Props {
  user: IUserPublic;
}

const DashBoardCard: FunctionComponent<Props> = ({ user }: Props) => {
  return (
    <div>
      <h4 className={styles.subTitle}> Mon profil</h4>
      <Card className={styles.card}>
        {/* Next considère le logo comme un objet possédant un attribut src */}
        <Card.Img
          variant="top"
          src={
            user?.avatar
              ? `https://storage.googleapis.com/${
                  process.env.NEXT_PUBLIC_BUCKET_NAME
                }/${(user.avatar as CleanFile).filepath}`
              : avatarLogo.src
          }
          className={styles.cardImage}
        />
        <Card.Body>
          <span className={styles.badge}>veteran</span>
          <div className={styles.cardText}>
            <p>Nom</p>
            <span>{getUsername(user) ?? "Votre nom"}</span>
            {user && user.grades.length > 1 ? (
              <p>Classes enseignées</p>
            ) : (
              <p>Classe enseignée</p>
            )}

            <span>
              {user?.grades.length
                ? user.grades.map(
                    (grade: keyof typeof EGrade, index: number) => {
                      return (
                        <React.Fragment key={`grade-${index}`}>
                          {grade}&nbsp;
                        </React.Fragment>
                      );
                    }
                  )
                : "Pas de classe.."}
            </span>
            <p className={styles.nbrPosts}>
              {user?.lessonIds.length} POSTS - 2 COMMENTAIRES
            </p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default DashBoardCard;
