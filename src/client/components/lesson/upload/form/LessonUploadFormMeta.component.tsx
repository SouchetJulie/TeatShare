import {
  LessonSetField,
  LessonSetLesson,
  setField,
} from "@components/lesson/upload/lesson-upload-reducer.hook";
import { useCategoryList } from "@hooks/category-list.hook";
import styles from "@styles/lesson/upload.module.scss";
import { ICategory } from "@typing/category.interface";
import { EGrade } from "@typing/grade.enum";
import { ILessonCreate } from "@typing/lesson.interface";
import { ESubject } from "@typing/subject.enum";
import { Dispatch, FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Select, { MultiValue, SingleValue } from "react-select";

interface LessonUploadFormMetaProps {
  currentLesson?: ILessonCreate;
  lessonDispatch: Dispatch<LessonSetField | LessonSetLesson>;
}

interface Option<T extends string> {
  value: string;
  label: T;
}

const fromEnumToOption = <T extends string>([key, text]: [
  string,
  T
]): Option<T> => ({
  value: key,
  label: text,
});

const fromCategoryToOption = (category: ICategory): Option<string> => ({
  value: category._id,
  label: category.label,
});

const fromValueToOption = <T extends string>(
  list: [string, T][],
  key?: T[keyof T]
): Option<T> | null => {
  if (!key) return null;

  const found = list.find(([k]) => k === key);

  if (!found) return null;

  return {
    value: found[0],
    label: found[1],
  };
};

const subjects = Object.entries(ESubject);
const subjectOptions = subjects.map(fromEnumToOption);
const grades = Object.entries(EGrade);
const gradeOptions = grades.map(fromEnumToOption);

export const LessonUploadFormMeta: FunctionComponent<
  LessonUploadFormMetaProps
> = ({ currentLesson, lessonDispatch }) => {
  const categories = useCategoryList();

  const categoryOptions = categories.map(fromCategoryToOption);
  const selectedCategories = categories
    .filter((category: ICategory) =>
      currentLesson?.categoryIds?.includes(category._id)
    )
    .map(fromCategoryToOption);

  const selectedGrade = fromValueToOption(grades, currentLesson?.grade);
  const selectedSubject = fromValueToOption(subjects, currentLesson?.subject);

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
        <Select
          className="text-dark"
          options={gradeOptions}
          id="grade"
          name="grade"
          value={selectedGrade}
          onChange={(selected: SingleValue<{ value: string; label: EGrade }>) =>
            lessonDispatch(setField("grade", selected?.value))
          }
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
          value={selectedSubject}
          onChange={(
            selected: SingleValue<{ value: string; label: ESubject }>
          ) => lessonDispatch(setField("subject", selected?.value))}
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
          value={selectedCategories}
          onChange={(newValues: MultiValue<{ value: string; label: string }>) =>
            lessonDispatch(
              setField(
                "categoryIds",
                newValues.map(({ value }) => value)
              )
            )
          }
          aria-label="Catégories"
          placeholder="Catégories"
        />
      </div>
    </Card>
  );
};
