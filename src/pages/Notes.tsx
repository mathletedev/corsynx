import { Button, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Save as SaveIcon } from "@material-ui/icons";
import firebase from "firebase/app";
import React from "react";

interface NotesProps {
	user: firebase.User;
	db: firebase.firestore.Firestore;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		textField: {
			display: "flex",
			wrap: "wrap"
		},
		button: {
			"& > *": {
				margin: theme.spacing(1)
			}
		}
	})
);

export const Notes: React.FC<NotesProps> = ({ user, db }) => {
	const classes = useStyles();
	const [text, setText] = React.useState("");

	const userRef = db.collection("users").doc(user.uid);

	React.useEffect(() => {
		userRef.get().then((doc) => setText(doc.data()?.notes || ""));
	}, []);

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setText(e.target.value);
	const save = () => userRef.update({ notes: text });

	return (
		<div>
			<div className={classes.textField}>
				<TextField
					style={{ margin: 8 }}
					value={text}
					onChange={handleTextChange}
					placeholder="Write your notes here"
					fullWidth
					multiline
					margin="normal"
					InputLabelProps={{
						shrink: true
					}}
					variant="outlined"
				/>
			</div>
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
