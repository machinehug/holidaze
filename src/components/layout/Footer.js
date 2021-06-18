import Link from "next/link";
import styles from "../../../styles/components/Footer.module.scss";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>

                <div className={styles.top}>
                    <nav>
                        <h1>Help</h1>
                        <ul>
                            <Link href="/contact"><a><li>Contact us</li></a></Link>
                            <Link href="#"><a><li>FAQ</li></a></Link>
                            <Link href="#"><a><li>Account issues</li></a></Link>
                            <Link href="#"><a><li>Terms and privacy</li></a></Link>
                        </ul>
                    </nav>
                    <nav>
                        <h1>About</h1>
                        <ul>
                            <Link href="#"><a><li>Careers</li></a></Link>
                            <Link href="#"><a><li>Media</li></a></Link>
                            <Link href="#"><a><li>About Bergen</li></a></Link>
                            <Link href="#"><a><li>About us</li></a></Link>
                        </ul>
                    </nav>
                    <nav>
                        <h1>Other</h1>
                        <ul>
                            <Link href="#"><a><li>Become an affiliate</li></a></Link>
                            <Link href="#"><a><li>Top accommodations</li></a></Link>
                            <Link href="#"><a><li>Vacation inspiration</li></a></Link>
                        </ul>
                    </nav>
                </div>

                <div className={styles.bottom}>
                    <div>
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-youtube"></i>
                        <i className="fab fa-instagram"></i>
                    </div>
                    <p>Copyright © 2011-2021 Holidaze is a fake website. All rights reserved.</p>
                </div>

            </div>
        </footer>
    );
};