import React from 'react';
import Main from "./view/pages/Main";
import TopBar from "./view/TopBar";
import {Router} from "@reach/router";
import About from "./view/pages/About";
import {Container} from "@material-ui/core";
import Post from "./view/pages/Post";
import "./app.css";
import {useTitle} from "./utils/useTitle";
import config from "./config/config";
import Management from "./view/pages/Management";
import Edit from "./view/pages/Edit";

export default function App()
{
	useTitle(config.companyName);
	return <>
		<TopBar />
		<Container className="main-container">
			<Container maxWidth="md" >
				<Router>
					<Main path="/" />
					<About path="/about" />
					<Post path="/blog/:postId" />
					<Edit path="/management/create" />
					<Management path="/management"/>
				</Router>
			</Container>
		</Container>
	</>;
}