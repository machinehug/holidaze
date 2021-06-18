import axios from "axios";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FeedbackMessage from "../common/FeedbackMessage";
import { BASE_API_URL, MESSAGES_API } from "../../constants/api";
import {
    MIN_FIRSTNAME_LENGTH,
    MAX_FIRSTNAME_LENGTH,
    MIN_LASTNAME_LENGTH,
    MAX_LASTNAME_LENGTH,
    MIN_MESSAGE_LENGTH,
    MAX_MESSAGE_LENGTH,
    PHONE_REGEX
}
    from "../../constants/form";
import styles from "../../../styles/components/Form.module.scss";

const schema = yup.object().shape({
    first_name: yup.string().required("Please enter your first name.").min(MIN_FIRSTNAME_LENGTH, `Must be at least ${MIN_FIRSTNAME_LENGTH} characters.`).max(MAX_FIRSTNAME_LENGTH, `Cannot be more than ${MAX_FIRSTNAME_LENGTH} characters.`),
    last_name: yup.string().required("Please enter your last name.").min(MIN_LASTNAME_LENGTH, `Must be at least ${MIN_LASTNAME_LENGTH} characters.`).max(MAX_LASTNAME_LENGTH, `Cannot be more than ${MAX_LASTNAME_LENGTH} characters.`),
    email: yup.string().required("Please enter your email address.").email("Please enter a valid email address."),
    phone: yup.string().matches(PHONE_REGEX, "Phone number is not valid."),
    message: yup.string().required("Cannot be blank.").min(MIN_MESSAGE_LENGTH, `Must be at least ${MIN_MESSAGE_LENGTH} characters.`).max(MAX_MESSAGE_LENGTH, `Cannot be more than ${MAX_MESSAGE_LENGTH} characters.`)
});

export default function ContactForm() {

    const [submitting, setSubmitting] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    async function onSubmit(data) {

        setSubmitting(true);
        setSending(true);

        const url = BASE_API_URL + MESSAGES_API;

        try {
            const response = await axios.post(url, data);
            console.log("response", response);
        } catch (error) {
            setError(error.toString());
            console.log("An error occurred. Error message: " + error);
        };
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset disabled={sending}>

                    <div className={styles.name}>
                        <div>
                            <label htmlFor="firstname">First name</label>
                            <input type="text" name="first_name" placeholder="First name..." {...register("first_name")} />
                            {errors.first_name && <FeedbackMessage type="error" message={errors.first_name.message} />}
                        </div>
                        <div>
                            <label htmlFor="lastname">Last name</label>
                            <input type="text" name="last_name" placeholder="Last name..." {...register("last_name")} />
                            {errors.last_name && <FeedbackMessage type="error" message={errors.last_name.message} />}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="Email..." {...register("email")} />
                        {errors.email && <FeedbackMessage type="error" message={errors.email.message} />}
                    </div>

                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input type="number" name="phone" placeholder="Phone..." {...register("phone")} />
                        <small>Must be a Norwegian phone number (8 numbers), excluding country code. Example: 34567890</small>
                        {errors.phone && <FeedbackMessage type="error" message={errors.phone.message} />}
                    </div>

                    <div>
                        <label htmlFor="message">Message</label>
                        <textarea name="message" rows="4" cols="50" placeholder="Message..." {...register("message")} />
                        {errors.message && <FeedbackMessage type="error" message={errors.message.message} />}
                    </div>

                    <div className={styles.submit}>
                        <button type="submit">{submitting ? "MESSAGE SENT..." : "SEND MESSAGE"}</button>
                    </div>

                    {submitting && <FeedbackMessage type="success" message="Your message was sent. We'll email you within 24 business hours." />}

                </fieldset>
            </form>
        </>
    );
};