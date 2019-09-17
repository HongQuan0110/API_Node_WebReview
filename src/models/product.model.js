import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {type: String},
    image: {type: String},
    label: {type: String},
    price: {type: Number},
    score: {type: Number},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date},
    deletedAt: {type: Date},
    isDelete: {type: Boolean, default: false}
})

ProductSchema.statics = {
    createNewProduct(product){
        return this.create(product);
    },

    findProductById(id){
        return this.findById(id).exec();
    }
}

module.exports = mongoose.model("product", ProductSchema);
