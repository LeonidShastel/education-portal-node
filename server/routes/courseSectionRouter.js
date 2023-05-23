const Router = require('express');
const router = new Router();
const CourseSectionController = require("../controllers/courseSectionController");
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole(["Администратор", "Преподаватель"]), CourseSectionController.create);
router.put('/:id', authMiddleware, CourseSectionController.update);
router.delete('/:id', authMiddleware, CourseSectionController.delete);

module.exports = router;