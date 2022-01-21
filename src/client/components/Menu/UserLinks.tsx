import React, {
  forwardRef,
  FunctionComponent,
  MouseEventHandler,
  ReactNode,
  RefObject,
  useEffect,
  useState,
} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import Link from "next/link";

import styles from "@styles/Menu/navbar.module.scss";
import { IUserPublic } from "@typing/user.interface";
import { useLogout } from "@hooks/useLogout.hook";

interface Props {
  user?: IUserPublic;
}

// eslint-disable-next-line react/display-name,react/prop-types
const UserDropdownToggle = forwardRef(
  (
    { children, onClick }: { children?: ReactNode; onClick: MouseEventHandler },
    ref
  ) => (
    <a
      href=""
      ref={ref as RefObject<HTMLAnchorElement>}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  )
);

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
    <Dropdown
      className="ms-lg-5 ms-md-3 mb-2 my-md-auto text-light"
      drop="start"
    >
      <Dropdown.Toggle as={UserDropdownToggle} id="user-dropdown-toggle">
        {username}
      </Dropdown.Toggle>
      <Dropdown.Menu
        variant="dark"
        role="menu"
        className={"mt-3 mt-md-0 " + styles.dropdownMenu}
      >
        <Dropdown.Item>
          <Link href={"/user"}>Mon profil</Link>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>
          <Link href={"/settings"}>Paramètres</Link>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={logout}>Déconnexion</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
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
