import { FunctionComponent } from "react";
import Nav from "react-bootstrap/Nav";

import styles from "@styles/navbar.module.scss";
import Link from "next/link";

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
      <Nav.Link as={Link} href={"/"}>
        Accueil
      </Nav.Link>
      {show ? (
        <>
          <Nav.Link as={Link} href={"/for_later"}>
            A lire plus tard
          </Nav.Link>
          <Nav.Link as={Link} href={"/settings"}>
            Paramètres
          </Nav.Link>
        </>
      ) : null}
    </div>
  );
};

export default MainLinks;
