const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  // connect mongodb atlas
  `mongodb+srv://CBMNguyen:${process.env.MONGO_ATLAS_PW}@cluster0.9ctcl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log(" Mongoose is connected")
);

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

const userRoute = require("./api/routes/user");
const categoryRoute = require("./api/routes/category");
const sizeRoute = require("./api/routes/size");
const colorRoute = require("./api/routes/color");

app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/size", sizeRoute);
app.use("/color", colorRoute);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
