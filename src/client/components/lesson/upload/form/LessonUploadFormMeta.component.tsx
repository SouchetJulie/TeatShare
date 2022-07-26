import CategorySelect from "@components/category/CategorySelect.component";
import GradeSelect from "@components/grade/GradeSelect.component";
import SubjectSelect from "@components/subject/SubjectSelect.component";
import {
  setField,
  SetFieldAction,
  SetStateAction,
} from "@hooks/reducer-actions.utils";
import styles from "@styles/lesson/upload.module.scss";
import { EGrade } from "@typing/grade.enum";
import { ILessonCreate } from "@typing/lesson.interface";
import { ESubject } from "@typing/subject.enum";
import { Dispatch, FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { MultiValue, SingleValue } from "react-select";

interface LessonUploadFormMetaProps {
  currentLesson?: ILessonCreate;
  lessonDispatch: Dispatch<
    SetFieldAction<ILessonCreate> | SetStateAction<ILessonCreate>
  >;
}

export const LessonUploadFormMeta: FunctionComponent<
  LessonUploadFormMetaProps
> = ({ currentLesson, lessonDispatch }) => {
  const onCategoryChange = (
    newValues: MultiValue<{ value: string; label: string }>
  ): void =>
    lessonDispatch(
      setField(
        "categoryIds",
        newValues.map(({ value }) => value)
      )
    );

  const subjectOnChange = (
    selected: SingleValue<{ value: string; label: ESubject }>
  ): void => lessonDispatch(setField("subject", selected?.value));

  const gradeOnChange = (
    selected: SingleValue<{ value: string; label: EGrade }>
  ): void => lessonDispatch(setField("grade", selected?.value));

  return (
    <Card
      body
      bg="secondary"
      text="white"
      className="pb-4 mb-5"
      style={{ borderRadius: "15px" }}
    >
      <div className="mt-n4">
        <Form.Label className={styles.label} htmlFor="grade">
          Classe
        </Form.Label>
        <GradeSelect
          currentSelected={currentLesson?.grade}
          onChange={gradeOnChange}
        />
      </div>
      <div>
        <Form.Label className={styles.label} htmlFor="subject">
          Matière
        </Form.Label>
        <SubjectSelect
          currentSelected={currentLesson?.subject}
          onChange={subjectOnChange}
        />
      </div>
      <div>
        <Form.Label className={styles.label} htmlFor="categoryIds">
          Catégories
        </Form.Label>
        <CategorySelect
          currentSelected={currentLesson?.categoryIds}
          onChange={onCategoryChange}
        />
      </div>
    </Card>
  );
};
