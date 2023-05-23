import {$authHost, $host} from "./index";

export const getByCategory = async (id) => {
	const {data} = await $host.get(`api/course/category/${id}`);
	return data;
}

export const getById = async (id) => {
	const {data} = await $host.get(`api/course/${id}`);
	return data;
}

export const createCourse = async (body) => {
	const {data} = await $authHost.post(`api/course`, body);
	return data;
}

export const updateCourse = async (body) => {
	const {data} = await $authHost.put(`api/course/${body.id}`, body);
	return data;
}

export const deleteCourse = async (id) => {
	const {data} = await $authHost.delete(`api/course/${id}`);
	return data;
}