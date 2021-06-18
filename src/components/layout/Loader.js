import styles from "../../../styles/components/Loader.module.scss";

export default function Loader() {
	return (
		<div className={styles.wrapper}>
            <div className={styles.loader}></div>
            <div className={styles.txt}>Finding accommodations...</div>
        </div>
	);
};