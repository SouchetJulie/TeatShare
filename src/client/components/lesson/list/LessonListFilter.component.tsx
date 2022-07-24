import CategorySelect from "@components/category/CategorySelect.component";
import GradeSelect from "@components/grade/GradeSelect.component";
import {
  LessonFilterDispatch,
  LessonFilterState,
} from "@components/lesson/list/lesson-filter-reducer.hook";
import SubjectSelect from "@components/subject/SubjectSelect.component";
import { setField } from "@hooks/reducer-actions.utils";
import styles from "@styles/lesson/lesson-filter.module.scss";
import { EGrade } from "@typing/grade.enum";
import { ESubject } from "@typing/subject.enum";
import { ChangeEvent, FunctionComponent } from "react";
import { Button } from "react-bootstrap";
import { ArrowCounterclockwise } from "react-bootstrap-icons";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { MultiValue, SingleValue } from "react-select";

interface LessonListFilterProps {
  filters: LessonFilterState;
  filterDispatch: LessonFilterDispatch;
}

export const LessonListFilter: FunctionComponent<LessonListFilterProps> = ({
  filters,
  filterDispatch,
}: LessonListFilterProps): JSX.Element => {
  const subjectOnChange = (
    selected: SingleValue<{ value: string; label: ESubject }>
  ): void => filterDispatch(setField("subject", selected?.value));

  const gradeOnChange = (
    selected: SingleValue<{ value: string; label: EGrade }>
  ): void => filterDispatch(setField("grade", selected?.value));

  const onCategoryChange = (
    newValues: MultiValue<{ value: string; label: string }>
  ): void =>
    filterDispatch(
      setField(
        "categoryIds",
        newValues.map(({ value }) => value)
      )
    );

  const onReset = (): void => {
    filterDispatch({ type: "SET_STATE", payload: {} });
  };

  const showReset: boolean = Object.values(filters).length > 0;

  return (
    <Form as={Row} className={styles.form}>
      <InputGroup
        as={Col}
        md="2"
        className={`${styles.inputGroup} ${styles.fixedWidth}`}
      >
        <Form.Label visuallyHidden htmlFor="lessons-filter-author">
          Auteur
        </Form.Label>
        <Form.Control
          className={styles.input}
          id="lessons-filter-author"
          name="authorId"
          placeholder="ID de l'auteur"
          value={filters.authorId ?? ""}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            filterDispatch(setField("authorId", event.target.value))
          }
        />
      </InputGroup>

      <Col md="2" className={styles.inputGroup}>
        <GradeSelect
          rounded
          currentSelected={filters?.grade}
          onChange={gradeOnChange}
        />
      </Col>

      <Col md="2" className={styles.inputGroup}>
        <SubjectSelect
          rounded
          currentSelected={filters?.subject}
          onChange={subjectOnChange}
        />
      </Col>

      <Col md="2" className={styles.inputGroup}>
        <CategorySelect
          rounded
          currentSelected={filters?.categoryIds}
          onChange={onCategoryChange}
        />
      </Col>

      {showReset && (
        <Col xs="1">
          <Button
            type="reset"
            variant="outline-dark"
            className="rounded-circle"
            onClick={onReset}
          >
            <span className="visually-hidden">Vider</span>
            <ArrowCounterclockwise />
          </Button>
        </Col>
      )}
    </Form>
  );
};
