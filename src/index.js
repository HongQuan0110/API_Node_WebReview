import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import cookieParser from "cookie-parser";

import routes from "./routes/index.route";
import connectDB from "./configs/connectDB";
import session from "./configs/session";

dotenv.config();
const app = express();

// connect database
connectDB();

app.use(express.static('public'));

// parse application/x-www-form-urlencoded and application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// config session
session(app);
app.use(cookieParser());

// config passportjs
app.use(passport.initialize());
app.use(passport.session());

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.get("/", (req, res) => {
    res.send("Hello word");
})

routes(app);

app.listen(3001, function () {
    console.log("Server listening on port:", 3001);
})
