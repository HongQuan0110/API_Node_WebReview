import express from "express";

import { authController } from "../controllers/index.controller";
import { auth } from "../validations/index.validation";

const route = express.Router();

route.post('/register', auth.register, authController.register)

module.exports = route;
