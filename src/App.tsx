import React from 'react';
import {Main} from "./view/pages/Main";
import TopBar from "./view/TopBar";
import {Router} from "@reach/router";
import {About} from "./view/pages/About";
import {Container} from "@material-ui/core";

interface Props {
	title: string
}
export default function App(props:Props)
{
	return <>
		<TopBar title={props.title}/>
		<Container maxWidth="md">
			<Router>
				<Main path="/" />
				<About path="/about" />
			</Router>
		</Container>
	</>;
}
