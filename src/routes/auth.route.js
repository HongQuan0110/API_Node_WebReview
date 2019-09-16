import express from "express";
import passport from "passport";

import { authController } from "../controllers/index.controller";
import { auth } from "../validations/index.validation";
import { initPassportLocal, initPassportJwt } from "../controllers/passportjs/local";

initPassportLocal();
initPassportJwt();

const route = express.Router();

route.post('/register', auth.register, authController.register)

route.post('/login', authController.login);

route.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send("pass");
})

module.exports = route;
