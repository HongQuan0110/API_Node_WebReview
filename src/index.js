import dotenv from "dotenv";
import express from "express";

import routes from "./routes/index.route";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
    res.send("Hello word");
})

routes(app);

app.listen(process.env.PORT, function(){
    console.log("Server listening on port:", process.env.PORT);
})
