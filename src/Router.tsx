import firebase from "firebase/app";
import React from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { NavBar } from "./navigation/NavBar";
import { Notes } from "./pages/Notes";
import { ROUTES } from "./utils/routeList";

interface Props {
	user: firebase.User | null | undefined;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
	auth: firebase.auth.Auth;
	db: firebase.firestore.Firestore;
}

export const Router: React.FC<Props> = ({ user, setDarkMode, auth, db }) => {
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
		<div>
			<NavBar
				title="Corsynx"
				user={user}
				setDarkMode={setDarkMode}
				auth={auth}
				db={db}
			/>
		</div>
	) : (
		<div>
			<NavBar
				title={current}
				user={user}
				setDarkMode={setDarkMode}
				auth={auth}
				db={db}
			/>
			<Switch>
				<Route path="/notes" exact>
					<Notes user={user} db={db} />
				</Route>
			</Switch>
		</div>
	);
};
