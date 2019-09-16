import bcrypt from "bcrypt";
import uuidv4 from "uuid/v4";

import { transError, transSuccess } from "../lang/vi";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

import UserModel from "../models/user.model";

const register =  (email, password, age) => {
    return new Promise(async (resolve, reject) => {
        try {
    
            let userByEmail = await UserModel.findUserByEmail(email);
    
            if (userByEmail) {
                return reject(transError.EMAIL_ALREADY);
            }
            
            let user = {
                username: email.split("@")[0],
                age,
                local: {
                    email,
                    password: bcrypt.hashSync(password, salt),
                    isActive: true,
                    verifyToken: uuidv4()
                }
            }
    
            UserModel.createNew(user);
            resolve(transSuccess.USER_CREATED(user.local.email));
        } catch (error) {
            console.log("userservice_register", error);
            reject(error);
        }
    })
}

module.exports = {
    register
}
