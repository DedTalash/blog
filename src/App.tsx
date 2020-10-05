import React from 'react';
import {Main} from "./view/pages/Main";
import TopBar from "./view/TopBar";
import {Link, Router} from "@reach/router";
import {About} from "./view/pages/About";
import {Container} from "@material-ui/core";

export default function App()
{
	return <>
		<TopBar title="Blog"/>
		<Container maxWidth="md">
			<Link to="/"> Blog </Link>
			<Link to="/about"> About </Link>
			<Router>
				<Main path="/" />
				<About path="/about" />
			</Router>
		</Container>
	</>;
}
