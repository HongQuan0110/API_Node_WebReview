import CommentModel from "../models/comment.model";

const createNewComment = (comment) => {
    return new Promise(async (resolve, reject) => {
        try {
            await CommentModel.createNewComment(comment);
            resolve(true)
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createNewComment
}
