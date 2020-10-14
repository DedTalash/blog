import React from 'react';
import {RouteComponentProps} from "@reach/router";
import Post from "../../model/Post";
import PostEditor from "../components/PostEditor";

const CreatePost = (props: RouteComponentProps) => {

	const post = Post.createEmpty();

	return (
		<PostEditor post={post} />
	);
};

export default CreatePost;