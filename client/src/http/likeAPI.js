import {$authHost} from "./index";

export const updateLike = async (courseId) => {
	const {data} = $authHost.post('api/like', {courseId});
	return data;
}