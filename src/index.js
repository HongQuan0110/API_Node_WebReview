import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

import routes from "./routes/index.route";
import connectDB from "./configs/connectDB";

dotenv.config();
const app = express();

// connect database
connectDB();

// parse application/x-www-form-urlencoded and application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello word");
})

routes(app);

app.listen(3001, function(){
    console.log("Server listening on port:", 3001);
})
