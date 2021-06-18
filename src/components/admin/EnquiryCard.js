import { useState, useEffect } from "react";
import axios from "axios";
import Heading from "../typography/Heading";
import { TOKEN_KEY } from "../../constants/admin";
import { BASE_API_URL, ENQUIRIES_API } from "../../constants/api";
import styles from "../../../styles/pages/admin.module.scss";

export default function EnquiryCard({api}) {

    const dateCreated = new Date(api.created_at).toDateString();
    const checkin = new Date(api.check_in).toDateString();
    const checkout = new Date(api.check_out).toDateString();
    const { id } = api;

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const [willDelete, setWillDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_KEY);
        setToken(token);
    }, []);

    async function deleteEnquiry() {

        setDeleting(true);

        const url = BASE_API_URL + ENQUIRIES_API + id;

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
            {dateCreated}
            <Heading title={api.accommodation} type="h1" />
            <Heading title={`${api.first_name} ${api.last_name}`} type="h2" />

            <div className={styles.inner}>

                <div className={styles.info}>
                    Email: <span>{api.email}</span>
                </div>

                <div className={styles.info}>
                    Phone: <span>{api.phone}</span>
                </div>
                
                <div className={styles.info}>
                    <div>
                        Check in: <span>{checkin}</span>
                    </div>
                    <div>
                        Check out: <span>{checkout}</span> 
                    </div>
                </div>

                <div className={styles.info}>
                    <div>
                        Rooms: <span>{api.rooms}</span>
                    </div>
                    <div>
                        Adults: <span>{api.adults}</span>
                    </div>
                    <div>
                        Children: <span>{api.children}</span>
                    </div>
                    <div>
                        Pets: <span>{api.pets}</span> 
                    </div>
                </div>

                <div>
                    <button className={styles.dangerbtn} onClick={() => setWillDelete(!willDelete)}>{!willDelete ? "DELETE" : "CANCEL"}</button>
                    {willDelete &&
                    <>
                        <p>Are you sure you want to delete the enquiry?</p>
                        <button className={styles.dangerbtn} onClick={deleteEnquiry}>{!deleting ? "YES, DELETE IT" : "DELETED"}</button>
                        {deleting &&
                        <p>The enquiry was deleted. Refresh the page to see the changes.</p>}
                    </>}
                </div>

            </div>
        </section>
    );
};