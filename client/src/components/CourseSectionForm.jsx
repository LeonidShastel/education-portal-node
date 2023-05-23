import React from 'react';
import {Container, Form} from "react-bootstrap";

const CourseSectionForm = ({currentSection, setCourseSections, courseSections}) => {

	const editCourseSectionHandler = (event) => {
		const newState = courseSections.map(section=>{
			if (section.id === currentSection.id)
				return {...section, [event.target.name]: event.target.value}

			return section
		});

		setCourseSections(newState);
	}

	return (
		<Container className={"mt-4"}>
			<Form>
				<Form.Group>
					<Form.Label>Заголовок раздела</Form.Label>
					<Form.Control type={"text"}
								  placeholder={"Введите название"}
								  value={currentSection.name}
								  name={"name"}
								  onChange={editCourseSectionHandler}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Описание раздела</Form.Label>
					<Form.Control type={"text"}
								  as={"textarea"}
								  placeholder={"Введите информацию о разделе"}
								  value={currentSection.about}
								  name={"about"}
								  onChange={editCourseSectionHandler}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Видео материал курса</Form.Label>
					<Form.Control type={"text"}
								  placeholder={"Введите URL видео материала"}
								  value={currentSection.videoUrl}
								  name={"videoUrl"}
								  onChange={editCourseSectionHandler}
					/>
				</Form.Group>
			</Form>
		</Container>
	);
};

export default CourseSectionForm;