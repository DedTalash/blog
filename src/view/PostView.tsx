import React from "react";
import Post from "../model/Post";
import {Formatter} from "../components/Formatter";
import {Card, CardContent, CardMedia, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {BlogReducers} from "../redux/store";

interface Props {
    post: Post
    width?: number
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    cover: {
         flex: '0 0 200px'

    },
    title: {
        [theme.breakpoints.down('sm')]: {"font-size": '10px'},
        [theme.breakpoints.down('md')]: {"font-size": '1.2rem'},
        [theme.breakpoints.up('md')]:  {"font-size": '1rem'}
    },
    bodyPost:{
        [theme.breakpoints.down('sm')]: {fontsize: '10px'},
        [theme.breakpoints.down('md')]: {fontsize: '2.2rem'},
        [theme.breakpoints.up('md')]:  {fontsize: '1rem'}
    }
}));

// const useStylesMedium = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//     },
//     cover: {
//         flex: '0 0 100px'
//     }
// }));


export default function PostView(props: Props) {
    const classes = useStyles();
    // const width: number = useSelector((state: BlogReducers) => state.width);
    // if(width < 900) {
    //     const classes = useStylesMedium();
    // }
    return (
        <Card className={classes.root + ' blog-post'}>
            <CardMedia
                className={classes.cover}
                image={props.post.urlToImage}
                title={props.post.title}
            />
            <CardContent>
                <Typography className={classes.title} component="h5" variant="h5" gutterBottom={true}>
                    {props.post.title}
                </Typography>
                <Typography className={"bodyPost"} variant="body1" color="textSecondary" gutterBottom={true}>
                    {props.post.description}
                </Typography>
                <Typography variant={"body2"} color="textSecondary" align={"right"}>
                    {Formatter.toDate(props.post.publishedAt)}
                </Typography>
            </CardContent>
        </Card>
    );
}