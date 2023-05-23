import React from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import Header from "../components/Header";
import {Link} from "react-router-dom";

const Error = () => {
	return (
		<Container className={"vh-100 d-flex flex-column justify-content-center align-items-center"}>
			<Container className="text-center">
				<h1 className="display-1 fw-bold">404</h1>
				<p className="fs-3">
					<span className="text-danger">Opps!</span> Страница не найдена
				</p>
				<p className="lead">
					Страница, которую вы ищете, не существует.
				</p>
				<Link to={"/"} className={"btn btn-primary"}>
					На главную
				</Link>
			</Container>
		</Container>
	);
};

export default Error;