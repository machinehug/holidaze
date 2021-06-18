import PropTypes from "prop-types";

export default function Heading({title, type}) {

    const HtmlTag = type;

    return <HtmlTag>{title}</HtmlTag>;
};

Heading.propTypes = {
    title: PropTypes.string,
    type: PropTypes.node.isRequired,
};

Heading.defaultProps = {
	title: "",
};