const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose.connect(
  // connect mongodb atlas
  `mongodb+srv://CBMNguyen:${process.env.MONGO_ATLAS_PW}@cluster0.9ctcl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useUnifiedTopology: true },
  () => console.log(" Mongoose is connected")
);

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const userRoute = require("./api/routes/user");
const employeeRoute = require("./api/routes/employee");
const categoryRoute = require("./api/routes/category");
const colorRoute = require("./api/routes/color");
const sizeRoute = require("./api/routes/size");
const positionRoute = require("./api/routes/position");
const productRoute = require("./api/routes/products");
const cartRoute = require("./api/routes/cart");

app.use("/user", userRoute);
app.use("/employee", employeeRoute);
app.use("/category", categoryRoute);
app.use("/color", colorRoute);
app.use("/size", sizeRoute);
app.use("/position", positionRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);

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
