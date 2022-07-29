import { createCategory } from "@client/services/lesson.service";
import { getAxiosErrorMessage } from "@client/utils/get-axios-error.utils";
import { getUsername } from "@client/utils/get-username.utils";
import SubjectSelect from "@components/subject/SubjectSelect.component";
import { useAppDispatch, useAppSelector } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import { selectAuthenticatedUser } from "@stores/user.store";
import { ApiErrorResponse } from "@typing/api-response.interface";
import { ESubject } from "@typing/subject.enum";
import { AxiosError } from "axios";
import { ChangeEvent, FunctionComponent, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { SingleValue } from "react-select";
import styles from "./category.module.scss";

interface CategoryCreateModalProps {
  show: boolean;
  onHide: VoidFunction;
}

const CategoryCreateModal: FunctionComponent<CategoryCreateModalProps> = ({
  show,
  onHide,
}) => {
  const user = useAppSelector(selectAuthenticatedUser);
  const dispatch = useAppDispatch();

  const [label, setLabel] = useState("");
  const [subject, setSubject] = useState<string | undefined>(undefined);

  const subjectOnChange = (
    selected: SingleValue<{ value: string; label: ESubject }>
  ): void => setSubject(selected?.value);

  const labelOnChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setLabel(e.target.value);

  const onClick = (): void => {
    onHide();

    let success: boolean;
    let message: string;

    if (!user?._id) {
      dispatch(
        addAlert({
          success: false,
          message: "Il faut être connecté pour effectuer cette action",
          ttl: 5000,
        })
      );
      return;
    }

    createCategory(getUsername(user), user._id, label, subject)
      .then(() => {
        success = true;
        message = `Message envoyé : catégorie "${label}" ${
          subject ? `(${subject}) ` : ""
        }!`;
      })
      .catch((e: AxiosError<ApiErrorResponse>) => {
        success = false;
        message = `Erreur lors de l'envoi du message (${
          e.status ?? getAxiosErrorMessage(e)
        })`;
      })
      .finally(() =>
        dispatch(addAlert({ success, message, ttl: success ? 2000 : 5000 }))
      );
  };

  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Proposer une nouvelle catégorie</Modal.Title>
      </Modal.Header>

      <Form className={styles.createForm} onSubmit={onClick}>
        <Modal.Body>
          <Stack gap={4}>
            <p>
              Impossible de trouver la catégorie de votre choix ? Envoyez-nous
              un message, et après vérification, nous la rajouterons à la liste.
            </p>
            {/* Label de la catégorie */}
            <Form.Group controlId="category-label">
              <Form.Label>Nom de la catégorie</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nom de la catégorie"
                value={label}
                onChange={labelOnChange}
              />
            </Form.Group>
            {/* Sujet optionnel auquel est liée la catégorie */}
            <Form.Group controlId="category-subject">
              <Form.Label>
                Matière associée <span className="text-muted">(optionnel)</span>
              </Form.Label>
              <SubjectSelect
                rounded
                currentSelected={subject}
                onChange={subjectOnChange}
              />
            </Form.Group>
          </Stack>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" type="button" onClick={onClick}>
            Envoyer
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CategoryCreateModal;
