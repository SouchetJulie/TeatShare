import axios, {AxiosError} from "axios";
import {FormEvent, FunctionComponent, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import {useAppDispatch} from "@hooks/store-hook";
import {addAlert} from "@stores/alert.store";
import {ResourceApiResponse} from "@typing/api-response.interface";

import styles from "./upload.module.scss";
import {Alert} from "react-bootstrap";

const upload: FunctionComponent = () => {
  // store
  const dispatch = useAppDispatch();

  const [isDraft, setIsDraft] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    formData.append('isDraft', isDraft + "");

    const {data} = await axios.post<ResourceApiResponse>('/api/lesson', formData)
      .catch((e: AxiosError) => {
        const data: ResourceApiResponse = {
          success: false,
          error: e.response.data.error || e.request || e.message
        };
        return {data};
      });

    const {success} = data;

    if (success) {
      const {id} = data;
      const message = <span>Leçon {isDraft ? 'sauvegardée' : 'créée'} avec succès ! <Alert.Link
        href={`/api/lesson/${id}`}>(Voir la leçon)</Alert.Link> </span>

      dispatch(addAlert({message, success}));
    } else {
      const {error} = data;
      dispatch(addAlert({message: `Création de la branche échouée : ${error}`, success}));
    }
  }

  return (
    <Container className="min-vh-100">
      <Row>
        <h1 className="mt-4">Importer un PDF</h1>
      </Row>
      <Form className="my-5 row" onSubmit={onSubmit} method="POST">
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
