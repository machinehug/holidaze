import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Head from "../../src/components/layout/Head";
import Layout from "../../src/components/layout/Layout";
import Heading from "../../src/components/typography/Heading";
import AccommodationForm from "../../src/components/accommodations/AccommodationForm";
import { BASE_API_URL, ACCOMMODATIONS_API } from "../../src/constants/api";
import { CURRENCY } from "../../src/constants/other";
import styles from "../../styles/pages/enquiry.module.scss";

export default function AccommodationEnquiry({accommodation}) {

    const { name, reviews, price, address, id, image } = accommodation;

    return (
        <Layout>
            <Head currentPage={name} />
            <div className={styles.wrapper}>

                <section className={styles.top}>
                    <div>
                        <Link href={`/accommodation/${id}`}>
                            <a>
                                <Image src={image} objectFit="cover" width={150} height={130} alt={name} />
                            </a>
                        </Link>
                        <div>
                            <div>
                                <Heading title={name} type="h1" />
                                <span>{reviews} <i className="fas fa-star"></i></span>
                            </div>
                            <div>
                                {address}
                            </div>
                            <div>
                                {price} {CURRENCY} per day
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className={styles.bottom}>
                        <AccommodationForm api={accommodation} />
                    </div>
                </section>

            </div>
        </Layout>
    );
};

export async function getStaticPaths() {

    const url = BASE_API_URL + ACCOMMODATIONS_API;

    try {
        const response = await axios.get(url);
        const accommodations = response.data;

        const paths = accommodations.map(accommodation => ({
            params: {
                id: accommodation.id.toString(),
            }
        }));

        return {
            paths,
            fallback: false
        };
    } catch (error) {
        console.log("An error occurred. Error message: " + error);
    };
};

export async function getStaticProps({params}) {

    const url = BASE_API_URL + ACCOMMODATIONS_API + params.id;

    let accommodations = null;

    try {
        const response = await axios.get(url);
        accommodations = response.data;
    } catch (error) {
        console.log("An error occurred. Error message: " + error);
    };

    return {
        props: {
            accommodation: accommodations,
        }
    };
};