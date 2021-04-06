import firebase from "firebase/app";
import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { NavBar } from "./navigation/NavBar";
import { ROUTES } from "./utils/routeList";

interface Props {
	user: firebase.User | null | undefined;
	auth: firebase.auth.Auth;
	db: firebase.firestore.Firestore;
}

export const Router: React.FC<Props> = ({ user, auth, db }) => {
	const location = useLocation();
	const current =
		ROUTES.find((route) => location.pathname === route.path)?.name ||
		"404 Page Not Found";

	return user === undefined ? (
		<div></div>
	) : user === null ? (
		<NavBar title="Corsynx" isLoggedIn={false} auth={auth} db={db} />
	) : (
		<Switch>
			<NavBar title={current} isLoggedIn={true} auth={auth} db={db} />
			<Route
				path="/"
				render={() => <div>The page you requested is not found</div>}
			/>
		</Switch>
	);
};
