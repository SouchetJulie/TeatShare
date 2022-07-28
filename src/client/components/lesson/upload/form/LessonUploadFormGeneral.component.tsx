import {
  setField,
  SetFieldAction,
  SetStateAction,
} from "@hooks/reducer-actions.utils";
import styles from "@styles/lesson/upload.module.scss";
import { ILessonCreate } from "@typing/lesson.interface";
import { ChangeEvent, Dispatch, FunctionComponent } from "react";
import { Form } from "react-bootstrap";

interface LessonUploadFormGeneralProps {
  currentLesson?: ILessonCreate;
  lessonDispatch: Dispatch<
    SetFieldAction<ILessonCreate> | SetStateAction<ILessonCreate>
  >;
}

export const LessonUploadFormGeneral: FunctionComponent<
  LessonUploadFormGeneralProps
> = ({ currentLesson, lessonDispatch }) => {
  return (
    <>
      <Form.Group controlId="lesson-upload-form-title">
        <Form.Label className={styles.label}>Titre</Form.Label>
        <Form.Control
          className={styles.control}
          name="title"
          value={currentLesson?.title ?? ""}
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

      <Form.Group controlId="lesson-upload-form-subtitle">
        <Form.Label className={styles.label}>Sous-titre</Form.Label>
        <Form.Control
          className={styles.control}
          name="subtitle"
          value={currentLesson?.subtitle ?? ""}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            lessonDispatch(setField("subtitle", event.target.value))
          }
          placeholder="Ajouter une courte description"
        />
      </Form.Group>

      <Form.Group controlId="lesson-upload-form-file">
        <Form.Label className={styles.label}>Contenu de fiche</Form.Label>
        <Form.Control
          className={styles.control}
          name="file"
          type="file"
          aria-describedby="file-help"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            lessonDispatch(setField("file", event.target.value))
          }
          accept="application/pdf"
          required={!currentLesson?._id ?? ""}
        />
        <Form.Text id="file-help" muted>
          Le fichier doit faire moins de 4 Mo.
        </Form.Text>
        <Form.Control.Feedback type="invalid">
          Ce champ est obligatoire.
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
};
