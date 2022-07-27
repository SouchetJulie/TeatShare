import avatarLogo from "@assets/logos/avatar_placeholder.png";
import { getUsername } from "@client/utils/get-username.utils";
import { useProfileOnSubmit } from "@components/user/profile-on-submit.hook";
import { useAutoLogin } from "@hooks/auto-login.hook";
import dashboardStyles from "@styles/dashboard/dashboard.module.scss";
import styles from "@styles/profile/profile.module.scss";
import { CleanFile } from "@typing/clean-file.interface";
import { EGrade } from "@typing/grade.enum";
import { ESubject } from "@typing/subject.enum";
import React, { FunctionComponent, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Pen } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Select from "react-select";

const subjects = Object.entries(ESubject).map(
  ([value, label]: [string, string]) => ({
    value,
    label,
  })
);

const grades = Object.entries(EGrade).map(
  ([value, label]: [string, string]) => ({
    value,
    label,
  })
);

const Profile: FunctionComponent = () => {
  const user = useAutoLogin();
  const onSubmit = useProfileOnSubmit();
  const [modifiying, setModifiying] = useState<boolean>(false);
  // const entries: Array<JSX.Element> | null = user
  //   ? Object.entries(user).map(([key, value]) => (
  //       <tr key={`row-${key}`}>
  //         <td>{key}</td>
  //         <td>
  //           {Array.isArray(value) ? ( // arrays
  //             <ListGroup>
  //               {value.map((item, index) => (
  //                 <ListGroup.Item key={`${key}-${index}`}>
  //                   {item}
  //                 </ListGroup.Item>
  //               ))}
  //             </ListGroup>
  //           ) : typeof value === "object" ? ( // avatar
  //             value && (
  //               <Image
  //                 width={80}
  //                 height={80}
  //                 src={`https://storage.googleapis.com/${
  //                   process.env.NEXT_PUBLIC_BUCKET_NAME
  //                 }/${(value as CleanFile).filepath}`}
  //                 alt="avatar"
  //               />
  //             )
  //           ) : (
  //             value // primitive values
  //           )}
  //         </td>
  //       </tr>
  //     ))
  //   : null;

  const userForm: JSX.Element | null = user ? (
    <Form onSubmit={onSubmit} className={styles.formProfil}>
      {/* Email */}
      <Form.Group controlId="email">
        {/*<Form.Label>email</Form.Label>*/}
        <Form.Control
          className={`${styles.formInput} ${!modifiying && styles.disableText}`}
          disabled={!modifiying}
          name="email"
          type="email"
          defaultValue={user.email || "email"}
        />
      </Form.Group>
      {/* First name */}
      <Form.Group controlId="firstName">
        {/*<Form.Label>firstName</Form.Label>*/}
        <Form.Control
          className={`${styles.formInput} ${!modifiying && styles.disableText}`}
          disabled={!modifiying}
          name="firstName"
          defaultValue={user.firstName || "firstName"}
        />
      </Form.Group>
      {/* Last name */}
      <Form.Group controlId="lastName">
        {/*<Form.Label>lastName</Form.Label>*/}
        <Form.Control
          className={`${styles.formInput} ${!modifiying && styles.disableText}`}
          disabled={!modifiying}
          name="lastName"
          defaultValue={user.lastName || "lastName"}
        />
      </Form.Group>
      {/* Description */}
      <Form.Group controlId="description">
        {/*<Form.Label>description</Form.Label>*/}
        <Form.Control
          className={`${styles.formInput} ${!modifiying && styles.disableText}`}
          disabled={!modifiying}
          name="description"
          defaultValue={user.description || "description"}
        />
      </Form.Group>
      {/* Location */}
      <Form.Group controlId="location">
        {/*<Form.Label>location</Form.Label>*/}
        <Form.Control
          className={`${styles.formInput} ${!modifiying && styles.disableText}`}
          disabled={!modifiying}
          name="location"
          defaultValue={user.location || "location"}
        />
      </Form.Group>
      {/* Grades */}
      {modifiying && (
        <Form.Group controlId="grades">
          {/*<Form.Label>grades</Form.Label>*/}
          <Select
            isDisabled={!modifiying}
            className={`${styles.formInput} ${
              !modifiying && styles.disableText
            }`}
            id="grades"
            name="grades"
            aria-labelledby="grades"
            placeholder="grades"
            isMulti
            options={grades}
            hideSelectedOptions={true}
          />
        </Form.Group>
      )}
      {/* Subjects */}
      <Form.Group controlId="subjects">
        {/*<Form.Label>subjects</Form.Label>*/}
        <Select
          isDisabled={!modifiying}
          className={`${styles.formInput} ${!modifiying && styles.disableText}`}
          id="subjects"
          name="subjects"
          aria-labelledby="subjects"
          placeholder="subjects"
          isMulti
          options={subjects}
          hideSelectedOptions={true}
        />
      </Form.Group>
      {/* Avatar */}
      {modifiying && (
        <Form.Group controlId="avatar">
          {/*<Form.Label>avatar</Form.Label>*/}
          <Form.Control
            className={`${styles.formInput} ${
              !modifiying && styles.disableText
            }`}
            disabled={!modifiying}
            name="avatar"
            type="file"
            accept="image/*"
          />
        </Form.Group>
      )}

      {modifiying && (
        <>
          <Button type="submit" className={styles.formSubmitButton}>
            Sauvegarder
          </Button>
          <button
            className={styles.formCancelButton}
            onClick={() => setModifiying(false)}
          >
            Annuler
          </button>
        </>
      )}
    </Form>
  ) : null;

  // Return the Component
  return (
    <Container className={styles.profileContainer}>
      <h1 className={styles.title}>Mon profile</h1>
      <div>
        <h3 className={styles.sectionTitle}>Mes informations</h3>
        <div className={styles.profileMainData}>
          <div className={styles.profileEdit}>
            {userForm}
            {!modifiying && (
              <button
                onClick={() => {
                  setModifiying(true);
                }}
              >
                <span>Modifier</span> <Pen />
              </button>
            )}
          </div>
          <Card className={dashboardStyles.card}>
            {/* Next considère le logo comme un objet possédant un attribut src */}
            <Card.Img
              variant="top"
              src={
                user?.avatar
                  ? `
            }https://storage.googleapis.com/${
              process.env.NEXT_PUBLIC_BUCKET_NAME
            }/${(user.avatar as CleanFile).filepath}`
                  : avatarLogo.src
              }
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
                    : "Pas de classe.."}
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
