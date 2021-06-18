import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import { TOKEN_KEY } from "../../constants/admin";
import styles from "../../../styles/components/Header.module.scss";

export default function Header() {

    const [hidden, setHidden] = useState(true);
    const [isLoggedIn, setLoggedInStatus] = useState(null);

    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_KEY);
        setLoggedInStatus(token);
      }, []);

    function logOut() {
        localStorage.clear(TOKEN_KEY);
        router.push("/");
    };

    return (
            <>
                <header className={styles.header}>
                    <div className={styles.container}>
 
                        <Link href="/"><a><img src="/img/logo.png" alt="Holidaze logo" className={styles.logo} /></a></Link>

                        <div className={styles.wrapper}>
                            <nav className={styles.nav}>
                                <ul>
                                    <Link href="/results"><a><li><i className="fas fa-concierge-bell"></i> Hotels</li></a></Link>
                                    <Link href="/results"><a><li><i className="fas fa-thumbs-up"></i> B&B</li></a></Link>
                                    <Link href="/results"><a><li><i className="fas fa-home"></i> Guesthouses</li></a></Link>
                                    <Link href="/results"><a><li><i className="fas fa-layer-group"></i> All accommodations</li></a></Link>
                                </ul>
                            </nav>
                            <nav className={styles.nav}>
                                <ul>
                                    <Link href="/contact"><a><li><i className="fas fa-phone-alt"></i> Contact us</li></a></Link>
                                    <Link href="/"><a><li><i className="fas fa-question"></i> Customer service</li></a></Link>
                                    <Link href={isLoggedIn ? "/" : "/login"}><a onClick={isLoggedIn ? logOut : false} ><li><i className="fas fa-grin"></i> {isLoggedIn ? "Logout" : "Login"}</li></a></Link>
                                </ul>
                            </nav>
                        </div>

                        {isLoggedIn &&
                        <nav className={`${styles.nav} ${styles.admin}`}>
                            <ul>
                                <Link href="/admin/home"><a><li>Home</li></a></Link>
                                <Link href="/admin/enquiries"><a><li>Enquiries</li></a></Link>
                                <Link href="/admin/messages"><a><li>Messages</li></a></Link>
                                <Link href="/admin/new"><a><li>Add new accommodation</li></a></Link>
                                <Link href="/admin/edit"><a><li>Edit accommodations</li></a></Link>
                            </ul>
                        </nav>}

                        <div className={styles.hamburger} onClick={() => setHidden(!hidden)}>
                            <div className={styles.wrapper}>
                                <div className={`${styles.line} ${!hidden ? `${styles.hamburgercloseanimation} ${styles.line1}` : ""}`}></div>
                                <div className={`${styles.line} ${!hidden ? `${styles.hamburgercloseanimation} ${styles.line2}` : ""}`}></div>
                                <div className={`${styles.line} ${!hidden ? `${styles.hamburgercloseanimation} ${styles.line3}` : ""}`}></div>
                            </div>
                        </div>

                    </div>
                </header>
            
                <div className={`${hidden ? "hidden" : ""} ${styles.mobile}`}>
                    <div className={styles.inner}>
                        <nav>
                            <ul>
                                <Link href="/results"><a><li><i className="fas fa-concierge-bell"></i> Hotels</li></a></Link>
                                <Link href="/results"><a><li><i className="fas fa-thumbs-up"></i> B&B</li></a></Link>
                                <Link href="/results"><a><li><i className="fas fa-home"></i> Guesthouses</li></a></Link>
                                <Link href="/results"><a><li><i className="fas fa-layer-group"></i> All accommodations</li></a></Link>
                            </ul>
                            <hr />
                            <ul>
                                <Link href="/contact"><a><li><i className="fas fa-phone-alt"></i> Contact us</li></a></Link>
                                <Link href="/"><a><li><i className="fas fa-question"></i> Customer service</li></a></Link>
                                <Link href={isLoggedIn ? "/" : "/login"}><a onClick={isLoggedIn ? logOut : false}><li><i className="fas fa-grin"></i> {isLoggedIn ? "Logout" : "Login"}</li></a></Link>
                            </ul>
                            <hr />
                            {isLoggedIn &&
                            <ul>
                                <Link href="/admin/home"><a><li>Home</li></a></Link>
                                <Link href="/admin/enquiries"><a><li>Enquiries</li></a></Link>
                                <Link href="/admin/messages"><a><li>Messages</li></a></Link>
                                <Link href="/admin/new"><a><li>Add new accommodation</li></a></Link>
                                <Link href="/admin/edit"><a><li>Edit accommodations</li></a></Link>
                            </ul>}
                        </nav>
                    </div>
                </div>
            </>
    );
};