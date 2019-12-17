import express from "express";

import { roleController } from "../controllers/index.controller";

const route = express.Router();

route.get('/', roleController.getRoles)

route.get('/:id', roleController.getRoleById);

route.post('/', roleController.createNewRole);

module.exports = route;
