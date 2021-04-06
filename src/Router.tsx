import firebase from "firebase/app";
import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { NavBar } from "./navigation/NavBar";
import { ROUTES } from "./utils/routeList";

interface Props {
	auth: firebase.auth.Auth;
	user: firebase.User | null | undefined;
}

export const Router: React.FC<Props> = ({ auth, user }) => {
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
