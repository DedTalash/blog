import React from "react";
import {RouteComponentProps} from "@reach/router";
import {connect} from "react-redux";
import {setTitle} from "../../redux/actions";

interface Props {
	setTitle(title: string): void
}

const About = (props: Props & RouteComponentProps) => {

	props.setTitle('About');

	return (
		<>
			About
		</>
	)
}

export default connect(
	null,
	{ setTitle }
)(About);