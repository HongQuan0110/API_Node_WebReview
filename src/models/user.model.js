import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String},
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
        }, {"local.password": 0})
    }
}

const User = mongoose.model("User", UserSchema);

module.exports = User;
