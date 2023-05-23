import React, {useEffect} from 'react';
import {getById} from "../http/userAPI";
import {Link, useLoaderData, useOutletContext} from "react-router-dom";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import CoursesCards from "../components/CoursesCards";

export const userLoader = async ({request, params}) => {
	return await getById(params.id);
}

const User = () => {
	const userData = useLoaderData();
	const {user} = useOutletContext();

	return (
		<Container>
			<Row>
				<Col className={"d-flex justify-content-center"}>
					<Image
						width="125rem"
						src={userData.avatar}/>
				</Col>
				<Col className={"d-flex justify-content-center align-items-center"}>
					<h5>
						{userData.lastName} <br/> {userData.firstName} {userData.middleName ? userData.middleName : ""}
					</h5>
					<br/>
					<span>
						{userData.about ? userData.about : ''}
					</span>
				</Col>
			</Row>
			<Row className={"mt-3"}>
				<Col className={"d-flex justify-content-center"}>
					<h3 className={"text-center"}>Курсы пользователя</h3>
				</Col>
				<Col className={"d-flex justify-content-center"}>
					<Link to={'/course/edit/new'} style={{display: user && [1,2].includes(user?.userTypeId) ? "block" : "none"}}>
						<Button variant={"primary"}>
							Создать курс
						</Button>
					</Link>
				</Col>
			</Row>
			<Row className={"justify-content-around justify-content-xs-center mt-3"}>
				<CoursesCards courses={userData.courses} edit={user?.id===userData?.id}/>
			</Row>
		</Container>
	);
};

export default User;