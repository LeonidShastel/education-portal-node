import React from 'react';
import {Card, ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CoursesCards = ({courses, selectedCategory = 1, edit=false}) => {
	return (
		courses.map(course=>
			<Card key={`course-card-${selectedCategory}-${course.id}`} className={"p-1 mb-3"} style={{ width: '17rem' }}>
				<Card.Img variant="top" src={course.previewImage}/>
				<Card.Body>
					<Card.Title style={{display: "flex"}} className={"justify-content-between"}>
						<span>
							{course.name}
						</span>
						{edit && <Link to={`/course/edit/${course.id}`}>
							<FontAwesomeIcon icon={faPenToSquare} />
						</Link>}
					</Card.Title>
					<Card.Text>
						{course.about}
						<br/>
					</Card.Text>
				</Card.Body>
				<ListGroup className="list-group-flush">
					{
						course.user ?
							<ListGroup.Item>
								Создатель: {course.user.lastName} {course.user.firstName}
							</ListGroup.Item> :
							null
					}
					<ListGroup.Item>
						Понравилось: {course.likes.length}
					</ListGroup.Item>
				</ListGroup>
				<Card.Body>
					<Link to={`/course/${course.id}`}>
						<Card.Link>
							Перейти к курсу
						</Card.Link>
					</Link>
				</Card.Body>
			</Card>
		)
	);
};

export default CoursesCards;