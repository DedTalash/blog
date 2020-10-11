import React, {useEffect, useState} from "react";
import {db} from "../../config/firebase";
import {createStyles, LinearProgress, PropTypes, Theme} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import {connect} from "react-redux";
import {BlogReducers} from "../../redux/store";
import {setTitle} from "../../redux/actions";
import {User} from "firebase";
import ol from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

interface Props {
    postId: string,
    user?: User | null
}

interface Comment {
    id: string,
    comment: string,
    date: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxwidth: 'auto!important',
            backgroundColor: theme.palette.background.paper
        },
        commentList: {
            listStyle: 'none',
        },
        commentContainer: {
            display: 'list-item',
            align: 'inherit'
        },
        avatar: {
            display: 'inline-block',
            float: 'left',
            width: 80,
            height: 80,
            marginRight: 30,
            webkitBorderRadius: '50%',
            moBorderRadius: '50%',
            msBorderRadius: '50%',
            borderRadius: '50%'
        },
        spacedBlock: {
            marginBottom: theme.spacing(2)
        },
        buttonContainer: {
            marginBottom: theme.spacing(2),
            textAlign: 'right'
        },
        commentContent: {
            position: 'relative',
            width: '100%',
            display: 'block'
        },
        commentAuthor: {
            display: 'inline-block',
            width: '100%'
        },
        commentAuthorName: {
            fontWeight: 600,
            margin: '5px 0 8px',
            float: 'left',
            fontSize: 14
        },
        commentData: {
            float: 'right',
            textAlign: 'right',
            fontSize: 10,
            lineHeight: '2.5',
            textTransform: 'uppercase',
            letterSpacing: '.1em'
        },
        commentText: {
            margin: 0,
            padding: 0,
            border: 0,
            outline: 0,
            font: 'inherit',
            verticalAlign: 'baseline',
            fontFamily: 'inherit',
            fontStyle: 'inherit',
            fontWeight: 'inherit'
        },
        commentArea: {
            display: 'flex',
            marginBottom: 30,
            paddingBottom: 30,
            borderBottom: '1px solid #f1f1f1'
        },
    }),
);
const CommentBlock = (props: Props) => {
    const classes = useStyles();
    const postId = props.postId;
    const user = props.user;

    const [comment, setComment] = useState('');
    const [size, setSize] = useState(0);
    const [processing, setProcessing] = useState<boolean>(false);
    const [comments, setComments] = useState<Comment[]>([]);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        db.collection('posts').doc(postId).collection('comments').add({
            comment,
            date: new Date().toString()
        });
        setComment('');
    }
    useEffect(() => {
        setProcessing(true);
        return db.collection('posts').doc(postId).collection('comments')
            .orderBy('date').onSnapshot(snapshot => {
            const comments: Comment[] = [];
            const size = snapshot.size;
            setProcessing(false);
            snapshot.forEach((comment) => {
                comments.push({
                    ...comment.data(),
                    id: comment.id
                } as Comment);
            })
            setComments(comments);
            setSize(size)
        });
    }, []);

    const handleChange = (event: any) => {
        setComment(event.target.value);
    };


    return (
        <>
            <Container className={classes.root}>
                <h3>Comments {size} </h3>
                {comments.map(comment =>
                    <ol className={classes.commentList}>
                        <li className={classes.commentContainer}>
                            <div className={classes.commentArea}>
                                //TODO check author message
                                <ListItemAvatar className={classes.avatar}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                                </ListItemAvatar>
                                <div className={classes.commentContent}>
                                    <div className={classes.commentAuthor}>
								        <span className={classes.commentAuthorName}>
									    {user?.displayName}
								        </span>
                                        <span className={classes.commentData}>
									    {new Date(comment.date).toLocaleString()}
								        </span>
                                    </div>
                                    <Typography className={classes.commentText}>
                                        {comment.comment}
                                    </Typography>
                                </div>
                            </div>
                        </li>
                    </ol>
                )}
                <Divider variant="inset" component="li"/>

                <form autoComplete="off" onSubmit={handleSubmit}>
                    <TextField label="Enter your comment"
                               variant="outlined"
                               className={classes.spacedBlock}
                               fullWidth
                               rows={4}
                               multiline
                               aria-label="My comment"
                               value={comment} placeholder="Maximum 4 rows"
                               onChange={handleChange}/>
                    <div className={classes.buttonContainer}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            size="large"
                        >
                            Post
                        </Button>
                    </div>
                </form>

                {processing && <div className="line">
                    <LinearProgress color="secondary"/>
                </div>}
            </Container>
        </>
    )
}
export default connect(
    ({user}: BlogReducers) => ({user}),
    {setTitle}
)(CommentBlock);


