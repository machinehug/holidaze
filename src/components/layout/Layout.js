import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../../../styles/pages/index.module.scss";

export default function Layout({children}) {

	const [url, setUrl] = useState(null);

	useEffect(() => {
		(() => {
			const pathname = location.pathname;
			setUrl(pathname);
		})();
	}, []);

	return (
		<>
			<Header />
			<div className={`wrapper ${url !== "/" ? "" : styles.bg}`}>
				<div className="container">
					{children}
				</div>
			</div>
			<Footer />
		</>
	);
};