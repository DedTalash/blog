import React, {useEffect, useState} from "react";
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

interface Props {
    postId: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxwidth: 'auto!important',
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
    const [processing, setProcessing] = useState<boolean>(false);
    const [comments, setComments] = useState<Comment[]>([]);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        db.collection(`posts/${postId}/comments`).add({
            comment,
            date: new Date(),
            user: db.collection('users').doc(user?.id)
        });
        setComment('');
    }
    useEffect(() => {
        setProcessing(true);
        return db.collection(`posts/${postId}/comments`)
            .orderBy('date').onSnapshot(snapshot => {
                const comments: Comment[] = [];
                const size = snapshot.size;
                setProcessing(false);
                snapshot.forEach((comment) => {
                    comments.push({
                        ...comment.data(),
                        id: comment.id,
                    } as Comment);
                })
                setComments(comments);
                setSize(size)
            });
    }, [postId]);


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
                    </form>
                </Container>
            </AppLoader>
        </>
    )
}