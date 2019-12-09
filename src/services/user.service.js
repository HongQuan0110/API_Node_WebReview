import bcrypt from "bcrypt";
import uuidv4 from "uuid/v4";
import multer from "multer";

import { transError, transSuccess } from "../lang/vi";
import {app} from "../configs/app";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,  `${app.avatar_directory}`);
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

function fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
        return cb(transError.IMAGE_UPLOAD_FAILED, false);
    }
    return cb(null, true)
}

const upload = multer({storage, fileFilter}).single("avatar");

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
            reject(error.message);
        }
    })
}

const updateProfileById = (id, profile) => {
    return new Promise(async(resolve, reject) => {
        try {
            await UserModel.updateProfileById(id, profile);
            return resolve();
        } catch (error) {
            return reject(error.message);
        }
    })
}

const updateAvatarUserById = (req, res) => {
    upload(req, res, (err) => {
        if(err) {
            return res.status(500).send({err});
        }
        
        return res.status(201).send(req.file);
    })
}

const updatePasswordUser = (id, params) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await UserModel.findUserByIdToChangePass(id);
            let checkPassword = user.comparePassword(params.password);
            if (checkPassword) {
                let passwordHash = bcrypt.hashSync(params.newPassword, salt);
                await UserModel.updatePasswordById(id, passwordHash);
                return resolve(true)
            }
            reject("Mật khẩu cũ không đúng");
        } catch (error) {
            return reject(error.message);
        }
    })
}

module.exports = {
    register,
    updateProfileById,
    updateAvatarUserById,
    updatePasswordUser
}
