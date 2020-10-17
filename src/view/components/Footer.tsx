import React from 'react';
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import {Facebook, Instagram, Twitter} from "@material-ui/icons";
import {Link} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	footer: {
		borderTop: `1px solid ${theme.palette.divider}`,
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		textAlign: "center",
	},
	icon: {
		fontSize: '3em',
		margin: theme.spacing(3),
		color: theme.palette.primary.main,
		'&:hover': {
			color: theme.palette.primary.dark
		}
	}
}));

const icons = [
	{
		component: Facebook,
		url: 'https://www.facebook.com/',
	}, {
		component: Twitter,
		url: 'https://twitter.com/',
	}, {
		component: Instagram,
		url: 'https://www.instagram.com/',
	}
];

export const Footer = () => {

	const classes = useStyles();

	return (
		<Container component="footer" className={classes.footer}>
			{icons.map((icon, index) =>
				<Link key={index} href={icon.url} target="_blank">
					{React.createElement(icon.component, {
						className: classes.icon
					})}
				</Link>
			)}
		</Container>
	);
};