import { FunctionComponent } from "react";
import NavBar from "@components/menu/NavBar";
import SideBar from "@components/menu/SideBar";
import styles from "../../styles/HomePage/index.module.scss";

interface IHomePageComponent {
  displayNav: boolean;
}

const HomePage: FunctionComponent<IHomePageComponent> = ({
  displayNav,
}: IHomePageComponent): JSX.Element => {
  return (
    <div className={styles.homeContainer}>
      <NavBar />
      <SideBar displayNav={displayNav} />
    </div>
  );
};

export default HomePage;
