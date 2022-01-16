import {forwardRef, FunctionComponent, MouseEventHandler, ReactNode} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';

import {useUser} from "../../hooks/useUser.hook";
import styles from './navbar.module.scss';

// eslint-disable-next-line react/display-name,react/prop-types
const UserDropdownToggle = forwardRef(({
                                         children,
                                         onClick
                                       }: { children?: ReactNode; onClick: MouseEventHandler }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

const NavBar: FunctionComponent = () => {
  const {user} = useUser();

  return (
    <Navbar variant="dark" bg="dark" expand="md" sticky="top">
      <Container>
        <Navbar.Brand href={"/"}>TeatShare</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 d-flex justify-content-between">
            <div className={"flex-grow-1 " + styles.navSection}>
              <Nav.Link href={"/lesson?class=cp"} disabled>cp</Nav.Link>
              <Nav.Link href={"/lesson?class=ce1"} disabled>ce1</Nav.Link>
              <Nav.Link href={"/lesson?class=ce2"} disabled>ce2</Nav.Link>
              <Nav.Link href={"/lesson?class=cm1"} disabled>cm1</Nav.Link>
              <Nav.Link href={"/lesson?class=cm2"} disabled>cm2</Nav.Link>
            </div>
            <div className={styles.navSection}>
              <Nav.Link href={"/"}>Accueil</Nav.Link>
              {
                user ? (
                    <>
                      <Nav.Link href={"/for_later"} disabled>A lire plus tard</Nav.Link>
                      <Nav.Link href={"/settings"} disabled>Paramètres</Nav.Link>
                    </>
                  )
                  : ("")
              }
            </div>
            {
              user ?
                (
                  <Dropdown className="ms-md-5">
                    <Dropdown.Toggle as={UserDropdownToggle} id="user-dropdown-toggle">
                      <Image
                        className="border"
                        roundedCircle
                        width={40}
                        height={40}
                        alt={user.email}
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href={"/user/_me"} disabled>Mon profil</Dropdown.Item>
                      <Dropdown.Divider/>
                      <Dropdown.Item href={"/api/user/logout"}>Déconnexion</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>)
                : (
                  <div className={"ms-md-5 " + styles.navSection}>
                    <Nav.Link href={"/user/login"}>Connexion</Nav.Link>
                    <Nav.Link href={"/user/signup"}>Inscription</Nav.Link>
                  </div>
                )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

export default NavBar;
