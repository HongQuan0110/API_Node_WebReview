import passport from "passport";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import { userService } from "../services/index.service";
import { transError } from "../lang/vi";

module.exports.register = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()){
        let errorResult = Object.values(result.mapped());
        let arrError = errorResult.map(val => val.msg);
        return res.status(400).send({error: arrError});
    }

    try {
        let userMsg = await userService.register(req.body.email, req.body.password, req.body.age);
        return res.status(201).send({
            msg: userMsg
        });
    } catch (error) {
        return res.status(400).send({
            msg: error
        });        
    }
}

module.exports.login = (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.send({msg: transError.LOGIN_FAILED});
        }
        
        req.login(user, async (error) => {
            if (error) return next(error)
            const token = jwt.sign({user}, "token");
            return res.json(token);
        })
    })(req, res, next)
}
