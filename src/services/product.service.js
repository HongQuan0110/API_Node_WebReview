import multer from "multer";

import {app} from "../configs/app";
import { transError } from "../lang/vi";
import ProductModel from "../models/product.model";
import ProductDetailModel from "../models/productDetail.model";
import commentModel from "../models/comment.model";
import UserModel from "../models/user.model";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,  `${__dirname}/../${app.productImage_directory}`);
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

function fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
        return cb(transError.IMAGE_UPLOAD_FAILED, false);
    }
    return cb(null, true)
}

const upload = multer({storage, fileFilter}).single("image");

const createNewProduct = (product, productDetail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newProduct = await ProductModel.createNewProduct(product);
            productDetail.productId = newProduct._id;
            await ProductDetailModel.createNewProductDetail(productDetail);
            resolve(true);
        } catch (error) {
            return reject(error.message);
        }
    })
}

const getProduct = (productId) => {
    return new Promise(async (reslove, reject) => {
        try {
            
            let product = await ProductModel.findProductById(productId);
            let productDetail = await ProductDetailModel.findProductDetail(productId);
            let comment = await commentModel.findCommentByProductId(productId);
            let user = null;
            if (comment){
                user = await UserModel.findUserComment(comment.userId);
            }
            
            return reslove({
                product,
                productDetail,
                comment,
                user
            })
        } catch (error) {
            reject(error.message)
        }
    })
}

const testUploadImage = (req, res) => {
    upload(req, res, (err) => {
        if(err) {
            return res.status(500).send({err});
        }
        
        return res.status(201).send(req.file);
    })
}

module.exports = {
    createNewProduct,
    getProduct,
    testUploadImage
}
