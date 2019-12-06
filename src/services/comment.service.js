import CommentModel from "../models/comment.model";

const createNewComment = (comment) => {
    return new Promise(async (resolve, reject) => {
        try {
            await CommentModel.createNewComment(comment);
            resolve(true)
        } catch (error) {
            reject(error.message);
        }
    })
}

const getCommentByProductId = (id) => {
    return new Promise((resolve, reject) => {
        try {
            let comments = CommentModel.findCommentByProductId(id);
            return resolve(comments);
        } catch (error) {
            reject(error.message);
        }
    })
}

module.exports = {
    createNewComment,
    getCommentByProductId
}
