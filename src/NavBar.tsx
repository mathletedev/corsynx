import {
	AppBar,
	Button,
	IconButton,
	Toolbar,
	Typography
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Menu as MenuIcon } from "@material-ui/icons";
import React from "react";
import { NavDrawer } from "./NavDrawer";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1
		},
		menuButton: {
			marginRight: theme.spacing(2)
		},
		title: {
			flexGrow: 1
		}
	})
);

export const NavBar: React.FC = () => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						onClick={() => setOpen(true)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						Home
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
				<NavDrawer open={open} setOpen={setOpen} />
			</AppBar>
		</div>
	);
};
