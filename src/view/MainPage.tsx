import React from "react";
import {AppBar, Button, Fab, IconButton, LinearProgress,  Typography} from "@material-ui/core";
import "./main.css";
import PostView from "./PostView";
import {connect} from "react-redux";
import {BlogReducers} from "../redux/store";
import Post from "../model/Post";
import {makeStyles} from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    // headerContainer: {
    //     padding:'0px',
    // }
}));

function ScrollTop(props:any) {
    const { children, window } = props;
    const classes = useStyles();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event:any) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.root}>
                {children}
            </div>
        </Zoom>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};
const MainPage = (props: {posts: Post[], processing: boolean, width?:number}) =>

{
    const classes = useStyles();
    return <React.Fragment>
        <CssBaseline />
        <AppBar position="sticky">
            <Container>
                <Toolbar>
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
        <Container>
            {props.posts.map(post => <PostView post={post} key={post.url}/>)}
            {props.processing && <div className="line">
                <LinearProgress color="secondary"/>
            </div>}
        </Container>

        <ScrollTop {...props}>
            <Fab color="secondary" size="small" aria-label="scroll back to top">
                <KeyboardArrowUpIcon />
            </Fab>
        </ScrollTop>
    </React.Fragment>;
}

export default connect(
    ({posts, processing}: BlogReducers) => ({posts: [...posts], processing}),
)(MainPage);