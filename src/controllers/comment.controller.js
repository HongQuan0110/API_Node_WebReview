import { commentService } from "../services/index.service";

module.exports.createNewComment = async (req, res, next) => {
    try {
        const comment = {
            productId: comment.productId,
            userId: req.user._id,
            score: comment.score,
            content: comment.content
        }

        await commentService.createNewComment(comment);
        return res.status(201).send();
    } catch (error) {
        return res.status(500).send(error);
    }
}
