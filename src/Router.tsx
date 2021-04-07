import firebase from "firebase/app";
import React from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { NavBar } from "./navigation/NavBar";
import { Notes } from "./pages/Notes";
import { ROUTES } from "./utils/routeList";

interface Props {
	user: firebase.User | null | undefined;
	auth: firebase.auth.Auth;
	db: firebase.firestore.Firestore;
}

export const Router: React.FC<Props> = ({ user, auth, db }) => {
	const location = useLocation();

	if (user === null && location.pathname !== "/") {
		const history = useHistory();
		history.push("/");
	}
	const current =
		ROUTES.find((route) => location.pathname === route.path)?.name ||
		"404 Page Not Found";

	return user === undefined ? (
		<div></div>
	) : user === null ? (
		<NavBar title="Corsynx" isLoggedIn={false} auth={auth} db={db} />
	) : (
		<div>
			<NavBar title={current} isLoggedIn={true} auth={auth} db={db} />
			<Switch>
				<Route path="/notes" exact>
					<Notes auth={auth} db={db} />
				</Route>
			</Switch>
		</div>
	);
};
