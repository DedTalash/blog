import React from "react";
import {AppBar, Button, IconButton, LinearProgress,  Typography} from "@material-ui/core";
import "./main.css";
import PostView from "./PostView";
import {connect} from "react-redux";
import {BlogReducers} from "../redux/store";
import Post from "../model/Post";
import {makeStyles} from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        paddingTop: '64px',
        [theme.breakpoints.down('xs')]: {
            paddingTop: '56px',
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const MainPage = (props: {posts: Post[], processing: boolean, width?:number}) => {
    const classes = useStyles();
    return <div className={classes.mainContainer}>
        <AppBar>
            <Container maxWidth="md">
                <Toolbar disableGutters={true}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Blog
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </Container>
        </AppBar>
        <Container maxWidth="md">
            {props.posts.map(post => <PostView post={post} key={post.url}/>)}
            {props.processing && <div className="line">
                <LinearProgress color="secondary"/>
            </div>}
        </Container>
    </div>;
}

export default connect(
    ({posts, processing}: BlogReducers) => ({posts: [...posts], processing}),
)(MainPage);