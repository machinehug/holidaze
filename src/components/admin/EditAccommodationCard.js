import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Heading from "../typography/Heading";
import FeedbackMessage from "../../components/common/FeedbackMessage";
import { CURRENCY } from "../../constants/other";
import { TOKEN_KEY } from "../../constants/admin";
import { BASE_API_URL, ACCOMMODATIONS_API } from "../../constants/api";
import {
    MIN_ACCOMMODATIONNAME_LENGTH,
    MAX_ACCOMMODATIONNAME_LENGTH,
    MIN_ADDRESS_LENGTH,
    MAX_ADDRESS_LENGTH,
    MIN_DIRECTIONS_LENGTH,
    MAX_DIRECTIONS_LENGTH,
    MIN_ABOUT_LENGTH,
    MAX_ABOUT_LENGTH,
    MIN_AMENITY_LENGTH,
    MAX_AMENITY_LENGTH } 
from "../../constants/form";
import styles from "../../../styles/pages/edit.module.scss";

const schema = yup.object().shape({
    name: yup.string().required("Please enter a name.").min(MIN_ACCOMMODATIONNAME_LENGTH, `Must be at least ${MIN_ACCOMMODATIONNAME_LENGTH} characters.`).max(MAX_ACCOMMODATIONNAME_LENGTH, `Cannot be more than ${MAX_ACCOMMODATIONNAME_LENGTH} characters.`),
	address: yup.string().required("Please enter an address.").min(MIN_ADDRESS_LENGTH, `Must be at least ${MIN_ADDRESS_LENGTH} characters.`).max(MAX_ADDRESS_LENGTH, `Cannot be more than ${MAX_ADDRESS_LENGTH} characters.`),
    price: yup.number().required("Cannot be blank.").typeError("Cannot be blank."),
    image: yup.string().required("Cannot be blank.").url("Must be a valid URL that ends with .jpg, .jpeg or .png.").test("imageFormat", "Must be a valid URL that ends with .jpg, .jpeg or .png.", (value) => {
        
        if (!value) return false;
        
        if (value.endsWith(".jpg") || value.endsWith(".jpeg") || value.endsWith(".png")) {
            return true;
        } else {
            return false;
        };
    }),
    directions: yup.string().required("Please add directions to the facilities.").min(MIN_DIRECTIONS_LENGTH, `Must be at least ${MIN_DIRECTIONS_LENGTH} characters.`).max(MAX_DIRECTIONS_LENGTH, `Cannot be more than ${MAX_DIRECTIONS_LENGTH} characters.`),
    about: yup.string().required("Please add a description and information.").min(MIN_ABOUT_LENGTH, `Must be at least ${MIN_ABOUT_LENGTH} characters.`).max(MAX_ABOUT_LENGTH, `Cannot be more than ${MAX_ABOUT_LENGTH} characters.`),
    amenity_one: yup.string().required("Please add at least one amenity.").min(MIN_AMENITY_LENGTH, `Must be at least ${MIN_AMENITY_LENGTH} characters.`).max(MAX_AMENITY_LENGTH, `Cannot be more than ${MAX_AMENITY_LENGTH} characters.`),
    amenity_two: yup.string().max(MAX_AMENITY_LENGTH, `Cannot be more than ${MAX_AMENITY_LENGTH} characters.`),
    amenity_three: yup.string().max(MAX_AMENITY_LENGTH, `Cannot be more than ${MAX_AMENITY_LENGTH} characters.`),
    amenity_four: yup.string().max(MAX_AMENITY_LENGTH, `Cannot be more than ${MAX_AMENITY_LENGTH} characters.`),
});

