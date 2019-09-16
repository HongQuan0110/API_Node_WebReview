import passport from "passport";
import passportJwt from "passport-jwt";
import passportLocal from "passport-local";

import UserModel from "../../models/user.model";
import { transError } from "../../lang/vi";

const LocalStrategy = passportLocal.Strategy;

let initPassportLocal = () => {
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            let user = await UserModel.findUserByEmail(email);

            if (!user) {
                return done(null, false, { message: transError.LOGIN_FAILED });
            }

            let checkPassword = user.comparePassword(password);
            if (!checkPassword) {
                return done(null, false, { message: transError.LOGIN_FAILED });
            }

            return done(null, await UserModel.findUserById(user._id))
        } catch (error) {
            return done(error, false);
        }
    }));

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        UserModel.findUserById(id)
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            return done(err, null);
        })
    });
}

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

let initPassportJwt = () => {
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "token"
    }, (jwtPayload, done) => {
        return UserModel.findUserById(jwtPayload.user._id)
            .then(user => {
                if (user) {
                    return done(null, user)
                }
                return done(null, false);
            })
            .catch(err => {
                return done(err, false)
            })
    }))
}

module.exports = {
    initPassportLocal,
    initPassportJwt
}
