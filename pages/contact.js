import Head from "../src/components/layout/Head";
import Layout from "../src/components/layout/Layout";
import Heading from "../src/components/typography/Heading";
import ContactForm from "../src/components/contact/ContactForm";
import styles from "../styles/pages/contact.module.scss";

export default function Contact() {
    return (
    <Layout>
		<Head currentPage="Contact us" />
        <div className={styles.wrapper}>

            <section>
                <Heading title="Do you have any questions?" type="h1" />
                <Heading title="Send us a message." type="h2" />
                <ContactForm />
            </section>

            <section>
                <Heading title="Our contact info" type="h1" />
                <p><i className="fas fa-map-marker-alt"></i> Fake Address, 1234 Bergen</p>
                <p><i className="fas fa-phone-volume"></i> 12345678</p>
                <p><i className="fas fa-at"></i> fake@email.com</p>
            </section>
                
        </div>
    </Layout>
    );
};