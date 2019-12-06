import express from "express";
import passport from "passport";

import { commentController } from "../controllers/index.controller";

const route = express.Router();

route.post('/', passport.authenticate("jwt", {session: false}), commentController.createNewComment);

route.get('/product/:productId', commentController.getCommentByProductId);

module.exports = route;
