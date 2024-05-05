const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const postsRouter = require("./Auth");
const postsRouter1 = require("./ClgList");
const postsRouter2 = require("./AuthClg");
const postsRouter3 = require("./Bookingdata");
const postsRouter4=require("./Update_profile");
const postsRouter5=require("./CollegeData");
require('dotenv').config();

const port =process.env.PORT || 4000;
const conn_str =process.env.DATABASE_URL;

app.use(cors({
    origin: ['https://adan-pradan.vercel.app'],
    credentials: true,
  }));
mongoose.connect(
    conn_str,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            console.log("error in connection");
        } else {
            console.log("MONGDB is connected");
        }
    }
);
mongoose.set("strictQuery", true);
app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/Adan", postsRouter);
app.use("/Adan", postsRouter1);
app.use("/Adan", postsRouter2);
app.use("/Adan", postsRouter3);
app.use("/Adan", postsRouter4);
app.use("/Adan", postsRouter5);
app.listen(port, function () {
    console.log("Runnning on " + port);
});
module.exports = app;
