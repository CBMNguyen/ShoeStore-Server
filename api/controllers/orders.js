const Order = require("../model/order");

module.exports = {
  // handle get all Order
  order_getAll: async (req, res) => {
    try {
      const order = await Order.find().populate("user");
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
      const order = await Order.find({ user: userId }).populate("user", "_id");
      console.log(order);
      if (order.length !== 0) 
        res.status(200).json({ message: "Fetch order successfully.", order: order[order.length - 1]});
      else
        res.status(404).json({ message: "Order by user id is empty." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },

  // handle create order
  order_create: async (req, res) => {
    const  data  = req.body;
    console.log(req.body);
    try {
      const newOrder = new Order(data );
      await newOrder.save();
      res.status(201).json({ message: "Check out successfully.", newOrder });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  order_update: async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await Order.findById({_id: orderId});
      if(!order)
        return res.status(404).json({ message: "Order is not exists."});
      
      const orderUpdated = await Order.updateOne(
        { _id: orderId },
        {
          $set: {
            ...req.body,
          },
        }
      );
      res.status(200).json({ message: "Order Updated.", orderUpdated });
  }catch (error) {
      res.status(500).json({ error });
    }
  },
  // handle delete order
  order_delete: async (req, res) => {
    const { orderId } = req.params;
    try {
      await Order.deleteOne({ _id: orderId });
      res.status(200).json({ message: "order deleted." });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
