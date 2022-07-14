import { getAxiosErrorMessage } from "@client/utils/get-axios-error.utils";
import { LessonUploadFormMeta } from "@components/lesson/upload/form/LessonUploadFormMeta.component";
import {
  setField,
  setLesson,
  useLessonUploadReducer,
} from "@components/lesson/upload/lesson-upload-reducer.hook";
import { useAppDispatch } from "@hooks/store-hook";
import { addAlert } from "@stores/alert.store";
import styles from "@styles/lesson/upload.module.scss";
import { ApiResponse } from "@typing/api-response.interface";
import { ILesson } from "@typing/lesson.interface";
import axios, { AxiosError } from "axios";
import {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const requiredFields = ["title", "file"];

interface LessonUploadFormProps {
  lesson?: ILesson;
}

export const LessonUploadForm: FunctionComponent<LessonUploadFormProps> = ({
  lesson,
}) => {
  const appDispatch = useAppDispatch();

  const [validated, setValidated] = useState(false);
  const [currentLesson, lessonDispatch] = useLessonUploadReducer(lesson);

  useEffect(() => {
    if (lesson) {
      lessonDispatch(setLesson(lesson));
    }
  }, [lesson]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    const form = event.target as HTMLFormElement;
    const formData: FormData = new FormData(form);
    formData.append("isDraft", currentLesson!.isDraft + ""); // force conversion to string

    // Check all required fields are filled
    if (
      !requiredFields.every(
        (field: string) => formData.has(field) && formData.get(field)
      )
    ) {
      return;
    }

    // Add lesson id if present
    if (lesson?._id) formData.set("id", lesson._id);

    // Post the request
    const { data } = await axios
      .request<ApiResponse<{ lesson: ILesson }>>({
        method: lesson ? "put" : "post", // if lesson already exists, update it, else create a new one
        url: "/api/lesson",
        data: formData,
      })
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
          Leçon {currentLesson!.isDraft ? "sauvegardée" : "créée"} avec succès !
          &nbsp;
          <Alert.Link href={`/lesson/${_id}`}>(Voir la leçon)</Alert.Link>
        </span>
      );

      appDispatch(addAlert({ message, success }));
    } else {
      appDispatch(
        addAlert({
          message: `Création de la leçon échouée : ${data.error}`,
          success,
        })
      );
    }
  };

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
            value={currentLesson?.title}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              lessonDispatch(setField("title", event.target.value))
            }
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
            value={currentLesson?.subtitle}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              lessonDispatch(setField("subtitle", event.target.value))
            }
            placeholder="Ajouter une courte description"
          />
        </Form.Group>

        <Form.Group controlId="lesson_upload_form_file">
          <Form.Label className={styles.label}>Contenu de fiche</Form.Label>
          <Form.Control
            className={styles.control}
            name="file"
            type="file"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              lessonDispatch(setField("file", event.target.value))
            }
            accept="application/pdf"
            required
          />
          <Form.Control.Feedback type="invalid">
            Ce champ est obligatoire.
          </Form.Control.Feedback>
        </Form.Group>
      </Col>

      <Col className="d-flex flex-column justify-content-around" sm="3">
        <LessonUploadFormMeta
          lessonDispatch={lessonDispatch}
          currentLesson={currentLesson}
        />

        <Button
          className="round-button"
          variant="primary"
          type="submit"
          onClick={() => lessonDispatch(setField("isDraft", false))}
        >
          Publier
        </Button>
        <Button
          className="round-button"
          variant="secondary"
          type="submit"
          onClick={() => lessonDispatch(setField("isDraft", true))}
        >
          Sauvegarder
        </Button>
      </Col>
    </Form>
  );
};
