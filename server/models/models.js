const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    lastName: {type: DataTypes.STRING, notNull: true},
    firstName: {type: DataTypes.STRING, notNull: true},
    middleName:  {type: DataTypes.STRING},
    about: {type: DataTypes.TEXT},
    avatar: {type: DataTypes.STRING, defaultValue: "default.jpg"},
    email: {type: DataTypes.STRING, unique: true, notNull: true},
    password: {type: DataTypes.STRING, notNull: true},
});

const UserType = sequelize.define("userType", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, notNull: true}
});

const Course = sequelize.define("course", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, notNull: true},
    previewImage: {type: DataTypes.STRING, notNull: true},
    about: {type: DataTypes.TEXT, notNull: true},
    active: {type: DataTypes.BOOLEAN, defaultValue: true}
});

const CourseCategory = sequelize.define("courseCategory", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, notNull: true, unique: true}
});

const CourseSection = sequelize.define("courseSection", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, notNull: true},
    about: {type: DataTypes.TEXT, notNull: true},
    videoUrl: {type: DataTypes.STRING, notNull: true, unique: true}
});

const Like = sequelize.define("like", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

UserType.hasMany(User);
User.belongsTo(UserType);

CourseCategory.hasMany(Course);
Course.belongsTo(CourseCategory);

Course.hasMany(CourseSection);
CourseSection.belongsTo(Course);

Course.hasMany(Like);
Like.belongsTo(Course);

User.hasMany(Course);
Course.belongsTo(User);

User.hasMany(Like);
Like.belongsTo(User);

module.exports = {
    User,
    UserType,
    Course,
    CourseSection,
    CourseCategory,
    Like
};