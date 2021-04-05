import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { NavBar } from "./navigation/NavBar";
import { firebaseConfig } from "./utils/config.json";
import { ROUTES } from "./utils/routeList";

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

	const location = useLocation();
	const current =
		ROUTES.find((route) => location.pathname === route.path)?.name ||
		"404 Page Not Found";

	return user === undefined ? (
		<div></div>
	) : user === null ? (
		<NavBar title="Corsynx" isLoggedIn={false} auth={auth} />
	) : (
		<Switch>
			<NavBar title={current} isLoggedIn={true} auth={auth} />
			<Route
				path="/"
				render={() => <div>The page you requested is not found</div>}
			/>
		</Switch>
	);
};
