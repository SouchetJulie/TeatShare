import styles from "@styles/menu/navbar.module.scss";
import Link from "next/link";
import { FunctionComponent } from "react";
import Nav from "react-bootstrap/Nav";

interface Props {
  show?: boolean;
}

/**
 * Main app links.
 * @constructor
 */
const MainLinks: FunctionComponent<Props> = () => {
  return (
    <div className={styles.navSection}>
      <Nav.Link as={Link} href={"/"}>
        Accueil
      </Nav.Link>
    </div>
  );
};

export default MainLinks;
