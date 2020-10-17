import {AppBar, Button, Fab, Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import {ScrollTop} from "./ScrollTop";
import {Link, navigate} from "@reach/router";
import config from "../../config/config";
import DropDown from "./DropDown";
import ArrowDropDownSharpIcon from "@material-ui/icons/ArrowDropDownSharp";
import MenuIcon from "@material-ui/icons/Menu";
import authService from "../../services/AuthService";
import useUser from "../../utils/useUser";
import {ModalType, showModal} from "../../redux/actions";
import {connect} from "react-redux";

const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1,
    },
    name: {
        fontSize: 15
    }
}));

interface Props {
    showModal(modal: ModalType): void
}

const TopBar = ({ showModal }: Props) => {

    const user = useUser();
    const classes = useStyles();

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
                                <Button onClick={() => showModal(ModalType.SignIN)} color="inherit">Login</Button>
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
    null,
    { showModal }
)(TopBar);