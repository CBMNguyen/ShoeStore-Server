const Address = require("../model/address");

module.exports = {
  // handle get all address by user
  address_getByUser: async (req, res) => {
    try {
      const addresses = await Address.find({
        user: req.params.userId,
      });
      res
        .status(200)
        .json({ message: "Fetch addresses successfully.", addresses });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle create address
  address_create: async (req, res) => {
    try {
      const newAddress = new Address(req.body);
      await newAddress.save();
      res.status(201).json({ message: "Added a new address.", newAddress });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // handle delete address
  address_delete: async (req, res) => {
    const { addressId } = req.params;
    try {
      await Address.deleteOne({ _id: addressId });
      res.status(200).json({ message: "Address deleted." });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
