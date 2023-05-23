const {UserType, User, Like, CourseSection} = require("../models/models");
const bcrypt = require("bcrypt");
const {Op} = require("sequelize");

const checkBasicTypes = async () => {
	try{
		await UserType.findOrCreate({where: {name: "Администратор"}});
		await UserType.findOrCreate({where: {name: "Преподаватель"}});
		await UserType.findOrCreate({where: {name: "Студент"}});

		await User.findOrCreate({
			where: {
				email: process.env.ADMIN_EMAIL
			},
			defaults: {
				lastName: "Администратор",
				firstName: "Портала",
				email: process.env.ADMIN_EMAIL,
				password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 5),
				userTypeId: (await getUserTypeIds(["Администратор"]))[0]
			}
		});
	}
	catch (e) {
		throw new Error(`Ошибка создания базовых типов: ${e.message}`);
	}
};
const getUserTypeIds = async (name=[]) => {
	try {
		const userTypes = await UserType.findAll({where: {
				name: {
					[Op.or]: name
				}
			}});

		return userTypes.map(el=>el.id);
	}
	catch (e) {
		throw new Error(`Ошибка поиска типа пользователя ${JSON.stringify(name)}: ${e.message}`);
	}
}
const includeCourseOptions =[
	{
		model: Like,
		as: "likes"
	},
	{
		model: CourseSection,
		as: "courseSections"
	},
	{
		model: User,
		as: "user",
		attributes: {exclude: ['password']},
		include: {
			model: UserType,
			as: "userType"
		}
	}
]

module.exports = {
	checkBasicTypes,
	getUserTypeIds,
	includeCourseOptions
}