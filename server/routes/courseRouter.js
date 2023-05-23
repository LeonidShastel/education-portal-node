const Router = require('express');
const router = new Router();
const CourseController = require("../controllers/courseController");
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require("../middleware/checkRoleMiddleware");

router.get("/", CourseController.getAll);
router.get("/:id", CourseController.getOne);
router.get("/my", authMiddleware, CourseController.getAllByUser);
router.get("/category/:id", CourseController.getAllByCategory);
router.post("/", checkRole(["Администратор", "Преподаватель"]), CourseController.create);
router.put("/:id", authMiddleware, CourseController.update);
router.delete("/:id", authMiddleware, CourseController.delete);

module.exports = router;
