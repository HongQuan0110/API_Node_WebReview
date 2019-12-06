import cors from "cors";
// import passport from "passport";

import authRoute from "./auth.route";
import productRoute from "./product.route";
import commentRoute from "./comment.route";

const routes = (app) => {
    app.use(cors());
    app.use('/', authRoute);
    app.use('/product', productRoute);
    app.use('/comment', commentRoute);
}

module.exports = routes;
