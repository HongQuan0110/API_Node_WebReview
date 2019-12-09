import CommentModel from "../models/comment.model";
import ProductModel from "../models/product.model";

const createNewComment = (comment) => {
    return new Promise(async (resolve, reject) => {
        try {
            await CommentModel.createNewComment(comment);
            let product = await ProductModel.findProductById(comment.productId);
            console.log(product.commentAmount);
            await ProductModel.increaseComment(product._id, ++product.commentAmount);
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
