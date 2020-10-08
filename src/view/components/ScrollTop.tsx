import React from "react";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));
export const ScrollTop = (props: { children: React.ReactElement }) => {
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