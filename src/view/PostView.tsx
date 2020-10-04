import React from "react";
import Post from "../model/Post";
import {Formatter} from "../components/Formatter";
import {Card, CardContent, CardMedia, createMuiTheme,  Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

interface Props {
    post: Post
    width?: number
}

const myTheme:any = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 384,
            md: 560,
            lg: 674,
            xl: 1200
        }
    }
});

const useStyles =  makeStyles((theme) => {

        theme.breakpoints = myTheme.breakpoints;

    console.log([theme.breakpoints.down('xs')])
    console.log([theme.breakpoints.up('xs')])
    console.log([theme.breakpoints.down('sm')])
    console.log([theme.breakpoints.up('sm')])
    return ({

            root: {
                display: 'flex',

            },
            blogPost: {
                [theme.breakpoints.down('sm')]:{
                    display: 'block',
                },
                display: 'flex',
                marginTop: '10px',
            },
            cover: {
                flex: '0 0 200px',
                height: "110px",
                paddingTop: '25px',
                backgroundSize: 'contain',
                // paddingTop: '25px',
                // backgroundSize: 'contain',
                // [theme.breakpoints.up('xs')]: {
                //     display:'block',
                //     height: '171px',
                //     width: '100%',
                //     // objectFit:'cover',
                //     backgroundSize: 'contain'
                // },
                [theme.breakpoints.down('sm')]: {
                    display: 'block',
                    width: '100%',
                    height: '250px',
                    backgroundSize: 'cover'
                },
                [theme.breakpoints.up('sm')]: {
                    display: 'block',
                    width: '100%',
                    height: '250px',
                    backgroundSize: 'cover'
                },
                [theme.breakpoints.up('md')]:{
                    display: 'block',
                    backgroundSize: 'cover'
                },
                // [theme.breakpoints.down('lg')]:{
                // flex: '0 0 200px',
                // height: "110px",
                // paddingTop: '25px',
                // backgroundSize: 'contain'
                // }
            },
            title: {
                fontSize: '20px',
                // [theme.breakpoints.up('md')]: {fontSize: '16px', color: 'blue'},
                // [theme.breakpoints.up('sm')]: {fontSize: '16px', color: 'green'},
                // [theme.breakpoints.up('xs')]: {fontSize: '16px', color: 'red'},

            },
            bodyPost: {
                fontSize: '18px',
                // [theme.breakpoints.up('sm')]: {fontSize: '14px', color:'red'},
                // [theme.breakpoints.up('md')]: {fontSize: '14px', color: 'blue'},
                // [theme.breakpoints.up('xs')]: {fontSize: '14px', color: 'red'}
            },
            date: {
                // [theme.breakpoints.up('sm')]: {fontSize: '10px', color:'red'},
                // [theme.breakpoints.up('md')]: {fontSize: '10px', color: 'blue'},
                // [theme.breakpoints.up('xs')]: {fontSize: '10px', color: 'red'},
            }
        }
    );
});




export default function PostView(props: Props) {
    const classes = useStyles();

    return (
        <Card className={classes.blogPost} >
            <CardMedia
                className={classes.cover}
                image={props.post.urlToImage}
                title={props.post.title}
            />
            <CardContent>
                <Typography className={classes.title} component="h5" variant="h5" gutterBottom={true}>
                    {props.post.title}
                </Typography>
                <Typography className={classes.bodyPost} variant="body1" color="textSecondary" gutterBottom={true}>
                    {props.post.description}
                </Typography>
                <Typography className={classes.date} variant={"body2"} color="textSecondary" align={"right"}>
                    {Formatter.toDate(props.post.publishedAt)}
                </Typography>
            </CardContent>
        </Card>
    );
}