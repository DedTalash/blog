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
import CreatePost from "./view/pages/CreatePost";
import EditPost from "./view/pages/EditPost";

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
					<CreatePost path="/management/create" />
					<EditPost path="/management/edit/:postId" />
					<Management path="/management"/>
				</Router>
			</Container>
		</Container>
	</>;
}