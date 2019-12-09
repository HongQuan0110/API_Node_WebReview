import { userService } from "../services/index.service";

module.exports.updateProfile = async (req, res, next) => {
    try {
        // console.log(req.user._id, req.user.id);
        // console.log(typeof(req.user._id), typeof(req.user.id));
        await userService.updateProfileById(req.user.id, req.body);
        return res.status(200).send({message: "Update success"})
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports.updateAvatarUserById = (req, res, next) => {
    try {
        return userService.updateAvatarUserById(req, res);
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports.updatePasswordUser = async (req, res, next) => {
    try {
        await userService.updatePasswordUser(req.user.id, req.body);
        return res.status(200).send({message: "Update success", result: true});
    } catch (error) {
        return res.status(200).send({message: error, result: false});
    }
}
