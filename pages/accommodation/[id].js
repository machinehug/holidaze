import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Head from "../../src/components/layout/Head";
import Layout from "../../src/components/layout/Layout";
import { BASE_API_URL, ACCOMMODATIONS_API } from "../../src/constants/api";
import { CURRENCY } from "../../src/constants/other";
import Heading from "../../src/components/typography/Heading";
import styles from "../../styles/pages/details.module.scss";

export default function AccommodationDetails({accommodation}) {

    const { name, image, reviews, price, address, about, directions, amenity_one, amenity_two, amenity_three, amenity_four } = accommodation;

    if (!image) {
        image = "/img/photomissing.jpg";
    };

    return (
            <Layout>
                <Head currentPage={name} />
                <div className={styles.wrapper}>

                    <div className={styles.abouttop}>
                        <section>
                            <Image src={image} objectFit="cover" width={1000} height={500} alt={name} />
                        </section>
                        <section className={styles.info}>
                            <div>
                                <Heading title={name} type="h1" />
                                <span>{reviews} <i className="fas fa-star"></i></span> <br />
                                {address}
                            </div>
                            <div className={styles.price}>
                                <div>
                                    <span className={styles.txt}>{price} {CURRENCY}</span> per day <br />
                                    including taxes and fees
                                </div>
                                <Link href={`/enquiry/${accommodation.id}`}>
                                    <a><button>BOOK THIS HOTEL</button></a>
                                </Link>
                            </div>
                        </section>
                    </div>

                    <section className={styles.aboutbottom}>
                        <div>
                            <Heading title="Amenities" type="h1" />
                            <ul>
                                {amenity_one ? <li><i className="fas fa-check-square"></i> {amenity_one}</li> : ""}
                                {amenity_two ? <li><i className="fas fa-check-square"></i> {amenity_two}</li> : ""}
                                {amenity_three ? <li><i className="fas fa-check-square"></i> {amenity_three}</li> : ""}
                                {amenity_four ? <li><i className="fas fa-check-square"></i> {amenity_four}</li> : ""}
                            </ul>
                        </div>
                        <div>
                            <Heading title="About" type="h1" />
                            <p>{about}</p>
                        </div>
                        <div>
                            <Heading title="Directions" type="h1" />
                            <p>{directions}</p>
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
        console.log("response", response);
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