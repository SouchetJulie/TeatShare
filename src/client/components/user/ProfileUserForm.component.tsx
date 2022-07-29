import { useProfileOnSubmit } from "@components/user/profile-on-submit.hook";
import styles from "@styles/profile/profile.module.scss";
import { EGrade } from "@typing/grade.enum";
import { ESubject } from "@typing/subject.enum";
import { IUserPublic } from "@typing/user.interface";
import {
  Dispatch,
  FormEvent,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";
import { Button, Form } from "react-bootstrap";
import Select from "react-select";

interface ProfileUserFormProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  user: IUserPublic;
}

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

const ProfileUserForm: FunctionComponent<ProfileUserFormProps> = ({
  show,
  setShow,
  user,
}) => {
  const submitForm = useProfileOnSubmit();
  const [hasModified, setHasModified] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setShow(false);
    if (hasModified) submitForm(e);
  };

  const onFormChange = (): void => {
    if (!hasModified) setHasModified(true);
  };

  return !user ? null : (
    <Form
      onSubmit={onSubmit}
      onChange={onFormChange}
      className={styles.formProfil}
    >
      {/* Email */}
      <Form.Group controlId="email">
        <Form.Label>Email :</Form.Label>
        <Form.Control
          className={styles.formInput}
          disabled={!show}
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={user.email || ""}
        />
      </Form.Group>

      <Form.Group controlId="firstName">
        <Form.Label>FirstName :</Form.Label>
        <Form.Control
          className={styles.formInput}
          disabled={!show}
          name="firstName"
          placeholder="Prénom"
          defaultValue={user.firstName || ""}
        />
      </Form.Group>
      {/* Last name */}
      <Form.Group controlId="lastName">
        <Form.Label>LastName :</Form.Label>
        <Form.Control
          className={styles.formInput}
          disabled={!show}
          name="lastName"
          placeholder="Nom"
          defaultValue={user.lastName || ""}
        />
      </Form.Group>
      {/* Description */}
      <Form.Group controlId="b">
        <Form.Label>Description :</Form.Label>
        <Form.Control
          as="textarea"
          className={styles.formTextarea}
          disabled={!show}
          name="description"
          placeholder="Description"
          defaultValue={user.description || ""}
        />
      </Form.Group>
      {/* Location */}
      {show && (
        <Form.Group controlId="location">
          <Form.Label>Location :</Form.Label>
          <Form.Control
            className={styles.formInput}
            disabled={!show}
            name="location"
            placeholder="Lieu"
            defaultValue={user.location || ""}
          />
        </Form.Group>
      )}

      {/* Grades */}
      {show && (
        <Form.Group controlId="grades">
          <Form.Label>Classes :</Form.Label>
          <Select
            className={styles.formInput}
            id="grades"
            name="grades"
            aria-label="grades"
            placeholder="Classes"
            isMulti
            options={grades}
            hideSelectedOptions={true}
          />
        </Form.Group>
      )}
      {/* Subjects */}
      {show && (
        <Form.Group controlId="subjects">
          <Form.Label>Matières :</Form.Label>
          <Select
            className={styles.formInput}
            id="subjects"
            name="subjects"
            aria-label="subjects"
            placeholder="Matières"
            isMulti
            options={subjects}
            hideSelectedOptions={true}
          />
        </Form.Group>
      )}

      {/* Avatar */}
      {show && (
        <Form.Group controlId="avatar">
          <Form.Label>Avatar :</Form.Label>
          <Form.Control
            className={styles.formInput}
            disabled={!show}
            name="avatar"
            type="file"
            accept="image/*"
          />
        </Form.Group>
      )}
      {show && (
        <>
          <Button type="submit" className={styles.formSubmitButton}>
            Sauvegarder
          </Button>
          <Button
            type="reset"
            onClick={() => setShow(false)}
            className={styles.formCancelButton}
          >
            Annuler
          </Button>
        </>
      )}
    </Form>
  );
};

export default ProfileUserForm;
