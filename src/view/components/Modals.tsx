import React from 'react';
import SignIn from "./modals/SignIn";
import {ModalType} from "../../redux/actions";
import SignUp from "./modals/SignUp";
import ModalDialog from "./ModalDialog";
import ForgotPassword from "./modals/ForgotPassword";

export const Modals = () => {

	return <>
		{/*Sign In Modal*/}
		<ModalDialog type={ModalType.SignIN} >
			<SignIn />
		</ModalDialog>

		{/*Sign Up Modal*/}
		<ModalDialog type={ModalType.SignUP} >
			<SignUp />
		</ModalDialog>

		{/*Forgot Password Modal*/}
		<ModalDialog type={ModalType.ForgotPassword} >
			<ForgotPassword />
		</ModalDialog>
	</>;
};