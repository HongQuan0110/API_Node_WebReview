import passport from "passport";
import passportJwt from "passport-jwt";
import passportLocal from "passport-local";

const JwtStrategy = passport.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

let initPassportLocal = () => {
    passport.use(new ExtractJwt)
}
