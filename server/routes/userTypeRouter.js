const Router = require('express');
const router = new Router();
const UserTypeController = require("../controllers/userTypeController");

router.get("/", UserTypeController.getAll);
router.get("/:id", UserTypeController.getOne);
router.post("/", UserTypeController.create);
router.put("/:id", UserTypeController.update);
router.delete("/:id", UserTypeController.delete);

module.exports = router;
