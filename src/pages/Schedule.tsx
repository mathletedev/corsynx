import firebase from "firebase/app";
import React from "react";

interface ScheduleProps {
	auth: firebase.auth.Auth;
	db: firebase.firestore.Firestore;
}

export const Schedule: React.FC<ScheduleProps> = ({ auth, db }) => {
	return <div>Schedule</div>;
};
