import { getUsername } from "@client/utils/get-username.utils";
import { useLogout } from "@hooks/logout.hook";
import styles from "@styles/menu/navbar.module.scss";
import { IUserPublic } from "@typing/user.interface";
import Link from "next/link";
import { FunctionComponent } from "react";
import { NavDropdown } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

interface Props {
  user?: IUserPublic;
}

/**
 * Links relative to the current user.
 * @constructor
 */
const UserLinks: FunctionComponent<Props> = ({ user }: Props) => {
  const logout = useLogout();

  return user ? (
    <NavDropdown
      className={`ms-lg-5 ms-md-3 mb-2 my-md-auto text-light ${styles.dropdownMenu}`}
      title={getUsername(user)}
      menuVariant="dark"
    >
      <NavDropdown.Item as="div">
        <Link href={"/user"}>Mon profil</Link>
      </NavDropdown.Item>
      <Dropdown.Divider />
      <NavDropdown.Item as="div">
        <Link href={"/user/settings"}>Paramètres</Link>
      </NavDropdown.Item>
      <Dropdown.Divider />
      <NavDropdown.Item onClick={logout}>Déconnexion</NavDropdown.Item>
    </NavDropdown>
  ) : (
    <div className={"ms-md-5 mb-2 my-md-auto " + styles.navSection}>
      <Link className="nav-link" href={"/user/login"}>
        Connexion
      </Link>
      <Link className="nav-link" href={"/user/signup"}>
        Inscription
      </Link>
    </div>
  );
};

export default UserLinks;
