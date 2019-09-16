import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String},
    age: {type: Number},
    gender: {type: String},
    phone: {type: String},
    avatar: {type: String},
    local: {
        email: {type: String},
        password: {type: String},
        verifyToken: {type: String},
        isActive: {type: Boolean}
    },
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date},
    deletedAt: {type: Date},
    isDelete: {type: Boolean, default: false}
});

UserSchema.statics = {
    createNew(user){
        return this.create(user);
    },

    findUserByEmail(email){
        return this.findOne({
            "local.email": email
        }, {_id: 1, "local.password": 1})
    },

    findUserById(id){
        return this.findById(id, {"local.password": 0});
    }
}

UserSchema.methods = {
    comparePassword(passwordHash) {
        return bcrypt.compareSync(passwordHash, this.local.password)
    }
}

const User = mongoose.model("User", UserSchema);

module.exports = User;
