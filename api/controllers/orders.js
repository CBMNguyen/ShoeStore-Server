const Order = require("../model/order");
const Discount = require("../model/discount");
const Product = require("../model/product");
const checkout = require("../utils/checkout");
const deliveredMail = require("../utils/deliveredMail");
const nodemailer = require("nodemailer");

module.exports = {
  // handle get all Order
  order_getAll: async (req, res) => {
    try {
      const order = await Order.find().populate([
        {
          path: "user",
        },
        {
          path: "employeeId",
        },
        {
          path: "products",
          populate: [{ path: "_id" }],
        },
      ]);
      res.status(200).json({
        message: "Fetch orders successfully.",
        order,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle get order by Id
  order_get: async (req, res) => {
    const { userId } = req.params;
    try {
      const order = await Order.find({ user: userId }).populate([
        {
          path: "products",
          populate: [{ path: "_id" }],
        },
      ]);
      if (order.length !== 0)
        res.status(200).json({ message: "Fetch order successfully.", order });
      else res.status(404).json({ message: "Order by user id is empty." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },

  // handle create order
  order_create: async (req, res) => {
    const data = req.body;
    if (data.products.length === 0)
      return res.status(400).json({ message: "Products is required." });

    try {
      data.updateProduct.forEach(async (product) => {
        await Product.updateOne(
          { _id: product._id },
          {
            $set: {
              productDetail: product.productDetail.map((item) => {
                return {
                  images: item.images,
                  color: item.color._id,
                  sizeAndQuantity: item.sizeAndQuantity.map((s) => ({
                    quantity: s.quantity,
                    size: s.size._id,
                  })),
                };
              }),
              quantityStock: product.quantityStock,
            },
          }
        );
      });
      const newOrder = new Order(data);
      await newOrder.save();

      if (data.discountCode) {
        await Discount.updateOne(
          { discountCode: data.discountCode },
          {
            $inc: {
              quantity: -1,
            },
          }
        );
      }

      res.status(201).json({ message: "Check out successfully.", newOrder });
    } catch (error) {
      res.status(500).json({ error });
      console.log(error);
    }
  },

  // handle update state order
  order_updateState: async (req, res) => {
    const { orderId } = req.params;
    try {
      await Order.updateOne(
        { _id: orderId },
        {
          $set: {
            ...req.body,
          },
        }
      );

      if (req.body.state === "delivered") {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.MAIL_ADDRESS,
            pass: process.env.MAIL_PASS,
          },
        });
        try {
          await transporter.sendMail({
            from: `"Shoes Store 🎁" < ${process.env.MAIL_ADDRESS} >`, // sender address
            to: req.body.order.email, // list of receivers
            subject: "Successfully Delivered", // Subject line
            html: deliveredMail(req.body.order), // html body
          });
        } catch (error) {
          console.log(error);
          return res.status(200).json({ message: "Order updated." });
        }
      }
      res.status(200).json({ message: "Order updated." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },

  order_update: async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await Order.findOne({ _id: orderId }).populate([
        {
          path: "products",
          populate: [
            {
              path: "_id",
              populate: [
                {
                  path: "productDetail",
                  populate: [
                    { path: "color" },
                    { path: "sizeAndQuantity", populate: [{ path: "size" }] },
                  ],
                },
              ],
            },
          ],
        },
      ]);
      const productList = order._doc.products;
      const cloneProducts = productList.slice().map((item) => {
        return {
          _id: { ...item._id._doc },
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize,
          selectedQuantity: item.selectedQuantity,
        };
      });

      const products = checkout(cloneProducts, productList);

      products.forEach(async (item) => {
        await Product.updateOne(
          { _id: item._id },
          {
            $set: {
              productDetail: item.productDetail.map((item) => {
                return {
                  images: item.images,
                  color: item.color._id,
                  sizeAndQuantity: item.sizeAndQuantity.map((s) => ({
                    quantity: s.quantity,
                    size: s.size._id,
                  })),
                };
              }),
              quantityStock: item.quantityStock,
            },
          }
        );
      });

      // updated order state
      if (!order)
        return res.status(404).json({ message: "Order is not exists." });

      const orderUpdated = await Order.updateOne(
        { _id: orderId },
        {
          $set: {
            state: "cancelled",
          },
        }
      );

      if (order._doc.discountCode) {
        await Discount.updateOne(
          { discountCode: order._doc.discountCode },
          {
            $inc: {
              quantity: 1,
            },
          }
        );
      }

      res.status(200).json({ message: "Order Updated.", state: "cancelled" });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  // handle delete order
  order_delete: async (req, res) => {
    const { orderId } = req.params;
    try {
      await Order.deleteOne({ _id: orderId });
      res.status(200).json({ message: "Order cancel successfully." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },
};
