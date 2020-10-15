import React, {useEffect, useState} from "react";
import {Link, RouteComponentProps} from "@reach/router";
import {db} from '../../config/firebase';
import {default as BlogPost, PostInterface} from '../../model/Post';
import {Breadcrumbs, CardMedia,  LinearProgress,  Typography} from "@material-ui/core";
import {connect} from "react-redux";
import CommentBlock from "../components/CommentsBlock";
import {BlogReducers} from "../../redux/store";
import Container from "@material-ui/core/Container";
import {useTitle} from "../../utils/useTitle";
import config from "../../config/config";
import {User} from "../../redux/userReducer";
import Likes from "../components/Likes";

interface Props {
    postId?: string,
    user: User
}

const Post = (props: Props & RouteComponentProps) => {
    const {postId} = props;
    const [post, setPost] = useState<BlogPost | null>(null);

    useTitle(post ? post.title : config.companyName);

    useEffect(() => {
        return db.doc(`posts/${postId}`)
            .onSnapshot((post) => {
                if (post.exists) {
                    const newPost = BlogPost.createFromData(post.data() as PostInterface, post.id);
                    setPost(newPost);
                }
            })
    }, [postId])

    if (!post) {
        return <LinearProgress color="secondary"/>
    }

    return <>

        <Container>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" to="/">
                    Blog
                </Link>
                <Typography color="textPrimary">{post.title}</Typography>
            </Breadcrumbs>
            <CardMedia image={post.urlToImage}/>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
             <Likes user={props.user} depends={postId} path={`posts/${postId}/likes`}/>
        </Container>
        <Container>
            <CommentBlock postId={post.id}/>
        </Container>
    </>
}

export default connect(
    ({user}: BlogReducers) => ({user})
)(Post);