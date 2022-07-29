import { getUserAvatar } from "@client/services/user.service";
import { getUsername } from "@client/utils/get-username.utils";
import ProfileUserForm from "@components/user/ProfileUserForm.component";
import { useAutoLogin } from "@hooks/auto-login.hook";
import dashboardStyles from "@styles/dashboard/dashboard.module.scss";
import styles from "@styles/profile/profile.module.scss";
import { EGrade } from "@typing/grade.enum";
import React, { FunctionComponent, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Pen } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";

const Profile: FunctionComponent = () => {
  const user = useAutoLogin();
  const [showForm, setShowForm] = useState<boolean>(false);
  const userAvatar = getUserAvatar(user);

  return (
    <Container className={styles.profileContainer}>
      <h1 className={styles.title}>Mon profile</h1>
      <div>
        <h3 className={styles.sectionTitle}>Mes informations</h3>
        <div className={styles.profileMainData}>
          <div className={styles.profileEdit}>
            {!!user && (
              <ProfileUserForm
                show={showForm}
                setShow={setShowForm}
                user={user}
              />
            )}
            {!showForm && (
              <Button
                className={styles.modifyButton}
                onClick={() => setShowForm(true)}
              >
                <Pen />
                <div className="text">Modifier</div>
              </Button>
            )}
          </div>
          <Card className={dashboardStyles.card}>
            <Card.Img
              variant="top"
              src={userAvatar}
              className={dashboardStyles.cardImage}
            />
            <Card.Body>
              <span className={dashboardStyles.badge}>veteran</span>
              <div className={dashboardStyles.cardText}>
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
                    : "Pas de classe..."}
                </span>
                <p className={dashboardStyles.nbrPosts}>
                  {user?.lessonIds.length} POSTS - 2 COMMENTAIRES
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
