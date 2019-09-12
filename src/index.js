import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
    res.send("Hello word");
})

app.listen(process.env.PORT, process.env.HOST, function(){
    console.log("Server listening on port:", process.env.PORT);
})
