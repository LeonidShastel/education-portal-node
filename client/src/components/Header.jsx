import React from 'react';
import {Container, Navbar, Row} from "react-bootstrap";
import {Link, useOutletContext} from "react-router-dom";

const Header = ({user}) => {
	return (
		<Row>
			<Navbar bg="primary" variant="dark">
				<Container>
					<Link to={"/"}>
						<Navbar.Brand>Образовательный портал</Navbar.Brand>
					</Link>
					<Navbar.Toggle />
					<Navbar.Collapse className="justify-content-end">
						<Navbar.Text>
							{user ?
								<Link to={`/user/${user.id}`}>
									Кабинет
								</Link>
								:
								<Link to={"/login"}>Войти</Link>
							}
						</Navbar.Text>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</Row>
	);
};

export default Header;