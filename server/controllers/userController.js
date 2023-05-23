const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, UserType, Course, Like} = require('../models/models')
const {getUserTypeIds} = require("../utils/utils");

const generateJwt = (id, lastName, firstName, middleName, about, avatar, email, userTypeId) => {
	return jwt.sign(
		{id, lastName, firstName, middleName, about, avatar: `${process.env.SITE_URL}static/${avatar}`, email, userTypeId},
		process.env.SECRET_KEY,
		{expiresIn: '24h'}
	);
};

class UserController {
	async registration(req, res, next) {
		const {
			lastName,
			firstName,
			middleName,
			about,
			email,
			password,
			userTypeId = (await getUserTypeIds(["Студент"]))[0]
		} = req.body;

		if (!lastName && !firstName && !email && !password) {
			return next(ApiError.badRequest('Некорректные данные пользователя'));
		}
		const candidate = await User.findOne({
			where: {email}
		});
		if (candidate) {
			return next(ApiError.badRequest('Пользователь с таким email уже существует'));
		}

		const hashPassword = await bcrypt.hash(password, 5);
		const user = await User.create({
			lastName,
			firstName,
			middleName,
			about,
			email,
			password: hashPassword,
			userTypeId
		});
		const token = generateJwt(user.id, user.lastName, user.firstName, user.middleName, user.about, user.avatar, user.email, user.userTypeId);
		return res.json({token})
	}

	async login(req, res, next) {
		const {email, password} = req.body
		const user = await User.findOne({
			where: {email},
			include: [{model: UserType, as: "userType"}]
		});
		if (!user) {
			return next(ApiError.internal('Пользователь не найден'))
		}
		let comparePassword = bcrypt.compareSync(password, user.password)
		if (!comparePassword) {
			return next(ApiError.internal('Указан неверный пароль'))
		}

		const token = generateJwt(user.id, user.lastName, user.firstName, user.middleName, user.about, user.avatar, user.email, user.userTypeId);
		return res.json({token});
	}

	async check(req, res) {
		const token = generateJwt(req.user.id, req.user.lastName, req.user.firstName, req.user.middleName, req.user.about,
			req.user.avatar, req.user.email, req.user.userTypeId);
		return res.json({token: token});
	}

	async getAll(req, res) {
		const users = await User.findAll({
			order: [["userTypeId", "ASC"]],
			include: [{
				model: UserType,
				as: "userType"
			}],
		})
		return res.json(
			users.map(user=>{
				user.avatar = `${process.env.SITE_URL}static/${user.avatar}`;
				return user;
			})
		);
	}

	async getOne(req,res,next){
		const {id} = req.params;
		const user = await User.findOne({
			where: {id},
			attributes: {exclude: ['password']},
			include: [
				{
					model: Course,
					as: "courses",
					include: {
						model: Like,
						as: "likes"
					}
				},
				{
					model: UserType,
					as: "userType"
				}
			]
		})
		if (!user)
			return next(ApiError.badRequest("Пользователь не найден"));
		user.avatar = `${process.env.SITE_URL}static/${user.avatar}`;
		return res.json(user);
	}

	async update(req, res) {
		try {
			const {
				lastName,
				firstName,
				middleName,
				about,
				avatar,
				email,
				userTypeId
			} = req.body
			const user = await User.update(
				{
					lastName,
					firstName,
					middleName,
					about,
					avatar,
					email,
					userTypeId
				},
				{
					where: {
						id: req.user.id
					}
				}
			)

			return res.json(user)
		} catch (e) {
			console.error(e.message)
		}
	}

	async delete(req, res) {
		const {id} = req.query;
		const user = await User.destroy({
			where: {id}
		})

		return res.json({user})
	}
}

module.exports = new UserController()
