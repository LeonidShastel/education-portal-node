import React, {useState} from 'react';
import {Link, redirect, useOutletContext} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {login, registration} from "../http/userAPI";

const Login = () => {
	const {setError, error, setUser} = useOutletContext();
	const [form, setForm] = useState({
		lastName: "",
		firstName: "",
		middleName: "",
		about: "",
		email: "",
		password: ""
	});

	const registrationHandler = () => {
		registration(form)
			.then(res=>{
				console.log(res);
				// setUser({...res});
				setError(null);
				// redirect('/');
			})
			.catch(err=>{
				setError(err.response?.data?.message || err.message);
			})
	}

	return (
		<Container>
			<Row className={"justify-content-center"}>
				<Col
					lg={6}
					md={7}
				>
					<Form>
						<Form.Group>
							<Form.Label>Фамилия</Form.Label>
							<Form.Control type={"text"}
										  placeholder={"Введите фамилию"}
										  value={form.lastName}
										  onChange={e=>setForm({...form, lastName: e.target.value})}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Имя</Form.Label>
							<Form.Control type={"text"}
										  placeholder={"Введите имя"}
										  value={form.firstName}
										  onChange={e=>setForm({...form, firstName: e.target.value})}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Отчество</Form.Label>
							<Form.Control type={"text"}
										  placeholder={"Введите отчество"}
										  value={form.middleName}
										  onChange={e=>setForm({...form, middleName: e.target.value})}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Информация о себе</Form.Label>
							<Form.Control type={"text"}
										  as={"textarea"}
										  placeholder={"Введите информацию о себе"}
										  value={form.about}
										  onChange={e=>setForm({...form, about: e.target.value})}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>E-mail</Form.Label>
							<Form.Control type={"email"}
										  placeholder={"Введите E-mail"}
										  value={form.email}
										  onChange={e=>setForm({...form, email: e.target.value})}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Пароль</Form.Label>
							<Form.Control type={"password"}
										  placeholder={"Введите пароль"}
										  value={form.password}
										  onChange={e=>setForm({...form, password: e.target.value})}/>
						</Form.Group>
						<span className={"text-danger"}>{error && error}</span>
						<Container className={"p-0 d-flex justify-content-between align-items-center mt-2"}>
							<Button onClick={registrationHandler} variant={"primary"}>Регистрация</Button>
							<Link to={"/registration"}>Войти</Link>
						</Container>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default Login;