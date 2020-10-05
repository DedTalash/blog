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
import {connect} from "react-redux";
import {BlogReducers} from "../redux/store";
import {User} from "firebase";
import {setUser} from "../redux/actions";
import {firebase} from "../config/firebase";

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

type Props = {
	user: User|null,
	setUser(user: User|null): void,
	title: string
}

const TopBar = (props: Props) => {
	const classes = useStyles();

	const handleSignIn = async () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		const result = await firebase.auth().signInWithPopup(provider);
		props.setUser(result.user);
	}

	const handleSignOut = () => {
		firebase.auth().signOut();
	}

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
							{props.title}
						</Typography>
						{props.user ?
							<Button onClick={handleSignOut} color="inherit">Logout</Button> :
							<Button onClick={handleSignIn} color="inherit">Login</Button>
						}
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

export default connect(
	({ user }: BlogReducers) => ({ user }),
	{setUser}
)(TopBar);