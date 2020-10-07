import React from 'react';
import Main from "./view/pages/Main";
import TopBar from "./view/TopBar";
import {Router} from "@reach/router";
import About from "./view/pages/About";
import {Container} from "@material-ui/core";
import Post from "./view/pages/Post";
import {Wrong} from "./view/pages/Wrong"

export default function App()
{
	return <>
		<TopBar />
		<Container maxWidth="md">
			<Router>
				<Main path="/" />
				<About path="/about" />
				<Post path="/blog/:postId" />
				<Wrong path="/404"/>
			</Router>
		</Container>
	</>;
}