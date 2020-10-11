import React from "react";
import {RouteComponentProps} from "@reach/router";
import {connect} from "react-redux";
import {useTitle} from "../../utils/useTitle";

interface Props {

}

const About = (props: Props & RouteComponentProps) => {

	useTitle('About');

	return (
		<>
			About
		</>
	)
}

export default connect(
	null
)(About);