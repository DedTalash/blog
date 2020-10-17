import React from 'react';
import {Box, IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {navigate} from "@reach/router";
import {firebase} from "../../../config/firebase";

const useStyles = makeStyles(() => ({
	google: {
		width: 50,
		height: 50,
		backgroundImage: 'url(./images/google.png)',
		backgroundSize: 24,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat'
	},
	gameCenter: {
		width: 50,
		height: 50,
		backgroundImage: 'url(./images/game-center.png)',
		backgroundSize: 24,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat'
	}
}));

const Social = () => {

	const classes = useStyles();

	const handleClick = async () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		await firebase.auth().signInWithPopup(provider)
		navigate('/');
	}

	return <Box textAlign="center">
		<IconButton title="Google" className={classes.google} onClick={handleClick} />
		<IconButton title="Game Center" className={classes.gameCenter} onClick={handleClick} />
	</Box>;
};

export default Social;