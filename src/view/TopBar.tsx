import CssBaseline from "@material-ui/core/CssBaseline";
import {AppBar, Button, Fab, IconButton, Typography, withStyles, MenuProps} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import {connect} from "react-redux";
import {BlogReducers} from "../redux/store";
import {User} from "firebase";
import {setUser} from "../redux/actions";
import {firebase} from "../config/firebase";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from "@reach/router";
import blue from "@material-ui/core/colors/blue";


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

type Props = {
    user: User | null,
    setUser(user: User | null): void,
    title: string
}

const TopBar = (props: Props) => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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

    function handleSignOut() {
        firebase.auth().signOut();
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
                        <IconButton edge="start" onClick={handleClick} className={classes.menuButton} color="inherit"
                                    aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        {/* TODO: йухня */}
                        <StyledMenu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <StyledMenuItem>
                                <Link to="/"> Blog </Link>
                            </StyledMenuItem>
                            <StyledMenuItem>
								<Link to="/about" > About </Link>
                            </StyledMenuItem>
                        </StyledMenu>
                        <Typography variant="h6" className={classes.title}>
                            {props.title}
                        </Typography>

                        {props.user ?
                            <Button onClick={handleSignOut} color="inherit">Logout</Button> :
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

function ScrollTop(props: { children: React.ReactElement }) {
    const classes = useStyles();
    const trigger = useScrollTrigger();

    const handleClick = () => {
        document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} className={classes.root}>
                {props.children}
            </div>
        </Zoom>
    );
}

export default connect(
    ({user, title}: BlogReducers) => ({user, title}),
    {setUser}
)(TopBar);




