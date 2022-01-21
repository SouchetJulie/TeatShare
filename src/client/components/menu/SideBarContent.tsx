import React, { FunctionComponent, useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Nav from "react-bootstrap/Nav";
import Popover from "react-bootstrap/Popover";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import styles from "@styles/Menu/navbar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  className?: string;
}

const SidebarContent: FunctionComponent<Props> = ({
  className = "",
}: Props) => {
  // Using router instead of form action to preserve store when navigating
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const onSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();

    router.push(`/?search=${searchTerm}`);
  };

  const popover = (
    <Popover id="popover-basic" className={styles.popover}>
      <Form onSubmit={onSubmit}>
        <InputGroup>
          <Form.Control
            type="input"
            name="search"
            placeholder="Recherche..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <Button type="submit" variant="secondary">
            <i className="bi bi-search" aria-label="Recherche" />
          </Button>
        </InputGroup>
      </Form>
    </Popover>
  );

  return (
    <div
      className={`${className} ${styles.sidebarContent} ${styles.navSection}`}
    >
      <OverlayTrigger
        trigger="click"
        placement="auto"
        overlay={popover}
        defaultShow={false}
      >
        <Nav.Link>
          <a className="bi bi-search">Recherche</a>
        </Nav.Link>
      </OverlayTrigger>
      <Nav.Link as={Link} href={"/lesson"} passHref>
        <a className="nav-link bi bi-file-richtext">Mes fiches de cours</a>
      </Nav.Link>
      <Nav.Link as={Link} href={"/for_later"} passHref>
        <a className="nav-link bi bi-journal-bookmark">A lire plus tard</a>
      </Nav.Link>
      <Nav.Link as={Link} href={"/lesson/upload"} passHref>
        <a className={"nav-link bi bi-plus-circle-fill"}>Création de fiche</a>
      </Nav.Link>
    </div>
  );
};

export default SidebarContent;
