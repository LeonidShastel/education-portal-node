import React, {useEffect, useState} from 'react';
import {Container, Form, FormGroup, Row, Card, ListGroup} from "react-bootstrap";
import {getAll} from "../http/courseCategoryAPI";
import {getByCategory} from "../http/coursesAPI";
import {Link, useLoaderData, useOutlet, useOutletContext} from "react-router-dom";
import CoursesCards from "../components/CoursesCards";

export const allCoursesLoader = async ({request, params}) =>{
	const categories = await getAll();
	const selectedCategory = categories.length ? categories[0].id : -1;
	return {
		categories, selectedCategory
	}
}

const AllCourses = () => {
	const loaderData =  useLoaderData();
	const [selectedCategory, setSelectedCategory] = useState(loaderData.selectedCategory);
	const [courses, setCourses] = useState([]);

	useEffect(()=>{
		if (selectedCategory !== -1){
			getByCategory(selectedCategory)
				.then(res=>{
					setCourses([...res]);
				})
				.catch(err=>{
					console.error(err);
				})
		}
	},[selectedCategory]);

	return (
		<Container>
			<Row>
				<Form.Select value={+selectedCategory} onChange={e=>setSelectedCategory(+e.target.value)}>
					<option disabled={true} value={-1}>Выберите курс</option>
					{loaderData.categories.map(
						el=> <option key={`course_category-${el.id}`} value={el.id}>
							{el.name}
						</option>
					)}
				</Form.Select>
			</Row>
			<Row className={"justify-content-around justify-content-xs-center mt-3"}>
				<CoursesCards courses={courses} selectedCategory={selectedCategory}/>
			</Row>
		</Container>
	);
};

export default AllCourses;