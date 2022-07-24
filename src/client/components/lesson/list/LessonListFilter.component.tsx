import {
  LessonFilterDispatch,
  LessonFilterState,
} from "@components/lesson/list/lesson-filter-reducer.hook";
import { setField } from "@hooks/reducer-actions.utils";
import styles from "@styles/lesson/lesson-list.module.scss";
import { ChangeEvent, FunctionComponent } from "react";
import { Person } from "react-bootstrap-icons";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

interface LessonListFilterProps {
  filters: LessonFilterState;
  filterDispatch: LessonFilterDispatch;
}

export const LessonListFilter: FunctionComponent<LessonListFilterProps> = ({
  filters,
  filterDispatch,
}: LessonListFilterProps): JSX.Element => (
  <Form as={Row} className={styles.form}>
    <InputGroup as={Col} md="auto" className={styles.inputGroup}>
      <Form.Label visuallyHidden htmlFor="lessons-filter-author">
        Rechercher
      </Form.Label>
      <Form.Control
        className={styles.formInput}
        id="lessons-filter-author"
        name="authorId"
        placeholder="ID de l'auteur"
        value={filters.authorId}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          filterDispatch(setField("authorId", event.target.value))
        }
      />
      <InputGroup.Text>
        <Person />
      </InputGroup.Text>
    </InputGroup>
  </Form>
);
