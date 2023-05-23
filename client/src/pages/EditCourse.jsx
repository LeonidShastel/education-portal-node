import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {useLoaderData, useNavigate} from "react-router-dom";
import CourseForm from "../components/CourseForm";
import {createCourse, deleteCourse, getById, updateCourse} from "../http/coursesAPI";
import {getAll} from "../http/courseCategoryAPI";
import CourseSectionForm from "../components/CourseSectionForm";
import {createCourseSection, updateCourseSection} from "../http/courseSectionAPI";

export const editCourseLoader = async ({request, params}) => {
	const course = params.id !== 'new' ? await getById(params.id) : null;
	const categories = await getAll();

	return {
		course, categories
	}
}

const EditCourse = () => {
	const navigate = useNavigate();
	const {course, categories} = useLoaderData();
	const [courseForm, setCourseForm] = useState({
		name: "",
		previewImage: "",
		about: "",
		active: false,
		courseCategoryId: 0
	});
	const [courseSections, setCourseSections] = useState([])
	const addCourseSectionHandle = () => {
		setCourseSections([...courseSections, {
			id: -Date.now(),
			name: "",
			about: "",
			videoUrl: ""
		}]);
	};
	const saveCourseHandle = async () => {
		let course = {};
		if (courseForm.id)
			await updateCourse(courseForm);
		else
			course = await createCourse(courseForm);

		for (const courseSectionsElement of courseSections) {
			if (courseSectionsElement.id>0)
				await updateCourseSection(courseSectionsElement);
			else
				await createCourseSection({...courseSectionsElement, courseId: courseForm.id || course.id})
		}

		return navigate('/');
	};
	const deleteCourseHandle = async () => {
		await deleteCourse(courseForm.id);
		return navigate('/');
	}

	useEffect(()=>{
		if (course){
			setCourseForm(course);
			setCourseSections([...course.courseSections])
		}
	},[course]);

	return (
		<Container className={"mb-4"}>
			<CourseForm courseForm={courseForm} setCourseForm={setCourseForm} categories={categories}/>
			{
				courseSections.map(section=>
					<CourseSectionForm
						key={section.id}
						currentSection={section}
						setCourseSections={setCourseSections}
						courseSections={courseSections}
					/>
				)
			}
			<Row className={"mt-3"}>
				<Col className={"d-flex justify-content-center"}>
					<Button variant={"primary"} onClick={addCourseSectionHandle}>Добавить раздел</Button>
				</Col>
				<Col className={"d-flex justify-content-center"}>
					<Button variant={"primary"} onClick={saveCourseHandle}>Сохранить курс</Button>
				</Col>
				<Col className={"d-flex justify-content-center"}>
					<Button variant={"primary"} disabled={!courseForm?.id} onClick={deleteCourseHandle}>Удалить курс</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default EditCourse;