export default function EditAccommodationCard({accommodation}) {

    const { name, image, price, address, id, directions, about, amenity_one, amenity_two, amenity_three, amenity_four } = accommodation;

    if (!accommodation.image) {
        image = "/img/photomissing.jpg";
    };

    const [submitting, setSubmitting] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);

    const router = useRouter();
    
    useEffect(() => {

        const token = localStorage.getItem(TOKEN_KEY);

        setToken(token);

        if (!token) {
            router.push("/");
            return;
        };
    }, []);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    async function onSubmit(data) {

        setSending(true);

        const url = BASE_API_URL + ACCOMMODATIONS_API + id;

        try {
			const response = await axios.put(url, data, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            console.log("response", response);
		} catch (error) {
			setError(error.toString());
            console.log("An error occurred. Error message: " + error);
		} finally {
			setSubmitting(true);
		};
	};

    return (
            <>
                    <section>
                        <Image src={image} objectFit="cover" width={900} height={1000} alt={name} />
                    </section>

                    <section className={styles.info}>
                        <Heading title="Edit" type="h1" />
                        <Heading title={name} type="h2" />

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset disabled={sending}>

                            <div>
                                <label htmlFor="name">Name</label>
                                <input defaultValue={name} type="text" name="name" placeholder="Name..." {...register("name")} />
                                {errors.name && <FeedbackMessage message={errors.name.message} />}
                            </div>

                            <div>
                                <label htmlFor="address">Address</label>
                                <input defaultValue={address} type="text" name="address" placeholder="Address..." {...register("address")} />
                                {errors.address && <FeedbackMessage message={errors.address.message} />}
                            </div>

                            <div>
                                <label htmlFor="directions">Directions to the facilities</label>
                                <textarea defaultValue={directions} name="directions" rows="4" cols="50" placeholder="Directions..." {...register("directions")} />
                                <small>Must be between {MIN_DIRECTIONS_LENGTH} to {MAX_DIRECTIONS_LENGTH} characters.</small>
                                {errors.directions && <FeedbackMessage message={errors.directions.message} />}
                            </div>

                            <div>
                                <label htmlFor="price">Price ({CURRENCY}) per day</label>
                                <input defaultValue={price} type="number" name="price" placeholder="Price..." {...register("price")} />
                                {errors.price && <FeedbackMessage message={errors.price.message} />}
                            </div>

                            <div>
                                <label>Amenities</label> <br />
                                <small>Add at least one amenity (the one at the top below). Must be between {MIN_AMENITY_LENGTH} to {MAX_AMENITY_LENGTH} characters.</small>
                                <div>
                                    <input defaultValue={amenity_one} type="text" name="amenity_one" placeholder="Amenity..." {...register("amenity_one")} />
                                    {errors.amenity_one && <FeedbackMessage message={errors.amenity_one.message} />}
                                </div>
                                <div>
                                    <input defaultValue={amenity_two} type="text" name="amenity_two" placeholder="Amenity..." {...register("amenity_two")} />
                                    {errors.amenity_two && <FeedbackMessage message={errors.amenity_two.message} />}
                                </div>
                                <div>
                                    <input defaultValue={amenity_three} type="text" name="amenity_three" placeholder="Amenity..." {...register("amenity_three")} />
                                    {errors.amenity_three && <FeedbackMessage message={errors.amenity_three.message} />}
                                </div>
                                <div>
                                    <input defaultValue={amenity_four} type="text" name="amenity_four" placeholder="Amenity..." {...register("amenity_four")} />
                                    {errors.amenity_four && <FeedbackMessage message={errors.amenity_four.message} />}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="about">About the facilities</label>
                                <textarea defaultValue={about} name="about" rows="4" cols="50" placeholder="About..." {...register("about")} />
                                <small>Must be between {MIN_ABOUT_LENGTH} to {MAX_ABOUT_LENGTH} characters.</small>
                                {errors.about && <FeedbackMessage message={errors.about.message} />}
                            </div>

                            <div>
                                <label htmlFor="image">Change cover image</label>
                                <input defaultValue={image} type="text" placeholder="Image url..." name="image" {...register("image")} />
                                <small>Must be a valid image url ending with jpg, jpeg or png. <br /> We support Pexels, Unsplashed and Pixabay only.</small> <br />
                                <small>Example image url: https://example.com/photo.jpg</small>
                                {errors.image && <FeedbackMessage message={errors.image.message} />}
                            </div>

                            <div  className={styles.submit}>
                                <button type="submit">{submitting ? "ADDED" : "SUBMIT"}</button>
                            </div>

                            {error && <FeedbackMessage message="An error occurred. Please refresh the page and try again. Contact us if you still have issues." />}

                            {submitting && !error ? <FeedbackMessage message="The accommodation was updated successfully." /> : ""}

                            </fieldset>
                        </form>
                    </section>
            </>
    );
};