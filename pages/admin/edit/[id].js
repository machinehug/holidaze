
import axios from "axios";
import Head from "../../../src/components/layout/Head";
import Layout from "../../../src/components/layout/Layout";
import EditAccommodationCard from "../../../src/components/admin/EditAccommodationCard";
import { BASE_API_URL, ACCOMMODATIONS_API } from "../../../src/constants/api";
import styles from "../../../styles/pages/edit.module.scss";

export default function EditAccommodation({accommodation}) {

    const { name } = accommodation;

    return (
            <Layout>
                <Head currentPage={`Admin - Edit ${name}`} />
                <div className={styles.wrapper}>
                    <EditAccommodationCard accommodation={accommodation} />
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
