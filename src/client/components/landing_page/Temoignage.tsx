import styles from "@styles/landing_page/Temoignage.module.scss";
import Image from "next/image";
import guillemetDown from "../../../../public/landingPage/guillemetsDown.png";
import guillemetUp from "../../../../public/landingPage/guillemetsUp.png";

const Temoignage = () => {
  return (
    <div className={styles.temoignageContainer}>
      <div className={styles.temoignageContent}>
        <div className={styles.guillemetUp}>
          <Image src={guillemetUp} alt="quote up" />
        </div>
        <div className={styles.temoignageText}>
          <h2>Ils témoignent !</h2>
          <p>
            La communauté Teatshare m’a beaucoup
            <br /> apporté. Plus que de simples conseils, je me suis
            <br />
            sentie comprise !
          </p>
          <li className={styles.temoignagePeopleName}>Sabito</li>
        </div>
        <div className={styles.guillemetDown}>
          <Image src={guillemetDown} alt="quote down" />
        </div>
      </div>
    </div>
  );
};
export default Temoignage;
