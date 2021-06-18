import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import Link from "next/link";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Head from "../src/components/layout/Head";
import Layout from "../src/components/layout/Layout";
import Heading from "../src/components/typography/Heading";
import FeedbackMessage from "../src/components/common/FeedbackMessage";
import { TOKEN_KEY, TOKEN_PATH } from "../src/constants/admin";
import styles from "../styles/pages/login.module.scss";

const schema = yup.object().shape({
    username: yup.string().required("Please enter your username."),
	password: yup.string().required("Please enter your password.")
});

export default function Login() {

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

	const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem(TOKEN_KEY));

        if (token) {
            router.push("/admin/home");
			return;
        };
    }, []);

    async function onSubmit(data) {

	    setSubmitting(true);

		const settings = { identifier: data.username, password: data.password };

        try {
			const response = await axios.post(TOKEN_PATH, settings);
			window.localStorage.setItem(TOKEN_KEY, response.data.jwt);
			window.location.href = "/admin/home";
		} catch (error) {
			setError(error.toString());
			console.log("An error occurred. Error message: " + error);
		} finally {
			setSubmitting(false);
		};
	};
    
    return (

		<Layout>
			<Head currentPage="Login" />
			<div className={styles.wrapper}>

				<section>
					<Heading title="Login" type="h1" />
					{error && <FeedbackMessage message="Incorrect username and/or password." />}
					<form onSubmit={handleSubmit(onSubmit)}>
						<fieldset>
							<div>
								<label htmlFor="firstname">Username</label>
								<input type="text" name="username" placeholder="Username..." {...register("username")} />
								{errors.username && <FeedbackMessage message={errors.username.message} />}
							</div>
							<div>
								<label htmlFor="password">Password</label>
								<input type="password" name="password" placeholder="Password..." {...register("password")} />
								{errors.password && <FeedbackMessage message={errors.password.message} />}
							</div>
							<button type="submit">{submitting ? "LOGGING IN..." : "LOGIN"}</button>
						</fieldset>
					</form>
				</section>

				<section>
					<Heading title="Having trouble signing in?" type="h1" />
					<p>You can reset your password and/or find your username <span className={styles.link}><a className={styles.link}>here</a></span>.</p>
					<p>If you're still having issues signing in, feel free to contact us <Link href="/contact"><a className={styles.link}>here</a></Link>.</p>
				</section>

			</div>
		</Layout>
    );
};