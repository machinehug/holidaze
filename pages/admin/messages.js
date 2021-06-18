import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../src/components/layout/Layout";
import Head from "../../src/components/layout/Head";
import Heading from "../../src/components/typography/Heading";
import MessageCard from "../../src/components/admin/MessageCard";
import { TOKEN_KEY } from "../../src/constants/admin";
import { BASE_API_URL, MESSAGES_API } from "../../src/constants/api";
import styles from "../../styles/pages/admin.module.scss";

export default function Messages() {

	const [messages, setMessages] = useState([]);

	const router = useRouter();

	useEffect(async () => {

		const token = localStorage.getItem(TOKEN_KEY);

		if (!token) {
            router.push("/");
			return;
        };

		const url = BASE_API_URL + MESSAGES_API;
		
		const response = await axios.get(url, {
			headers: {
				Authorization: "Bearer " + token,
			},
		});

		console.log("response", response.data);

		setMessages(response.data);
	}, []);

	return (
				<Layout>
					<Head currentPage="Admin - Messages" />
					<div className={styles.wrapper}>
						<Heading title="Messages from customers." type="h1" />
						<p>There are {messages.length} messages.</p>
                        <section className={styles.container}>
						    {messages.map(el => <MessageCard key={el.id} api={el} /> )}
                        </section>
					</div>
				</Layout>
	);
};