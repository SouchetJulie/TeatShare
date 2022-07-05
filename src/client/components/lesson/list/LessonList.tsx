import styles from "@styles/lesson/lesson-list.module.scss";
import { ILesson } from "@typing/lesson.interface";
import React, { FunctionComponent } from "react";
import { Search, SortUp } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import LessonItem from "./LessonItem";

interface Props {
  lessons: ILesson[];
}

export const LessonList: FunctionComponent<Props> = ({ lessons }: Props) => (
  <>
    <Container className="my-4 mb-5">
      {/* Filtres */}
      <Form as={Row} className={styles.form}>
        <Col md="auto">
          <Button
            type="submit"
            variant="secondary"
            className={styles.filterButton}
          >
            Filtrer
          </Button>
        </Col>
        <InputGroup as={Col} md="auto" className={styles.inputGroup}>
          <Form.Label visuallyHidden htmlFor="lessons-sort">
            Trier par
          </Form.Label>
          <Form.Select
            className={styles.formInput}
            id="lessons-sort"
            name="sort"
          >
            <option>Titre</option>
            <option>Matière</option>
            <option>Auteur</option>
            <option>Marqués</option>
          </Form.Select>
          <InputGroup.Text>
            <SortUp />
          </InputGroup.Text>
        </InputGroup>
        <InputGroup as={Col} md="auto" className={styles.inputGroup}>
          <Form.Label visuallyHidden htmlFor="lessons-search">
            Rechercher
          </Form.Label>
          <Form.Control
            className={styles.formInput}
            id="lessons-search"
            name="search"
            placeholder="Recherche par mots-clés"
          />
          <InputGroup.Text>
            <Search />
          </InputGroup.Text>
        </InputGroup>
      </Form>
    </Container>
    <Container className="my-4 ">
      {/* Affichage des résultats */}
      <Row className={styles.lessonContainer}>
        {lessons.map((lesson: ILesson) => (
          <LessonItem key={`lesson-item-${lesson._id}`} lesson={lesson} />
        ))}
      </Row>
    </Container>
  </>
);
