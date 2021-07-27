const Cart = require("../model/cart");

module.exports = {
  cart_getAll: async (req, res, next) => {
    try {
      const cart = await Cart.find().populate("user");
      res.status(200).json({message: "Fetch cart successfully.", cart });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  // handle update cart by Id
  cart_update: async (req, res, next) => {
    const { cartId } = req.params;

    try {
      const cart = await Cart.updateOne(
        { _id: cartId },
        { $set: { ...req.body } }
      );
      res.status(200).json({ message: "Cart updated.", cart });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  cart_delete: async (req, res) => {
    const { cartId } = req.params;
    try {
      await Cart.deleteOne({ _id: cartId });
      res.status(200).json({ message: "Cart deleted." });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
