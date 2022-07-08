import styles from "@styles/menu/navbar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FunctionComponent, useState } from "react";
import {
  FileEarmarkRichtext,
  JournalBookmark,
  PlusCircleFill,
  Search,
} from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Nav from "react-bootstrap/Nav";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

interface Props {
  className?: string;
}

const LessonLinks: FunctionComponent<Props> = ({ className = "" }: Props) => {
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
            <Search aria-label="recherche" size={25} color="white" />
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
          <Search
            aria-label="recherche"
            size={25}
            className={styles.sidebar_icon}
          />
          Recherche
        </Nav.Link>
      </OverlayTrigger>
      <Nav.Link as="div">
        <Link href={"/lesson"} passHref className="nav-link">
          <a>
            <FileEarmarkRichtext
              size={25}
              className={styles.sidebar_icon}
              aria-label="file icon"
            />
            <br />
            Mes fiches de cours
          </a>
        </Link>
      </Nav.Link>
      <Nav.Link as="div">
        <Link href={"/user/bookmarks"} passHref className="nav-link">
          <a>
            <JournalBookmark
              size={25}
              className={styles.sidebar_icon}
              aria-label="journal icon"
            />
            <br />
            Mes signets
          </a>
        </Link>
      </Nav.Link>
      <Nav.Link as="div" className={styles.lastLink}>
        <Link href={"/lesson/upload"} passHref>
          <a>
            <PlusCircleFill
              size={25}
              className={styles.sidebar_icon}
              aria-label="plus icon"
            />
            <br />
            Création de fiche
          </a>
        </Link>
      </Nav.Link>
    </div>
  );
};

export default LessonLinks;
