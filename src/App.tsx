import React, {useEffect} from 'react';
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
import Users from "./view/pages/Users";
import authService from "./services/AuthService";
import {connect} from "react-redux";
import {BlogReducers} from "./redux/store";
import User from "./models/User";

interface Props {
	user: User
}

function App({user}: Props)
{
	useTitle(config.companyName);
	useEffect(authService.subscribe, [])

	console.log('DATA DISPATCH', user.data());

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
	</>;
}

export default connect(
	({user}: BlogReducers) => ({user})
)(App);
