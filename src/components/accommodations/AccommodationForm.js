import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Heading from "../typography/Heading";
import FeedbackMessage from "../common/FeedbackMessage";
import { PHONE_REGEX } from "../../constants/form";
import { CURRENCY } from "../../constants/other";
import { BASE_API_URL, ENQUIRIES_API } from "../../constants/api";
import {
    MIN_FIRSTNAME_LENGTH,
    MAX_FIRSTNAME_LENGTH,
    MIN_LASTNAME_LENGTH,
    MAX_LASTNAME_LENGTH } 
from "../../constants/form";
import styles from "../../../styles/pages/enquiry.module.scss";
import formStyles from "../../../styles/components/Form.module.scss";

const schema = yup.object().shape({
    first_name: yup.string().required("Please enter your first name.").min(MIN_FIRSTNAME_LENGTH, `Must be at least ${MIN_FIRSTNAME_LENGTH} characters.`).max(MAX_FIRSTNAME_LENGTH, `Cannot be more than ${MAX_FIRSTNAME_LENGTH} characters.`),
	last_name: yup.string().required("Please enter your last name.").min(MIN_LASTNAME_LENGTH, `Must be at least ${MIN_LASTNAME_LENGTH} characters.`).max(MAX_LASTNAME_LENGTH, `Cannot be more than ${MAX_LASTNAME_LENGTH} characters.`),
    email: yup.string().required("Please enter your email address.").email("Please enter a valid email address."),
	phone: yup.string().matches(PHONE_REGEX, "Phone number is not valid."),
    pets: yup.number().required(),
	children: yup.number().required(),
	rooms: yup.number().required(),
	adults: yup.number().required(),

});

export default function AccommodationForm({api}) {

    const { price } = api;

    const currentDate = new Date().toISOString().substr(0, 10);
    
    const [submitting, setSubmitting] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState(null);
    const [bookingId, setBookingId] = useState("");

    // code from https://gist.github.com/gordonbrander/2230317
    const createBookingId = () => {
        return Math.random().toString(36).substr(2, 9);
    };
     
    useEffect(() => {
        setBookingId(createBookingId());
    },[]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });

    async function onSubmit(data) {

        setSubmitting(true);
        setSending(true);
        
        data["accommodation"] = api.name;
        data["booking_id"] = bookingId;

        const url = BASE_API_URL + ENQUIRIES_API;

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
            <Heading title="Booking" type="h1" />
            <br />
            <Heading title="Your contact info" type="h2" />

            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset disabled={sending}>

                    <div className={formStyles.name}>
                        <div>
                            <label htmlFor="firstname">First name</label>
                            <input type="text" name="first_name" placeholder="First name..." {...register("first_name")} />
                            {errors.first_name && <FeedbackMessage message={errors.first_name.message} />}
                        </div>
                        <div>
                            <label htmlFor="lastname">Last name</label>
                            <input type="text" name="last_name" placeholder="Last name..." {...register("last_name")} />
                            {errors.last_name && <FeedbackMessage message={errors.last_name.message} />}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="Email..." {...register("email")} />
                        {errors.email && <FeedbackMessage message={errors.email.message} />}
                    </div>

                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input type="number" name="phone" placeholder="Phone..." {...register("phone")} />
                        {errors.phone && <FeedbackMessage message={errors.phone.message} />}
                    </div>

                    <div className={formStyles.date}>
                        <div>
                            <label htmlFor="checkin">Check in:</label>
                            <input type="date" defaultValue={currentDate} name="check_in" {...register("check_in")} />
                           <p>Check in and out is always at 12:00.</p>
                        </div>
                        <div>
                            <label htmlFor="checkout">Check out:</label>
                            <input type="date" defaultValue={currentDate} name="check_out" {...register("check_out")} />
                        </div>
                    </div>

                    <div className={formStyles.details}>
                        <div>
                            <label htmlFor="rooms">Rooms</label>
                            <select name="rooms" {...register("rooms")}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="adults">Adults</label>
                            <select name="adults" {...register("adults")}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="pets">Pets</label>
                            <select name="pets" {...register("pets")}>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="children">Children</label>
                            <select name="children" {...register("children")}>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.submit}>
                        <div>
                            <span className={styles.txt}>{price} {CURRENCY}</span> per day <br />
							including taxes and fees
						</div>
                        <button type="submit">{submitting ? "ORDER PLACED" : "PLACE OFFER"}</button>
                    </div>

                    {submitting && <FeedbackMessage message={`Your booking was placed. We've emailed you details about the booking. Your booking id is ${bookingId}.`} />}

                </fieldset>
            </form>
        </>
    );
};