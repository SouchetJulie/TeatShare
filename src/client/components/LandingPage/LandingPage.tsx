import { FunctionComponent } from "react";
import styles from '../../styles/LandingPage/LandingPage.module.scss';
import NavBar from "./NavBar";
import Accueil from "./Accueil";
import Access from "./Access";
import Temoignage from "./Temoignage";
import Actualites from "./Actualites";
import Footer from "./Footer";


interface Props {}

const LandingPage: FunctionComponent<Props> = () => {
  return (
    <div className={styles.container}>
      <NavBar />
        <Accueil />
        <Access/>
        <Temoignage />
        <Actualites />
        <Footer />
    </div>
  );
};

export default LandingPage;


