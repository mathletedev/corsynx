import firebase from "firebase/app";
import "firebase/auth";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { firebaseConfig } from "./utils/config.json";

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export default () => {
	const [user, setUser] = React.useState<firebase.User | null | undefined>(
		undefined
	);
	auth.onAuthStateChanged(
		(authUser) => setUser(authUser),
		() => setUser(null)
	);

	return (
		<BrowserRouter>
			<Router auth={auth} user={user} />
		</BrowserRouter>
	);
};
