import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { firebaseConfig } from "./utils/config.json";

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export default () => {
	const [user, setUser] = React.useState<firebase.User | null | undefined>(
		undefined
	);
	const [darkMode, setDarkMode] = React.useState(false);

	auth.onAuthStateChanged(
		(authUser) => {
			if (authUser) {
				const userRef = db.collection("users").doc(authUser.uid);
				userRef.get().then((doc) => {
					if (doc.exists) setDarkMode(doc.data()?.darkMode);
					else
						userRef.set({
							darkMode: false,
							notes: ""
						});
				});
			}

			setUser(authUser);
		},
		() => setUser(null)
	);

	const theme = React.useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: darkMode ? "dark" : "light"
				}
			}),
		[darkMode]
	);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<Router user={user} setDarkMode={setDarkMode} auth={auth} db={db} />
			</BrowserRouter>
		</ThemeProvider>
	);
};
