import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "../../src/components/layout/Head";
import Layout from "../../src/components/layout/Layout";
import AddNewForm from "../../src/components/admin/AddNewForm";
import { TOKEN_KEY } from "../../src/constants/admin";
import styles from "../../styles/pages/admin.module.scss";

export default function New() {

	const router = useRouter();

	useEffect(async () => {

		const token = localStorage.getItem(TOKEN_KEY);

		if (!token) {
            router.push("/");
			return;
        };
	}, []);

    return (
		<Layout>
			<Head currentPage="Admin - Add new accommodation" />
			<div className={styles.wrapper}>
				<section className={styles.container}>
					<AddNewForm />
				</section>
			</div>
		</Layout>
    );
};
