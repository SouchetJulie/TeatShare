import avatarLogo from "@assets/logos/avatar_placeholder.png";
import { useProfileOnSubmit } from "@components/user/profile-on-submit.hook";
import { useAutoLogin } from "@hooks/auto-login.hook";
import dashboardStyles from "@styles/dashboard/dashboard.module.scss";
import styles from "@styles/profile/profile.module.scss";
import { CleanFile } from "@typing/clean-file.interface";
import { EGrade } from "@typing/grade.enum";
import { ESubject } from "@typing/subject.enum";
import Image from "next/image";
import { FunctionComponent, useState } from "react";
import { Button, Card, Form, ListGroup, Table } from "react-bootstrap";
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

  const entries: Array<JSX.Element> | null = user
    ? Object.entries(user).map(([key, value]) => (
        <tr key={`row-${key}`}>
          <td>{key}</td>
          <td>
            {Array.isArray(value) ? ( // arrays
              <ListGroup>
                {value.map((item, index) => (
                  <ListGroup.Item key={`${key}-${index}`}>
                    {item}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : typeof value === "object" ? ( // avatar
              value && (
                <Image
                  width={80}
                  height={80}
                  src={`https://storage.googleapis.com/${
                    process.env.NEXT_PUBLIC_BUCKET_NAME
                  }/${(value as CleanFile).filepath}`}
                  alt="avatar"
                />
              )
            ) : (
              value // primitive values
            )}
          </td>
        </tr>
      ))
    : null;

  const userForm: JSX.Element | null = user ? (
    <div>
      <Table>
        <tbody>{entries}</tbody>
      </Table>
      <hr />
      <h3>Modifier</h3>
      <Form onSubmit={onSubmit}>
        {/* Email */}
        <Form.Group controlId="email">
          <Form.Label>email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder={user.email || "email"}
          />
        </Form.Group>
        {/* First name */}
        <Form.Group controlId="firstName">
          <Form.Label>firstName</Form.Label>
          <Form.Control
            name="firstName"
            placeholder={user.firstName || "firstName"}
          />
        </Form.Group>
        {/* Last name */}
        <Form.Group controlId="lastName">
          <Form.Label>lastName</Form.Label>
          <Form.Control
            name="lastName"
            placeholder={user.lastName || "lastName"}
          />
        </Form.Group>
        {/* Description */}
        <Form.Group controlId="description">
          <Form.Label>description</Form.Label>
          <Form.Control
            name="description"
            placeholder={user.description || "description"}
          />
        </Form.Group>
        {/* Location */}
        <Form.Group controlId="location">
          <Form.Label>location</Form.Label>
          <Form.Control
            name="location"
            placeholder={user.location || "location"}
          />
        </Form.Group>
        {/* Grades */}
        <Form.Group controlId="grades">
          <Form.Label>grades</Form.Label>
          <Select
            id="grades"
            name="grades"
            aria-labelledby="grades"
            placeholder="grades"
            isMulti
            options={grades}
            hideSelectedOptions={true}
          />
        </Form.Group>
        {/* Subjects */}
        <Form.Group controlId="subjects">
          <Form.Label>subjects</Form.Label>
          <Select
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
        <Form.Group controlId="avatar">
          <Form.Label>avatar</Form.Label>
          <Form.Control name="avatar" type="file" accept="image/*" />
        </Form.Group>

        <Button type="submit">Envoyer</Button>
      </Form>
    </div>
  ) : null;

  // Return the Component
  return (
    <Container className={styles.profileContainer}>
      <h2 className={styles.title}>Mon profile</h2>
      <div>
        <h3 className={styles.sectionTitle}>Mes informations</h3>
        <div className={styles.profileMainData}>
          <div className={styles.myData}></div>
          <Card className={dashboardStyles.card}>
            {/* Next considère le logo comme un objet possédant un attribut src */}
            <Card.Img
              variant="top"
              src={avatarLogo.src}
              className={dashboardStyles.cardImage}
            />
            <Card.Body>
              <span className={dashboardStyles.badge}>veteran</span>

              <p>Nom</p>
              <span>metier</span>
              <p>classe(s) enseignée(s)</p>
              <span>Cp CE1</span>
              <h6>6 POSTS - 2 COMMENTAIRES</h6>
            </Card.Body>
          </Card>
        </div>
        {userForm}
      </div>
    </Container>
  );
};

export default Profile;
