import {
	AppBar,
	Avatar,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Menu as MenuIcon } from "@material-ui/icons";
import firebase from "firebase/app";
import React from "react";
import { NavDrawer } from "./NavDrawer";

interface Props {
	title: string;
	isLoggedIn: boolean;
	auth: firebase.auth.Auth;
}

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

export const NavBar: React.FC<Props> = ({ title, isLoggedIn, auth }) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

	const signIn = () => {
		console.log("here");
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider);
	};
	const signOut = () => auth.signOut();

	const openMenu = (e: React.MouseEvent<HTMLButtonElement>) =>
		setAnchor(e.currentTarget);
	const closeMenu = () => setAnchor(null);

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					{isLoggedIn && (
						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="menu"
							onClick={() => setOpen(true)}
						>
							<MenuIcon />
						</IconButton>
					)}
					<Typography variant="h6" className={classes.title}>
						{title}
					</Typography>
					{isLoggedIn ? (
						<div>
							<Button onClick={openMenu}>
								<Avatar src={auth.currentUser?.photoURL || undefined} />
							</Button>
							<Menu
								anchorEl={anchor}
								keepMounted
								open={Boolean(anchor)}
								onClose={closeMenu}
							>
								<MenuItem
									onClick={() => {
										signOut();
										closeMenu();
									}}
								>
									Sign out
								</MenuItem>
							</Menu>
						</div>
					) : (
						<Button color="inherit" onClick={signIn}>
							Sign in
						</Button>
					)}
				</Toolbar>
				{isLoggedIn && <NavDrawer open={open} setOpen={setOpen} />}
			</AppBar>
		</div>
	);
};
