import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "../../src/components/layout/Head";
import Layout from "../../src/components/layout/Layout";
import Heading from "../../src/components/typography/Heading";
import AccommodationCard from "../../src/components/admin/AccommodationCard";
import { TOKEN_KEY } from "../../src/constants/admin";
import { BASE_API_URL, ACCOMMODATIONS_API } from "../../src/constants/api";
import styles from "../../styles/pages/admin.module.scss";

export default function Edit() {

	const [results, setResults] = useState([]);

	const router = useRouter();

	useEffect(async () => {

		const token = localStorage.getItem(TOKEN_KEY);

		if (!token) {
            router.push("/");
			return;
        };

		const url = BASE_API_URL + ACCOMMODATIONS_API;
		
		const response = await axios.get(url);

		console.log("response", response.data);

		setResults(response.data);
	}, []);

  	return (
    	<Layout>
			<Head currentPage="Admin - Edit accommodations" />
			<section className={styles.wrapper}>
				<Heading title="Edit accommodations." type="h1" />
				<p>There are {results.length} accommodations so far.</p>
				<section className={styles.container}>
					{results.map(el => <AccommodationCard key={el.id} api={el} />)}
				</section>
			</section>
		</Layout>
	);
};

export async function getStaticProps() {

	let accommodations = [];

    const url = BASE_API_URL + ACCOMMODATIONS_API;

	try {
		const token = localStorage.getItem(TOKEN_KEY);

		const response = await axios.get(url, {
			headers: {
				Authorization: "Bearer " + token,
			},
		});

		accommodations = response.data;
		console.log("response", response)
	} catch (error) {
		console.log("An error occurred. Error message: " + error);
	};

	return {
		props: {
			accommodations: accommodations
		}
	};
};