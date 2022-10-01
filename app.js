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
  `mongodb+srv://hieunguyen:${process.env.MONGO_ATLAS_PW}@cluster0.9ctcl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useUnifiedTopology: true },
  (error) => {
    error ? console.log(error) : console.log(" Mongoose is connected");
  }
);

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

const userRoute = require("./api/routes/user");
const employeeRoute = require("./api/routes/employee");
const categoryRoute = require("./api/routes/category");
const colorRoute = require("./api/routes/color");
const discountTypeRoute = require("./api/routes/discountType");
const orderRoute = require("./api/routes/orders");
const sizeRoute = require("./api/routes/size");
const reviewRoute = require("./api/routes/review");
const feedbackRoute = require("./api/routes/feedback");
const favouriteRoute = require("./api/routes/favourite");
const addressRoute = require("./api/routes/address");
const positionRoute = require("./api/routes/position");
const importOrderRoute = require("./api/routes/importOrder");
const supplierRoute = require("./api/routes/supplier");
const discountRoute = require("./api/routes/discount");
const roleRoute = require("./api/routes/role");
const productRoute = require("./api/routes/products");
const paymentRoute = require("./api/routes/payment");

app.use("/user", userRoute);
app.use("/employee", employeeRoute);
app.use("/category", categoryRoute);
app.use("/color", colorRoute);
app.use("/discountType", discountTypeRoute);
app.use("/order", orderRoute);
app.use("/size", sizeRoute);
app.use("/review", reviewRoute);
app.use("/feedback", feedbackRoute);
app.use("/favourite", favouriteRoute);
app.use("/address", addressRoute);
app.use("/position", positionRoute);
app.use("/importOrder", importOrderRoute);
app.use("/supplier", supplierRoute);
app.use("/discount", discountRoute);
app.use("/role", roleRoute);
app.use("/products", productRoute);
app.use("/payment", paymentRoute);

// Test and throw new error
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
