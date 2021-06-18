import NextHead from "next/head";
import PropTypes from "prop-types";

export default function Head({currentPage}) {
	return (
		<NextHead>
    		<meta name="viewport" content="width=device-width, initial-scale=1" />
			<title>Holidaze{currentPage ? ":" : ""} {currentPage}</title>
			<meta name="description" content="Holidaze is a place where you can find hotels, B&Bs and guesthouses." />
			<meta name="theme-color" content="#fff" />

			<link rel="icon" href="/favicon/favicon.ico" />
			<link rel="icon" href="/favicon/icon.png" type="image/png" />
			<link rel="icon" type="image/png" href="/favicon/favicon-196x196.png" sizes="196x196" />
			<link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
			<link rel="icon" type="image/png" href="/favicon/favicon-32x32.png" sizes="32x32" />
			<link rel="icon" type="image/png" href="/favicon/favicon-16x16.png" sizes="16x16" />
			<link rel="icon" type="image/png" href="/favicon/favicon-128.png" sizes="128x128" />
			<link rel="apple-touch-icon-precomposed" href="/favicon/apple-touch-icon.png" />
			<link rel="apple-touch-icon-precomposed" sizes="57x57" href="/favicon/apple-touch-icon-57x57.png" />
			<link rel="apple-touch-icon-precomposed" sizes="114x114" href="/favicon/apple-touch-icon-114x114.png" />
			<link rel="apple-touch-icon-precomposed" sizes="72x72" href="/favicon/apple-touch-icon-72x72.png" />
			<link rel="apple-touch-icon-precomposed" sizes="144x144" href="/favicon/apple-touch-icon-144x144.png" />
			<link rel="apple-touch-icon-precomposed" sizes="60x60" href="/favicon/apple-touch-icon-60x60.png" />
			<link rel="apple-touch-icon-precomposed" sizes="120x120" href="/favicon/apple-touch-icon-120x120.png" />
			<link rel="apple-touch-icon-precomposed" sizes="76x76" href="/favicon/apple-touch-icon-76x76.png" />
			<link rel="apple-touch-icon-precomposed" sizes="152x152" href="/favicon/apple-touch-icon-152x152.png" />

			<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" rel="stylesheet" />
		</NextHead>
	);
};

Head.propTypes = {
    currentPage: PropTypes.string,
};