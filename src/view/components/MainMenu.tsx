import React from "react";
import {IconButton, MenuProps, withStyles} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import blue from "@material-ui/core/colors/blue";
import MenuItem from "@material-ui/core/MenuItem";
import {Link} from "@reach/router";
import MenuIcon from "@material-ui/icons/Menu";
import {makeStyles} from "@material-ui/core/styles";


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
        paddingLeft: 0,
        paddingRight: 0,
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
    padding: {
        paddingLeft: 16,
        paddingRight: 16,
    },

    title: {
        flexGrow: 1,
    },

}));
export const MainMenu =() => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return(
        <>
            <IconButton edge="end" onClick={handleClick} className={classes.menuButton} color="inherit"
                        aria-label="menu"  aria-disabled='true'>
                <MenuIcon/>
            </IconButton>
            <StyledMenu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem >
                    <Link className={classes.padding} onClick={handleClose}  to="/"> Blog </Link>
                </StyledMenuItem>
                <StyledMenuItem>
                    <Link className={classes.padding} onClick={handleClose} to="/about" > About </Link>
                </StyledMenuItem>
            </StyledMenu>
        </>
    )
}
