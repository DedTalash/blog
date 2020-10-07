import React, {useEffect, useState} from "react";
import {Link, RouteComponentProps} from "@reach/router";
import {db} from '../../config/firebase';
import {default as BlogPost, PostInterface} from '../../model/Post';
import {LinearProgress} from "@material-ui/core";



interface Props  {
	postId?: string,
}


export const Post = (props: Props & RouteComponentProps) => {
	const { postId } = props;

	const [post, setPost] = useState<BlogPost|null>(null);

	useEffect(() => {
		return db.doc(`posts/${postId}`).onSnapshot((post) => {
			if (post.exists) {
				setPost(BlogPost.createFromData(post.data() as PostInterface, post.id));
				// props.setTitle((BlogPost.createFromData(post.data() as PostInterface, post.id)).title)
			} else {
				return (
					<>
						<Link to='/404'>404</Link>
					</>
				)
			}
		})
	}, [postId])


	if (!post) {
		return <>  <LinearProgress color="secondary"/></>
	}

	// TODO: дизайн йухня
	return <>
		{/* TODO: йухня - Breadcrumbs */}
		<Link to="/">Back</Link>
		<h1>{post.title}</h1>
		<p>{post.content}</p>
	</>
}

