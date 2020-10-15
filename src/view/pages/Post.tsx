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
import {makeStyles} from "@material-ui/core/styles";

interface Props {
    postAlias?: string,
    user: User
}

const useStyles = makeStyles((theme) =>
    ({
            photo: {
                height: 300,
                width: '100%'
            }
        }
    ));

const Post = ({postAlias, user}: Props & RouteComponentProps) => {
    const [post, setPost] = useState<BlogPost | null>(null);

    const classes = useStyles();

    useTitle(post ? post.title : config.companyName);

    useEffect(() => {
        return db.collection(`posts`)
            .where('alias', '==', postAlias)
            .onSnapshot((snapshot) => {
                snapshot.forEach((post) => {
                    if (post.exists) {
                        const newPost = BlogPost.createFromData(post.data() as PostInterface, post.id);
                        setPost(newPost);
                    }
                })
            })
    }, [postAlias])

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
            <h1>{post.title}</h1>
            <CardMedia className={classes.photo} image={post.photo}/>
            <div dangerouslySetInnerHTML={{__html: post.content}}/>
            <Likes user={user} path={`posts/${post.id}/likes`}/>
        </Container>
        <Container>
            <CommentBlock postId={post.id}/>
        </Container>
    </>
}

export default connect(
    ({user}: BlogReducers) => ({user})
)(Post);