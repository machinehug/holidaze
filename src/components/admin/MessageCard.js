import { useState, useEffect } from "react";
import axios from "axios";
import Heading from "../typography/Heading";
import { TOKEN_KEY } from "../../constants/admin";
import { BASE_API_URL, MESSAGES_API } from "../../constants/api";
import styles from "../../../styles/pages/admin.module.scss";

export default function MessageCard({api}) {

    const { id } = api;
    const date = new Date(api.created_at).toDateString();

    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const [willDelete, setWillDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_KEY);
        setToken(token);
    }, []);

    async function deleteMessage() {

        const url = BASE_API_URL + MESSAGES_API + id;

        try {
            const response = await axios.delete(url, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            console.log("response", response);
        } catch (error) {
            setError(error.toString());
            console.log("An error occurred. Error message: " + error)
        } finally {
            setDeleting(true);
        };
	};

    return (
        <div className={styles.card}>
            {date}
            <Heading title={`From ${api.first_name} ${api.last_name ? api.last_name : ""}`} type="h2" />

            <div className={styles.inner}>

                <div className={styles.info}>
                    <span>Email</span>
                    <span>{api.email}</span>
                </div>

                <div className={styles.info}>
                    <span>Phone</span>
                    <span>{api.phone ? api.phone : "Undisclosed"}</span>
                </div>
                
                <div className={styles.info + " " + styles.message}>
                    <span>Message</span>
                    <span>{api.message}</span>
                </div>

                <div className={styles.btns}>
                    <button>Reply</button>
                    <button className={styles.dangerbtn} onClick={() => setWillDelete(!willDelete)}>{!willDelete ? "DELETE" : "CANCEL"}</button>
                    {willDelete &&
                        <>
                        <p>Are you sure you want to delete the accommodation?</p>
                        <button className={styles.dangerbtn} onClick={deleteMessage}>{!deleting ? "YES, DELETE IT" : "DELETED"}</button>
                        {deleting &&
                        <p>The accommodation was deleted. Refresh the page to see the changes.</p>}
                    </>}
                </div>

            </div>
        </div>
    );
};