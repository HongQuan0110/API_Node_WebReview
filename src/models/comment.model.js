import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    productId: {type: String},
    userId: {type: String},
    score: {type: Number},
    like: {type: Number},
    dislike: {type: Number},
    content: {type: String},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date},
    deletedAt: {type: Date},
    isDelete: {type: Boolean, default: false}
})

CommentSchema.statics = {
    findCommentByProductId(productId){
        return this.find({productId}, {
            userId: 1, score: 1, like: 1, dislike: 1, content: 1, createdAt: 1
        }).exec();
    },

    createNewComment(comment){
        return this.create(comment);
    }
}

module.exports = mongoose.model("comment", CommentSchema);
