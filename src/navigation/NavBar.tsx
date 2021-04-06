import {
	AppBar,
	Avatar,
	Button,
	IconButton,
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

	const signIn = () => {
		console.log("here");
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider);
	};

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
							<Avatar src={auth.currentUser?.photoURL || undefined} />
						</div>
					) : (
						<Button color="inherit" onClick={signIn}>
							Sign in
						</Button>
					)}
				</Toolbar>
				{isLoggedIn && <NavDrawer open={open} setOpen={setOpen} auth={auth} />}
			</AppBar>
		</div>
	);
};
