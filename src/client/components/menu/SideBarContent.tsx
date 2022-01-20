import React, { FunctionComponent } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Nav from "react-bootstrap/Nav";
import Popover from "react-bootstrap/Popover";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import styles from "@styles/navbar.module.scss";

const popover = (
  <Popover id="popover-basic" className={styles.popover}>
    <Form action={"/lesson"}>
      <InputGroup>
        <Form.Control type="input" name="search" placeholder="Recherche..." />
        <Button type="submit" variant="secondary">
          <i className="bi bi-search" aria-label="Recherche" />
        </Button>
      </InputGroup>
    </Form>
  </Popover>
);

interface Props {
  className?: string;
}

const SideBarContent: FunctionComponent<Props> = ({ className }: Props) => (
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

export default SideBarContent;