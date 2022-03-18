import axios, { AxiosError } from "axios";
import { FormEvent, FunctionComponent, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useAppDispatch } from "@hooks/store-hook";
import { useLoginRedirect } from "@hooks/useLoginRedirect.hook";
import { addAlert } from "@stores/alert.store";

import { SingleResourceApiResponse } from "@typing/api-response.interface";
import styles from "@styles/Lesson/upload.module.scss";
import { getAxiosErrorMessage } from "../../client/utils/get-axios-error.utils";

const requiredFields = ["title", "file"];

const upload: FunctionComponent = () => {
  // Route guard
  const user = useLoginRedirect();

  if (!user) {
    return <></>;
  }

  const dispatch = useAppDispatch();

  const [isDraft, setIsDraft] = useState(false);
  const [validated, setValidated] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    formData.append("isDraft", isDraft + "");

    // Check all required fields are filled
    if (
      !requiredFields.every(
        (field: string) => formData.has(field) && formData.get(field)
      )
    ) {
      return;
    }

    const { data } = await axios
      .post<SingleResourceApiResponse>("/api/lesson", formData)
      .catch((error: AxiosError) => {
        const response: SingleResourceApiResponse = {
          success: false,
          error: getAxiosErrorMessage(error),
        };
        return { data: response };
      });

    const { success } = data;

    if (success) {
      const { id } = data;
      const message = (
        <span>
          Leçon {isDraft ? "sauvegardée" : "créée"} avec succès !
          <Alert.Link href={`/api/lesson/${id}`}>(Voir la leçon)</Alert.Link>
        </span>
      );

      dispatch(addAlert({ message, success }));
    } else {
      const { error } = data;
      dispatch(
        addAlert({
          message: `Création de la leçon échouée : ${error}`,
          success,
        })
      );
    }
  };

  return (
    <Container className="min-vh-100">
      <Row>
        <h1 className={styles.uploadPageTitle}>Importer un PDF</h1>
      </Row>
      <Form
        className="my-5 row"
        onSubmit={onSubmit}
        onChange={() => setValidated(false)}
        method="POST"
        noValidate
        validated={validated}
      >
        <Col>
          <Form.Group controlId="lesson_upload_form_title">
            <Form.Label className={styles.label}>Titre</Form.Label>
            <Form.Control
              className={styles.control}
              name="title"
              placeholder="Ajoutez un titre"
              required
            />
          </Form.Group>

          <Form.Group controlId="lesson_upload_form_subtitle">
            <Form.Label className={styles.label}>Sous-titre</Form.Label>
            <Form.Control
              className={styles.control}
              name="subtitle"
              placeholder="Ajouter une courte description"
            />
          </Form.Group>

          <Form.Group controlId="lesson_upload_form_file">
            <Form.Label className={styles.label}>Contenu de fiche</Form.Label>
            <Form.Control
              className={styles.control}
              name="file"
              type="file"
              accept="application/pdf"
              required
            />
          </Form.Group>
        </Col>

        <Col className="d-flex flex-column justify-content-center" sm="3">
          <Button
            className="round-button"
            variant="primary"
            type="submit"
            onClick={() => setIsDraft(false)}
          >
            Soumettre
          </Button>
          <Button
            className="round-button"
            variant="secondary"
            type="submit"
            onClick={() => setIsDraft(true)}
          >
            Sauvegarder
          </Button>
        </Col>
      </Form>
    </Container>
  );
};

export default upload;
