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
require('dotenv').config();

const port =process.env.PORT || 4000;
const conn_str =process.env.DATABASE_URL;
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

var options = {
    keepAlive: 1,
    connectTimeoutMS: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/Adan", postsRouter);
app.use("/Adan", postsRouter1);
app.use("/Adan", postsRouter2);
app.use("/Adan", postsRouter3);



app.listen(port, function () {
    console.log("Runnning on " + port);
});
module.exports = app;
