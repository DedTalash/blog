import React, {useState} from "react";
import {db} from "../../config/firebase";
import {createStyles, Theme} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import PostComment, {Comment} from "./PostComment";
import AppLoader from "./AppLoader";
import useUser from "../../utils/useUser";
import {useCollection} from "../../utils/useCollection";

interface Props {
    postId: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 'auto!important',
            backgroundColor: theme.palette.background.paper
        },
        spacedBlock: {
            marginBottom: theme.spacing(2)
        },
        buttonContainer: {
            marginBottom: theme.spacing(2),
            textAlign: 'right'
        },
    }),
);

export default function CommentBlock(props: Props)
{
    const classes = useStyles();
    const postId = props.postId;

    const user = useUser();

    const [comment, setComment] = useState('');
    const [size, setSize] = useState(0);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        db.collection(`posts/${postId}/comments`).add({
            comment,
            date: new Date(),
            user: db.collection('users').doc(user?.id)
        });
        setComment('');
    }

    const [comments, processing] = useCollection<Comment>(`posts/${postId}/comments`, snapshot => {
        const comments: Comment[] = [];
        const size = snapshot.size;
        snapshot.forEach((comment) => {
            comments.push({
                ...comment.data(),
                id: comment.id,
            } as Comment);
        })
        setSize(size)
        return comments;
    });

    const handleChange = (event: any) => {
        setComment(event.target.value);
    };

    return (
        <>
            <AppLoader loading={processing}>
                <Container className={classes.root}>
                    <h3>Comments {size} </h3>
                    {comments.map((comment, index) =>
                        <PostComment key={index} postId={postId} comment={comment}/>
                    )}

                    {!user.isGuest() && <div>
                        <Divider variant="inset"/>

                        <form autoComplete="off" onSubmit={handleSubmit}>
                            <TextField label="Enter your comment"
                                       variant="outlined"
                                       className={classes.spacedBlock}
                                       fullWidth
                                       rows={4}
                                       multiline
                                       aria-label="My comment"
                                       value={comment}
                                       placeholder="Maximum 4 rows"
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
                        </form></div>}
                </Container>
            </AppLoader>
        </>
    )
}