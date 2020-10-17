import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {Box} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	submit: {
		margin: theme.spacing(2, 0, 2),
	},
}));

export default function ForgotPassword()
{
	const classes = useStyles();

	return (
		<Box py={2} px={4}>
			<div className={classes.paper}>
				<Typography component="h2" variant="h4">
					Restore password
				</Typography>
				<form noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Send confirmation email
					</Button>
				</form>
			</div>
		</Box>
	);
}