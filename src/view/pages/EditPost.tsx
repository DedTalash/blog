import React, {useEffect, useState} from 'react';
import {RouteComponentProps} from "@reach/router";
import PostEditor from "../components/PostEditor";
import {db} from "../../config/firebase";
import Post, {PostInterface} from "../../model/Post";
import {LinearProgress} from "@material-ui/core";

interface Props {
	postId?: string
}

const EditPost = ({postId}: Props & RouteComponentProps) => {

	const [processing, setProcessing] = useState<boolean>(false);
	const [post, setPost] = useState<Post>(Post.createEmpty());


	useEffect(() => {
		setProcessing(true);
		return db.collection('posts').doc(postId).onSnapshot(singlePost => {
			setProcessing(false);
				 const postEdit = (Post.createFromData(singlePost.data() as PostInterface, singlePost.id));
			setPost(postEdit);
		});
	}, []);

	return (

		<div>
			Hello, edit {postId}
			{/* TODO: render proper edit page */}
			<PostEditor post={post} />
			{processing && <div className="line">
				<LinearProgress color="secondary"/>
			</div>}
		</div>
	);
};

export default EditPost;