import React, { FunctionComponent } from "react";
import Nav from "react-bootstrap/Nav";
import styles from "@styles/menu/navbar.module.scss";
import { selectIsAuthenticated } from "@stores/user.store";
import LessonLinks from "@components/menu/LessonLinks";
import { useAppSelector } from "@hooks/store-hook";

const SideBar: FunctionComponent = (): JSX.Element => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const style: string = isAuthenticated ? styles.sidebar : "";
  return (
    <Nav as="nav" className={style} aria-hidden hidden={!isAuthenticated}>
      <LessonLinks />
    </Nav>
  );
};

export default SideBar;
