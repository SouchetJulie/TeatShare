import Link from "next/link";
import styles from "../../styles/LandingPage/Access.module.scss";

const Access = () => {
    return (
        <div className={styles.accessContainer}>
            <div className={styles.accessContent}>
                <h2 className={styles.accessTitle}>En vous inscrivant, <br/><span> vous aurez acces à</span></h2>
                <ul>
                    <li>Des cours et des conseils rédigés par des professionnels et des professeurs.</li>
                    <li>L’intégralité des cours de chaque section, du CP jusqu’au CM2.</li>
                    <li>D’enregistrer les cours qui vous intéresse dans votre bibliothèque personnelle. </li>
                </ul>
                <div>
                    <button className={styles.accessButton}>
                        <Link href={`/user/signup`}>
                            <a className={styles.connexion}>Je m&apos;inscris</a>
                        </Link>
                    </button>
                </div>

            </div>
            <div className={styles.accessImgWrapper}></div>
        </div>
    );
};
export default Access;