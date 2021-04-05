import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { NavBar } from "./NavBar";
import { ROUTES } from "./routeList";

export default () => {
	const location = useLocation();
	const current =
		ROUTES.find((route) => location.pathname === route.path)?.name ||
		"404 Page Not Found";

	return (
		<Switch>
			<NavBar title={current} />
			<Route
				path="/"
				render={() => <div>The page you requested is not found</div>}
			/>
		</Switch>
	);
};
