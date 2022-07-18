import { useAppSelector } from "@hooks/store-hook";
import { selectIsAuthenticated } from "@stores/user.store";
import styles from "@styles/menu/navbar.module.scss";
import { FunctionComponent } from "react";
import Nav from "react-bootstrap/Nav";
import LessonLinks from "../menu/LessonLinks";

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
