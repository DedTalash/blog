import React, {useEffect, useState} from "react";
import {Link, RouteComponentProps} from "@reach/router";
import {db} from '../../config/firebase';
import {default as BlogPost, PostInterface} from '../../model/Post';
import {Breadcrumbs, LinearProgress, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import {setTitle} from "../../redux/actions";
import CommentBlock from "../components/CommentsBlock";
import {BlogReducers} from "../../redux/store";
import {User} from "firebase";
import Container from "@material-ui/core/Container";

interface Props {
    postId?: string,
    setTitle(title: string): void,
    user?: User | null
}

const Post = (props: Props & RouteComponentProps) => {
    const {postId} = props;

    const [post, setPost] = useState<BlogPost | null>(null);

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
    console.log(props.user?.displayName);
    props.setTitle(post.title);

    // TODO: дизайн йухня
    // TODO: do not allow to unregistred user to comment
    return <>

        <Container>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" to="/">
                    Blog
                </Link>
                <Typography color="textPrimary">{post.title}</Typography>
            </Breadcrumbs>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </Container>


        {props.user ?
			<Container>
				<CommentBlock postId={post.id}/>
			</Container>
				:
			<Container>
				<h1> Giv me password </h1>
			</Container>
        }

    </>
}

export default connect(
    ({user}: BlogReducers) => ({user}),
    {setTitle}
)(Post);