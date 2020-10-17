import React, {useEffect} from 'react';
import Main from "./view/pages/Main";
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
import Users from "./view/pages/Users";
import authService from "./services/AuthService";
import useUser from "./utils/useUser";
import {Footer} from "./view/components/Footer";
import TopBar from "./view/components/TopBar";
import {Modals} from "./view/components/Modals";

export default function App()
{
	useTitle(config.companyName);
	useEffect(authService.subscribe, [])

	const user = useUser();

	return <>
		<TopBar />
		<Container className="main-container">
			<Container maxWidth="md" >
				<Router>
					<Main path="/" />
					<About path="/about" />
					<Post path="/blog/:postAlias" />
					{user.can('management') && <>
						<CreatePost path="/management/create" />
						<EditPost path="/management/edit/:postId" />
						<Management path="/management"/>
					</>}
					{user.can('users') && <Users path="/users"/>}
				</Router>
			</Container>
		</Container>
		<Modals />
		<Footer />
	</>;
}