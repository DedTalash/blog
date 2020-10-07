import React, {useState} from 'react';
import {Main} from "./view/pages/Main";
import TopBar from "./view/TopBar";
import {Router} from "@reach/router";
import {About} from "./view/pages/About";
import {Container} from "@material-ui/core";
import {Post} from "./view/pages/Post";
import {Wrong} from "./view/pages/Wrong"
import {connect} from "react-redux";
import {BlogReducers} from "./redux/store";
import {setTitle} from "./redux/actions";

function App()
{
	const [title, setTitle] = useState("Blog")
	return <>
		<TopBar title={title}/>
		<Container maxWidth="md">
			<Router>
				<Main path="/" />
				<About path="/about" />
				<Post path="/blog/:postId"  />
				<Wrong path="/404"/>
			</Router>
		</Container>
	</>;
}
export default connect(
	({title}:BlogReducers) => ({title}),
	{setTitle}
)(App);
