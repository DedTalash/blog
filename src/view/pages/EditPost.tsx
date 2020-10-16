import React, {useEffect, useState} from 'react';
import {RouteComponentProps} from "@reach/router";
import PostEditor from "../components/PostEditor";
import {db} from "../../config/firebase";
import Post, {PostInterface} from "../../models/Post";
import AppLoader from "../components/AppLoader";

interface Props {
	postId?: string
}

const EditPost = ({postId}: Props & RouteComponentProps) => {

	const [processing, setProcessing] = useState<boolean>(true);
	const [post, setPost] = useState<Post|null>(null);

	useEffect(() => {
		setProcessing(true);
		return db.collection('posts').doc(postId).onSnapshot(singlePost => {
			setProcessing(false);
			if (singlePost) {
				setPost(
					Post.createFromData(singlePost.data() as PostInterface, singlePost.id)
				);
			}
		});
	}, [postId]);

	return (
		<AppLoader loading={processing}>
			{post ? <PostEditor post={post}/> : null}
		</AppLoader>
	);
};

export default EditPost;