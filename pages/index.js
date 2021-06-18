import { useState } from "react";
import { useRouter } from 'next/router'
import axios from "axios";
import Head from "../src/components/layout/Head";
import Layout from "../src/components/layout/Layout";
import Heading from "../src/components/typography/Heading";
import FeedbackMessage from "../src/components/common/FeedbackMessage";
import { BASE_API_URL, ACCOMMODATIONS_API } from "../src/constants/api";
import styles from "../styles/pages/index.module.scss";

export default function Home(props) {

	const [disabled, setDisabled] = useState(true);
	const [searchValue, setSearchValue] = useState("");
	const [currentSearch, setCurrentSearch] = useState("");

	const router = useRouter();

	const searchResults = props.api.filter(e => e.name.toLowerCase().includes(searchValue.toLowerCase()));

	function showDropdown(e) {
		setSearchValue(e.target.value);
		setCurrentSearch(e.target.value);
	};

	function addValueToInput(e) {
		setCurrentSearch(e.target.textContent);
		setSearchValue("");
		setDisabled(false);
	};

	function redirect() {
		
		const id = props.api.filter((e) => {
			if (e.name.toLowerCase().includes(currentSearch.toLowerCase())) {
				return e.id;
			} else {
				return false;
			};
		});

		if (id) {
			const url = "/accommodation/" + JSON.parse(id[0].id);
			router.push(url);
		} else {
			setDisabled(true);
		};
	};

	return (
			<Layout>
				<Head />
				<section className={styles.wrapper}>
					<Heading title="Experience Bergen." type="h1" />
					<Heading title="Find the hotels, B&Bs and guesthouses." type="h2" />
					<div className={styles.search}>

						{props.error && <FeedbackMessage message="An error occurred while loading the page. Please refresh the page or try again later." />}

						{!props.error &&
						<>
								<div className={styles.inner}>
									<input
										value={currentSearch}
										placeholder="Search by name..."
										aria-label="Search hotels, B and B, and guesthouses by name."
										onChange={e => showDropdown(e)} />

									{searchValue.length > 0 &&
									<div className={styles.dropdown}>
										<ul>
											{searchResults.map(e => <li key={e.id} onClick={e => addValueToInput(e)}>{e.name}</li>)}
											{searchResults.length < 1 ? <li>No results. Please try again.</li> : ""}
										</ul>
									</div>}
								</div>
								<button disabled={disabled} onClick={redirect}>SEARCH</button>
						</>}

					</div>							
				</section>
			</Layout>
	);
};

export async function getStaticProps() {

	let api = [];
	let errorMessage = null;
	
	const url = BASE_API_URL + ACCOMMODATIONS_API;
	
	try {
		const response = await axios.get(url);
		api = response.data;
	} catch (error) {
		errorMessage = error.toString();
		console.log("An error occurred. Error message: " + error);
	};
	
	return {
		props: {
			error: errorMessage,
			api: api
		}
	};
};