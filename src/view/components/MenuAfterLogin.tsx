import React from "react";
import {Button, IconButton, MenuProps, withStyles} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import blue from "@material-ui/core/colors/blue";
import MenuItem from "@material-ui/core/MenuItem";
import {Link} from "@reach/router";
import {makeStyles} from "@material-ui/core/styles";
import {firebase} from "../../config/firebase";
import {connect} from "react-redux";
import {BlogReducers} from "../../redux/store";
import {User} from "firebase";
import ArrowDropDownSharpIcon from '@material-ui/icons/ArrowDropDownSharp';

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

interface Props {
    user: User|null
}

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:hover': {
            backgroundColor: blue[500],
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
        paddingLeft: 0,
        paddingRight: 0,
    },
}))(MenuItem);
const useStyles = makeStyles((theme) => ({
    root: {
        position: 'static',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    menuButton: {
        marginRight: theme.spacing(2),
        fontSize: 14
    },
    padding: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    title: {
        flexGrow: 1,
    },
}));
    const MenuAfterLogin =(props:Props) => {
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
            <IconButton  edge="start" onClick={handleClick}   className={classes.menuButton} color="inherit"
                        aria-label="menu">
                {props.user?.displayName}
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
                    <Link className={classes.padding} onClick={handleClose} to="/" > Personal Jesus </Link>
                </StyledMenuItem>
                <StyledMenuItem>
                    <Link className={classes.padding} onClick={handleClose} to="/about" > Commemts </Link>
                </StyledMenuItem>
                <Button className={classes.padding} onClick={handleSignOut} color="inherit">Logout</Button>
            </StyledMenu>
        </>
    )
}

export default connect(
    ({user}: BlogReducers) => ({user}),
    { }
)
(MenuAfterLogin)