import React, {useEffect, useState} from 'react';
import {Accordion, Container, ListGroup, Row} from "react-bootstrap";
import {useLoaderData, useOutletContext} from "react-router-dom";
import {getById} from "../http/coursesAPI";
import {updateLike} from "../http/likeAPI";
import {faHeart as faOutLineHeart} from '@fortawesome/free-regular-svg-icons';
import {faHeart as faFillHeart} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const courseLoader = async ({request, params}) => {
	const {id} = params;
	return await getById(id);
}

const Course = ({}) => {
	const loaderData = useLoaderData();
	const [course, setCourse] = useState(loaderData);
	const {user} = useOutletContext();
	const [likeState, setLikeState] = useState(false);

	useEffect(()=>{
		if (course.likes && user) {
			setLikeState(course.likes.some(like => like.userId === user.id));
		}
	},[course]);

	const likeHandle = (state) => {
		updateLike(course.id)
			.then(res => {
				setCourse({
					...course,
					likes: state ? course.likes.filter(like=>like.userId !== user.id) :
						[...course.likes, {userId: user.id}]

				})
			})
			.catch(console.error)
	}

	return (
		course && <Container className={"justify-content-center text-center"}>
			<Row style={{
				backgroundImage: `url(${course.previewImage})`,
				backgroundPosition: "center",
				backgroundSize: "cover",
				height: "10rem"
			}}/>
			<Row className={'mt-3'}>
				<h1>{course.name}</h1>
			</Row>
			<Row className={'mt-3'}>
				<ListGroup variant="flush">
					<ListGroup.Item>О курсе: {course.about}</ListGroup.Item>
					<ListGroup.Item>
						Создатель: {course.user.lastName} {course.user.firstName}
					</ListGroup.Item>
					<ListGroup.Item style={{display: "flex", cursor: "pointer"}} className={"justify-content-between"}>
						Понравилось: {course.likes.length}
						{user && <FontAwesomeIcon
							onClick={() => likeHandle(course.likes.some(like => like.userId === user.id))}
							icon={
								likeState ?
									faFillHeart :
									faOutLineHeart
							}
						/>}
					</ListGroup.Item>
				</ListGroup>
			</Row>
			<Row className={'mt-3'}>
				<h2>
					Разделы курса
				</h2>
			</Row>
			<Row className={'mt-3 mb-3'}>
				{course.courseSections.length ?
					<Accordion>
						{course.courseSections.map((section, index) =>
							<Accordion.Item key={`course-${course.id}-section-${section.id}`} eventKey={index}>
								<Accordion.Header>{section.name}</Accordion.Header>
								<Accordion.Body>
									<iframe width="560" height="315" src={section.videoUrl}
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
											allowFullScreen>
									</iframe>
									<p>
										{section.about}
									</p>
								</Accordion.Body>
							</Accordion.Item>
						)}
					</Accordion>
					:
					<p>
						Создатель ещё не добавил разделы курса
					</p>
				}
			</Row>
		</Container>
	);
};

export default Course;