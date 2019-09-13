import authRoute from "./auth.route";

const routes = (app) => {
    app.use('/', authRoute);
}

module.exports = routes;
