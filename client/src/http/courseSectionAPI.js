import {$authHost} from "./index";

export const createCourseSection = async (body) => {
	const {data} = await $authHost.post(`api/coursesection/`, body);
	return data;
}

export const updateCourseSection = async (body) => {
	const {data} = await $authHost.put(`api/coursesection/${body.id}`, body);
	return data;
}