import express from "express";

import { commentController } from "../controllers/index.controller";

const route = express.Router();

route.post('/', commentController.createNewComment);

module.exports = route;
