import React from "react";
import {Button, IconButton, MenuProps, withStyles} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
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
			backgroundColor: theme.palette.primary.main,
			color: theme.palette.primary.contrastText,
		},
		padding: 0,
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
		padding: '6px 16px',
		display: 'block',
		width: '100%'
	},
	title: {
		flexGrow: 1,
	},
}));

interface Props {
	items: [string, () => void, boolean?][],
	children: React.ReactNode
}

const DropDown = ({children, items}: Props) => {

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
			<IconButton
				edge="end"
				onClick={handleClick}
				className={classes.menuButton}
				color="inherit"
				aria-label="menu"
				aria-disabled='true'
			>
				{children}
			</IconButton>
			<StyledMenu
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{items.map(([label, action, show], index) => {

					if (show !== undefined && !show) {
						return null;
					}

					return <StyledMenuItem key={index}>
							<Button
								className={classes.padding}
								onClick={() => {
									handleClose();
									action();
								}}
								color="inherit"
							>
								{label}
							</Button>
						</StyledMenuItem>;
					}
				)}
			</StyledMenu>
		</>
	);
};

export default DropDown;