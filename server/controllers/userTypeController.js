const {UserType} = require("../models/models");
const ApiError = require("../error/ApiError");
const {getUserTypeIds} = require("../utils/utils");

class UserTypeController {
	async getAll(req, res){
		const userTypes = await UserType.findAll();
		return res.json(userTypes);
	}
	async getOne(req, res){
		const {id} = req.params;
		const userType = await UserType.findOne({where: {id}});
		return res.json(userType);
	}
	async create(req, res, next){
		const {name} = req.body;
		if (!name)
			return next(ApiError.badRequest("Тип пользователя уже существует"));

		const userType = await UserType.create({name});
		return res.json(userType);
	}
	async update(req, res, next){
		const {id} = req.params;
		const {name} = req.body;

		if (!(await UserType.findOne({where: {id}})))
			return next(ApiError.badRequest("Тип пользователя с таким id не найден"));

		const userType = await UserType.update({name},{
			where: {id}
		});
		return res.json(userType);
	}
	async delete(req, res, next){
		const {id} = req.params;
		const ids = await getUserTypeIds(["Администратор", "Преподаватель", "Студент"]);
		if (ids.some(el=>el===id))
			return next(ApiError.badRequest("Данный тип нельзя удалить"));

		const userType = await UserType.destroy({
			where: {
				id
			}
		});

		return res.json(userType);
	}
}

module.exports = new UserTypeController()