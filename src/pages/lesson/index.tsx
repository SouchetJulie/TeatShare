import React, { FunctionComponent } from "react";
import { GetStaticProps } from "next";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import LessonItem from "@components/lessons/LessonItem";
import { getAllLessons } from "@services/lessons.service";
import { ILesson } from "@typing/lesson-file.interface";
import styles from "@styles/lesson-list.module.scss";

interface Props {
  lessons: ILesson[];
}

const Lessons: FunctionComponent<Props> = ({ lessons }: Props) => (
  <>
    <Container className="my-4">
      {/* Filtres */}
      <Form as={Row} className={styles.form}>
        <Col md="auto">
          <Button type="submit" variant="secondary">
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
            <i className="bi bi-sort-up" />
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
            <i className="bi bi-search" />
          </InputGroup.Text>
        </InputGroup>
      </Form>
    </Container>
    <Container className="my-4">
      {/* Affichage des résultats */}
      <Row>
        {lessons.map((lesson: ILesson) => (
          <LessonItem key={`lesson-item-${lesson._id}`} lesson={lesson} />
        ))}
      </Row>
    </Container>
  </>
);

// @ts-ignore It is used by Next.js behind the scenes
export const getStaticProps: GetStaticProps = async () => {
  const result = await getAllLessons();

  if ("error" in result) {
    return {
      props: {
        lessons: [],
      },
    };
  }

  const lessons = result.map(
    (lesson: ILesson) => JSON.parse(JSON.stringify(lesson)) // so all complex types are guaranteed to be serializable
  );

  return {
    props: {
      lessons,
    },
  };
};

export default Lessons;
