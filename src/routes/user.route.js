import express from "express";

import {userController} from "../controllers/index.controller";

const route = express.Router();

route.get('/', userController.getAllUser);

route.put('/:id', userController.updateUserById);

module.exports = route;
