import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../src/components/layout/Layout";
import Head from "../../src/components/layout/Head";
import Heading from "../../src/components/typography/Heading";
import EnquiryCard from "../../src/components/admin/EnquiryCard";
import { TOKEN_KEY } from "../../src/constants/admin";
import { BASE_API_URL, ENQUIRIES_API } from "../../src/constants/api";
import styles from "../../styles/pages/admin.module.scss";

export default function Enquiries() {

	const [enquiries, setEnquiries] = useState([]);

	const router = useRouter();

	useEffect(async () => {

		const token = localStorage.getItem(TOKEN_KEY);

		if (!token) {
            router.push("/");
			return;
        };

		const url = BASE_API_URL + ENQUIRIES_API;
		
		const response = await axios.get(url, {
			headers: {
				Authorization: "Bearer " + token,
			},
		});

		console.log("response", response.data);

		setEnquiries(response.data);
	}, []);

	return (
				<Layout>
					<Head currentPage="Admin - Enquiries" />
					<div className={styles.wrapper}>
						<Heading title="Enquiries from customers." type="h1" />
						<p>There are {enquiries.length} enquiries.</p>
						<section className={styles.container}>
							{enquiries.map(el => <EnquiryCard key={el.id} api={el} /> )}
						</section>
					</div>
				</Layout>
	);
};