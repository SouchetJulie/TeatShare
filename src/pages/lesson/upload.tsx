import { useCategoryList } from "@hooks/category-list.hook";
import { useLoginRedirect } from "@hooks/login-redirect.hook";
import { useAppDispatch } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import styles from "@styles/lesson/upload.module.scss";
import { ApiResponse } from "@typing/api-response.interface";
import { ICategory } from "@typing/category.interface";
import { ILesson } from "@typing/lesson-file.interface";
import axios, { AxiosError } from "axios";
import { FormEvent, FunctionComponent, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { getAxiosErrorMessage } from "../../client/utils/get-axios-error.utils";

const requiredFields = ["title", "file"];

const upload: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const user = useLoginRedirect(); // Route guard

  const categories = useCategoryList();
  const [isDraft, setIsDraft] = useState(false);
  const [validated, setValidated] = useState(false);

  if (!user) {
    return <></>;
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    const form = event.target as HTMLFormElement;
    const formData: FormData = new FormData(form);
    formData.append("isDraft", isDraft + ""); // force conversion to string

    // Check all required fields are filled
    if (
      !requiredFields.every(
        (field: string) => formData.has(field) && formData.get(field)
      )
    ) {
      return;
    }

    console.log(formData.getAll("category"));

    // Post the request
    const { data } = await axios
      .post<ApiResponse<{ lesson: ILesson }>>("/api/lesson", formData)
      .catch((error: AxiosError) => {
        const response: ApiResponse<{ lesson: ILesson }> = {
          success: false,
          error: getAxiosErrorMessage(error),
        };
        return { data: response };
      });

    const success = data.success;

    if (success) {
      // ID est de type ObjectId
      const _id = data?.data?.lesson._id;
      const message: JSX.Element = (
        <span>
          Leçon {isDraft ? "sauvegardée" : "créée"} avec succès ! &nbsp;
          <Alert.Link href={`/lesson/${_id}`}>(Voir la leçon)</Alert.Link>
        </span>
      );

      dispatch(addAlert({ message, success }));
    } else {
      dispatch(
        addAlert({
          message: `Création de la leçon échouée : ${data.error}`,
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
          <Form.Select multiple name="category">
            <option>Choisir une ou des catégories</option>
            {categories.map((category: ICategory) => (
              <option key={"category-" + category._id} value={category._id}>
                {category.label}
              </option>
            ))}
          </Form.Select>

          <Button
            className="round-button"
            variant="primary"
            type="submit"
            onClick={() => setIsDraft(false)}
          >
            Publier
          </Button>
        </Col>
      </Form>
    </Container>
  );
};

export default upload;
