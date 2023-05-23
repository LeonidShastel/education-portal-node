const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");
const LikeController = require("../controllers/likeController");

router.post("/", authMiddleware, LikeController.update);

module.exports = router;