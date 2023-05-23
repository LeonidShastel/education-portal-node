import React from 'react';
import {Navigate, useOutletContext} from "react-router-dom";

const ProtectedRouter = ({children}) => {
	const {user} = useOutletContext();

	if (user === null)
		return <Navigate to={"/"} replace/>

	return (
		children
	);
};

export default ProtectedRouter;