import CssBaseline from "@material-ui/core/CssBaseline";
import {AppBar, Button, Fab, Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import {connect} from "react-redux";
import {BlogReducers} from "../redux/store";
import {User} from "firebase";
import {setUser} from "../redux/actions";
import {firebase} from "../config/firebase";
import {MainMenu} from "./components/MainMenu";
import MenuAfterLogin from "./components/MenuAfterLogin";
import {ScrollTop} from "./components/ScrollTop";

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
}));

type Props = {
    user: User | null,
    setUser(user: User | null): void,
    title: string
}

const TopBar = (props: Props) => {

    const classes = useStyles();

    useEffect(() => {
         return firebase.auth().onAuthStateChanged(user => {
             if(!user) {props.setUser(null)};
             props.setUser(user)});
    }, []);

    const handleSignIn = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        props.setUser(result.user);
    }
    useEffect(() => {
        document.title = props.title;
    }, [props.title])

    return (
        <>
            <CssBaseline/>
            <AppBar position="sticky">
                <Container maxWidth="md">
                    <Toolbar>
                        <MainMenu/>
                        <Typography variant="h6" className={classes.title}>
                            {props.title}
                        </Typography>
                        {props.user ?
                            <MenuAfterLogin/>:
                            <Button onClick={handleSignIn} color="inherit">Login</Button>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
            <ScrollTop>
                <Fab color="primary" size="small">
                    <KeyboardArrowUpIcon/>
                </Fab>
            </ScrollTop>
        </>
    );
}

export default connect(
    ({user, title}: BlogReducers) => ({user, title}),
    {setUser}
)(TopBar);




