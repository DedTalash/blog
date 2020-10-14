import React from "react";
import {IconButton} from "@material-ui/core";
import {Link} from "@reach/router";
import MenuIcon from "@material-ui/icons/Menu";
import {StyledMenu, StyledMenuItem, useStyles} from "./MenuStyles";

export const MainMenu = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <IconButton edge="end" onClick={handleClick} className={classes.menuButton} color="inherit"
                        aria-label="menu" aria-disabled='true'>
                <MenuIcon/>
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
                    <Link className={classes.padding} onClick={handleClose} to="/about"> About </Link>
                </StyledMenuItem>
            </StyledMenu>
        </>
    )
}
