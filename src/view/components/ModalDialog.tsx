import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import {TransitionProps} from "@material-ui/core/transitions";
import {Slide} from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {BlogReducers} from "../../redux/reducers";
import {ModalState} from "../../redux/reducers/modalReducer";
import {closeModal} from "../../redux/actions";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement<any, any> },
	ref: React.Ref<unknown>,
) {
	return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(() =>
	createStyles({
		container: {
			alignItems: 'flex-start'
		}
	})
);

interface Props {
	type: ModalState,
	modal: ModalState,
	closeModal(): void
	children: React.ReactNode
}

const ModalDialog = (props: Props) => {
	const classes = useStyles();

	return (
		<Dialog
			onClose={props.closeModal}
			open={props.modal === props.type}
			classes={classes}
			TransitionComponent={Transition}
			keepMounted
		>
			{ props.children }
		</Dialog>
	);
};

export default connect(
	({modal}: BlogReducers) => ({ modal }),
	{ closeModal }
)(ModalDialog);