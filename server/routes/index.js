const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const userTypeRouter = require("./userTypeRouter");
const courseCategoryRouter = require("./courseCategoryRouter");
const courseRouter = require("./courseRouter");
const courseSectionRouter = require("./courseSectionRouter");
const likeRouter = require("./likeRouter");
const checkRole = require("../middleware/checkRoleMiddleware");

router.use('/user', userRouter);
router.use('/usertype', checkRole(["Администратор"]), userTypeRouter);
router.use('/coursecategory', courseCategoryRouter);
router.use('/course', courseRouter);
router.use('/coursesection', courseSectionRouter);
router.use('/like', likeRouter);

module.exports = router
