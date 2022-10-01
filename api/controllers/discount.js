const Discount = require("../model/discount");
const Order = require("../model/order");

module.exports = {
  // handle get all Discount
  discount_getAll: async (req, res) => {
    try {
      const discounts = await Discount.find().populate("discountType");
      res
        .status(200)
        .json({ message: "Fetch discounts successfully.", discounts });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle get discount by code
  discount_getByCode: async (req, res) => {
    const { discountCode } = req.params;
    try {
      const discount = await Discount.findOne({ discountCode }).populate(
        "discountType"
      );

      if (discount) {
        const today = new Date();
        const endDate = new Date(discount.endDate);
        if (endDate.getTime() < today.getTime()) {
          return res.status(404).json({ message: "Expired discount code" });
        }
      }

      const hasDiscountInOrder = await Order.findOne({
        discountCode,
        user: req.headers.user.userId,
        state: { $in: ["pending", "confirmed", "shipping", "delivered"] },
      });

      if (hasDiscountInOrder) {
        return res.status(400).json({ message: "Discount code already used" });
      }

      if (!discount || !discountCode || discount.quantity <= 0) {
        return res
          .status(404)
          .json({ message: "Discount code is invalid or has been used" });
      }
      res
        .status(200)
        .json({ message: "Fetch discounts successfully.", discount });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle create Discount
  discount_create: async (req, res) => {
    try {
      const newDiscount = new Discount({ ...req.body });
      await newDiscount.save();
      await newDiscount.populate("discountType").execPopulate();
      res.status(201).json({ message: "Added a new discount.", newDiscount });
    } catch (error) {
      res.status(500).json({ error });
      console.log(error);
    }
  },

  // handle update discount
  discount_update: async (req, res) => {
    const { discountId } = req.params;
    try {
      const discountUpdated = await Discount.updateOne(
        { _id: discountId },
        {
          $set: {
            ...req.body,
          },
        }
      );
      res.status(200).json({ message: "Discount updated.", discountUpdated });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  // handle delete discount
  discount_delete: async (req, res) => {
    const { discountId } = req.params;
    try {
      await Discount.deleteOne({ _id: discountId });
      res.status(200).json({ message: "Discount deleted." });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
