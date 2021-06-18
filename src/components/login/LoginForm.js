import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FeedbackMessage from "../common/FeedbackMessage";
import { setLocalStorage } from "../../hooks/useLocalStorage";
import { TOKEN_PATH, TOKEN_KEY } from "../../constants/admin";

const schema = yup.object().shape({
	username: yup.string().required("Please enter your username."),
	password: yup.string().required("Please enter your password."),
});

export default function LoginForm() {

	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState(null);

	const { register, handleSubmit } = useForm({
		resolver: yupResolver(schema),
	});

	async function onSubmit(data) {

		setSubmitting(true);
		setError(null);

		const settings = { identifier: data.username, password: data.password };

		try {
			const response = await axios.post(TOKEN_PATH, settings);
			setLocalStorage(TOKEN_KEY, JSON.stringify(response.data.jwt));
			window.location.href = "/admin";
		} catch (error) {
			setError(error.toString());
			console.log("An error occurred. Error message: " + error);
		} finally {
			setSubmitting(false);
		};
	};

	return (
				<section>
					<form onSubmit={handleSubmit(onSubmit)}>
						{error && <FeedbackMessage type="error" errorMessage={error} />}
						<div>
							<label htmlFor="username">Username</label>
							<input type="text" name="username" placeholder="Your username..." ref={register} />
						</div>
						<div>
							<label htmlFor="password">Password</label>
							<input type="password" name="password" placeholder="Your password..." ref={register} />
						</div>
						<div>
							<button type="submit">{submitting ? "LOGGING IN..." : "LOGIN"}</button>
						</div>
					</form>
				</section>
	);
};