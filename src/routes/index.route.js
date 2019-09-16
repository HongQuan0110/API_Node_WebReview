import authRoute from "./auth.route";
import cors from "cors";

const routes = (app) => {
    app.use(cors());
    app.use('/', authRoute);
}

module.exports = routes;
