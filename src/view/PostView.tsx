import React from "react";
import Post from "../model/Post";
import {Formatter} from "../components/Formatter";
import {Card, CardContent, CardMedia, IconButton, Typography, useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {PlayArrow, SkipNext, SkipPrevious} from "@material-ui/icons";

interface Props {
    post: Post
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    cover: {
        flex: '0 0 200px',
    },
}));

export default function PostView(props: Props) {

    const classes = useStyles();

    return (
        <Card className={classes.root + ' blog-post'}>
            <CardMedia
                className={classes.cover}
                image={props.post.urlToImage}
                title={props.post.title}
            />
            <CardContent>
                <Typography component="h5" variant="h5" gutterBottom={true}>
                    {props.post.title}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom={true}>
                    {props.post.description}
                </Typography>
                <Typography variant={"body2"} color="textSecondary" align={"right"}>
                    {Formatter.toDate(props.post.publishedAt)}
                </Typography>
            </CardContent>
        </Card>
    );
}