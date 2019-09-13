import express from "express";

import { authController } from "../controllers/index.controller";

const route = express.Router();

route.post('/register', authController.register)

module.exports = route;
