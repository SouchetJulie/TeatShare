import SubjectSelect from "@components/subject/SubjectSelect.component";
import { ESubject } from "@typing/subject.enum";
import { ChangeEvent, FunctionComponent, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { SingleValue } from "react-select";
import styles from "./category.module.scss";

interface CategoryCreateModalProps {
  show: boolean;
  onHide: VoidFunction;
}

const CategoryCreateModal: FunctionComponent<CategoryCreateModalProps> = ({
  show,
  onHide,
}) => {
  const [label, setLabel] = useState("");
  const [subject, setSubject] = useState<string | undefined>(undefined);

  const subjectOnChange = (
    selected: SingleValue<{ value: string; label: ESubject }>
  ): void => setSubject(selected?.value);

  const labelOnChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setLabel(e.target.value);

  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Proposer une nouvelle catégorie</Modal.Title>
      </Modal.Header>

      <Form className={styles.createForm}>
        <Modal.Body>
          <Stack gap={4}>
            <p>
              Impossible de trouver la catégorie de votre choix ? Envoyez-nous
              un message, et après vérification, nous la rajouterons à la liste.
            </p>
            {/* Label de la catégorie */}
            <Form.Group controlId="category-label">
              <Form.Label>Nom de la catégorie</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nom de la catégorie"
                value={label}
                onChange={labelOnChange}
              />
            </Form.Group>
            {/* Sujet optionnel auquel est liée la catégorie */}
            <Form.Group controlId="category-subject">
              <Form.Label>
                Matière associée <span className="text-muted">(optionnel)</span>
              </Form.Label>
              <SubjectSelect
                rounded
                currentSelected={subject}
                onChange={subjectOnChange}
              />
            </Form.Group>
          </Stack>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" type="submit">
            Envoyer
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CategoryCreateModal;
