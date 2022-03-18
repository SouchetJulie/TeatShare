import React, { FunctionComponent } from "react";
import Nav from "react-bootstrap/Nav";
import styles from "@styles/Menu/navbar.module.scss";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@stores/user.store";
import LessonLinks from "@components/menu/LessonLinks";

const SideBar: FunctionComponent = (): JSX.Element => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const style: string = isAuthenticated ? styles.sidebar : "";
  return (
    <Nav className={style} aria-hidden hidden={!isAuthenticated}>
      <LessonLinks />
    </Nav>
  );
};

export default SideBar;
