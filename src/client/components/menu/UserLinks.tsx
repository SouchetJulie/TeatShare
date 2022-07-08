import { useLogout } from "@hooks/logout.hook";
import styles from "@styles/menu/navbar.module.scss";
import { IUserPublic } from "@typing/user.interface";
import Link from "next/link";
import React, { FunctionComponent, useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";

interface Props {
  user?: IUserPublic;
}

/**
 * Links relative to the current user.
 * @constructor
 */
const UserLinks: FunctionComponent<Props> = ({ user }: Props) => {
  const logout = useLogout();
  const [username, setUsername] = useState("");

  // For display
  useEffect(() => {
    if (user) {
      if (user.firstName || user.lastName) {
        setUsername(`${user.firstName} ${user.lastName}`.trim());
      } else {
        setUsername(user.email);
      }
    }
  }, [user, setUsername]);

  return user ? (
    <NavDropdown
      className={`ms-lg-5 ms-md-3 mb-2 my-md-auto text-light ${styles.dropdownMenu}`}
      title={username}
      menuVariant="dark"
    >
      <NavDropdown.Item>
        <Link href={"/user"}>Mon profil</Link>
      </NavDropdown.Item>
      <Dropdown.Divider />
      <NavDropdown.Item>
        <Link href={"/dashboard"}>Mon dashboard</Link>
      </NavDropdown.Item>
      <Dropdown.Divider />
      <NavDropdown.Item>
        <Link href={"/user/settings"}>Paramètres</Link>
      </NavDropdown.Item>
      <Dropdown.Divider />
      <NavDropdown.Item onClick={logout}>Déconnexion</NavDropdown.Item>
    </NavDropdown>
  ) : (
    <div className={"ms-md-5 mb-2 my-md-auto " + styles.navSection}>
      <Nav.Link as={Link} href={"/user/login"}>
        Connexion
      </Nav.Link>
      <Nav.Link as={Link} href={"/user/signup"}>
        Inscription
      </Nav.Link>
    </div>
  );
};

export default UserLinks;
