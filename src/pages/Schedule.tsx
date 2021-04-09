import { Button, ButtonGroup, IconButton, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
	Add as AddIcon,
	Delete as DeleteIcon,
	Link as LinkIcon,
	Save as SaveIcon
} from "@material-ui/icons";
import firebase from "firebase/app";
import React from "react";

interface ScheduleProps {
	user: firebase.User;
	auth: firebase.auth.Auth;
	db: firebase.firestore.Firestore;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			display: "flex",
			flexWrap: "wrap"
		},
		textField: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			width: 200
		},
		button: {
			"& > *": {
				margin: theme.spacing(1)
			}
		}
	})
);

const useForceUpdate = () => {
	const [state, setState] = React.useState(0);
	return () => setState((state) => state + 1);
};

export const Schedule: React.FC<ScheduleProps> = ({ user, auth, db }) => {
	const classes = useStyles();
	const [schedule, setSchedule] = React.useState<Record<string, any>[]>([]);
	const forceUpdate = useForceUpdate();

	const userRef = db.collection("users").doc(user.uid);

	React.useEffect(() => {
		userRef.get().then((doc) => setSchedule(doc.data()?.schedule));
	}, []);
	const save = () => userRef.update({ schedule });

	const editPeriod = (i: number, data: Record<string, any>) => {
		setSchedule((schedule) => {
			let tmp = schedule;
			for (const key of Object.keys(tmp[i])) {
				if (key in data) tmp[i][key] = data[key];
			}

			return tmp;
		});

		forceUpdate();
	};

	const addPeriod = () => {
		setSchedule((schedule) => {
			schedule.push({
				name: "",
				link: "",
				time: 0
			});
			return schedule;
		});

		forceUpdate();
	};

	const deletePeriod = (i: number) => {
		setSchedule((schedule) => {
			schedule.splice(i, 1);
			return schedule;
		});

		forceUpdate();
	};

	const openMeeting = (link: string) => window.open(link, "_blank");

	const minsToString = (mins: number) => {
		const hours = Math.floor(mins / 60);
		const newMins = mins % 60;
		return `${hours < 10 ? "0" : ""}${hours}:${
			newMins < 10 ? "0" : ""
		}${newMins}`;
	};

	const handleTimeChange = (
		i: number,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const time = e.target.value.split(":");

		const hours = parseInt(time[0]);
		const mins = parseInt(time[1]);
		editPeriod(i, { time: mins + hours * 60 });
	};

	return (
		<div>
			<form className={classes.container} noValidate>
				{schedule.map((period, i) => (
					<div>
						<IconButton
							className={classes.button}
							color="secondary"
							onClick={() => deletePeriod(i)}
						>
							<DeleteIcon />
						</IconButton>
						<TextField
							style={{ margin: 8 }}
							label={i === 0 ? "Name" : undefined}
							value={period.name}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								editPeriod(i, { name: e.target.value })
							}
						/>
						<TextField
							style={{ margin: 8 }}
							label={i === 0 ? "Link" : undefined}
							value={period.link}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								editPeriod(i, { link: e.target.value })
							}
						/>
						<TextField
							style={{ margin: 8 }}
							label={i === 0 ? "Time" : undefined}
							type="time"
							value={minsToString(period.time)}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								handleTimeChange(i, e)
							}
							className={classes.textField}
							InputLabelProps={{ shrink: true }}
							inputProps={{ step: 300 }}
						/>
						<IconButton
							className={classes.button}
							color="primary"
							onClick={() => openMeeting(period.link)}
						>
							<LinkIcon />
						</IconButton>
					</div>
				))}
			</form>
			<div className={classes.button}>
				<ButtonGroup>
					<Button
						variant="contained"
						color="secondary"
						startIcon={<AddIcon />}
						onClick={addPeriod}
					>
						Add Period
					</Button>
					<Button
						variant="contained"
						color="primary"
						startIcon={<SaveIcon />}
						onClick={save}
					>
						Save
					</Button>
				</ButtonGroup>
			</div>
		</div>
	);
};
