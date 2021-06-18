import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "../../src/components/layout/Head";
import Layout from "../../src/components/layout/Layout";
import Heading from "../../src/components/typography/Heading";
import { TOKEN_KEY } from "../../src/constants/admin";
import styles from "../../styles/pages/admin.module.scss";

export default function AdminHome() {

	const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_KEY);

        if (!token) {
            router.push("/");
        };
    }, []);

	return (
			<Layout>
				<Head currentPage="Admin - Home" />
				<section className={styles.wrapper}>
					<Heading title="You're logged in as an admin." type="h1" />
					<p>
						You can reply to customer messages and delete/edit customer enquiries.
						You can also add new accommodations and edit/delete those that already exist.
					</p>
					<Heading title="To get started..." type="h2" />
					<p>
						Navigate using the admin navigation in the header.
					</p>
				</section>
			</Layout>
	);
};