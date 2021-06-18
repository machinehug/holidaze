import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Heading from "../typography/Heading";
import { TOKEN_KEY } from "../../constants/admin";
import { BASE_API_URL, ACCOMMODATIONS_API } from "../../constants/api";
import styles from "../../../styles/pages/admin.module.scss";

export default function AccommodationCard({api}) {

    const { name, address, id } = api;

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const [willDelete, setWillDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_KEY);
        console.log(token)
        setToken(token);
    }, []);

    async function deleteAccommodation() {

        setDeleting(true);

        const url = BASE_API_URL + ACCOMMODATIONS_API + id;

        try {
            const response = await axios.delete(url, {
                headers: {
                     Authorization: "Bearer " + token,
                },
            });

            console.log("response", response);
        } catch (error) {
            setError(error.toString());
            console.log("An error occurred. Error message: " + error);
        } finally {
            setSubmitting(false);
        };
	};

    return (
            <section className={styles.card}>
                <div className={styles.inner}>
                    <Heading title={name} type="h1" />

                    {address}

                    <div className={styles.btns}>
                        <Link href={`/admin/edit/${id}`}><a><button>Edit</button></a></Link>
                        <button className={styles.dangerbtn} onClick={() => setWillDelete(!willDelete)}>{!willDelete ? "DELETE" : "CANCEL"}</button>
                        {willDelete &&
                        <>
                        <p>Are you sure you want to delete the accommodation?</p>
                        <button className={styles.dangerbtn} onClick={deleteAccommodation}>{!deleting ? "YES, DELETE IT" : "DELETED"}</button>
                        {deleting &&
                        <p>The accommodation was deleted. Refresh the page to see the changes.</p>}
                        </>}
                    </div>

                </div>
            </section>
    );
};