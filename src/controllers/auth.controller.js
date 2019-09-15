import { validationResult } from "express-validator";

import { userService } from "../services/index.service";

module.exports.register = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()){
        let errorResult = Object.values(result.mapped());
        let arrError = errorResult.map(val => val.msg);
        return res.status(400).send({error: arrError});
    }

    try {
        let userMsg = await userService.register(req.body.email, req.body.password);
        return res.status(201).send({
            msg: userMsg
        });
    } catch (error) {
        return res.status(400).send({
            msg: error
        });        
    }
}
