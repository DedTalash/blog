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
import Users, {UserRole} from "./view/pages/Users";
import {connect} from "react-redux";

 function App({userRole}: UserRole)
{
	useTitle(config.companyName);

	return <>
		<TopBar />
		<Container className="main-container">
			<Container maxWidth="md" >
				<Router>
					<Main path="/" />
					<About path="/about" />
					<Post path="/blog/:postAlias" />
					<CreatePost path="/management/create" />
					<EditPost path="/management/edit/:postId" />
					{userRole === UserRole.ADMIN && <Management path="/management"/>}
					<Users path="/users"/>
				</Router>
			</Container>
		</Container>
	</>;
}

export default connect(
	(({userRole}: UserRole) => (userRole)),
	null
)(App);
