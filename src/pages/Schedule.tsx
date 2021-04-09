import { Button, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Save as SaveIcon } from "@material-ui/icons";
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

export const Schedule: React.FC<ScheduleProps> = ({ user, auth, db }) => {
	const classes = useStyles();
	const [schedule, setSchedule] = React.useState<Record<string, any>[]>([]);

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
	};

	return (
		<div>
			<form className={classes.container} noValidate>
				{schedule.map((period, i) => (
					<div>
						<TextField
							style={{ margin: 8 }}
							label="Time"
							type="time"
							className={classes.textField}
							InputLabelProps={{ shrink: true }}
							inputProps={{ step: 300 }}
						/>
					</div>
				))}
			</form>
			<div className={classes.button}>
				<Button
					variant="contained"
					color="primary"
					startIcon={<SaveIcon />}
					onClick={save}
				>
					Save
				</Button>
			</div>
		</div>
	);
};
