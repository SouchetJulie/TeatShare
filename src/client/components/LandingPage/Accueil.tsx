import Link from 'next/link';
import styles from '../../styles/LandingPage/Accueil.module.scss';

const Accueil = () => {
    return (
        <div className={styles.accueil_container}>
            <div className={styles.bloc1}>
                <div className={styles.block1_Content}>
                    <h1> Vous êtes instituteur ?</h1>
                    <p> Vous voudriez partager vos cours ou vous êtes <br/>à la recherche de l&apos;inspiration ?</p>
                    <button>
                        <Link href={`/user/login`} >
                            <a className={styles.connexion}>Se connecter</a>
                        </Link>
                    </button>
                </div>
            </div>
            <div className={styles.bloc2}>
                <div className={styles.leftSide}>
                    <div className={styles.fromMe}>Im speech bubble</div>
                </div>
                <div className={styles.rightSide}></div>
                <div className={styles.bottomSide}></div>
            </div>
        </div>
    );
};
export default Accueil;