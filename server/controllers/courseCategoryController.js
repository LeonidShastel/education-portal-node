const {CourseCategory} = require("../models/models");
const ApiError = require("../error/ApiError");

class CourseCategoryController {
	async getAll(req, res) {
		const courseCategories = await CourseCategory.findAll();
		return res.json([...courseCategories]);
	}

	async getOne(req, res) {
		const {id} = req.params;
		const courseCategories = await CourseCategory.findOne({where: {id}});
		return res.json(courseCategories);
	}

	async create(req, res, next) {
		const {name} = req.body;
		if (!name)
			return next(ApiError.badRequest("Некорректные данные категории курса"));
		if (await CourseCategory.findOne({where: {name}}))
			return next(ApiError.badRequest("Категория курса существует"));

		const courseCategory = await CourseCategory.create({name});
		return res.json(courseCategory);
	}

	async update(req, res, next) {
		const {id} = req.params;
		const {name} = req.body;

		if (!(await CourseCategory.findOne({where: {id}})))
			return next(ApiError.badRequest("Категория курса с таким id не найдена"));

		const courseCategory = await CourseCategory.update({name}, {
			where: {id}
		});
		return res.json(courseCategory);
	}

	async delete(req, res) {
		const {id} = req.params;

		const courseCategory = await CourseCategory.destroy({
			where: {
				id
			}
		});

		return res.json(courseCategory);
	}
}

module.exports = new CourseCategoryController();