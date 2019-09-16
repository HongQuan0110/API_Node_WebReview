import session from "express-session";

let config = (app) => {
    app.use(session({
        secret: 'token',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }))
}

module.exports = config;
