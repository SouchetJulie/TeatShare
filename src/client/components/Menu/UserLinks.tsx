import React, {
  forwardRef,
  FunctionComponent,
  MouseEventHandler,
  ReactNode,
  RefObject,
} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";

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

  return user ? (
    <Dropdown className="ms-lg-5 ms-md-3 my-auto text-light" drop="start">
      <Dropdown.Toggle as={UserDropdownToggle} id="user-dropdown-toggle">
        {user.email}
      </Dropdown.Toggle>
      <Dropdown.Menu variant="dark" role="menu" className="mt-3 mt-md-0">
        <Dropdown.Item href={"/user/_me"}>Mon profil</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={logout}>Déconnexion</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ) : (
    <div className={"ms-md-5 " + styles.navSection}>
      <Nav.Link href={"/user/login"}>Connexion</Nav.Link>
      <Nav.Link href={"/user/signup"}>Inscription</Nav.Link>
    </div>
  );
};

export default UserLinks;
