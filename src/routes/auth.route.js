import express from "express";
import passport from "passport";

import { authController, userController } from "../controllers/index.controller";
import { auth } from "../validations/index.validation";
import { initPassportLocal, initPassportJwt } from "../controllers/passportjs/local";
import { transError } from "../lang/vi";

initPassportLocal();
initPassportJwt();

const route = express.Router();

route.post('/register', auth.register, authController.register)

route.post('/login', authController.login);

route.get('/profile', (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if(user) {
            return res.status(200).send(user)
        }
        return res.status(200).send({
            msg: transError.UNAUTHORIZED,
            result: false,
            role: {index: 0}
        });
    })(req, res, next)
});

route.put('/profile', passport.authenticate('jwt', {session: false}), userController.updateProfile);

route.post('/avatar', passport.authenticate('jwt', {session: false}), userController.updateAvatarUserById);

route.put('/password', passport.authenticate('jwt', {session: false}), userController.updatePasswordUser);

module.exports = route;
