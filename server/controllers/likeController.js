const {Like} = require("../models/models");

class LikeController {
	async update(req, res){
		const {courseId} = req.body;

		const like = await Like.findOne({
			where: {
				userId: req.user.id,
				courseId: courseId
			}
		});
		if (!like)
			return res.json(
				await Like.create({
					userId: req.user.id,
					courseId: courseId
				})
			);

		return res.json(
			await like.destroy()
		);
	}
}

module.exports = new LikeController();