import React, {useState} from 'react';
import {Container, Form, InputGroup} from "react-bootstrap";
import {useOutletContext} from "react-router-dom";

const CourseForm = ({courseForm, setCourseForm, categories}) => {
	return (
		<Container>
			<Form>
				<Form.Group>
					<Form.Label>Категория курса</Form.Label>
					<Form.Select
						value={courseForm.courseCategoryId}
						onChange={e=>setCourseForm({...courseForm, courseCategoryId: e.target.value})}
					>
						{categories.map(el=>
							<option key={el.id} value={el.id}>{el.name}</option>
						)}
					</Form.Select>
				</Form.Group>
				<Form.Group>
					<Form.Label>Название курса</Form.Label>
					<Form.Control type={"text"}
								  placeholder={"Введите название"}
								  value={courseForm.name}
								  onChange={e=>setCourseForm({...courseForm, name: e.target.value})}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Ссылка на главное изображение</Form.Label>
					<Form.Control type={"text"}
								  placeholder={"Введите ссылку на изображение"}
								  value={courseForm.previewImage}
								  onChange={e=>setCourseForm({...courseForm, previewImage: e.target.value})}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Краткая информация о курсе</Form.Label>
					<Form.Control type={"text"}
								  as={"textarea"}
								  placeholder={"Введите информацию о курсе"}
								  value={courseForm.about}
								  onChange={e=>setCourseForm({...courseForm, about: e.target.value})}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Доступен курс</Form.Label>
					<InputGroup>
						<InputGroup.Checkbox
							checked={courseForm.active}
							onChange={e=>setCourseForm({...courseForm, active: !courseForm.active})}
						/>
					</InputGroup>
				</Form.Group>
			</Form>
		</Container>
	);
};

export default CourseForm;