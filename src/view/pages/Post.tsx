import React, {useEffect, useState} from "react";
import {Link, RouteComponentProps} from "@reach/router";
import {db} from '../../config/firebase';
import {default as BlogPost, PostInterface} from '../../models/Post';
import {Breadcrumbs, CardMedia,  LinearProgress,  Typography} from "@material-ui/core";
import CommentBlock from "../components/CommentsBlock";
import Container from "@material-ui/core/Container";
import {useTitle} from "../../utils/useTitle";
import config from "../../config/config";
import Likes from "../components/Likes";
import {makeStyles} from "@material-ui/core/styles";
import useUser from "../../utils/useUser";

interface Props {
    postAlias?: string
}

const useStyles = makeStyles((theme) =>
    ({
            photo: {
                height: 300,
                width: '100%'
            }
        }
    ));

export default function Post({postAlias}: Props & RouteComponentProps)
{
    const user = useUser();
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
            {user.id && <Likes user={user} path={`posts/${post.id}/likes`}/>}
        </Container>
        <Container>
            <CommentBlock postId={post.id}/>
        </Container>
    </>
}