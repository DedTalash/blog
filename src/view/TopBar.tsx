import CssBaseline from "@material-ui/core/CssBaseline";
import {AppBar, Button, Fab, IconButton, Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export const TopBar = () => {
	const classes = useStyles();

	return (
		<>
			<CssBaseline />
			<AppBar position="sticky">
				<Container maxWidth="md">
					<Toolbar>
						<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
							<MenuIcon/>
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Blog
						</Typography>
						<Button  color="inherit">Login</Button>
					</Toolbar>
				</Container>
			</AppBar>
			<ScrollTop>
				<Fab color="primary" size="small">
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
		</>
	);
}

function ScrollTop(props: {children: React.ReactElement})
{
	const classes = useStyles();
	const trigger = useScrollTrigger();

	const handleClick = () => {
		document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	return (
		<Zoom in={trigger}>
			<div onClick={handleClick} className={classes.root}>
				{props.children}
			</div>
		</Zoom>
	);
}