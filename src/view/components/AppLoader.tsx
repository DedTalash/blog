import React from 'react';
import {LinearProgress} from "@material-ui/core";

interface Props {
	loading: boolean,
	children: React.ReactNode
}

const AppLoader = ({loading, children}: Props) => {

	if (!loading) {
		return <>{children}</>;
	}

	return <div className="line">
		<LinearProgress color="secondary"/>
	</div>
};

export default AppLoader;