const DiscountType = require("../model/discountType");

module.exports = {
  // handle get all Discount Type
  discountType_getAll: async (req, res) => {
    try {
      const discountTypes = await DiscountType.find();
      res
        .status(200)
        .json({ message: "Fetch discount type successfully.", discountTypes });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle create Discount Type
  discountType_create: async (req, res) => {
    const { discountTypeName } = req.body;
    try {
      const isCurrentDiscountType = await DiscountType.findOne({
        discountTypeName,
      });
      if (isCurrentDiscountType)
        return res
          .status(409)
          .json({ message: "Discount type already exist." });

      const newDiscountType = new DiscountType({ discountTypeName });
      await newDiscountType.save();
      res
        .status(201)
        .json({ message: "Added a new discount type.", newDiscountType });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle update discount type
  discountType_update: async (req, res) => {
    const { discountTypeId } = req.params;
    try {
      const isCurrentDiscountType = await DiscountType.findOne({
        discountTypeName: req.body.discountTypeName,
      });

      if (!isCurrentDiscountType) {
        const discountTypeUpdated = await DiscountType.updateOne(
          { _id: discountTypeId },
          {
            $set: {
              ...req.body,
            },
          }
        );
        res
          .status(200)
          .json({ message: "Discount type updated.", discountTypeUpdated });
      } else {
        res.status(409).json({ message: "Discount type already exists." });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle delete Discount Type
  discountType_delete: async (req, res) => {
    const { discountTypeId } = req.params;
    try {
      await DiscountType.deleteOne({ _id: discountTypeId });
      res.status(200).json({ message: "Discount type deleted." });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
