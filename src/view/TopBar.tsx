import {AppBar, Button, Fab, Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import {connect} from "react-redux";
import {BlogReducers} from "../redux/store";
import {setUser} from "../redux/actions";
import {db, firebase} from "../config/firebase";
import {ScrollTop} from "./components/ScrollTop";
import {Link, navigate} from "@reach/router";
import config from "../config/config";
import {User} from "../redux/userReducer";
import DropDown from "./components/DropDown";
import ArrowDropDownSharpIcon from "@material-ui/icons/ArrowDropDownSharp";
import MenuIcon from "@material-ui/icons/Menu";
import {UserRole} from "./pages/Users";

const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1,
    },
    name: {
        fontSize: 15
    }
}));

type Props = {
    user: User,
    setUser(user: User): void
}

const TopBar = (props: Props) => {
        const [userRole, setUserRole] = useState<UserRole>(UserRole.GUEST)
    const classes = useStyles();

    useEffect(() => {
        return firebase.auth().onAuthStateChanged((user: any) => {
            if (user) {
                user = {
                    name: user.displayName,
                    photo: user.photoURL,
                    id: user.uid,
                    email: user.email,
                    role: UserRole.USER
                };
                db.collection('users').doc(user.id).set(user, {merge: true})
            }
            props.setUser(user);
            setUserRole(user.role)
        });
    }, []);

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
                        {props.user ?
                            <DropDown items={[
                                ['Users', () => navigate('/users')],
                                ['Management', () => navigate('/management')],
                                ['Logout', () => firebase.auth().signOut()],
                            ]}>
                                <div className={classes.name}>
                                    {props.user?.name}
                                </div>
                                <ArrowDropDownSharpIcon />
                            </DropDown>
                                :
                            <div>
                                <Button onClick={handleSignIn} color="inherit">Login</Button>
                            </div>
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

// export default connect(
//     ({user}: BlogReducers) => ({user});
//     ({userRole}: UserRole) => ({userRole}),
//     {setUser}
// )(TopBar);



