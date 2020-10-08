import React from "react";
import {Button, IconButton, MenuProps, withStyles} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import blue from "@material-ui/core/colors/blue";
import MenuItem from "@material-ui/core/MenuItem";
import {Link} from "@reach/router";
import {makeStyles} from "@material-ui/core/styles";
import {firebase} from "../../config/firebase";


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:hover': {
            backgroundColor: blue[500],
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);
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
export const MenuAfterLogin =() => {
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
    return(
        <>
            <IconButton edge="start" onClick={handleClick}   className={classes.menuButton} color="inherit"
                        aria-label="menu">
                User.Name
            </IconButton>
            <StyledMenu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem>
                    <Link onClick={handleClose} to="/"> Blog </Link>
                </StyledMenuItem>
                <StyledMenuItem>
                    <Link onClick={handleClose} to="/" > Personal Jesus </Link>
                </StyledMenuItem>
                <StyledMenuItem>
                    <Link onClick={handleClose} to="/about" > Commemts </Link>
                </StyledMenuItem>
                <Button onClick={handleSignOut} color="inherit">Logout</Button>
            </StyledMenu>
        </>
    )
}
