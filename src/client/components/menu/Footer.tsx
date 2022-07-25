import logo from "@public/logos/name.png";
import styles from "@styles/landing_page/Footer.module.scss";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
// Social icons
import { Facebook, Instagram, Twitter } from "react-bootstrap-icons";

interface FooterProps {
  isAuthenticated: boolean;
}

const classes = ["CP", "CE1", "CE2", "CM1", "CM2"];

const Footer: FunctionComponent<FooterProps> = ({ isAuthenticated }) => {
  return <>{isAuthenticated ? <FooterAuthenticated /> : <FooterLanding />}</>;
};
/**
 * Footer used on the landing page only
 * @return {JSX}
 */
const FooterLanding: FunctionComponent = (): JSX.Element => {
  return (
    <footer className={styles.footer_container}>
      <div className={styles.landing_footer_content}>
        <div className={styles.landingFooterSocial}>
          <h6>Suivez nous sur les réseaux !</h6>
          <div className={styles.socialIconsLogos}>
            <Facebook color="#009FB7" size={40} />
            <Instagram color="#009FB7" size={40} />
            <Twitter color="#009FB7" size={40} />
          </div>
        </div>
        <div className={styles.landingFooterContact}>
          <div className={styles.spaceText}>
            <Image src={logo} layout="responsive" className={styles.test} />
            <p>+1 (7635) 547-12-97</p>
            <Link href="/">teatshare@live.fr</Link>
          </div>
          <div>
            <Link href="/">Lien</Link>
            <Link href="/">Contact</Link>
            <Link href="/">Credits</Link>
          </div>
          <div>
            <Link href="/">Protection des données</Link>
          </div>
        </div>
        <div className={styles.landing_footer_bloc3}>
          © 2022. Tous droits réservés
        </div>
      </div>
    </footer>
  );
};
/**
 * Footer used on every other pages/routes
 * @return {JSX}
 */
const FooterAuthenticated: FunctionComponent = (): JSX.Element => {
  return (
    <footer className={`${styles.footer_container} ${styles.authenticated}`}>
      <div className={styles.menu_footer_content}>
        <div className={styles.menu_footer_bibliotheque}>
          <p>Bibliothèque</p>
          {classes.map((classLabel: string, index: number) => (
            <Link
              href={`/lesson?subject=${classLabel}`}
              key={`footer-classe-${index}`}
            >
              {classLabel}
            </Link>
          ))}
        </div>
        <div className={styles.menu_footer_profile}>
          <p>Profil</p>
          <Link href={"/user/bookmarks"}>Mes favoris</Link>
          <Link href={"/user/settings"}>Paramètres</Link>
          <Link href={"/lesson"}>Mes contributions</Link>
        </div>
        <div className={styles.menu_footer_link}>
          <p>Liens</p>
          <Link href={"/contact"}>Contact</Link>
          <Link href={"/mentions"}>Mentions légales</Link>
          <Link href={"/a_propos"}>À propos</Link>
          <Link href={"/faq"}>FAQ</Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
