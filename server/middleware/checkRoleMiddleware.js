const jwt = require('jsonwebtoken')
const {getUserTypeIds} = require("../utils/utils");
const ApiError = require("../error/ApiError");

module.exports = function(userTypeNames=[]) {
    return async function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]; // Bearer
            if (!token) {
                return next(ApiError.unauthorized("Не авторизован"));
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (!(await getUserTypeIds(userTypeNames)).some(el=>el === decoded.userTypeId)) {
                return next(ApiError.forbidden("Нет доступа"));
            }
            req.user = decoded;
            next();
        } catch (e) {
            next(ApiError.forbidden("Нет доступа"));
        }
    };
}



