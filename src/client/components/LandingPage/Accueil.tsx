import Link from "next/link";
import styles from "../../styles/LandingPage/Accueil.module.scss";

const Accueil = () => {
  return (
    <div className={styles.accueil_container}>
      <div className={styles.bloc1}>
        <div className={styles.block1Content}>
          <h1> Vous êtes instituteur ?</h1>
          <p>
            {" "}
            Vous voudriez partager vos cours ou vous êtes <br />à la recherche
            de l&apos;inspiration ?
          </p>
          <Link href={`/user/login`}>
            <button>
              <a className={styles.connexion}>Se connecter</a>
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.bloc2}>
        <div className={styles.block2Content}>
          <div className={styles.leftSide}>
            <div className={styles.imessage}>
              <p className={styles.fromMe}>
                Je n&apos;ai pas
                <br /> d&apos;inspiration...
              </p>
              <div className={styles.queue} />
            </div>
            <h2>Non, Facile!</h2>
          </div>

          <div className={styles.rightSide}>
            <h2>Trouvez-en.</h2>
            <div className={styles.imessage}>
              <p className={styles.fromMe}>
                Créer un cours
                <br /> c&apos;est compliqué !!
              </p>
            </div>
          </div>
        </div>
        <div className={styles.bottomSide}>
          <p>Le cours vous a t&apos;il aidé ?</p>
          <div className={styles.choice}>
            <div className={styles.yesPart}>
              <p>OUI</p>
            </div>
            <div className={styles.noPart}>
              <p>NON</p>
            </div>
          </div>
          <button className={styles.callToAction}>
            <Link href={`/user/signup`}>
              <a className={styles.participate}>Participer</a>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Accueil;
