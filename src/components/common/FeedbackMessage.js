import PropTypes from "prop-types";

export default function FeedbackMessage({ message, type }) {
	return <div className={type}>{message}</div>;
};

FeedbackMessage.propTypes = {
	message: PropTypes.string.isRequired,
	type: PropTypes.string,
};

FeedbackMessage.defaultProps = {
	type: "",
};