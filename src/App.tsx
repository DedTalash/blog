import React, {useState} from 'react';
import MainPage from "./view/MainPage";
import postService from "./components/PostsService";
import {firebase} from "./config/firebase";
import {AppBar, Button, IconButton, Typography} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import {makeStyles} from "@material-ui/core/styles";


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
}));
export default function App()
{
    postService.loadPosts();
    const [user, setUser] = useState<any>(null);
    const classes = useStyles();
    const handleSignIn= async () => {
        const  provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        setUser(result.user);
        return '';
    }

    return user ? (
        <div>
            <MainPage />
        </div>
    ) : (
        <div>
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
                        <Button  onClick={handleSignIn} color="inherit">Login</Button>
                    </Toolbar>
                </Container>

            </AppBar>

        </div>

    );
}