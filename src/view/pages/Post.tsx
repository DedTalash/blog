import React, {useEffect, useState} from "react";
import {Link, RouteComponentProps} from "@reach/router";
import {db} from '../../config/firebase';
import {default as BlogPost, PostInterface} from '../../model/Post';

interface Props  {
	postId?: string
}

export const Post = ({ postId }: Props & RouteComponentProps) => {

	const [post, setPost] = useState<BlogPost|null>(null);

	useEffect(() => {
		return db.doc(`posts/${postId}`).onSnapshot((post) => {
			if (post.exists) {
				setPost(BlogPost.createFromData(post.data() as PostInterface, post.id))
			} else {
				// TODO: redirect to 404
			}
		})
	}, [postId])

	if (!post) {
		// TODO: йухня
		return <>Loading...</>
	}

	// TODO: дизайн йухня
	return <>
		{/* TODO: йухня - Breadcrumbs */}
		<Link to="/">Back</Link>
		<h1>{post.title}</h1>
		<p>{post.content}</p>
	</>
}