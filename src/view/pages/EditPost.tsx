import React from 'react';
import {RouteComponentProps} from "@reach/router";
import PostEditor from "../components/PostEditor";

interface Props {
	postId?: string
}

const EditPost = ({postId}: Props & RouteComponentProps) => {
	return (
		<div>
			Hello, edit {postId}
			{/* TODO: render proper edit page */}
			{/*<PostEditor post={post} />*/}
		</div>
	);
};

export default EditPost;