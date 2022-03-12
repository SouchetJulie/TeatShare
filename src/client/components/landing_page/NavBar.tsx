import logo from "../../../../public/logos/name.png";
import Image from "next/image";
import styles from "../../styles/landing_page/NavBar.module.scss";
import Link from "next/link";

const NavBar = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.img_container}>
        <Image src={logo} alt="Logo" layout="responsive" />
      </div>

      <div className={styles.navigationLink}>
        <li>
          <Link href="/user/login">
            <a>Se connecter</a>
          </Link>
        </li>
        <li>
          <Link href="/user/signup">S&apos;inscrire</Link>
        </li>
        <li>
          <div className={styles.profileLiContainer}>
            <div className={styles.profilePicContainer}>
              <Image
                src={logo}
                alt="avatar"
                layout="responsive"
                object-position="center"
                objectFit="cover"
              />
            </div>
          </div>
        </li>
      </div>
    </div>
  );
};

export default NavBar;
