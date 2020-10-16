import {AppBar, Button, Fab, Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import {connect} from "react-redux";
import {BlogReducers} from "../redux/store";
import {firebase} from "../config/firebase";
import {ScrollTop} from "./components/ScrollTop";
import {Link, navigate} from "@reach/router";
import config from "../config/config";
import DropDown from "./components/DropDown";
import ArrowDropDownSharpIcon from "@material-ui/icons/ArrowDropDownSharp";
import MenuIcon from "@material-ui/icons/Menu";
import authService from "../services/AuthService";
import User from "../models/User";

const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1,
    },
    name: {
        fontSize: 15
    }
}));

type Props = {
    user: User
}

const TopBar = ({user}: Props) => {
    const classes = useStyles();

    const handleSignIn = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider)
    }

    return (
        <>
            <AppBar  position="sticky" >
                <Container>
                    <Toolbar>
                        <DropDown items={[
                            ['Blog', () => navigate('/')],
                            ['About', () => navigate('/about')],
                        ]}>
                            <MenuIcon/>
                        </DropDown>
                        <Typography variant="h6" className={classes.title}>
                            <Link to="/">{config.companyName}</Link>
                        </Typography>
                        {user.isGuest() ?
                            <div>
                                <Button onClick={handleSignIn} color="inherit">Login</Button>
                            </div>
                            :
                            <DropDown items={[
                                ['Users', () => navigate('/users'), user.can('users')],
                                ['Management', () => navigate('/management'), user.can('management')],
                                ['Logout', authService.logout],
                            ]}>
                                <div className={classes.name}>
                                    {user.name}
                                </div>
                                <ArrowDropDownSharpIcon/>
                            </DropDown>
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
    ({user}: BlogReducers) => ({user})
)(TopBar);



