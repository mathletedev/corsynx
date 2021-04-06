import {
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
	Brightness4 as Brightness4Icon,
	ExitToApp as ExitToAppIcon
} from "@material-ui/icons";
import firebase from "firebase/app";
import React from "react";
import { useHistory } from "react-router";
import { ROUTES } from "../utils/routeList";

interface Props {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	auth: firebase.auth.Auth;
}

const useStyles = makeStyles({
	list: {
		width: 250
	}
});

export const NavDrawer: React.FC<Props> = ({ open, setOpen, auth }) => {
	const classes = useStyles();
	const history = useHistory();

	const signOut = () => auth.signOut();

	return (
		<Drawer open={open} onClose={() => setOpen(false)}>
			<div className={classes.list} role="presentation">
				<List>
					{ROUTES.map((route) => (
						<ListItem
							button
							onClick={() => {
								setOpen(false);

								history.push(route.path);
							}}
							key={route.name}
						>
							<ListItemIcon>{route.icon}</ListItemIcon>
							<ListItemText primary={route.name} />
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					<ListItem button key="Toggle Theme">
						<ListItemIcon>
							<Brightness4Icon />
						</ListItemIcon>
						<ListItemText primary="Toggle Theme" />
					</ListItem>
					<ListItem button onClick={signOut} key="Sign Out">
						<ListItemIcon>
							<ExitToAppIcon />
						</ListItemIcon>
						<ListItemText primary="Sign Out" />
					</ListItem>
				</List>
			</div>
		</Drawer>
	);
};
