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
	user: firebase.User | null;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
	auth: firebase.auth.Auth;
	db: firebase.firestore.Firestore;
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

export const NavBar: React.FC<Props> = ({
	title,
	user,
	setDarkMode,
	auth,
	db
}) => {
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
					{user !== null && (
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
					{user === null ? (
						<Button color="inherit" onClick={signIn}>
							Sign in
						</Button>
					) : (
						<div>
							<Avatar src={user.photoURL || undefined} />
						</div>
					)}
				</Toolbar>
				{user !== null && (
					<NavDrawer
						open={open}
						setOpen={setOpen}
						user={user}
						setDarkMode={setDarkMode}
						auth={auth}
						db={db}
					/>
				)}
			</AppBar>
		</div>
	);
};
