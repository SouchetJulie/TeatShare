import { FunctionComponent } from "react";
import Nav from "react-bootstrap/Nav";

import styles from "@styles/navbar.module.scss";

interface Props {
  show?: boolean;
}

/**
 * Main app links.
 * @constructor
 */
const MainLinks: FunctionComponent<Props> = ({ show }: Props) => {
  return (
    <div className={styles.navSection}>
      <Nav.Link href={"/"} className={styles.navLinks}>
        Accueil
      </Nav.Link>
      {show ? (
        <>
          <Nav.Link href={"/for_later"} className={styles.navLinks}>
            A lire plus tard
          </Nav.Link>
          <Nav.Link href={"/settings"} className={styles.navLinks}>
            Paramètres
          </Nav.Link>
        </>
      ) : null}
    </div>
  );
};

export default MainLinks;
