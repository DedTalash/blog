import React, {useEffect, useState} from "react";
import {Link, RouteComponentProps} from "@reach/router";
import {db} from '../../config/firebase';
import {default as BlogPost, PostInterface} from '../../model/Post';
import {LinearProgress} from "@material-ui/core";
import {connect} from "react-redux";
import {setTitle} from "../../redux/actions";

interface Props  {
	postId?: string,
	setTitle(title: string): void
}

const Post = (props: Props & RouteComponentProps) => {
	const { postId } = props;

	const [post, setPost] = useState<BlogPost|null>(null);

	useEffect(() => {
		return db.doc(`posts/${postId}`).onSnapshot((post) => {
			if (post.exists) {
				setPost(BlogPost.createFromData(post.data() as PostInterface, post.id));
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

	props.setTitle(post.title);

	// TODO: дизайн йухня
	return <>
		{/* TODO: йухня - Breadcrumbs */}
		<Link to="/">Back</Link>
		<h1>{post.title}</h1>
		<p>{post.content}</p>
	</>
}

export default connect(
	null,
	{ setTitle }
)(Post);