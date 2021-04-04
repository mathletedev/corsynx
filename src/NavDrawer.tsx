import {
	Drawer,
	ListItem,
	ListItemIcon,
	ListItemText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { ROUTES } from "./routeList";

interface Props {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useStyles = makeStyles({
	list: {
		width: 250
	}
});

export const NavDrawer: React.FC<Props> = ({ open, setOpen }) => {
	const classes = useStyles();

	return (
		<div>
			<Drawer open={open} onClose={() => setOpen(false)}>
				<div className={classes.list} role="presentation">
					{ROUTES.map((route) => (
						<ListItem
							button
							onClick={() => {
								setOpen(false);
								// ! Redirect to route.path
							}}
							key={route.name}
						>
							<ListItemIcon>{route.icon}</ListItemIcon>
							<ListItemText primary={route.name} />
						</ListItem>
					))}
				</div>
			</Drawer>
		</div>
	);
};
