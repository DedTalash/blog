import React, {useEffect, useState} from "react";
import {Link, RouteComponentProps} from "@reach/router";
import {db} from '../../config/firebase';
import {default as BlogPost, PostInterface} from '../../model/Post';
import {Breadcrumbs, LinearProgress, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import {setTitle} from "../../redux/actions";
import {CommentBlock} from "../components/CommentsBlock";

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
				// TODO: show 404
			}
		})
	}, [postId])

	if (!post) {
		return <>  <LinearProgress color="secondary"/></>
	}

	props.setTitle(post.title);

	// TODO: дизайн йухня
	// TODO: do not allow to unregistred user to comment
	return <>
		<Breadcrumbs aria-label="breadcrumb">
			<Link color="inherit" to="/">
				Blog
			</Link>
			<Typography color="textPrimary">{post.title}</Typography>
		</Breadcrumbs>
		<h1>{post.title}</h1>
		<p>{post.content}</p>
		<CommentBlock postId={post.id}/>
	</>
}

export default connect(
	null,
	{ setTitle }
)(Post);