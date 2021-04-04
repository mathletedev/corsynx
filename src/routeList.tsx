import {
	Assignment as AssignmentIcon,
	Functions as FunctionsIcon,
	Gesture as GestureIcon,
	Home as HomeIcon,
	Notes as NotesIcon,
	Schedule as ScheduleIcon
} from "@material-ui/icons";

interface DrawerRoute {
	name: string;
	path: string;
	icon: JSX.Element;
}

export const ROUTES: DrawerRoute[] = [
	{
		name: "Home",
		path: "/home",
		icon: <HomeIcon />
	},
	{
		name: "Schedule",
		path: "/schedule",
		icon: <ScheduleIcon />
	},
	{
		name: "Assignments",
		path: "/assignments",
		icon: <AssignmentIcon />
	},
	{
		name: "Calculator",
		path: "/calculator",
		icon: <FunctionsIcon />
	},
	{
		name: "Notes",
		path: "/notes",
		icon: <NotesIcon />
	},
	{
		name: "Sketchpad",
		path: "/sketch",
		icon: <GestureIcon />
	}
];
