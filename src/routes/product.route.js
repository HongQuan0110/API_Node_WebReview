import express from "express";

import { productController } from "../controllers/index.controller";

const route = express.Router();

route.post('/', productController.createNewProduct);

route.get('/:id', productController.getProduct);

route.post('/testUpload', productController.testUploadImage);

module.exports = route;
