import { getAxiosErrorMessage } from "@client/utils/get-axios-error.utils";
import { useCategoryList } from "@hooks/category-list.hook";
import { useAppDispatch } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import styles from "@styles/lesson/upload.module.scss";
import { ApiResponse } from "@typing/api-response.interface";
import { ICategory } from "@typing/category.interface";
import { EGrade } from "@typing/grade.enum";
import { ILesson } from "@typing/lesson.interface";
import { ESubject } from "@typing/subject.enum";
import axios, { AxiosError } from "axios";
import { FormEvent, FunctionComponent, useState } from "react";
import { Card } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Select from "react-select";

const requiredFields = ["title", "file"];

interface LessonUploadFormProps {
  lesson?: ILesson;
}
export const LessonUploadForm: FunctionComponent<LessonUploadFormProps> = ({
  lesson,
}) => {
  const dispatch = useAppDispatch();

  const [isDraft, setIsDraft] = useState(false);
  const [validated, setValidated] = useState(false);
  const categories = useCategoryList();

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

    // Clear empty values
    for (const [key, value] of formData.entries()) {
      if (value === "") formData.delete(key);
    }

    // Add lesson id if present
    if (lesson?._id) formData.set("id", lesson._id);

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

  const categoryOptions = categories.map((category: ICategory) => ({
    value: category._id,
    label: category.label,
  }));

  const subjectOptions = Object.entries(ESubject).map(
    ([key, text]: [string, ESubject]) => ({
      value: key,
      label: text,
    })
  );

  const gradeOptions = Object.entries(EGrade).map(
    ([key, text]: [string, EGrade]) => ({
      value: key,
      label: text,
    })
  );

  // TODO prefill with lesson data if present
  return (
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
          <Form.Control.Feedback type="invalid">
            Ce champ est obligatoire.
          </Form.Control.Feedback>
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
          <Form.Control.Feedback type="invalid">
            Ce champ est obligatoire.
          </Form.Control.Feedback>
        </Form.Group>
      </Col>

      <Col className="d-flex flex-column justify-content-around" sm="3">
        <Card body bg="secondary" text="white" className="pb-2 mb-5">
          <div className="mt-n4">
            <Form.Label className={styles.label} htmlFor="grade">
              Classe
            </Form.Label>
            <Select
              className="text-dark"
              options={gradeOptions}
              id="grade"
              name="grade"
              aria-label="Classe"
              placeholder="Classe"
            />
          </div>
          <div>
            <Form.Label className={styles.label} htmlFor="subject">
              Matière
            </Form.Label>
            <Select
              className="text-dark"
              options={subjectOptions}
              id="subject"
              name="subject"
              aria-label="Matière"
              placeholder="Matière"
            />
          </div>
          <div>
            <Form.Label className={styles.label} htmlFor="categoryIds">
              Catégories
            </Form.Label>
            <Select
              isMulti
              className="text-dark"
              options={categoryOptions}
              id="categoryIds"
              name="categoryIds"
              aria-label="Catégories"
              placeholder="Catégories"
            />
          </div>
        </Card>

        <Button
          className="round-button"
          variant="primary"
          type="submit"
          onClick={() => setIsDraft(false)}
        >
          Publier
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
  );
};
