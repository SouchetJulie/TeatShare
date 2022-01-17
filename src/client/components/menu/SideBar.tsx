import React, { FunctionComponent } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

import styles from "@styles/navbar.module.scss";

const popover = (
  <Popover id="popover-basic">
    {/* <Popover.Header as="h3" className="bg-primary text-light">*/}
    {/*  Recherche de fiche*/}
    {/* </Popover.Header>*/}
    <Popover.Body className={styles.popover}>
      <Form action={"/lesson"}>
        <InputGroup>
          <Form.Control type="input" name="search" placeholder="Recherche..." />
          <Button type="submit">
            <i className="bi bi-search" aria-label="Recherche" />
          </Button>
        </InputGroup>
      </Form>
    </Popover.Body>
  </Popover>
);

interface Props {
  className?: string;
}

export const SideBarContent: FunctionComponent<Props> = ({
  className,
}: Props) => (
  <div className={`${className} ${styles.sidebarContent}`}>
    <OverlayTrigger
      trigger="click"
      placement="auto"
      overlay={popover}
      defaultShow={false}
    >
      <Nav.Link>
        <i className="bi bi-search" />
        Recherche
      </Nav.Link>
    </OverlayTrigger>
    <Nav.Link href={"/lesson"} eventKey={"/lesson"}>
      <i className="bi bi-list-task" />
      Fiches de cours
    </Nav.Link>
    <Nav.Link
      href={"/lesson/upload"}
      eventKey={"/lesson/upload"}
      className={styles.separated}
    >
      <i className="bi bi-plus-circle-fill" />
      Création de fiche
    </Nav.Link>
  </div>
);

// Not meant to be usable with assistive technologies
// There is a duplicate of sidebar content in the main navbar
const SideBar: FunctionComponent = () => (
  <Nav className={styles.sidebar} aria-hidden>
    <SideBarContent />
  </Nav>
);

export default SideBar;
