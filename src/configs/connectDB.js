import mongoose from "mongoose";

let connectDB = () => {
    console.log(process.env.DB_AZURE_CONNECTION)
    // let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    let URI = `${process.env.DB_AZURE_CONNECTION}`;
    return mongoose.connect(URI, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})
            .then(() => console.log('Connect DB'))
            .catch((err) => console.log('err:', err))
}

module.exports = connectDB;
