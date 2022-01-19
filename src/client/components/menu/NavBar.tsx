import { FunctionComponent } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import GradeLinks from "@components/menu/GradeLinks";
import MainLinks from "@components/menu/MainLinks";
import SideBarContent from "@components/menu/SideBarContent";
import UserLinks from "@components/menu/UserLinks";
import { useUser } from "@hooks/useUser.hook";
import styles from "@styles/navbar.module.scss";
import { NavbarVariant } from "@typing/navbar-variant.enum";

interface Props {
  variant?: NavbarVariant;
}

const NavBar: FunctionComponent<Props> = ({ variant = NavbarVariant.dark }) => {
  const { user } = useUser();

  const bgStyle = variant === "light" ? styles.light : "";

  return (
    <Navbar
      variant={variant}
      expand="md"
      sticky="top"
      className={`${styles.navbar} ${bgStyle}`}
    >
      <Container fluid="lg">
        <Navbar.Brand href={"/"} className={styles.navBarBrand}>
          TeatShare
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100">
            <GradeLinks user={user} />
            <hr />
            <MainLinks user={user} />
            <hr />
            <SideBarContent className={styles.hiddenMd} />
            <hr />
            <UserLinks user={user} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
