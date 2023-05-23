import React, {useState} from 'react';
import {Link, useOutletContext, useLocation, useNavigate} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {login} from "../http/userAPI";

const Login = () => {
	const {setError, error, setUser} = useOutletContext();
	const navigate = useNavigate();
	const [form, setForm] = useState({
		email: "",
		password: ""
	});

	const loginHandle = () => {
		login(
			form.email,
			form.password
		)
			.then(res=>{
				setUser({...res});
				setError(null);
				return navigate('/');
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
							<Button onClick={loginHandle} variant={"primary"}>Войти</Button>
							<Link to={"/registration"}>Регистрация</Link>
						</Container>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default Login;