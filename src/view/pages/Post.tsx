import React, {useEffect, useState} from "react";
import {Link, RouteComponentProps} from "@reach/router";
import {db} from '../../config/firebase';
import {default as BlogPost, PostInterface} from '../../model/Post';
import {Breadcrumbs, CardMedia, LinearProgress, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import {setTitle} from "../../redux/actions";
import CommentBlock from "../components/CommentsBlock";
import {BlogReducers} from "../../redux/store";
import {User} from "firebase";
import Container from "@material-ui/core/Container";
import {ThumbDown, ThumbUp} from "@material-ui/icons";

interface Props {
    postId?: string,
    setTitle(title: string): void,
    user?: User | null
}
interface Like {
    type: boolean,
    date: string
}
const Post = (props: Props & RouteComponentProps) => {
    const {postId} = props;

    const [likesValue, setLikesValue] = useState<number>(0)
    const [canLike, setCanLike] = useState<boolean>(false)

    const [post, setPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        return db.collection('posts').doc(postId).collection('likes').onSnapshot(snapshot => {
            let canLike = true;
            let value = 0;
            snapshot.forEach((like) => {
                const userLike = like.data() as Like;

                if (userLike.type) {
                    value++;
                } else {
                    value--;
                }

                // if (false) {
                //     canLike = false;
                // }
            })
            setLikesValue(value);
            setCanLike(canLike);
        });
    }, [postId]);

    useEffect(() => {
        return db.doc(`posts/${postId}`).onSnapshot((post) => {
            if (post.exists) {
                const newPost = BlogPost.createFromData(post.data() as PostInterface, post.id);
                props.setTitle(newPost.title);
                setPost(newPost);
            } else {
                // TODO: show 404
            }
        })
    }, [postId])

    if (!post) {
        return <LinearProgress color="secondary"/>
    }

    const handleLike = (type: boolean) => {
        db.collection('posts').doc(postId).collection('likes').add({
            type,
            date: new Date().toString()
        });
    }

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
            <CardMedia image={post.urlToImage} />
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <div className="likes">
                {likesValue}
                {props.user && canLike && <>
                    <ThumbUp onClick={handleLike.bind(null, true)}/>
                    <ThumbDown onClick={handleLike.bind(null, false)}/>
                </> }
            </div>
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