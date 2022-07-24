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
import { valueExists } from "@utils/parse-form.utils";
import { ChangeEvent, FunctionComponent, useMemo } from "react";
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

  const canReset: boolean = useMemo(() => {
    const values = Object.values(filters);
    return values.some(
      // If any value is not empty, then we can reset
      (value) => valueExists(value) && Array.isArray(value) && value.length > 0
    );
  }, [filters]);

  return (
    <Form as={Row} className={styles.form}>
      <Col xs="1">
        <Button
          disabled={!canReset}
          type="reset"
          variant={canReset ? "secondary" : "outline-secondary"}
          className="rounded-circle"
          onClick={onReset}
        >
          <span className="visually-hidden">Réinitialiser les filtres</span>
          <ArrowCounterclockwise />
        </Button>
      </Col>

      <InputGroup
        as={Col}
        className={`${styles.inputGroup} ${styles.freeWidth}`}
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

      <Col className={styles.inputGroup}>
        <GradeSelect
          rounded
          currentSelected={filters?.grade}
          onChange={gradeOnChange}
        />
      </Col>

      <Col className={styles.inputGroup}>
        <SubjectSelect
          rounded
          currentSelected={filters?.subject}
          onChange={subjectOnChange}
        />
      </Col>

      <Col className={styles.inputGroup}>
        <CategorySelect
          rounded
          currentSelected={filters?.categoryIds}
          onChange={onCategoryChange}
        />
      </Col>
    </Form>
  );
};
