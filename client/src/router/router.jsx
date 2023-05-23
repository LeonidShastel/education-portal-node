import {createBrowserRouter} from "react-router-dom";
import Layout from "../components/Layout";
import AllCourses, {allCoursesLoader} from "../pages/AllCourses";
import Course, {courseLoader} from "../pages/Course";
import Error from "../pages/Error";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import User, {userLoader} from "../pages/User";
import ProtectedRouter from "../components/ProtectedRouter";
import EditCourse, {editCourseLoader} from "../pages/EditCourse";

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout/>,
		errorElement: <Error/>,
		children: [
			{
				path: '/',
				element: <AllCourses/>,
				loader: allCoursesLoader
			},
			{
				path: '/course/:id',
				element: <Course/>,
				loader: courseLoader
			},
			{
				path: '/course/edit/:id',
				element: <ProtectedRouter>
					<EditCourse/>
				</ProtectedRouter>,
				loader: editCourseLoader
			},
			{
				path: '/login',
				element: <Login/>,
			},
			{
				path: '/registration',
				element: <Registration/>
			},
			{
				path: '/user/:id',
				element: <User/>,
				loader: userLoader
			}
		]
	}
])