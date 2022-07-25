import styles from "@styles/menu/navbar.module.scss";
import Link from "next/link";
import { FunctionComponent } from "react";
import {
  FileEarmarkRichtext,
  JournalBookmark,
  PlusCircleFill,
} from "react-bootstrap-icons";
import Nav from "react-bootstrap/Nav";

interface Props {
  className?: string;
}

const LessonLinks: FunctionComponent<Props> = ({ className = "" }: Props) => {
  return (
    <div
      className={`${className} ${styles.sidebarContent} ${styles.navSection}`}
    >
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
