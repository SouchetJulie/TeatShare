import logo from '../../../public/logos/name.png';
import Image from 'next/image';
import styles from '../../styles/LandingPage/NavBar.module.scss'

const NavBar = (): JSX.Element => {
    return (
        <div className={styles.container}>
            <div>
                <Image
                    src={logo}
                    alt='Logo'
                />
            </div>
            <div className={styles.navigationLink}>
                        <li>
                            Se connecter
                        </li>
                        <li>
                            S&apos;inscrire
                        </li>
                        <li>
                            <Image
                                src={logo}
                                alt='avatar'
                                width="40"
                                height="40"
                            />
                        </li>
            </div>
        </div>
    );
};

export default NavBar