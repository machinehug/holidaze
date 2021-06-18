import Image from "next/image";
import Link from "next/link";
import Heading from "../typography/Heading";
import { CURRENCY } from "../../constants/other";
import styles from "../../../styles/pages/results.module.scss";

export default function SearchResults({e}) {

    const image = e.image;

    return (
        <div className={styles.card} key={e.id}>
            <Image src={!image.length == 0 ? image : "/img/photomissing.jpg"} objectFit="cover" height={400} width={1100} alt={e.name} />
            <div className={styles.inner}>
                <div>
                    <Heading title={e.name} type="h1" />
                    <div>{e.reviews} <i className="fas fa-star"></i></div>
                    {e.address}
                </div>
                <div className={styles.price}>
                    <div>
                        <span className={styles.txt}>{e.price} {CURRENCY}</span> per day <br />
                        including taxes and fees
                    </div>
                    <Link href={`/accommodation/${e.id}`}>
                        <a><button>SEE OFFER</button></a>
                    </Link>
                </div>
            </div>
        </div>
    );
};