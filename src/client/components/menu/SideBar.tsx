import React, { FunctionComponent } from "react";
import Nav from "react-bootstrap/Nav";

import SideBarContent from "@components/menu/SideBarContent";
import styles from "@styles/navbar.module.scss";

interface Props {
  hasUser: boolean;
}

const SideBar: FunctionComponent<Props> = ({ hasUser }): JSX.Element => {
  const style: string = hasUser ? styles.sidebar : "";
  return (
    <Nav className={style} aria-hidden hidden={!hasUser}>
      <SideBarContent />
    </Nav>
  );
};

export default SideBar;
