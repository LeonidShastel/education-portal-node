const {Course, Like, CourseSection, User, UserType} = require("../models/models");
const ApiError = require("../error/ApiError");
const {includeCourseOptions} = require("../utils/utils");

class CourseController {
	async getAll(req, res) {
		const courses = await Course.findAll({
			include: includeCourseOptions
		});
		return res.json(courses);
	}

	async getAllByUser(req, res) {
		const {id} = req.user;
		const courses = await Course.findAll({
			where: {userId: id},
			include: includeCourseOptions
		})
		return res.json(courses);
	}

	async getAllByCategory(req, res) {
		const {id} = req.params;
		const courses = await Course.findAll({
			where: {
				courseCategoryId: id
			},
			include: includeCourseOptions
		});
		return res.json(courses);
	}

	async getOne(req, res, next) {
		const {id} = req.params;
		const userId = req?.user?.id;
		const course = await Course.findOne({
			where: {id},
			include: includeCourseOptions
		});

		if (!course)
			return next(ApiError.badRequest("Курс не найден"));

		if (course.active === false && course.userId !== userId)
			return next(ApiError.badRequest("Курс недоступен"));

		return res.json(course);
	}

	async create(req, res, next) {
		const {name, previewImage, about, active, courseCategoryId} = req.body;
		if (!name && !previewImage && !about)
			return next(ApiError.badRequest("Некорректные данные курса"));

		const course = await Course.create({name, previewImage, about, active, userId: req.user.id, courseCategoryId});
		course.previewImage = `${process.env.SITE_URL}static/${course.previewImage}`;
		return res.json(course);
	}

	async update(req, res, next) {
		const {id} = req.params;
		const {name, previewImage, about, active, courseCategoryId} = req.body;

		if (!(await Course.findOne({where: {id: +id}})))
			return next(ApiError.badRequest("Тип курса с таким id не найден"));

		const course = await Course.update({name, previewImage, about, active, courseCategoryId}, {
			where: {id: +id}
		});
		course.previewImage = `${course.previewImage}`;
		return res.json(course);
	}

	async delete(req, res, next) {
		const {id} = req.params;
		const userId = req.user.id;

		const course = await Course.findOne({
			where: {id}
		});

		if (course.userId !== userId)
			return next(ApiError.badRequest("Нет прав на удаление этого курса"));

		await course.destroy();
		return res.json(course);
	}
}

module.exports = new CourseController()