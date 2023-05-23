const Router = require('express');
const router = new Router();
const CourseCategoryController = require("../controllers/courseCategoryController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.get("/", CourseCategoryController.getAll);
router.get("/:id", checkRole(["Администратор", "Преподаватель"]), CourseCategoryController.getOne);
router.post("/", checkRole(["Администратор", "Преподаватель"]), CourseCategoryController.create);
router.put("/:id", checkRole(["Администратор", "Преподаватель"]), CourseCategoryController.update);
router.delete("/:id", checkRole(["Администратор", "Преподаватель"]), CourseCategoryController.delete);

module.exports = router;
