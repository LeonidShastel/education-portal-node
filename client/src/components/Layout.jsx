import React, {useEffect, useState} from 'react';
import {Outlet} from "react-router-dom";
import Header from "./Header";
import {Container, Row, Spinner} from "react-bootstrap";
import {check} from "../http/userAPI";

const Layout = ({}) => {
	const [loader, setLoader] = useState(false);
	const [error, setError] = useState("")
	const [user, setUser] = useState(null);

	useEffect(()=>{
		setLoader(true);
		check()
			.then(res=>{
				setUser({...res})
			})
			.catch(err=>{
				localStorage.removeItem("token");
				setUser(null);
			})
			.finally(()=>{
				setLoader(false);
			})
	},[]);

	return (
		<Container fluid>
			<Header user={user}/>
			<Container className={"mt-3"} fluid>
				{loader ? <Spinner animation={"grow"}/> : <Outlet context={{setLoader, error, setError, setUser, user}}/>}
			</Container>
		</Container>
	);
};

export default Layout;