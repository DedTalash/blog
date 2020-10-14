import React from "react";
import {Button, IconButton} from "@material-ui/core";
import {Link} from "@reach/router";
import {connect} from "react-redux";
import {BlogReducers} from "../../redux/store";
import ArrowDropDownSharpIcon from '@material-ui/icons/ArrowDropDownSharp';
import {User} from "../../redux/userReducer";
import {StyledMenu, StyledMenuItem, useStyles} from "./MenuStyles";
import {firebase} from "../../config/firebase";

interface Props {
    user: User
}

const MenuAfterLogin = (props: Props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleSignOut() {
        firebase.auth().signOut();
    }

    return (
        <>
            <IconButton edge="start" onClick={handleClick} className={classes.menuButton} color="inherit"
                        aria-label="menu">
                {props.user?.name}
                <ArrowDropDownSharpIcon/>
            </IconButton>

            <StyledMenu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem>
                    <Link className={classes.padding} onClick={handleClose} to="/"> Blog </Link>
                </StyledMenuItem>
                <StyledMenuItem>
                    <Link className={classes.padding} onClick={handleClose} to="/"> Personal Jesus </Link>
                </StyledMenuItem>
                <StyledMenuItem>
                    <Link className={classes.padding} onClick={handleClose} to="/management">Management</Link>
                </StyledMenuItem>
                <Button className={classes.padding} onClick={handleSignOut} color="inherit">Logout</Button>
            </StyledMenu>
        </>
    )
}

export default connect(
    ({user}: BlogReducers) => ({user}),
    {}
)
(MenuAfterLogin)