const Product = require("../model/product");

module.exports = {
  // handle get all Product
  product_getAll: async (req, res) => {
    try {
      const products = await Product.find();
      const page = req.query.page || 1;
      const limit = req.query.limit || products.length;

      const start = (page - 1) * limit;
      const end = page * limit;

      filterProducts = products.slice(start, end);

      res.status(200).json({
        products: filterProducts,
        pagination: {
          page,
          limit,
          totalRow: products.length,
        },
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle get product by Id
  product_getById: async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await Product.findById({ _id: productId });
      if (product) res.status(200).json({ product });
      else
        res
          .status(404)
          .json({ message: "No valid entry found for provided Id" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle create Product
  product_create: async (req, res) => {
    const {
      category,
      name,
      originalPrice,
      isFreeShip,
      promotionPercent,
      images,
      color,
      size,
      description,
      quantityStock,
    } = req.body;
    try {
      const newProduct = new Product({
        category,
        name,
        originalPrice,
        promotionPercent,
        salePrice: originalPrice * (1 - promotionPercent),
        isFreeShip,
        images,
        color,
        size,
        description,
        quantityStock,
      });
      await newProduct.save();
      res.status(201).json({ message: "Product created", newProduct });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle update Product
  product_update: async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await Product.updateOne(
        { _id: productId },
        {
          $set: {
            ...req.body,
          },
        }
      );
      res.status(200).json({ message: "Product updated", product });
    } catch (error) {
      res.status(500).json({ error });
    }
  }, // handle delete Product
  product_delete: async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await Product.remove({ _id: productId });
      res.status(200).json({ message: "Product deleted", product });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
