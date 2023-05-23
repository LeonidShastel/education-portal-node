const ApiError = require("../error/ApiError");
const {CourseSection, Course} = require("../models/models");

class CourseSectionController {
	async create(req, res, next) {
		const {name, about, videoUrl, courseId} = req.body;
		if (!name && !about && !videoUrl && !courseId)
			return next(ApiError.badRequest("Некорректные данные раздела"));

		const courseSection = await CourseSection.create({name, about, videoUrl, courseId});
		return res.json(courseSection);
	}

	async update(req, res, next) {
		const {id} = req.params;
		const {name, about, videoUrl} = req.body;
		if (!id && !name && !about && !videoUrl)
			return next(ApiError.badRequest("Некорректные данные раздела"));

		const courseSection = await CourseSection.findOne({
			where: {id: +id},
			include: {
				model: Course
			}
		});
		if (!courseSection)
			return next(ApiError.badRequest("Раздел не найден"));
		if (courseSection.course.userId !== req.user.id)
			return next(ApiError.badRequest("Нет доступа на изменение раздела"));

		await courseSection.update({name, about, videoUrl});
		return res.json(courseSection);
	}

	async delete(req, res, next) {
		const {id} = req.params.id;
		const courseSection = await CourseSection.findOne({
			where: {id}
		});

		if (!courseSection)
			return next(ApiError.badRequest("Раздел не найден"));
		if (courseSection.userId !== req.user.id)
			return next(ApiError.badRequest("Нет доступа на удаление раздела"));

		await courseSection.destroy();
		return res.json(courseSection);
	}
}

module.exports = new CourseSectionController();