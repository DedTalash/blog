import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {Box} from "@material-ui/core";
import {connect} from "react-redux";
import {ModalType, showModal} from "../../../redux/actions";
import Social from "./Social";

const useStyles = makeStyles((theme) => ({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

interface Props {
	showModal(modal: ModalType): void
}

const SignIn = ({ showModal }: Props) => {
	const classes = useStyles();

	const clickHandler = (event: any, modal: ModalType) => {
		event.preventDefault();
		showModal(modal);
	}

	return (
		<Box py={2} px={4}>
			<div className={classes.paper}>
				<Typography component="h2" variant="h4">
					Sign in
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
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						autoComplete="current-password"
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Social />
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link component="button" onClick={(event: any) => clickHandler(event, ModalType.ForgotPassword)}>
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link component="button" onClick={(event: any) => clickHandler(event, ModalType.SignUP)}>
								Don't have an account? Sign Up
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Box>
	);
}

export default connect(
	null,
	{ showModal }
)(SignIn);