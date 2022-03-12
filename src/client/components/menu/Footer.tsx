import Image from "next/image";
import Link from "next/link";

import logo from "@public/logos/name.png";
import insta from "@socialIcons/insta.png";
import twitter from "@socialIcons/twitter.png";
import styles from "@styles/landing_page/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.landing_footer_container}>
      <div className={styles.landing_footer_content}>
        <div className={styles.landing_footer_bloc1}>
          <h6>Suivez nous sur les réseaux !</h6>
          <div className={styles.socialIconsLogos}>
            <Image src={twitter} width="40" height="40" />
            <Image src={insta} width="40" height="40" />
          </div>
        </div>
        <div className={styles.landing_footer_bloc2}>
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
export default Footer;
