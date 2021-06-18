import { useState, useEffect } from "react";
import axios from "axios";
import Head from "../src/components/layout/Head";
import Layout from "../src/components/layout/Layout";
import Loader from "../src/components/layout/Loader";
import Heading from "../src/components/typography/Heading";
import FeedbackMessage from "../src/components/common/FeedbackMessage";
import SearchResults from "../src/components/accommodations/SearchResults";
import { BASE_API_URL, ACCOMMODATIONS_API } from "../src/constants/api";
import styles from "../styles/pages/results.module.scss";

export default function Results() {

	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [results, setResults] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	useEffect(async () => {

		const url = BASE_API_URL + ACCOMMODATIONS_API;

		try {
			const response = await axios.get(url);
			console.log("response", response);
			setResults(response.data);
		} catch (error) {
			setError(error.toString());
			console.log("An error occurred. Error message: " + error);
		} finally {
			setLoading(false);
		};
	}, []);

	const searchResults = results.filter(e => e.name.toLowerCase().includes(searchValue.toLowerCase()));

	return (
			<Layout>
				<Head currentPage="Results" />
				<section className={styles.wrapper}>
					<Heading title="Search hotels, B&Bs and guesthouses in Bergen." type="h1" />

					{loading && <Loader />}

					{error && <FeedbackMessage message="An error occurred while loading the page. Please refresh the page or try again later." />}

					{!error && !loading ?
					<div className={styles.search}>
            			<input placeholder="Search by name..." aria-label="Search hotels, B and B, and guesthouses." onChange={(e) => {
                			setSearchValue(e.target.value)
        				}} />
						{searchResults.length > 0
						? searchResults.map(e => <SearchResults key={e.id} e={e} />)
						: <FeedbackMessage message="No results. Please try again." />}
        			</div> : ""}

				</section>
			</Layout>
	);
};